import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EquipmentRequestPage = ({ route }) => {
  const { labName } = route.params;
  const navigation = useNavigation();
  const [equipment, setEquipment] = useState(['']);

  const addEquipmentField = () => {
    setEquipment([...equipment, '']);
  };

  const updateEquipment = (text, index) => {
    const newEquipment = [...equipment];
    newEquipment[index] = text;
    setEquipment(newEquipment);
  };

  const validateRequest = () => {
    const trimmedEquipment = equipment.map((item) => item.trim());

    if (trimmedEquipment.some((item) => item === '')) {
      Alert.alert('Validation Error', 'Please enter equipment names before submitting.');
      return false;
    }

    const uniqueEquipment = new Set(trimmedEquipment);
    if (uniqueEquipment.size !== trimmedEquipment.length) {
      Alert.alert('Validation Error', 'Duplicate equipment names are not allowed.');
      return false;
    }

    return true;
  };

  const submitRequest = async () => {
    if (!validateRequest()) return;

    try {
      const newBooking = { lab: labName, equipment };

      const storedBookings = await AsyncStorage.getItem('bookedLabs');
      const bookings = storedBookings ? JSON.parse(storedBookings) : [];

      bookings.push(newBooking);

      await AsyncStorage.setItem('bookedLabs', JSON.stringify(bookings));

      Alert.alert('Success', 'Your request has been submitted!');
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Page Title */}
      <Text style={styles.title}>Request Equipment for {labName}</Text>

      {/* Equipment Input List */}
      <FlatList
        data={equipment}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter equipment name"
            value={item}
            onChangeText={(text) => updateEquipment(text, index)}
          />
        )}
      />

      {/* Add Equipment Button */}
      <TouchableOpacity style={styles.addButton} onPress={addEquipmentField}>
        <Text style={styles.addText}>+ Add Equipment</Text>
      </TouchableOpacity>

      {/* Submit Request Button */}
      <Button title="Submit Request" onPress={submitRequest} disabled={equipment.length === 0} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa', marginTop: 20 },
  backButton: { marginBottom: 10 },
  backText: { fontSize: 22, color: 'blue' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 8, backgroundColor: 'white' },
  addButton: { alignItems: 'center', backgroundColor: '#4CAF50', padding: 10, borderRadius: 8, marginVertical: 10 },
  addText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default EquipmentRequestPage;
