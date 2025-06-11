import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.background,
  },
  image: {
    width:  300,
    height: 300,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
  },
  buttonText: {
    color: COLORS.textDark,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default styles;
