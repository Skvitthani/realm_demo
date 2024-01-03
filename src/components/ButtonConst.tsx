import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import {fontSize} from '../utils/utilities';

interface button {
  title?: string;
  customButtonStyle?: ViewStyle;
  customeTextStyle?: TextStyle;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const ButtonConst = ({
  title,
  onPress,
  customButtonStyle,
  customeTextStyle,
}: button) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, customButtonStyle]}>
      <Text style={[styles.buttonTitleStyle, customeTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonConst;

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  buttonTitleStyle: {
    color: '#000',
    fontWeight: '700',
    fontSize: fontSize(20),
  },
});
