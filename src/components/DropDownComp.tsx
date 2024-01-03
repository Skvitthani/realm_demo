import React from 'react';
import {hp} from '../utils/utilities';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

interface dropDown {
  value: any;
  data: any[];
  labelField: string;
  valueField: string;
  placeholder: string;
  onChange: (item: any) => void;
}

const DropDownComp = ({
  data,
  value,
  onChange,
  placeholder,
  labelField,
  valueField,
}: dropDown) => {
  return (
    <Dropdown
      data={data}
      value={value}
      labelField={labelField}
      valueField={valueField}
      onChange={onChange}
      placeholder={placeholder}
      style={styles.dropDownStyle}
    />
  );
};

export default DropDownComp;

const styles = StyleSheet.create({
  dropDownStyle: {
    height: hp(6),
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    paddingHorizontal: 8,
  },
});
