import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const scale = width / 375;
const responsiveSize = (size) => Math.round(size * scale);

const HomePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FD',
    alignItems: 'center',
  },
  bannerContainer: {
    width: '100%',
    height: height * 0.15,
    backgroundColor: '#4E65F6',
    borderBottomLeftRadius: responsiveSize(30),
    borderBottomRightRadius: responsiveSize(30),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: responsiveSize(6),
  },
  bannerText: {
    color: '#FFF',
    fontSize: responsiveSize(24),
    fontWeight: 'bold',
  },
  bannerImageContainer: {
    width: '90%',
    height: height * 0.2,
    borderRadius: responsiveSize(20),
    overflow: 'hidden',
    marginTop: responsiveSize(-20),
    marginBottom: responsiveSize(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: responsiveSize(5),
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  scheduleContainer: {
    width: '90%',
    marginVertical: responsiveSize(15),
    paddingHorizontal: responsiveSize(15),
    paddingVertical: responsiveSize(10),
    backgroundColor: '#FFF',
    borderRadius: responsiveSize(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: responsiveSize(4),
  },
  scheduleTitle: {
    fontSize: responsiveSize(18),
    fontWeight: 'bold',
    marginBottom: responsiveSize(8),
    color: '#333',
    textAlign: 'center',
  },
  noBooking: {
    fontSize: responsiveSize(14),
    color: '#666',
    textAlign: 'center',
    marginVertical: responsiveSize(10),
  },
  scheduleItem: {
    marginBottom: responsiveSize(10),
    padding: responsiveSize(10),
    backgroundColor: '#F4F6FD',
    borderRadius: responsiveSize(10),
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: responsiveSize(3),
  },
  labName: {
    fontSize: responsiveSize(16),
    fontWeight: 'bold',
    color: '#333',
  },
  scheduleDate: {
    fontSize: responsiveSize(14),
    color: '#666',
    marginTop: responsiveSize(4),
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: responsiveSize(20),
    marginTop: responsiveSize(10),
  },
  card: {
    width: '42%',
    height: height * 0.18,
    borderRadius: responsiveSize(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(20),
    padding: responsiveSize(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: responsiveSize(4),

  },
  cardText: {
    marginTop: responsiveSize(10),
    fontSize: responsiveSize(14),
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
});

export default HomePageStyles;
