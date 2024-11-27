// import React, { useState, useEffect } from "react";
// import {
//   View,
//   SafeAreaView,
//   FlatList,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   TouchableOpacity,
//   Platform,
// } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { TextInput } from "react-native-paper";
// import tw from "twrnc";
// import CustomAppBar from "../helpers/AppBar";
// import SenderMessage from "../helpers/SenderMessage";
// import AIMessage from "../helpers/AIMessage";

// const HistChat = ({ navigation, route }) => {
//   const { chat_id, user_id } = route.params; // Retrieve chat_id from navigation params
//   console.log("Hist Chat User Id: ", user_id);
//   console.log("Chat id:", chat_id);
//   const [messages, setMessages] = useState([]);
//   const [newsQuery, setNewsQuery] = useState("");

//   useEffect(() => {
//     // Fetch chat history when the component mounts
//     //     const fetchChatHistory = async () => {
//     //       try {
//     //         const response = await fetch(
//     //           `http://10.40.36.84:8000/myapp/chat-history/${chat_id}/`
//     //         ); // Replace with your endpoint
//     //         const data = await response.json();

//     //         // Assuming API returns a list of messages with sender and text
//     //         const formattedMessages = data.messages.map((msg) => ({
//     //           id: msg.id.toString(),
//     //           message: msg.text,
//     //           sender: msg.sender, // "user" or "agent"
//     //         }));

//     //         setMessages(formattedMessages.reverse()); // Reverse for FlatList to show newest at the bottom
//     //       } catch (error) {
//     //         console.error("Error fetching chat history:", error);
//     //       }
//     //     };

//     //     fetchChatHistory();
//     //   }, [chat_id]);
//     // const dummyData = [
//     //   {
//     //     id: "1",
//     //     message: "Hello! How can I assist you today?",
//     //     sender: "agent",
//     //   },
//     //   { id: "2", message: "I have a question about my order.", sender: "user" },
//     //   {
//     //     id: "3",
//     //     message: "Sure! Please let me know the details.",
//     //     sender: "agent",
//     //   },
//     //   { id: "4", message: "I didn’t receive my package.", sender: "user" },
//     // ];

//     setMessages(dummyData.reverse()); // Reverse for FlatList to show newest at the bottom
//   }, [chat_id]);

//   const sendQuery = async () => {
//     if (newsQuery.trim() !== "") {
//       const userMessage = {
//         id: Date.now().toString(),
//         message: newsQuery,
//         sender: "user",
//       };

//       // Update state with user message
//       setMessages((prevMessages) => [userMessage, ...prevMessages]);

//       setNewsQuery("");

//       try {
//         const response = await fetch("http://10.40.36.84:8000/myapp/query/", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ query: newsQuery }),
//         });

//         const data = await response.json();

//         const aiMessage = {
//           id: (Date.now() + 1).toString(),
//           message: data.response,
//           sender: "agent", // AI messages are from "agent"
//         };

//         setMessages((prevMessages) => [aiMessage, ...prevMessages]);
//       } catch (error) {
//         console.error("Error sending query:", error);
//         const errorMessage = {
//           id: (Date.now() + 1).toString(),
//           message: "Unable to reach the server. Please try again later.",
//           sender: "agent",
//         };
//         setMessages((prevMessages) => [errorMessage, ...prevMessages]);
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={tw`flex-1`}>
//       <CustomAppBar navigation={navigation} heading={"Chat History"} user_id={user_id} />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={tw`flex-1`}
//         keyboardVerticalOffset={10}
//       >
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//           <FlatList
//             data={messages}
//             inverted
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) =>
//               item.sender === "user" ? (
//                 <SenderMessage message={item.message} />
//               ) : (
//                 <AIMessage message={item.message} />
//               )
//             }
//             contentContainerStyle={tw`px-4 pb-4`}
//           />
//         </TouchableWithoutFeedback>
//         <View
//           style={tw`flex-row justify-between items-center border-t border-gray-200 px-5 py-2`}
//         >
//           <TextInput
//             mode="outlined"
//             style={tw`flex-1 mr-2 rounded-full`}
//             selectionColor="#1F1F7B"
//             cursorColor="#1F1F7B"
//             activeOutlineColor="#1F1F7B"
//             textColor="black"
//             placeholder="Ask me anything..."
//             value={newsQuery}
//             onChangeText={setNewsQuery}
//             theme={{
//               colors: {
//                 background: "#FAFAFA",
//               },
//               roundness: 50,
//             }}
//           />
//           <TouchableOpacity
//             style={{
//               backgroundColor: "#1F1F7B",
//               borderRadius: 29,
//               width: 58,
//               height: 58,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             onPress={sendQuery}
//           >
//             <MaterialCommunityIcons name="send" size={24} color="white" />
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default HistChat;
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import tw from "twrnc";
import CustomAppBar from "../helpers/AppBar";
import SenderMessage from "../helpers/SenderMessage";
import AIMessage from "../helpers/AIMessage";

const HistChat = ({ navigation, route }) => {
  const { chat_id, user_id } = route.params; // Retrieve chat_id from navigation params
  console.log("Hist Chat User Id: ", user_id);
  console.log("Chat id:", chat_id);
  const [messages, setMessages] = useState([]);
  const [newsQuery, setNewsQuery] = useState("");

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          `http://10.7.16.78:8000/api/chat/history/${chat_id}`
        ); // Fetch chat history for the specific chat_id
        const data = await response.json();

        // Assuming the API returns the messages in an array
        const formattedMessages = data.map((msg) => ({
          id: msg.chat_message_id.toString(),
          message: msg.chat_text,
          sender: msg.sender_type === "agent" ? "agent" : "user", // Determine sender type
        }));

        setMessages(formattedMessages.reverse()); // Reverse for FlatList to show the newest at the bottom
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [chat_id]);

  const sendQuery = async () => {
    if (newsQuery.trim() !== "") {
      const userMessage = {
        id: Date.now().toString(),
        message: newsQuery,
        sender: "user",
      };

      // Update state with user message
      setMessages((prevMessages) => [userMessage, ...prevMessages]);

      setNewsQuery("");

      try {
        const response = await fetch("http://10.40.36.84:8000/myapp/query/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: newsQuery }),
        });

        const data = await response.json();

        const aiMessage = {
          id: (Date.now() + 1).toString(),
          message: data.response,
          sender: "agent", // AI messages are from "agent"
        };

        setMessages((prevMessages) => [aiMessage, ...prevMessages]);
      } catch (error) {
        console.error("Error sending query:", error);
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          message: "Unable to reach the server. Please try again later.",
          sender: "agent",
        };
        setMessages((prevMessages) => [errorMessage, ...prevMessages]);
      }
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <CustomAppBar navigation={navigation} heading={"Chat History"} user_id={user_id} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              item.sender === "user" ? (
                <SenderMessage message={item.message} />
              ) : (
                <AIMessage message={item.message} />
              )
            }
            contentContainerStyle={tw`px-4 pb-4`}
          />
        </TouchableWithoutFeedback>
        <View
          style={tw`flex-row justify-between items-center border-t border-gray-200 px-5 py-2`}
        >
          <TextInput
            mode="outlined"
            style={tw`flex-1 mr-2 rounded-full`}
            selectionColor="#1F1F7B"
            cursorColor="#1F1F7B"
            activeOutlineColor="#1F1F7B"
            textColor="black"
            placeholder="Ask me anything..."
            value={newsQuery}
            onChangeText={setNewsQuery}
            theme={{
              colors: {
                background: "#FAFAFA",
              },
              roundness: 50,
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#1F1F7B",
              borderRadius: 29,
              width: 58,
              height: 58,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={sendQuery}
          >
            <MaterialCommunityIcons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HistChat;
