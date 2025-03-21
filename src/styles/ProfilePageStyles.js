import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const ProfilePageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F9',
        padding: 20,
        marginTop: 24,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    backButtonText: {
        marginLeft: 5,
        fontSize: 24,
        color: '#333',
    },
    card: {
        backgroundColor: '#FFF',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 40,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    profileImage: {
        width: width * 0.35,
        height: width * 0.35,
        borderRadius: (width * 0.35) / 2, 
        borderWidth: 3,
        borderColor: '#4E65F6',
        marginBottom: 15,
        resizeMode: 'cover',
    },
    email: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    logoutButton: {
        backgroundColor: '#FF6F61',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
