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

function PassCodeVerfiy({ navigation }) {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [val3, setVal3] = useState("");
  const [val4, setVal4] = useState("");
  const [val5, setVal5] = useState("");

  const handlePassCodeVerify = () => {
    navigation.navigate("ResetPass");
  };
  const handleResendCode = () => {
    console.log("Resend Code");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={tw`flex-1 bg-white flex-col`}>
        <TouchableOpacity
          style={tw`mt-15 ml-3`}
          onPress={() => navigation.navigate("PasswordForgot")}
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
          No worries. With just a click, you can reset your password
        </Text>
        <View style={tw`flex items-center justify-center mt-20`}>
          <View style={tw`flex-row items-center justify-around mx-20`}>
            <View style={tw`mx-1`}>
              <TextInput
                mode="outlined"
                secureTextEntry={true}
                style={tw`rounded-sm h-15 py-1`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={val1}
                onChangeText={setVal1}
                theme={{
                  colors: {
                    background: "#FFFFFF",
                  },
                  roundness: 20,
                }}
              />
            </View>
            <View style={tw`mx-1`}>
              <TextInput
                mode="outlined"
                secureTextEntry={true}
                style={tw`rounded-sm h-15 py-1`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={val2}
                onChangeText={setVal2}
                theme={{
                  colors: {
                    background: "#FFFFFF",
                  },
                  roundness: 20,
                }}
              />
            </View>
            <View style={tw`mx-1`}>
              <TextInput
                mode="outlined"
                secureTextEntry={true}
                style={tw`rounded-sm h-15 py-1`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={val3}
                onChangeText={setVal3}
                theme={{
                  colors: {
                    background: "#FFFFFF",
                  },
                  roundness: 20,
                }}
              />
            </View>
            <View style={tw`mx-1`}>
              <TextInput
                mode="outlined"
                secureTextEntry={true}
                style={tw`rounded-sm h-15 py-1`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={val4}
                onChangeText={setVal4}
                theme={{
                  colors: {
                    background: "#FFFFFF",
                  },
                  roundness: 20,
                }}
              />
            </View>
            <View style={tw`mx-1`}>
              <TextInput
                mode="outlined"
                secureTextEntry={true}
                style={tw`rounded-sm h-15 py-1`}
                selectionColor="#1F1F7B"
                cursorColor="#1F1F7B"
                activeOutlineColor="#1F1F7B"
                textColor="black"
                value={val5}
                onChangeText={setVal5}
                theme={{
                  colors: {
                    background: "#FFFFFF",
                  },
                  roundness: 20,
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[
              tw`m-2 rounded-full py-3 px-12 mt-20`,
              { backgroundColor: "#1F1F7B" },
            ]}
            onPress={handlePassCodeVerify}
          >
            <Text style={tw`text-white text-2xl `}>Verify Code</Text>
          </TouchableOpacity>
          <View style={tw`flex-row mt-10`}>
            <Text style={tw`text-gray-500 text-base`}>
              Haven’t got the email yet?
            </Text>
            <TouchableOpacity onPress={handleResendCode} style={tw`ml-2`}>
              <Text style={[tw`text-base`, { color: "#1F1F7B" }]}>
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default PassCodeVerfiy;
