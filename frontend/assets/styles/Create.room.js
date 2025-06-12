import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

const createRoomStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    marginBottom: 20,
  },
  
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textDark,
    flex: 1,
  },
  
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  inputGroup: {
    marginBottom: 20,
  },
  
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    minHeight: 50,
  },
  
  inputIcon: {
    marginRight: 10,
    color: COLORS.textSecondary,
  },
  
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
    paddingVertical: 12,
  },
  
  textArea: {
    textAlignVertical: 'top',
    minHeight: 80,
    paddingTop: 12,
  },
  
  errorText: {
    fontSize: 14,
    color: '#E74C3C',
    marginTop: 5,
    marginLeft: 5,
  },
  
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 15,
    marginBottom: 25,
  },
  
  switchInfo: {
    flex: 1,
    marginRight: 15,
  },
  
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  
  switchDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  
  switch: {
    width: 50,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  
  switchActive: {
    backgroundColor: COLORS.textPrimary,
  },
  
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  
  createButton: {
    backgroundColor: COLORS.textPrimary,
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    marginLeft: 8,
  },
});

export default createRoomStyles;