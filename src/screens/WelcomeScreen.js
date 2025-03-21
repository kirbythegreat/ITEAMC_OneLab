import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/MainStyle';


const WelcomeScreen = ({ navigation }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setIsRegistered(true);
      }
    };
    checkUser();
  }, []);

  return (
      <ImageBackground
        source={require("../assets/WelcomeScreen.png")}
        style={styles.backgroundImage}
      >
      <Icon name="flask" size={80} color="#4CAF50" style={styles.icon} />
      <Text style={styles.title}>Welcome to OneLab</Text>
      <Text style={styles.subtitle}>Book and borrow equipment with ease.</Text>

      {isRegistered ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Start Now</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Start Now</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

export default WelcomeScreen;
