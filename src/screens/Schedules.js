import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SchedulesStyles } from '../styles/SchdeulesStyles';

const Schedules = () => {
    const navigation = useNavigation();
    const [bookedLabs, setBookedLabs] = useState([]);
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchBookings();
        fetchUserEmail();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchBookings();
            fetchUserEmail();
        });
        return unsubscribe;
    }, [navigation]);

    const fetchUserEmail = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('loggedInUser');
            if (storedEmail) {
                setEmail(storedEmail);
            }
        } catch (error) {
            console.error('Error fetching email:', error);
        }
    };

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

    const deleteEquipment = async (labIndex, equipmentIndex) => {
        Alert.alert(
            'Delete Equipment',
            'Are you sure you want to delete this equipment?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            let updatedBookings = [...bookedLabs];
                            updatedBookings[labIndex].equipment.splice(equipmentIndex, 1);

                            if (updatedBookings[labIndex].equipment.length === 0) {
                                updatedBookings.splice(labIndex, 1);
                            }

                            setBookedLabs(updatedBookings);
                            await AsyncStorage.setItem('bookedLabs', JSON.stringify(updatedBookings));
                        } catch (error) {
                            console.error('Error deleting equipment:', error);
                        }
                    },
                },
            ]
        );
    };

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('loggedInUser');
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    };

    return (
        <View style={SchedulesStyles.container}>
            <View style={SchedulesStyles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={SchedulesStyles.headerButton}>
                    <Text style={SchedulesStyles.headerButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={SchedulesStyles.headerButton}>
                    <Text style={[SchedulesStyles.headerButtonText]}>Booking Schedule</Text>
                </TouchableOpacity>
            </View>

            <Text style={SchedulesStyles.title}>My Bookings</Text>

            {bookedLabs.length === 0 ? (
                <Text style={SchedulesStyles.noBooking}>You have no booked laboratories yet.</Text>
            ) : (
                <FlatList
                    data={bookedLabs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index: labIndex }) => (
                        <View style={SchedulesStyles.card}>
                            <Text style={SchedulesStyles.labName}>{item.lab}</Text>
                            <Text style={SchedulesStyles.scheduleDate}>📅 Scheduled: {item.scheduleDate}</Text>

                            {item.equipment.map((equip, equipmentIndex) => (
                                <View key={equipmentIndex} style={SchedulesStyles.equipmentContainer}>
                                    <Text style={SchedulesStyles.equipment}>🔹 {equip}</Text>
                                    <TouchableOpacity onPress={() => deleteEquipment(labIndex, equipmentIndex)}>
                                        <Text style={[SchedulesStyles.headerButton, { color: 'red' }]}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default Schedules;
