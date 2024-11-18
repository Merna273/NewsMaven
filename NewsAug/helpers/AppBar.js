import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { Title, Appbar, Menu, Button, Icon } from "react-native-paper";
import CustomModal from "./Modal";
import { Platform } from "react-native";
import tw from "twrnc";

const CustomAppBar = ({ navigation, heading }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const navigateToHome = () => {
    closeModal();
    navigation.navigate("Home");
  };

  return (
    <View>
      <Appbar
        mode="small"
        style={[
          tw`border-b border-gray-300 bg-gray-100`,
          Platform.OS === "android" && tw`mt-5`,
        ]}
      >
        {/* <Button icon="menu" textColor="#1F1F7B" style={[{ width: 58 }]} /> */}
        <TouchableOpacity
          style={{
            width: 58,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            openModal();
            console.log("Hello World");
          }}
        >
          <MaterialCommunityIcons name="menu" size={24} color="#1F1F7B" />
        </TouchableOpacity>
        <Appbar.Content
          title={<Title style={[tw`text-2xl font-bold `]}>{heading}</Title>}
          style={tw`flex-row justify-center items-center`}
        />
        {/* <Button icon="home" textColor="#1F1F7B" style={[{ width: 58 }]} /> */}
        <TouchableOpacity
          style={{
            width: 58,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={navigateToHome}
        >
          <MaterialCommunityIcons name="home" size={24} color="#1F1F7B" />
        </TouchableOpacity>
      </Appbar>
      <CustomModal
        visible={modalVisible}
        onClose={closeModal}
        navigation={navigation}
      />
    </View>
  );
};
export default CustomAppBar;
