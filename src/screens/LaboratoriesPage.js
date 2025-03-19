import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const laboratories = [
  { id: '1', name: 'Physics Lab' },
  { id: '2', name: 'Chemistry Lab' },
  { id: '3', name: 'Biology Lab' },
  { id: '4', name: 'Food Lab' },
  { id: '5', name: 'Computer Lab' },
  { id: '6', name: 'Electronics Lab' },
  { id: '7', name: 'Microbiology Lab' },
  { id: '8', name: 'Environmental Science Lab' },
  { id: '9', name: 'Engineering Lab' },
  { id: '10', name: 'Medical Lab' },
];

const LaboratoriesPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButtonContainer}>
        <Text style={styles.backButton}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Laboratory List</Text>

      <FlatList
        data={laboratories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.labItem} 
            onPress={() => navigation.navigate('EquipmentRequest', { labName: item.name })}
          >
            <Text style={styles.labText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa', marginTop: 20 },
  backButtonContainer: { marginBottom: 10 }, 
  backButton: { fontSize: 22, color: 'blue' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  labItem: { 
    padding: 15, 
    marginVertical: 10, 
    backgroundColor: '#4CAF50', 
    borderRadius: 8,
    alignItems: 'center',
  },
  labText: { fontSize: 18, color: 'white' },
});

export default LaboratoriesPage;
