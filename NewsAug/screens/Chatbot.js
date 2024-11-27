import React, { useState } from "react";
import {
  View,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import tw from "twrnc";
import CustomAppBar from "../helpers/AppBar";
import SenderMessage from "../helpers/SenderMessage";
import AIMessage from "../helpers/AIMessage";

const Chatbot = ({ navigation , route }) => {
  const { user_id } = route.params;
  console.log("Chatbot User Id: ", user_id);
  const [messages, setMessages] = useState([]);
  const [newsQuery, setNewsQuery] = useState("");

  const sendQuery = async () => {
    if (newsQuery.trim() !== "") {
      const userMessage = {
        id: Date.now().toString(),
        message: newsQuery,
        sender: "user",
      };

      // Immediately update the state with the user message
      setMessages((prevMessages) => [userMessage, ...prevMessages]);

      // Clear the input field after sending the message
      setNewsQuery("");

      try {
        // Make the API call
        const response = await fetch("http://10.40.36.84:8000/myapp/query/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: newsQuery }),
        });

        // Parse the response as JSON
        const data = await response.json();

        // Extract the AI response from the data
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          message: data.response,
          sender: "ai",
        };

        // Add the AI response to the chat messages
        setMessages((prevMessages) => [aiMessage, ...prevMessages]);
      } catch (error) {
        console.error("Fetch error:", error);
        // Handle errors (e.g., network issues)
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          message: "Unable to reach the server. Please try again later.",
          sender: "ai",
        };
        setMessages((prevMessages) => [errorMessage, ...prevMessages]);
      }
    }
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <CustomAppBar navigation={navigation} heading={"NewsMaven"} user_id={user_id} />
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
            renderItem={({ item }) => {
              return item.sender === "user" ? (
                <SenderMessage message={item.message} />
              ) : (
                <AIMessage message={item.message} />
              );
            }}
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
            numberOfLines={3}
            placeholder="Ask me anything..."
            theme={{
              colors: {
                background: "#FAFAFA",
              },
              roundness: 50,
            }}
            value={newsQuery}
            onChangeText={(text) => setNewsQuery(text)}
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

export default Chatbot;

// import React, { useState } from "react";
// import {
//   View,
//   Platform,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { TextInput } from "react-native-paper";
// import tw from "twrnc";
// import CustomAppBar from "../helpers/AppBar";
// import SenderMessage from "../helpers/SenderMessage";
// import AIMessage from "../helpers/AIMessage";

// const Chatbot = ({ navigation }) => {
//   const [messages, setMessages] = useState([]);
//   const [newsQuery, setNewsQuery] = useState("");

//   const sendQuery = () => {
//     if (newsQuery.trim() !== "") {
//       const userMessage = {
//         id: Date.now().toString(),
//         message: newsQuery,
//         sender: "user",
//       };
//       const aiResponse =
//         "Franz Stolz is an Austrian professional footballer who plays as a goalkeeper for Serie A club Genoa C.F.C."; // Placeholder AI response
//       const aiMessage = {
//         id: (Date.now() + 1).toString(),
//         message: aiResponse,
//         sender: "ai",
//       };

//       const newMessages = [aiMessage, userMessage, ...messages]; // Concatenate both user and AI messages with existing messages
//       setMessages(newMessages);
//       setNewsQuery(""); // Clear the input field after sending message
//     }
//   };

//   return (
//     <SafeAreaView style={tw`flex-1`}>
//       <CustomAppBar navigation={navigation} heading={"NewsMaven"} />
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
//             renderItem={({ item }) => {
//               // Render SenderMessage for user messages and AIMessage for AI messages
//               return item.sender === "user" ? (
//                 <SenderMessage message={item.message} />
//               ) : (
//                 <AIMessage message={item.message} />
//               );
//             }}
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
//             numberOfLines={3}
//             placeholder="Ask me anything..."
//             theme={{
//               colors: {
//                 background: "#FAFAFA", // Set the background color of the input to white
//               },
//               roundness: 50,
//             }}
//             value={newsQuery}
//             onChangeText={(text) => setNewsQuery(text)}
//           />
//           {/* <Button
//             icon="send"
//             mode="contained"
//             buttonColor="#1F1F7B"
//             contentStyle={[tw`h-15 w-20`]}
//             style={[tw`rounded-full`, { height: 58, width: 58 }]}
//             onPress={sendQuery}
//           ></Button> */}
//           <TouchableOpacity
//             style={{
//               backgroundColor: "#1F1F7B",
//               borderRadius: 29, // half of the height for rounded corners
//               width: 58,
//               height: 58,
//               justifyContent: "center", // center the content vertically
//               alignItems: "center", // center the content horizontally
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

// export default Chatbot;
