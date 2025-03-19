import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Laboratory System</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.profileButton}>Profile</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require('../assets/lab-banner.jpg')}
        style={styles.banner}
        resizeMode="cover"
      />

      <Text style={styles.description}>
        Manage your laboratory bookings and equipment requests easily. 
        Browse available laboratories and make your requests hassle-free!
      </Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Laboratories')}
      >
        <Text style={styles.buttonText}>View Laboratories</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa', alignItems: 'center', marginTop: 20 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%',
    marginBottom: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  profileButton: { fontSize: 22, color: 'blue', fontWeight: 'bold' },
  banner: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 30, color: '#333' },
  button: { 
    backgroundColor: '#4CAF50', 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    borderRadius: 8,
  },
  buttonText: { fontSize: 18, color: 'white', fontWeight: 'bold' },
});

export default HomePage;
