import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import HomePageStyles from '../styles/HomepageStyles';

const HomePage = () => {
  const navigation = useNavigation();
  const [bookedLabs, setBookedLabs] = useState([]);

  useEffect(() => {
    fetchBookings();
    const unsubscribe = navigation.addListener('focus', fetchBookings);
    return unsubscribe;
  }, [navigation]);

  const fetchBookings = async () => {
    try {
      const storedBookings = await AsyncStorage.getItem('bookedLabs');
      if (storedBookings) {
        setBookedLabs(JSON.parse(storedBookings));
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <View style={HomePageStyles.container}>
      <View style={HomePageStyles.bannerContainer}>
        <Text style={HomePageStyles.bannerText}>Welcome, User!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={HomePageStyles.cardText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={HomePageStyles.bannerImageContainer}>
        <Image
          source={require('../assets/lab-banner.jpg')}
          style={HomePageStyles.bannerImage}
          resizeMode="cover"
        />
      </View>

      <View style={HomePageStyles.scheduleContainer}>
        <Text style={HomePageStyles.scheduleTitle}>Your Scheduled Bookings</Text>
        {bookedLabs.length === 0 ? (
          <Text style={HomePageStyles.noBooking}>No scheduled bookings yet.</Text>
        ) : (
          <FlatList
            data={bookedLabs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={HomePageStyles.scheduleItem}>
                <Text style={HomePageStyles.labName}>{item.lab}</Text>
                <Text style={HomePageStyles.scheduleDate}>Date: {item.scheduleDate}</Text>
              </View>
            )}
          />
        )}
      </View>

      <View style={HomePageStyles.cardContainer}>
        <TouchableOpacity
          style={[HomePageStyles.card, { backgroundColor: '#6A5ACD' }]}
          onPress={() => navigation.navigate('Laboratories')}
        >
          <Text style={HomePageStyles.cardText}>Laboratories</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[HomePageStyles.card, { backgroundColor: '#FF6F61' }]}
          onPress={() => navigation.navigate('Schedules')}
        >
          <Text style={HomePageStyles.cardText}>My Requests</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomePage;
