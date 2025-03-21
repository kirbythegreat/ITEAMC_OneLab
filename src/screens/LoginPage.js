import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginRegisterStyles from '../styles/LoginRegisterStyle';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        await AsyncStorage.setItem('userToken', 'authenticated');
        await AsyncStorage.setItem('loggedInUser', email);

        Alert.alert('Success', 'Login successful!');
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Invalid email or password.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to log in. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/LoginRegisterBg.png')}
      style={LoginRegisterStyles.background}
    >
      <View style={LoginRegisterStyles.container}>
        <Text style={LoginRegisterStyles.title}>Welcome Back!</Text>
        <Text style={LoginRegisterStyles.subtitle}>Log in to your account</Text>

        <View style={LoginRegisterStyles.inputContainer}>
          <TextInput
            style={LoginRegisterStyles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={LoginRegisterStyles.inputContainer}>
          <TextInput
            style={LoginRegisterStyles.input}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={LoginRegisterStyles.button} onPress={handleLogin}>
          <Text style={LoginRegisterStyles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={LoginRegisterStyles.footerText}>
            Don't have an account? <Text style={LoginRegisterStyles.footerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default LoginPage;
