# users/views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.hashers import check_password
from .models import User
from rest_framework.views import APIView
from .models import HistoryTitle
from .models import Chat
from .serializers import ChatSerializer
from django.contrib.auth.hashers import check_password
from .serializers import PasswordChangeSerializer
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from .serializers import PasswordResetSerializer, PasswordRequestResetSerializer,TokenCheckSerializer
from django.utils import timezone
from datetime import datetime
import pprint


from .agent_org import graph  # Import your compiled workflow graph


@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            # Save the new user to the database
            user = serializer.save()
            return Response({
                'message': 'User created successfully',
                'user_id': user.user_id,
                'user_name': user.user_name,
                'email': user.email
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def process_user_query(request):
    """
    API endpoint to process user queries using the workflow graph.
    """
    if request.method == 'POST':
        # Extract user query and thread_id (chat_id) from the request
        user_query = request.data.get('user_query')
        thread_id = request.data.get('thread_id')

        if not user_query or not thread_id:
            return Response({
                'message': 'Both "user_query" and "thread_id" are required.'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Step 1: Prepare the state for the workflow
            state = {
                "messages": [("user", user_query)],
            }
            config = {"configurable": {"thread_id": thread_id}}

            # Step 2: Run the workflow graph
            generated_response = None
            # for output in graph.stream(state, config):
            #     print("SEND HELP")
            #     generated_response = output.get("generated_response", None)  # Default to None if the key doesn't exist
            #     if generated_response:
            #         print("Generated Response:", generated_response)
            #         break  # Exit the loop once the response is found
            #     else:
            #         print("No generated response in this output")

            for output in graph.stream(state, config):
                for key, value in output.items():
                    # Print the raw output from each node
                    # print("Key:", key)
                    if key == "generate":
                        print("Generated Response:", value["generated_response"])

                        generated_response = value["generated_response"]
                    # print("Generated Response:", generated_response)
                    # pprint.pprint(f"Output from node '{key}':")
                    # pprint.pprint(value, indent=2, width=80, depth=None)
                # print("SEND HELP")
                # print(output)
                # 'generated_response'
                # if "generated_response" in output:
                #     generated_response = output["generated_response"]

                # elif not generated_response:
                #     return Response({
                #         'message': 'Workflow failed to generate a response.'
                #     }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Step 3: Save the user query and generated response to the Chat table
            # Save the user query
            Chat.objects.create(
                chat_text=user_query,
                chat_id=thread_id,
                sender_type='user',
                time_stamp=datetime.now()
            )

            # Save the generated response
            chat = Chat.objects.create(
                chat_text=generated_response,
                chat_id=thread_id,
                sender_type='agent',
                time_stamp=datetime.now()
            )

            # Step 4: Return the generated response
            return Response({
                'message': 'Query processed successfully.',
                'generated_response': generated_response,
                'chat_message_id': chat.chat_message_id
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'message': 'Failed to process the user query.',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class LoginAPIView(APIView):
    def post(self, request):
        # Extract credentials
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Get user by email
            user = User.objects.get(email=email)
            
            # Verify password
            if check_password(password, user.user_password):  # If passwords match
                return Response({
                    "message": "Login successful",
                    "user": {
                        "id": user.user_id,
                        "name": user.user_name,
                        "email": user.email
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid password."}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
class HistoryAPIView(APIView):
    def get(self, request, user_id):
        # Fetch history for the given user_id
        history = HistoryTitle.objects.filter(user_id=user_id).order_by('-time_stamp')
        
        if not history.exists():
            return Response({"message": "No history found for this user."}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the data
        data = [
            {
                "chat_id": record.chat_id,
                "chat_name": record.chat_name,
                "time_stamp": record.time_stamp,
                "user_id": record.user_id
            }
            for record in history
        ]
        
        return Response(data, status=status.HTTP_200_OK)
    

class SaveHistoryAPIView(APIView):
    def post(self, request, user_id):
        # Get the data from the request
        chat_name = request.data.get('chat_name')
        
        # Validate that the chat_name is provided
        if not chat_name:
            return Response({"message": "chat_name is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Create a new history record with the current timestamp
            history_record = HistoryTitle.objects.create(
                chat_name=chat_name,
                user_id=user_id,
                time_stamp=timezone.now()  # Manually set the current timestamp
            )
            
            # Return success response
            return Response({
                "message": "History record created successfully.",
                "data": {
                    "chat_id": history_record.chat_id,
                    "chat_name": history_record.chat_name,
                    "time_stamp": history_record.time_stamp,
                    "user_id": history_record.user_id
                }
            }, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"message": f"An error occurred: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
    
class ChatHistoryAPIView(APIView):
    def get(self, request, chat_id):
        # Fetch messages from the Chat table for the given Chat_ID
        chat_messages = Chat.objects.filter(chat_id=chat_id).order_by('time_stamp')
        
        if not chat_messages.exists():
            return Response({"message": "No messages found for this chat."}, status=status.HTTP_404_NOT_FOUND)
        
        # Serialize the chat messages
        serializer = ChatSerializer(chat_messages, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class SaveChatAPIView(APIView):

    def post(self, request, chat_id):
        # Get the data from the request
        chat_text = request.data.get('chat_text')
        sender_type = request.data.get('sender_type')

        # Validate that all fields are provided
        if not chat_text or not sender_type:
            return Response({"message": "chat_text and sender_type are required."}, status=status.HTTP_400_BAD_REQUEST)

        if sender_type not in ['user', 'agent']:
            return Response({"message": "sender_type must be 'user' or 'agent'."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create a new chat record
            chat_message = Chat.objects.create(
                chat_text=chat_text,
                chat_id=chat_id,
                sender_type=sender_type,
                time_stamp=timezone.now()  # Set the current timestamp
            )
            
            return Response({
                "message": "Chat message created successfully.",
                "data": {
                    "chat_text": chat_message.chat_text,
                    "chat_id": chat_message.chat_id,
                    "sender_type": chat_message.sender_type,
                    "time_stamp": chat_message.time_stamp
                }
            }, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"message": f"An error occurred: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

    
class UserDetailAPIView(APIView):
    def get(self, request, user_id):
        try:
            # Fetch user based on user_id
            user = User.objects.get(user_id=user_id)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        


class ChangePasswordAPIView(APIView):
    def post(self, request):
        # Deserialize the incoming request data
        serializer = PasswordChangeSerializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']

            try:
                # Fetch the user based on the provided email
                user = User.objects.get(email=email)
                
                # Check if the old password matches
                if not user.check_password(old_password):
                    return Response({"message": "Old password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)
                
                # Set and save the new password
                user.set_password(new_password)
                user.save()

                return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
            
            except User.DoesNotExist:
                return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UpdateUsernameAPIView(APIView):
    def post(self, request, user_id):
        try:
            # Fetch user based on user_id
            user = User.objects.get(user_id=user_id)
            
            # Get new_username from request data
            new_username = request.data.get("new_username")
            if not new_username:
                return Response(
                    {"message": "New username is required."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Update and save the new username
            user.user_name = new_username
            user.save()
            
            return Response(
                {"message": "Username updated successfully."},
                status=status.HTTP_200_OK
            )
        
        except User.DoesNotExist:
            return Response(
                {"message": "User not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        
class UpdateEmailAPIView(APIView):
    def post(self, request, user_id):
        try:
            # Fetch user based on user_id
            user = User.objects.get(user_id=user_id)
            
            # Get new_email from request data
            new_email = request.data.get("new_email")
            if not new_email:
                return Response(
                    {"message": "New email is required."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Update and save the new email
            user.email = new_email
            user.save()
            
            return Response(
                {"message": "Email updated successfully."},
                status=status.HTTP_200_OK
            )
        
        except User.DoesNotExist:
            return Response(
                {"message": "User not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        
class RequestPasswordResetAPIView(APIView):
    def post(self, request):
        # Deserialize request data
        serializer = PasswordRequestResetSerializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            try:
                user = User.objects.get(email=email)
                
                # Generate a 5-digit reset token
                reset_token = get_random_string(length=5, allowed_chars='0123456789')
                
                # Save the token in the user's model (assuming you added reset_token field in the User model)
                user.reset_token = reset_token
                user.save()
                
                # Send email with reset token
                send_mail(
                    'Password Reset Request',
                    f'Your password reset token is: {reset_token}',
                    'nermien.elassy@gmail.com',  # Replace with your "from" email
                    [email],
                    fail_silently=False,
                )

                return Response({"message": "Password reset token sent successfully."}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"message": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class ResetPasswordAPIView(APIView):
#     def post(self, request):
#         serializer = PasswordResetSerializer(data=request.data)
        
#         if serializer.is_valid():
#             email = serializer.validated_data['email']
#             reset_token = serializer.validated_data['reset_token']
#             new_password = serializer.validated_data['new_password']
            
#             try:
#                 user = User.objects.get(email=email)
                
#                 # Check if the token matches
#                 if user.reset_token != reset_token:
#                     return Response({"message": "Invalid reset token."}, status=status.HTTP_400_BAD_REQUEST)
                
#                 # Update the password
#                 user.user_password = new_password  # Hash the password in a real implementation
#                 user.reset_token = None  # Clear the reset token
#                 user.save()

#                 return Response({"message": "Password reset successfully."}, status=status.HTTP_200_OK)
#             except User.DoesNotExist:
#                 return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CheckResetTokenAPIView(APIView):
    def post(self, request):
        serializer = TokenCheckSerializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            reset_token = serializer.validated_data['reset_token']

            
            try:
                user = User.objects.get(email=email)
                
                # Check if the token matches
                if user.reset_token != reset_token:
                    return Response({"message": "Invalid reset token."}, status=status.HTTP_400_BAD_REQUEST)
                
                return Response({"message": "Valid reset token."}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class ResetPasswordAPIView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            new_password = serializer.validated_data['new_password']
            
            try:
                user = User.objects.get(email=email)     
                # Update the password securely using set_password
                user.set_password(new_password)  # Hash the password before saving
                user.reset_token = None  # Clear the reset token
                user.save()

                return Response({"message": "Password reset successfully."}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




