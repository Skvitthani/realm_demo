import {Platform} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

export const fontSize = (val: number) => RFValue(val, 812);

export const wp = (val: number) => widthPercentageToDP(val);

export const hp = (val: number) => heightPercentageToDP(val);

export const isIosIPad = Platform.OS === 'ios' && Platform.isPad;
