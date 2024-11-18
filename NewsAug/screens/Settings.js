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

// const Settings = ({ navigation }) => {
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);

//   const togglePicker = () => setShowPicker(!showPicker);

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <SafeAreaView style={tw`flex-1`}>
//         <CustomAppBar navigation={navigation} heading={"Settings"} />
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={tw`flex-1`}
//           keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20} // Adjust this offset as needed
//         >
//           <ScrollView contentContainerStyle={tw`flex-col justify-start`}>
//             <TouchableOpacity>
//               <View style={tw`flex-row items-center justify-center px-5 py-3`}>
//                 <Image
//                   source={require("../assets/user.png")}
//                   style={tw`w-24 h-24 rounded-full self-center mt-5`}
//                 />
//                 <MaterialCommunityIcons
//                   name="camera"
//                   size={24}
//                   color="#1F1F7B"
//                   style={tw`absolute bottom-2 right-35`}
//                 />
//               </View>
//             </TouchableOpacity>

//             <TextInput
//               mode="outlined"
//               style={tw`m-2 rounded-full`}
//               selectionColor="#1F1F7B"
//               cursorColor="#1F1F7B"
//               activeOutlineColor="#1F1F7B"
//               textColor="black"
//               numberOfLines={1}
//               placeholder="Name"
//               theme={{
//                 colors: {
//                   background: "#FAFAFA",
//                 },
//                 roundness: 50,
//               }}
//             />
//             <TextInput
//               mode="outlined"
//               style={tw`m-2 rounded-full`}
//               selectionColor="#1F1F7B"
//               cursorColor="#1F1F7B"
//               activeOutlineColor="#1F1F7B"
//               textColor="black"
//               numberOfLines={1}
//               placeholder="Email"
//               theme={{
//                 colors: {
//                   background: "#FAFAFA",
//                 },
//                 roundness: 50,
//               }}
//             />
//             <TextInput
//               mode="outlined"
//               style={tw`m-2 rounded-full`}
//               selectionColor="#1F1F7B"
//               cursorColor="#1F1F7B"
//               activeOutlineColor="#1F1F7B"
//               textColor="black"
//               numberOfLines={1}
//               placeholder="Phone Number"
//               theme={{
//                 colors: {
//                   background: "#FAFAFA",
//                 },
//                 roundness: 50,
//               }}
//             />
//             <TextInput
//               mode="outlined"
//               secureTextEntry={true}
//               style={tw`m-2 rounded-full`}
//               selectionColor="#1F1F7B"
//               cursorColor="#1F1F7B"
//               activeOutlineColor="#1F1F7B"
//               textColor="black"
//               numberOfLines={1}
//               placeholder="Old Password"
//               theme={{
//                 colors: {
//                   background: "#FAFAFA",
//                 },
//                 roundness: 50,
//               }}
//             />
//             <TextInput
//               mode="outlined"
//               secureTextEntry={true}
//               style={tw`m-2 rounded-full`}
//               selectionColor="#1F1F7B"
//               cursorColor="#1F1F7B"
//               activeOutlineColor="#1F1F7B"
//               textColor="black"
//               numberOfLines={1}
//               placeholder="New Password"
//               theme={{
//                 colors: {
//                   background: "#FAFAFA",
//                 },
//                 roundness: 50,
//               }}
//             />

//             <TextInput
//               mode="outlined"
//               style={tw`m-2 rounded-full`}
//               selectionColor="#1F1F7B"
//               cursorColor="#1F1F7B"
//               activeOutlineColor="#1F1F7B"
//               textColor="black"
//               numberOfLines={1}
//               placeholder="Date of Birth"
//               value={date.toDateString()}
//               onPressIn={() => togglePicker()}
//               editable={false}
//               theme={{
//                 colors: {
//                   background: "#FAFAFA",
//                 },
//                 roundness: 50,
//               }}
//             />

//             {showPicker && (
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
//             )}

//             <View style={tw`flex items-center justify-center`}>
//               <TouchableOpacity
//                 style={[
//                   tw`m-2 rounded-full py-3 px-5`,
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

// const Settings = ({ navigation }) => {
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);

//   const togglePicker = () => setShowPicker(!showPicker);

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <SafeAreaView style={tw`flex-1`}>
//         <CustomAppBar navigation={navigation} heading={"Settings"} />
//         <KeyboardAvoidingView
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//           style={tw`flex-1`}
//           keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 20} // Adjust this offset as needed
//         >
//           <ScrollView contentContainerStyle={tw`flex-col justify-start`}>
//             <TouchableOpacity>
//               <View style={tw`flex-row items-center justify-center px-5 py-3`}>
//                 <Image
//                   source={require("../assets/user.png")}
//                   style={tw`w-24 h-24 rounded-full self-center mt-5`}
//                 />
//                 <MaterialCommunityIcons
//                   name="camera"
//                   size={24}
//                   color="#1F1F7B"
//                   style={tw`absolute bottom-2 right-35`}
//                 />
//               </View>
//             </TouchableOpacity>

//             <View style={tw`m-2`}>
//               <Text style={tw`mb-1 ml-4 text-black`}>Name</Text>
//               <TextInput
//                 mode="outlined"
//                 style={tw`rounded-full`}
//                 selectionColor="#1F1F7B"
//                 cursorColor="#1F1F7B"
//                 activeOutlineColor="#1F1F7B"
//                 textColor="black"
//                 numberOfLines={1}
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
//                 numberOfLines={1}
//                 placeholder="Email"
//                 theme={{
//                   colors: {
//                     background: "#FAFAFA",
//                   },
//                   roundness: 50,
//                 }}
//               />
//             </View>

//             <View style={tw`m-2`}>
//               <Text style={tw`mb-1 ml-4 text-black`}>Phone Number</Text>
//               <TextInput
//                 mode="outlined"
//                 style={tw`rounded-full`}
//                 selectionColor="#1F1F7B"
//                 cursorColor="#1F1F7B"
//                 activeOutlineColor="#1F1F7B"
//                 textColor="black"
//                 numberOfLines={1}
//                 placeholder="Phone Number"
//                 theme={{
//                   colors: {
//                     background: "#FAFAFA",
//                   },
//                   roundness: 50,
//                 }}
//               />
//             </View>

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
//                 numberOfLines={1}
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
//                 numberOfLines={1}
//                 placeholder="New Password"
//                 theme={{
//                   colors: {
//                     background: "#FAFAFA",
//                   },
//                   roundness: 50,
//                 }}
//               />
//             </View>

//             <View style={tw`m-2`}>
//               <Text style={tw`mb-1 ml-4 text-black`}>Date of Birth</Text>
//               <TextInput
//                 mode="outlined"
//                 style={tw`rounded-full`}
//                 selectionColor="#1F1F7B"
//                 cursorColor="#1F1F7B"
//                 activeOutlineColor="#1F1F7B"
//                 textColor="black"
//                 numberOfLines={1}
//                 placeholder="Date of Birth"
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
//             </View>

//             {showPicker && (
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
//             )}

//             <View style={tw`flex items-center justify-center`}>
//               <TouchableOpacity
//                 style={[
//                   tw`m-2 rounded-full py-3 px-5`,
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
import CustomAppBar from "../helpers/AppBar";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import tw from "twrnc";

const Settings = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // State variables for each input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [country, setCountry] = useState("");

  // const togglePicker = () => setShowPicker(!showPicker);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={tw`flex-1`}>
        <CustomAppBar navigation={navigation} heading={"Settings"} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={tw`flex-1`}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust this offset as needed
        >
          <ScrollView contentContainerStyle={tw`flex-col justify-start`}>
            {/* <TouchableOpacity> */}
            <View style={tw`flex-row items-center justify-center px-5 py-3`}>
              <Image
                source={require("../assets/user.png")}
                style={tw`w-24 h-24 rounded-full self-center mt-5`}
              />
              {/* <MaterialCommunityIcons
                  name="camera"
                  size={24}
                  color="#1F1F7B"
                  style={tw`absolute bottom-2 right-35`}
                /> */}
            </View>
            {/* </TouchableOpacity> */}

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
                onChangeText={setName} // Update name state
                placeholder="Name"
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View>

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
                onChangeText={setEmail} // Update email state
                placeholder="Email"
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View>

            {/* <View style={tw`m-2`}>
              <Text style={tw`mb-1 ml-4 text-black`}>Phone Number</Text>
              <TextInput
                mode="outlined"
                style={tw`rounded-full`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={phone}
                onChangeText={setPhone} // Update phone state
                placeholder="Phone Number"
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View> */}

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
                onChangeText={setOldPassword} // Update oldPassword state
                placeholder="Old Password"
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View>

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
                onChangeText={setNewPassword} // Update newPassword state
                placeholder="New Password"
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View>

            {/* <View style={tw`m-2`}>
              <Text style={tw`mb-1 ml-4 text-black`}>Date of Birth</Text>
              <TextInput
                mode="outlined"
                style={tw`rounded-full`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={date.toDateString()}
                onPressIn={() => togglePicker()}
                editable={false}
                theme={{
                  colors: {
                    background: "#FAFAFA",
                  },
                  roundness: 50,
                }}
              />
            </View> */}

            {/* {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || date;
                  setShowPicker(Platform.OS === "ios");
                  setDate(currentDate);
                }}
              />
            )} */}

            <View style={tw`flex items-center justify-center`}>
              <TouchableOpacity
                style={[
                  tw`m-10 rounded-full py-3 px-5`,
                  { backgroundColor: "#1F1F7B" },
                ]}
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
