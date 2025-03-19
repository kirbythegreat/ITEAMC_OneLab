import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  input: { width: '90%', padding: 12, marginBottom: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#fff' },
  registerButton: { width: '90%', backgroundColor: '#4CAF50', padding: 14, alignItems: 'center', borderRadius: 8, marginVertical: 10 },
  registerButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  loginText: { marginTop: 10, color: '#007BFF', fontSize: 16 },
});

export default RegisterPage;
