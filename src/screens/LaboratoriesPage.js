import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LaboratoriesStyles from '../styles/LaboratoriesStyles';

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
    <View style={LaboratoriesStyles.container}>
      <View style={LaboratoriesStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={LaboratoriesStyles.headerTitle}>Back</Text>
        </TouchableOpacity>
        <Text style={LaboratoriesStyles.headerTitle}>Laboratory List</Text>
      </View>

      <FlatList
        data={laboratories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={LaboratoriesStyles.labItem}
            onPress={() => navigation.navigate('EquipmentRequest', { labName: item.name })}
          >
            <Text style={LaboratoriesStyles.labText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={LaboratoriesStyles.listContainer}
      />
    </View>
  );
};

export default LaboratoriesPage;
