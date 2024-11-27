// // import CustomAppBar from "../helpers/AppBar";
// // import {
// //   SafeAreaView,
// //   KeyboardAvoidingView,
// //   TouchableWithoutFeedback,
// //   Keyboard,
// //   Platform,
// //   ScrollView,
// //   Text,
// //   TouchableOpacity,
// //   View,
// //   Image,
// // } from "react-native";
// // import { TextInput } from "react-native-paper";
// // import { MaterialCommunityIcons } from "@expo/vector-icons";
// // import DateTimePicker from "@react-native-community/datetimepicker";
// // import React, { useState } from "react";
// // import tw from "twrnc";

// // const Settings = ({ navigation }) => {
// //   const [date, setDate] = useState(new Date());
// //   const [showPicker, setShowPicker] = useState(false);

// //   const togglePicker = () => setShowPicker(!showPicker);

// //   return (
// //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
// //       <SafeAreaView style={tw`flex-1`}>
// //         <CustomAppBar navigation={navigation} heading={"Settings"} />
// //         <KeyboardAvoidingView
// //           behavior={Platform.OS === "ios" ? "padding" : "height"}
// //           style={tw`flex-1`}
// //           keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20} // Adjust this offset as needed
// //         >
// //           <ScrollView contentContainerStyle={tw`flex-col justify-start`}>
// //             <TouchableOpacity>
// //               <View style={tw`flex-row items-center justify-center px-5 py-3`}>
// //                 <Image
// //                   source={require("../assets/user.png")}
// //                   style={tw`w-24 h-24 rounded-full self-center mt-5`}
// //                 />
// //                 <MaterialCommunityIcons
// //                   name="camera"
// //                   size={24}
// //                   color="#1F1F7B"
// //                   style={tw`absolute bottom-2 right-35`}
// //                 />
// //               </View>
// //             </TouchableOpacity>

// //             <TextInput
// //               mode="outlined"
// //               style={tw`m-2 rounded-full`}
// //               selectionColor="#1F1F7B"
// //               cursorColor="#1F1F7B"
// //               activeOutlineColor="#1F1F7B"
// //               textColor="black"
// //               numberOfLines={1}
// //               placeholder="Name"
// //               theme={{
// //                 colors: {
// //                   background: "#FAFAFA",
// //                 },
// //                 roundness: 50,
// //               }}
// //             />
// //             <TextInput
// //               mode="outlined"
// //               style={tw`m-2 rounded-full`}
// //               selectionColor="#1F1F7B"
// //               cursorColor="#1F1F7B"
// //               activeOutlineColor="#1F1F7B"
// //               textColor="black"
// //               numberOfLines={1}
// //               placeholder="Email"
// //               theme={{
// //                 colors: {
// //                   background: "#FAFAFA",
// //                 },
// //                 roundness: 50,
// //               }}
// //             />
// //             <TextInput
// //               mode="outlined"
// //               style={tw`m-2 rounded-full`}
// //               selectionColor="#1F1F7B"
// //               cursorColor="#1F1F7B"
// //               activeOutlineColor="#1F1F7B"
// //               textColor="black"
// //               numberOfLines={1}
// //               placeholder="Phone Number"
// //               theme={{
// //                 colors: {
// //                   background: "#FAFAFA",
// //                 },
// //                 roundness: 50,
// //               }}
// //             />
// //             <TextInput
// //               mode="outlined"
// //               secureTextEntry={true}
// //               style={tw`m-2 rounded-full`}
// //               selectionColor="#1F1F7B"
// //               cursorColor="#1F1F7B"
// //               activeOutlineColor="#1F1F7B"
// //               textColor="black"
// //               numberOfLines={1}
// //               placeholder="Old Password"
// //               theme={{
// //                 colors: {
// //                   background: "#FAFAFA",
// //                 },
// //                 roundness: 50,
// //               }}
// //             />
// //             <TextInput
// //               mode="outlined"
// //               secureTextEntry={true}
// //               style={tw`m-2 rounded-full`}
// //               selectionColor="#1F1F7B"
// //               cursorColor="#1F1F7B"
// //               activeOutlineColor="#1F1F7B"
// //               textColor="black"
// //               numberOfLines={1}
// //               placeholder="New Password"
// //               theme={{
// //                 colors: {
// //                   background: "#FAFAFA",
// //                 },
// //                 roundness: 50,
// //               }}
// //             />

// //             <TextInput
// //               mode="outlined"
// //               style={tw`m-2 rounded-full`}
// //               selectionColor="#1F1F7B"
// //               cursorColor="#1F1F7B"
// //               activeOutlineColor="#1F1F7B"
// //               textColor="black"
// //               numberOfLines={1}
// //               placeholder="Date of Birth"
// //               value={date.toDateString()}
// //               onPressIn={() => togglePicker()}
// //               editable={false}
// //               theme={{
// //                 colors: {
// //                   background: "#FAFAFA",
// //                 },
// //                 roundness: 50,
// //               }}
// //             />

// //             {showPicker && (
// //               <DateTimePicker
// //                 mode="date"
// //                 display="spinner"
// //                 value={date}
// //                 onChange={(event, selectedDate) => {
// //                   const currentDate = selectedDate || date;
// //                   setShowPicker(Platform.OS === "ios");
// //                   setDate(currentDate);
// //                 }}
// //               />
// //             )}

// //             <View style={tw`flex items-center justify-center`}>
// //               <TouchableOpacity
// //                 style={[
// //                   tw`m-2 rounded-full py-3 px-5`,
// //                   { backgroundColor: "#1F1F7B" },
// //                 ]}
// //               >
// //                 <Text style={tw`text-white text-2xl`}>Save Changes</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </ScrollView>
// //         </KeyboardAvoidingView>
// //       </SafeAreaView>
// //     </TouchableWithoutFeedback>
// //   );
// // };

// // export default Settings;
// // import CustomAppBar from "../helpers/AppBar";
// // import {
// //   SafeAreaView,
// //   KeyboardAvoidingView,
// //   TouchableWithoutFeedback,
// //   Keyboard,
// //   Platform,
// //   ScrollView,
// //   Text,
// //   TouchableOpacity,
// //   View,
// //   Image,
// // } from "react-native";
// // import { TextInput } from "react-native-paper";
// // import { MaterialCommunityIcons } from "@expo/vector-icons";
// // import DateTimePicker from "@react-native-community/datetimepicker";
// // import React, { useState } from "react";
// // import tw from "twrnc";

// // const Settings = ({ navigation }) => {
// //   const [date, setDate] = useState(new Date());
// //   const [showPicker, setShowPicker] = useState(false);

// //   const togglePicker = () => setShowPicker(!showPicker);

// //   return (
// //     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
// //       <SafeAreaView style={tw`flex-1`}>
// //         <CustomAppBar navigation={navigation} heading={"Settings"} />
// //         <KeyboardAvoidingView
// //           behavior={Platform.OS === "ios" ? "padding" : "height"}
// //           style={tw`flex-1`}
// //           keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20} // Adjust this offset as needed
// //         >
// //           <ScrollView contentContainerStyle={tw`flex-col justify-start`}>
// //             <TouchableOpacity>
// //               <View style={tw`flex-row items-center justify-center px-5 py-3`}>
// //                 <Image
// //                   source={require("../assets/user.png")}
// //                   style={tw`w-24 h-24 rounded-full self-center mt-5`}
// //                 />
// //                 <MaterialCommunityIcons
// //                   name="camera"
// //                   size={24}
// //                   color="#1F1F7B"
// //                   style={tw`absolute bottom-2 right-35`}
// //                 />
// //               </View>
// //             </TouchableOpacity>

// //             <View style={tw`m-2`}>
// //               <Text style={tw`mb-1 ml-4 text-black`}>Name</Text>
// //               <TextInput
// //                 mode="outlined"
// //                 style={tw`rounded-full`}
// //                 selectionColor="#1F1F7B"
// //                 cursorColor="#1F1F7B"
// //                 activeOutlineColor="#1F1F7B"
// //                 textColor="black"
// //                 numberOfLines={1}
// //                 placeholder="Name"
// //                 theme={{
// //                   colors: {
// //                     background: "#FAFAFA",
// //                   },
// //                   roundness: 50,
// //                 }}
// //               />
// //             </View>

// //             <View style={tw`m-2`}>
// //               <Text style={tw`mb-1 ml-4 text-black`}>Email</Text>
// //               <TextInput
// //                 mode="outlined"
// //                 style={tw`rounded-full`}
// //                 selectionColor="#1F1F7B"
// //                 cursorColor="#1F1F7B"
// //                 activeOutlineColor="#1F1F7B"
// //                 textColor="black"
// //                 numberOfLines={1}
// //                 placeholder="Email"
// //                 theme={{
// //                   colors: {
// //                     background: "#FAFAFA",
// //                   },
// //                   roundness: 50,
// //                 }}
// //               />
// //             </View>

// //             <View style={tw`m-2`}>
// //               <Text style={tw`mb-1 ml-4 text-black`}>Phone Number</Text>
// //               <TextInput
// //                 mode="outlined"
// //                 style={tw`rounded-full`}
// //                 selectionColor="#1F1F7B"
// //                 cursorColor="#1F1F7B"
// //                 activeOutlineColor="#1F1F7B"
// //                 textColor="black"
// //                 numberOfLines={1}
// //                 placeholder="Phone Number"
// //                 theme={{
// //                   colors: {
// //                     background: "#FAFAFA",
// //                   },
// //                   roundness: 50,
// //                 }}
// //               />
// //             </View>

// //             <View style={tw`m-2`}>
// //               <Text style={tw`mb-1 ml-4 text-black`}>Old Password</Text>
// //               <TextInput
// //                 mode="outlined"
// //                 secureTextEntry={true}
// //                 style={tw`rounded-full`}
// //                 selectionColor="#1F1F7B"
// //                 cursorColor="#1F1F7B"
// //                 activeOutlineColor="#1F1F7B"
// //                 textColor="black"
// //                 numberOfLines={1}
// //                 placeholder="Old Password"
// //                 theme={{
// //                   colors: {
// //                     background: "#FAFAFA",
// //                   },
// //                   roundness: 50,
// //                 }}
// //               />
// //             </View>

// //             <View style={tw`m-2`}>
// //               <Text style={tw`mb-1 ml-4 text-black`}>New Password</Text>
// //               <TextInput
// //                 mode="outlined"
// //                 secureTextEntry={true}
// //                 style={tw`rounded-full`}
// //                 selectionColor="#1F1F7B"
// //                 cursorColor="#1F1F7B"
// //                 activeOutlineColor="#1F1F7B"
// //                 textColor="black"
// //                 numberOfLines={1}
// //                 placeholder="New Password"
// //                 theme={{
// //                   colors: {
// //                     background: "#FAFAFA",
// //                   },
// //                   roundness: 50,
// //                 }}
// //               />
// //             </View>

// //             <View style={tw`m-2`}>
// //               <Text style={tw`mb-1 ml-4 text-black`}>Date of Birth</Text>
// //               <TextInput
// //                 mode="outlined"
// //                 style={tw`rounded-full`}
// //                 selectionColor="#1F1F7B"
// //                 cursorColor="#1F1F7B"
// //                 activeOutlineColor="#1F1F7B"
// //                 textColor="black"
// //                 numberOfLines={1}
// //                 placeholder="Date of Birth"
// //                 value={date.toDateString()}
// //                 onPressIn={() => togglePicker()}
// //                 editable={false}
// //                 theme={{
// //                   colors: {
// //                     background: "#FAFAFA",
// //                   },
// //                   roundness: 50,
// //                 }}
// //               />
// //             </View>

// //             {showPicker && (
// //               <DateTimePicker
// //                 mode="date"
// //                 display="spinner"
// //                 value={date}
// //                 onChange={(event, selectedDate) => {
// //                   const currentDate = selectedDate || date;
// //                   setShowPicker(Platform.OS === "ios");
// //                   setDate(currentDate);
// //                 }}
// //               />
// //             )}

// //             <View style={tw`flex items-center justify-center`}>
// //               <TouchableOpacity
// //                 style={[
// //                   tw`m-2 rounded-full py-3 px-5`,
// //                   { backgroundColor: "#1F1F7B" },
// //                 ]}
// //               >
// //                 <Text style={tw`text-white text-2xl`}>Save Changes</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </ScrollView>
// //         </KeyboardAvoidingView>
// //       </SafeAreaView>
// //     </TouchableWithoutFeedback>
// //   );
// // };

// // export default Settings;
// import CustomAppBar from "../helpers/AppBar";
// import {
//   SafeAreaView,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
//   Keyboard,
//   Platform,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
// } from "react-native";
// import { TextInput } from "react-native-paper";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import React, { useState } from "react";
// import tw from "twrnc";

// const Settings = ({ navigation, route }) => {
//   const { user_id } = route.params;
//   console.log("Settings User Id: ", user_id);
//   // const [date, setDate] = useState(new Date());
//   // const [showPicker, setShowPicker] = useState(false);

//   // State variables for each input field
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   // const [phone, setPhone] = useState("");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   // const [country, setCountry] = useState("");

//   // const togglePicker = () => setShowPicker(!showPicker);

//   useEffect(() => {
//     // Fetch user details when the page loads
//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/api/user/details/${user_id}`);
//         const data = await response.json();

//         if (response.ok) {
//           setName(data.user_name);
//           setEmail(data.email);
//         } else {
//           alert(data.message || "Failed to load user details.");
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//         alert("Unable to fetch user details. Please try again later.");
//       }
//     };

//     fetchUserDetails();
//   }, [user_id]);

//   const handlePasswordChange = async () => {
//     if (!oldPassword || !newPassword) {
//       alert("Both old and new passwords are required.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8000/api/user/change-password/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           old_password: oldPassword,
//           new_password: newPassword,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Password changed successfully.");
//         setOldPassword("");
//         setNewPassword("");
//       } else {
//         alert(data.message || "Failed to change password.");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       alert("Unable to reach the server. Please try again later.");
//     }
//   };

//   const handleNameChange = async () => {
//     if (!name.trim()) {
//       alert("Name cannot be empty.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8000/api/user/change-name/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user_id,
//           new_name: name.trim(),
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Name updated successfully.");
//       } else {
//         alert(data.message || "Failed to update name.");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       alert("Unable to reach the server. Please try again later.");
//     }
//   };

//   const handleEmailChange = async () => {
//     if (!email.trim()) {
//       alert("Email cannot be empty.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:8000/api/user/change-email/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user_id,
//           new_email: email.trim(),
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Email updated successfully.");
//       } else {
//         alert(data.message || "Failed to update email.");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       alert("Unable to reach the server. Please try again later.");
//     }
//   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <SafeAreaView style={tw`flex-1`}>
//         <CustomAppBar navigation={navigation} heading={"Settings"} user_id={user_id} />
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={tw`flex-1`}
//           keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust this offset as needed
//         >
//           <ScrollView contentContainerStyle={tw`flex-col justify-start`}>
//             {/* <TouchableOpacity> */}
//             <View style={tw`flex-row items-center justify-center px-5 py-3`}>
//               <Image
//                 source={require("../assets/user.png")}
//                 style={tw`w-24 h-24 rounded-full self-center mt-5`}
//               />
//               {/* <MaterialCommunityIcons
//                   name="camera"
//                   size={24}
//                   color="#1F1F7B"
//                   style={tw`absolute bottom-2 right-35`}
//                 /> */}
//             </View>
//             {/* </TouchableOpacity> */}

//             <View style={tw`m-2`}>
//               <Text style={tw`mb-1 ml-4 text-black`}>Name</Text>
//               <TextInput
//                 mode="outlined"
//                 style={tw`rounded-full`}
//                 selectionColor="#1F1F7B"
//                 cursorColor="#1F1F7B"
//                 activeOutlineColor="#1F1F7B"
//                 textColor="black"
//                 value={name}
//                 onChangeText={setName} // Update name state
//                 placeholder="Name"
//                 theme={{
//                   colors: {
//                     background: "#FAFAFA",
//                   },
//                   roundness: 50,
//                 }}
//               />
//             </View>

//             <View style={tw`m-2`}>
//               <Text style={tw`mb-1 ml-4 text-black`}>Email</Text>
//               <TextInput
//                 mode="outlined"
//                 style={tw`rounded-full`}
//                 selectionColor="#1F1F7B"
//                 cursorColor="#1F1F7B"
//                 activeOutlineColor="#1F1F7B"
//                 textColor="black"
//                 value={email}
//                 onChangeText={setEmail} // Update email state
//                 placeholder="Email"
//                 theme={{
//                   colors: {
//                     background: "#FAFAFA",
//                   },
//                   roundness: 50,
//                 }}
//               />
//             </View>

//             {/* <View style={tw`m-2`}>
//               <Text style={tw`mb-1 ml-4 text-black`}>Phone Number</Text>
//               <TextInput
//                 mode="outlined"
//                 style={tw`rounded-full`}
//                 selectionColor="#1F1F7B"
//                 cursorColor="#1F1F7B"
//                 activeOutlineColor="#1F1F7B"
//                 textColor="black"
//                 value={phone}
//                 onChangeText={setPhone} // Update phone state
//                 placeholder="Phone Number"
//                 theme={{
//                   colors: {
//                     background: "#FAFAFA",
//                   },
//                   roundness: 50,
//                 }}
//               />
//             </View> */}

//             <View style={tw`m-2`}>
//               <Text style={tw`mb-1 ml-4 text-black`}>Old Password</Text>
//               <TextInput
//                 mode="outlined"
//                 secureTextEntry={true}
//                 style={tw`rounded-full`}
//                 selectionColor="#1F1F7B"
//                 cursorColor="#1F1F7B"
//                 activeOutlineColor="#1F1F7B"
//                 textColor="black"
//                 value={oldPassword}
//                 onChangeText={setOldPassword} // Update oldPassword state
//                 placeholder="Old Password"
//                 theme={{
//                   colors: {
//                     background: "#FAFAFA",
//                   },
//                   roundness: 50,
//                 }}
//               />
//             </View>

//             <View style={tw`m-2`}>
//               <Text style={tw`mb-1 ml-4 text-black`}>New Password</Text>
//               <TextInput
//                 mode="outlined"
//                 secureTextEntry={true}
//                 style={tw`rounded-full`}
//                 selectionColor="#1F1F7B"
//                 cursorColor="#1F1F7B"
//                 activeOutlineColor="#1F1F7B"
//                 textColor="black"
//                 value={newPassword}
//                 onChangeText={setNewPassword} // Update newPassword state
//                 placeholder="New Password"
//                 theme={{
//                   colors: {
//                     background: "#FAFAFA",
//                   },
//                   roundness: 50,
//                 }}
//               />
//             </View>

//             {/* <View style={tw`m-2`}>
//               <Text style={tw`mb-1 ml-4 text-black`}>Date of Birth</Text>
//               <TextInput
//                 mode="outlined"
//                 style={tw`rounded-full`}
//                 selectionColor="#1F1F7B"
//                 cursorColor="#1F1F7B"
//                 activeOutlineColor="#1F1F7B"
//                 textColor="black"
//                 value={date.toDateString()}
//                 onPressIn={() => togglePicker()}
//                 editable={false}
//                 theme={{
//                   colors: {
//                     background: "#FAFAFA",
//                   },
//                   roundness: 50,
//                 }}
//               />
//             </View> */}

//             {/* {showPicker && (
//               <DateTimePicker
//                 mode="date"
//                 display="spinner"
//                 value={date}
//                 onChange={(event, selectedDate) => {
//                   const currentDate = selectedDate || date;
//                   setShowPicker(Platform.OS === "ios");
//                   setDate(currentDate);
//                 }}
//               />
//             )} */}

//             <View style={tw`flex items-center justify-center`}>
//               <TouchableOpacity
//                 style={[
//                   tw`m-10 rounded-full py-3 px-5`,
//                   { backgroundColor: "#1F1F7B" },
//                 ]}
//               >
//                 <Text style={tw`text-white text-2xl`}>Save Changes</Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

// export default Settings;
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import tw from "twrnc";
import CustomAppBar from "../helpers/AppBar";

const Settings = ({ navigation, route }) => {
  const { user_id } = route.params;

  // State variables for each input field
  const [initialName, setInitialName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://10.7.16.78:8000/api/user/details/${user_id}`
        );
        const data = await response.json();

        if (response.ok) {
          setInitialName(data.user_name);
          setInitialEmail(data.email);
          setName(data.user_name);
          setEmail(data.email);
        } else {
          alert("Failed to fetch user details.");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Unable to fetch user details. Please try again later.");
      }
    };

    fetchUserDetails();
  }, [user_id]);

  const handleSaveChanges = async () => {
    try {
      // Check if the name has been changed
      if (name !== initialName) {
        const response = await fetch(
          `http://10.7.16.78:8000/api/update-name/${user_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_name: name.trim(),
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          alert(data.message || "Failed to update name.");
          return;
        }
      }

      // Check if the email has been changed
      if (email !== initialEmail) {
        const response = await fetch(
          `http://10.7.16.78:8000/api/update-email/${user_id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.trim(),
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          alert(data.message || "Failed to update email.");
          return;
        }
      }

      // Check if the password has been changed
      if (oldPassword && newPassword) {
        const response = await fetch(
          "http://10.7.16.78:8000/api/user/change-password/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: initialEmail.trim(), // Use the original email
              old_password: oldPassword,
              new_password: newPassword,
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          alert(data.message || "Failed to change password.");
          return;
        }
      }

      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Unable to save changes. Please try again later.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={tw`flex-1`}>
        <CustomAppBar navigation={navigation} heading={"Settings"} user_id={user_id} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw`flex-1`}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <ScrollView contentContainerStyle={tw`flex-col justify-start`}>
            <View style={tw`flex-row items-center justify-center px-5 py-3`}>
              <Image
                source={require("../assets/user.png")}
                style={tw`w-24 h-24 rounded-full self-center mt-5`}
              />
            </View>

            {/* Name Field */}
            <View style={tw`m-2`}>
              <Text style={tw`mb-1 ml-4 text-black`}>Name</Text>
              <TextInput
                mode="outlined"
                style={tw`rounded-full`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={name}
                onChangeText={setName}
                placeholder="Name"
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View>

            {/* Email Field */}
            <View style={tw`m-2`}>
              <Text style={tw`mb-1 ml-4 text-black`}>Email</Text>
              <TextInput
                mode="outlined"
                style={tw`rounded-full`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View>

            {/* Old Password */}
            <View style={tw`m-2`}>
              <Text style={tw`mb-1 ml-4 text-black`}>Old Password</Text>
              <TextInput
                mode="outlined"
                secureTextEntry={true}
                style={tw`rounded-full`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={oldPassword}
                onChangeText={setOldPassword}
                placeholder="Old Password"
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View>

            {/* New Password */}
            <View style={tw`m-2`}>
              <Text style={tw`mb-1 ml-4 text-black`}>New Password</Text>
              <TextInput
                mode="outlined"
                secureTextEntry={true}
                style={tw`rounded-full`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="New Password"
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View>

            <View style={tw`flex items-center justify-center`}>
              <TouchableOpacity
                onPress={handleSaveChanges}
                style={[tw`m-10 rounded-full py-3 px-5`, { backgroundColor: "#1F1F7B" }]}
              >
                <Text style={tw`text-white text-2xl`}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Settings;
