import React from 'react';
import {fontSize, hp} from '../utils/utilities';
import {KeyboardTypeOptions, StyleSheet, TextInput} from 'react-native';

interface inputs {
  value?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  onChangeText?: ((text: string) => void) | undefined;
}

const InputText = ({
  value,
  placeholder,
  onChangeText,
  keyboardType,
}: inputs) => {
  return (
    <TextInput
      value={value}
      style={styles.inputStyle}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={'#000'}
      keyboardType={keyboardType}
    />
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    height: hp(6),
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 8,
    fontSize: fontSize(17),
  },
});
