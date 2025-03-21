import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import EquipmentRequestStyles from '../styles/EquipmentRequestStyles';

const EquipmentRequestPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const labName = route?.params?.labName || 'Unknown Lab'; 

  const [equipment, setEquipment] = useState(['']);
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const addEquipmentField = () => setEquipment([...equipment, '']);

  const updateEquipment = (text, index) => {
    const updatedEquipment = [...equipment];
    updatedEquipment[index] = text;
    setEquipment(updatedEquipment);
  };

  const validateRequest = () => {
    const trimmedEquipment = equipment.map((item) => item.trim());

    if (!scheduleDate) {
      Alert.alert('Validation Error', 'Please select a scheduled date.');
      return false;
    }

    if (trimmedEquipment.some((item) => item === '')) {
      Alert.alert('Validation Error', 'Please enter all equipment names.');
      return false;
    }

    if (new Set(trimmedEquipment).size !== trimmedEquipment.length) {
      Alert.alert('Validation Error', 'Duplicate equipment names are not allowed.');
      return false;
    }

    return true;
  };

  const submitRequest = async () => {
    if (!validateRequest()) return;
  
    try {
      const newBooking = { lab: labName, equipment, scheduleDate: scheduleDate.toISOString().split('T')[0] };
      const storedBookings = await AsyncStorage.getItem('bookedLabs');
      const bookings = storedBookings ? JSON.parse(storedBookings) : [];
      bookings.push(newBooking);
  
      await AsyncStorage.setItem('bookedLabs', JSON.stringify(bookings));
  
      Alert.alert('Success', 'Your request has been submitted!');
      navigation.navigate('Schedules'); 
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };
  
  return (
    <View style={EquipmentRequestStyles.container}>
      <View style={EquipmentRequestStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={EquipmentRequestStyles.backButton}>
          <Text style={{ fontSize: 18, color: '#FFF' }}>Back</Text>
        </TouchableOpacity>
        <Text style={EquipmentRequestStyles.title}>{labName}</Text>
      </View>

      <TouchableOpacity onPress={() => setIsDatePickerOpen(true)} style={EquipmentRequestStyles.input}>
        <Text style={{ color: '#000' }}>Scheduled Date: {scheduleDate.toDateString()}</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={isDatePickerOpen}
        date={scheduleDate}
        mode="date"
        onConfirm={(date) => {
          setScheduleDate(date);
          setIsDatePickerOpen(false);
        }}
        onCancel={() => setIsDatePickerOpen(false)}
      />

      <FlatList
        data={equipment}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TextInput
            style={EquipmentRequestStyles.input}
            placeholder={`Equipment ${index + 1}`}
            placeholderTextColor="#aaa"
            value={item}
            onChangeText={(text) => updateEquipment(text, index)}
          />
        )}
      />

      <TouchableOpacity style={EquipmentRequestStyles.addButton} onPress={addEquipmentField}>
        <Text style={{ color: '#4E65F6', fontSize: 16 }}>Add Equipment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={EquipmentRequestStyles.submitButton} onPress={submitRequest}>
        <Text style={EquipmentRequestStyles.submitButtonText}>Submit Request</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EquipmentRequestPage;
