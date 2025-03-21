import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const LoginRegisterStyles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F9',
  },
  container: {
    width: width * 0.85,
    paddingVertical: 30,
    paddingHorizontal: 25,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E2E2E',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6D6D6D',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F1F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 18,
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: '#DDD',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  eyeIcon: {
    marginLeft: 10,
    opacity: 0.7,
  },
  button: {
    backgroundColor: '#FFC107',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 2, height: 4 },
    shadowRadius: 6,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  footerText: {
    marginTop: 15,
    color: '#6D6D6D',
    fontSize: 14,
    textAlign: 'center',
  },
  footerLink: {
    color: '#FFC107',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  logo: {
    marginBottom: 20,
  },
});

export default LoginRegisterStyles;
