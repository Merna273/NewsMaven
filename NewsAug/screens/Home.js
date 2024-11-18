import CustomAppBar from "../helpers/AppBar";
import { SafeAreaView } from "react-native";
import { View, Image } from "react-native";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <CustomAppBar navigation={navigation} heading={"Home"} />
      <View style={tw`flex-1 justify-around`}>
        <View style={tw`flex-1 justify-center`}>
          <Image
            source={require("../assets/logoT.png")}
            style={tw`w-60 h-60 items-center mx-auto `}
          />
        </View>
        <View
          style={[
            tw`flex-col items-center bg-gray-200 mx-5 py-15 rounded-3xl mb-5`,
            { backgroundColor: "#E8E8E8" },
          ]}
        >
          <Text style={[tw`text-gray-400 text-3xl mb-5`, { color: "#1F1F7B" }]}>
            Hi John Doe,
          </Text>
          <Text
            style={[
              tw`text-gray-400 text-base mb-5 mx-5`,
              { color: "#1F1F7B", textAlign: "center" },
            ]}
          >
            Welcome to NewsMaven, the latest news at the tip of your finger!
          </Text>
          <View style={tw`flex items-center justify-center `}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Chatbot")}
              style={[
                tw`m-2 rounded-full py-3 px-5`,
                { backgroundColor: "#1F1F7B" },
              ]}
            >
              <Text style={tw`text-white text-2xl `}>Start Conversation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
