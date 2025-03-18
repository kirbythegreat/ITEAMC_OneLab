import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  input: { width: '90%', padding: 12, marginBottom: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#fff' },
  loginButton: { width: '90%', backgroundColor: '#4CAF50', padding: 12, alignItems: 'center', borderRadius: 8, marginVertical: 10 },
  loginButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  registerText: { marginTop: 10, color: '#007BFF', fontSize: 16 },
});

export default LoginPage;
