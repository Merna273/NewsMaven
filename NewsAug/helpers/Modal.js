import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Platform,
  Dimensions,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import tw from "twrnc";

const CustomModal = ({ visible, onClose, navigation }) => {
  // WILL GET THE CATEGORIES FROM THE DATABASE
  // const categories = [
  //   { name: "General", icon: "earth" },
  //   { name: "Politics", icon: "bank" },
  //   { name: "Sports", icon: "soccer" },
  //   { name: "Technology", icon: "robot" },
  //   { name: "Entertainment", icon: "theater" },
  //   { name: "Health", icon: "heart" },
  // ];
  // const [openCategory, setOpenCategory] = React.useState(false);

  // const toggleCategoryList = () => {
  //   setOpenCategory(!openCategory);
  // };

  const CloseModal = () => {
    // setOpenCategory(false);
    onClose();
  };
  const navigateToSettings = () => {
    CloseModal();
    navigation.navigate("Settings");
  };

  const navigateToHistory = () => {
    CloseModal();
    navigation.navigate("History");
  };

  const navigateToChatbot = () => {
    CloseModal();
    navigation.navigate("Chatbot");
  };

  const setModalVisible = (value) => {
    visible = value;
  };
  if (!visible) {
    return null;
  }

  const deviceHeight = Dimensions.get("window").height;
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : 0;

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Modal
        isVisible={visible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        onBackdropPress={CloseModal}
        style={tw`m-0`}
      >
        {/* <View style={tw`bg-white w-3/4 h-full pt-20 rounded-r-3xl flex-col `}> */}
        <View
          style={[
            tw`bg-white w-3/4 pt-20 rounded-r-3xl flex-col`,
            { height: deviceHeight + statusBarHeight }, // Adjust height for Android status bar
          ]}
        >
          <View style={tw`flex-row justify-evenly`}>
            <Image
              source={require("../assets/user.png")}
              style={tw`w-17 h-17 rounded-full `}
            ></Image>
            {/* CHANGE IT TO VALUES FROM THE DATABASE */}
            <View style={tw`flex-col pt-3 `}>
              <Text style={tw`text-black text-xl`}>John Doe</Text>
              <Text style={tw`text-gray-400 text-sm`}>john.doe@random.com</Text>
            </View>
          </View>
          <View style={tw`pt-10 pl-10`}>
            <TouchableOpacity
              style={tw`flex-row`}
              // onPress={() => toggleCategoryList()}
              onPress={navigateToChatbot}
            >
              <MaterialCommunityIcons name="plus" size={30} color="black" />
              <Text style={tw`text-black text-2xl pl-4`}>New Chat</Text>
            </TouchableOpacity>
            {/* {openCategory && (
              <View style={tw`pl-10 pt-5 flex-col`}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={tw`pt-3 flex-row`}
                    onPress={navigateToChatbot}
                  >
                    <MaterialCommunityIcons
                      name={category.icon}
                      size={24}
                      color="gray"
                    />
                    <Text style={tw`text-gray-600 text-xl pl-3`}>
                      {category.name}
                    </Text>
                  </TouchableOpacity> */}
            {/* ))} */}
            {/* </View> */}
            {/* )} */}
            <TouchableOpacity
              style={tw`flex-row  pt-10`}
              onPress={navigateToHistory}
            >
              <MaterialCommunityIcons name="history" size={30} color="black" />
              <Text style={tw`text-black text-2xl pl-4`}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-row pt-10`}
              onPress={navigateToSettings}
            >
              <MaterialCommunityIcons name="cog" size={30} color="black" />
              <Text style={tw`text-black text-2xl pl-4`}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default CustomModal;
