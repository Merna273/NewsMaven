import React, { useState } from "react"; // Import useState
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";

function ResetPass({ navigation }) {
  const [password, setPassword] = useState("");

  const handleResetPass = () => {
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={tw`flex-1 bg-white flex-col`}>
        <TouchableOpacity
          style={tw`mt-15 ml-3`}
          onPress={() => navigation.navigate("PassCodeVerify")}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={"#1F1F7B"}
          />
        </TouchableOpacity>
        {/* <View style={tw`flex-1 justify-center`}> */}
        <Text style={tw`text-2xl font-bold text-center mt-5`}>
          Forgot Password
        </Text>
        <Text style={tw`text-gray-500 text-center mt-5 mx-10`}>
          No worries. With just a click, you can rest your password
        </Text>
        <View style={tw`flex items-center justify-center mt-10`}>
          <View style={tw`mt-5 w-80`}>
            <TextInput
              mode="outlined"
              secureTextEntry={true}
              style={tw`rounded-full`}
              selectionColor="#1F1F7B"
              cursorColor="#1F1F7B"
              activeOutlineColor="#1F1F7B"
              textColor="black"
              value={password}
              onChangeText={setPassword} // Update newPassword state
              placeholder="Password"
              theme={{
                colors: {
                  background: "#FFFFFF",
                },
                roundness: 50,
              }}
            />
          </View>
          <TouchableOpacity
            style={[
              tw`m-2 rounded-full py-3 px-12 mt-10`,
              { backgroundColor: "#1F1F7B" },
            ]}
            onPress={handleResetPass}
          >
            <Text style={tw`text-white text-2xl `}>Reset Password</Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ResetPass;
