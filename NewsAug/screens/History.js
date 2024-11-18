import React, { useState, useEffect } from "react";
import CustomAppBar from "../helpers/AppBar";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import tw from "twrnc";

const History = ({ navigation }) => {
  const [historyTitles, setHistoryTitles] = useState({});

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // const response = await fetch("https://your-api-endpoint.com/history");
        // const data = await response.json();
        // setHistoryTitles(data);
        const dummyData = [
          {
            title: "Palestine-Israeli Conflict",
            date: "24/02/1945",
            chat_id: "0",
          },
          {
            title: "World War II",
            date: "24/02/1945",
            chat_id: "1",
          },
          {
            title: "The Cold War",
            date: "01/02/1948",
            chat_id: "2",
          },
          {
            title: "The Fall of the Berlin Wall",
            date: "25/05/1989",
            chat_id: "3",
          },
          {
            title: "Ancient Egypt",
            date: "03/03/2001",
            chat_id: "4",
          },
        ];

        // Group titles by date
        const groupedHistory = dummyData.reduce((acc, item) => {
          if (!acc[item.date]) {
            acc[item.date] = [];
          }
          acc[item.date].push(item);
          return acc;
        }, {});

        // Set grouped data
        setHistoryTitles(groupedHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  // Function to convert date format and compare it properly (latest date first)
  const sortDatesDescending = (dates) => {
    return dates.sort((a, b) => {
      const [dayA, monthA, yearA] = a.split("/").map(Number);
      const [dayB, monthB, yearB] = b.split("/").map(Number);

      // Compare based on year, then month, then day
      if (yearA !== yearB) {
        return yearB - yearA; // Sort by year (descending)
      } else if (monthA !== monthB) {
        return monthB - monthA; // Sort by month (descending)
      } else {
        return dayB - dayA; // Sort by day (descending)
      }
    });
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <CustomAppBar navigation={navigation} heading={"History"} />
      <View style={tw`flex-col`}>
        <ScrollView style={tw`mt-10`}>
          {sortDatesDescending(Object.keys(historyTitles)).map(
            (date, index) => (
              <View key={index} style={tw`mb-6`}>
                <View style={tw`flex-row items-center justify-start mb-3 mx-3`}>
                  <Text style={tw`text-gray-400 text-lg mr-1`}>{date}</Text>
                  <View style={tw`w-3/4 border-b border-gray-300`} />
                </View>
                {/* Add a check to ensure historyTitles[date] is an array */}
                {Array.isArray(historyTitles[date]) &&
                  historyTitles[date].map((item, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={tw`mt-2`}
                      onPress={() =>
                        navigation.navigate("HistChat", {
                          chat_id: item.chat_id,
                        })
                      }
                    >
                      <View style={tw`flex-row items-center`}>
                        <Image
                          source={require("../assets/history_icon.png")}
                          style={tw`w-12 h-12 mr-5 ml-4`}
                        />
                        <Text style={tw`text-black text-xl`}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
              </View>
            )
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default History;
