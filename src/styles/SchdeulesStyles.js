import { StyleSheet } from 'react-native';

export const SchedulesStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6FD',
        padding: 20,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#4E65F6',
        padding: 15,
        borderRadius: 10,
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerButtonText: {
        color: '#FFF',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#333',
    },
    noBooking: {
        color: '#888',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    labName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4E65F6',
        marginBottom: 8,
    },
    scheduleDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    equipmentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
    },
    equipment: {
        fontSize: 16,
        color: '#333',
    },
});
