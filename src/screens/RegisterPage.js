import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginRegisterStyles from '../styles/LoginRegisterStyle';

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      showAlert('Error', 'Email and password cannot be empty.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      showAlert('Error', 'Enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      showAlert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      if (users.some(user => user.email === email)) {
        showAlert('Error', 'Email already registered. Choose another.');
        return;
      }

      users.push({ email, password });
      await AsyncStorage.setItem('users', JSON.stringify(users));

      showAlert('Success', 'Registration successful!', () => {
        navigation.replace('Login');
      });
    } catch (error) {
      showAlert('Error', 'Registration failed. Please try again.');
    }
  };

  const showAlert = (title, message, onPress = null) => {
    setTimeout(() => {
      Alert.alert(title, message, [{ text: 'OK', onPress }]);
    }, 200);
  };

  return (
      <ImageBackground
        source={require('../assets/LoginRegisterBg.png')}
        style={LoginRegisterStyles.background}
      >
      <View style={LoginRegisterStyles.container}>
        <Text style={LoginRegisterStyles.title}>Welcome to OneLab!</Text>
        <Text style={LoginRegisterStyles.subtitle}>Start Scheduling Labs and Equipment</Text>

        <View style={LoginRegisterStyles.inputContainer}>
          <TextInput
            style={LoginRegisterStyles.input}
            placeholder="Email"
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
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={LoginRegisterStyles.eyeIcon}
          >
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={LoginRegisterStyles.button} onPress={handleRegister}>
          <Text style={LoginRegisterStyles.buttonText}>REGISTER</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={LoginRegisterStyles.footerText}>
            Already have an account? <Text style={LoginRegisterStyles.footerLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default RegisterPage;
