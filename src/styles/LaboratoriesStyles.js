import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const LaboratoriesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FD',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
    backgroundColor: '#4E65F6',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
  labItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '100%',
  },
  labText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default LaboratoriesStyles;
