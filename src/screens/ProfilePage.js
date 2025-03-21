import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ProfilePageStyles } from '../styles/ProfilePageStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfilePage = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchUserEmail();
    }, []);

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

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await AsyncStorage.removeItem('userToken');
                        await AsyncStorage.removeItem('loggedInUser');
                        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                    },
                },
            ]
        );
    };

    return (
        <View style={ProfilePageStyles.container}>
            <TouchableOpacity style={ProfilePageStyles.backButton} onPress={() => navigation.goBack()}>
                <Text style={ProfilePageStyles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <View style={ProfilePageStyles.card}>
            <Image
                    source={require('../assets/user_icon.png')}
                    style={ProfilePageStyles.profileImage}
                />
                <Text style={ProfilePageStyles.email}>Hello, {email}!</Text>
            </View>

            <TouchableOpacity style={ProfilePageStyles.logoutButton} onPress={handleLogout}>
                <Text style={ProfilePageStyles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfilePage;
