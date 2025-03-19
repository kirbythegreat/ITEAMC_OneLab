import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfilePage = () => {
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
    };
    

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('loggedInUser');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.email}>Welcome, {email}!</Text>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>My Bookings</Text>

            {bookedLabs.length === 0 ? (
                <Text style={styles.noBooking}>No booked laboratories yet.</Text>
            ) : (
                <FlatList
                    data={bookedLabs}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index: labIndex }) => (
                        <View style={styles.card}>
                            <Text style={styles.labName}>{item.lab}</Text>
                            {Array.isArray(item.equipment) && item.equipment.length > 0 ? (
                                item.equipment.map((equip, equipmentIndex) => (
                                    <View key={equipmentIndex} style={styles.equipmentContainer}>
                                        <Text style={styles.equipment}>{equip}</Text>
                                        <TouchableOpacity onPress={() => deleteEquipment(labIndex, equipmentIndex)}>
                                            <Text style={styles.deleteButton}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.equipment}>No equipment requested.</Text>
                            )}
                        </View>
                    )}
                />
            )}

            <Button title="Logout" onPress={handleLogout} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa', marginTop: 20 },
    email: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: 'black' },
    backButton: { marginBottom: 10 },
    backText: { fontSize: 22, color: 'blue' },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    noBooking: { fontSize: 16, textAlign: 'center', color: 'gray' },
    card: { padding: 15, backgroundColor: 'white', marginVertical: 8, borderRadius: 8, elevation: 3 },
    labName: { fontSize: 18, fontWeight: 'bold' },
    equipmentContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    equipment: { fontSize: 16, color: 'gray', marginVertical: 2 },
    deleteButton: { fontSize: 16, color: 'red', marginLeft: 10, fontWeight: 'bold' },
});

export default ProfilePage;
