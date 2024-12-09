from django.urls import path
from . import views
from .views import LoginAPIView
from .views import HistoryAPIView
from .views import ChatHistoryAPIView
from .views import UserDetailAPIView
from .views import ChangePasswordAPIView
from .views import UpdateUsernameAPIView
from .views import UpdateEmailAPIView
from .views import RequestPasswordResetAPIView
from .views import ResetPasswordAPIView
from .views import CheckResetTokenAPIView
from .views import SaveHistoryAPIView
from .views import SaveChatAPIView
#from .views import save_generated_response
#from .views import process_user_query


urlpatterns = [
   path('signup/', views.signup, name='signup'),
   path('login/', LoginAPIView.as_view(), name='login'),
   path('history/<int:user_id>/', HistoryAPIView.as_view(), name='history'),
   path('chat/history/<int:chat_id>/', ChatHistoryAPIView.as_view(), name='chat-history'),
   path('user/details/<int:user_id>/', UserDetailAPIView.as_view(), name='user-details'),
   path('user/change-password/', ChangePasswordAPIView.as_view(), name='change-password'),
   path('update-username/<int:user_id>/',UpdateUsernameAPIView.as_view(), name='update_username'),
   path('update-email/<int:user_id>/', UpdateEmailAPIView.as_view(), name='update_email'),
   path('request-password-reset/', RequestPasswordResetAPIView.as_view(), name='request_password_reset'),
   path('reset-password/', ResetPasswordAPIView.as_view(), name='reset_password'),
   path('check-reset-token/', CheckResetTokenAPIView.as_view(), name='check_reset_token'),
   path('history-save/<int:user_id>/', SaveHistoryAPIView.as_view(), name='history_post'),
   path('chat-history-save/<int:chat_id>/', SaveChatAPIView.as_view(), name='chat_history_save'),
   path('process-query/', views.process_user_query, name='process_query'),
]
