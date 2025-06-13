import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

const SIZES = {
  base: 8,
  small: 12,
  medium: 16,
  large: 24,
  radius: 8,
  h1: 32,
  h2: 24,
  h3: 20,
  body: 16,
  caption: 14,
};

const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
  },
  backButton: {
    padding: SIZES.base,
  },
  roomInfo: {
    flex: 1,
    marginHorizontal: SIZES.small,
  },
  roomName: {
    fontSize: SIZES.h3,
    color: COLORS.surface,
    fontWeight: 'bold',
  },
  participantCount: {
    fontSize: SIZES.caption,
    color: COLORS.surface,
  },
  menuButton: {
    padding: SIZES.base,
  },

  // Messages
  messagesContainer: {
    flex: 1,
    paddingHorizontal: SIZES.medium,
    marginBottom: SIZES.medium,
  },
  messagesContent: {
    paddingVertical: SIZES.small,
  },
  messageContainer: {
    marginBottom: SIZES.small,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  senderName: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: SIZES.small,
    borderRadius: SIZES.radius,
  },
  ownBubble: {
    backgroundColor: COLORS.accent,
    borderTopRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 0,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  messageText: {
    fontSize: SIZES.body,
  },
  ownMessageText: {
    color: '#ffffff',
  },
  otherMessageText: {
    color: COLORS.text,
  },
  messageTime: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // Input
  inputContainer: {
    borderTopWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    padding: SIZES.small,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.small,
    // paddingVertical: Platform.OS === 'ios' ? SIZES.small : 0,
  },
  textInput: {
    flex: 1,
    fontSize: SIZES.body,
    paddingVertical: SIZES.small,
    color: COLORS.text,
  },
  sendButton: {
    padding: SIZES.small,
    borderRadius: 20,
  },
  sendButtonActive: {
    backgroundColor: COLORS.accent,
  },
});

export default chatStyles;
