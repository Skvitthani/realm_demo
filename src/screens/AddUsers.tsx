import Realm from 'realm';
import {Cities} from '../utils/DummyArray';
import {stackNavigation} from '../navigation';
import InputText from '../components/InputText';
import React, {useEffect, useState} from 'react';
import {fontSize, hp, wp} from '../utils/utilities';
import ButtonConst from '../components/ButtonConst';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RealmContext, userDetails} from '../model/RealmSchema';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import DropDownComp from '../components/DropDownComp';

type AddUsersScreen = NativeStackScreenProps<stackNavigation, 'AddUsers'> & {
  navigation: () => void;
};

const AddUsers: React.FC<AddUsersScreen> = ({navigation, route}) => {
  const data: any = route?.params?.editData;

  const {useQuery, useRealm} = RealmContext;
  const realm = useRealm();
  const contactDetails = useQuery(userDetails);

  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [age, setAge] = useState<number>();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(realm.objects(userDetails));
    });
  }, [realm]);

  useEffect(() => {
    if (data !== undefined) {
      setIsEdit(true);
      setAge(data?.age);
      setValue(data?.city);
      setName(data?.name);
    }
  }, [data]);

  const onAddUserPress = () => {
    if (name !== '' && value !== '' && age !== undefined) {
      realm.write(() => {
        realm.create('Users', {
          _id: new Realm.BSON.ObjectId(),
          name: name,
          age: age,
          city: value,
        });
      });
      setAge(undefined);
      setValue('');
      setName('');
    } else {
      Alert.alert('Plz Fill inputs');
    }
  };

  const onUserDetaiPress = () => {
    navigation.navigate('UserDetails');
  };
  const onEditPress = () => {
    const userToEdit = contactDetails.find(
      i => data?._id?.toHexString() == i?._id,
    );

    if (userToEdit) {
      realm.write(() => {
        userToEdit.name = name;
        // @ts-ignore
        userToEdit.age = age;
        userToEdit.city = value;
      });

      setIsEdit(false);
      setAge(undefined);
      setValue('');
      setName('');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.addUserText}>Add User</Text>
      <View style={styles.inputContainer}>
        <InputText
          value={name}
          placeholder="Name...."
          onChangeText={txt => setName(txt)}
        />
        <InputText
          value={age?.toString()}
          placeholder="Age...."
          onChangeText={txt => setAge(Number(txt))}
          keyboardType="number-pad"
        />
        <DropDownComp
          data={Cities}
          value={value}
          onChange={(item: any) => {
            setValue(item.city);
          }}
          placeholder={'Select a city'}
          labelField="city"
          valueField="city"
        />
      </View>
      <View style={styles.buttonView}>
        <ButtonConst
          title={isEdit ? 'Edit' : 'Add User'}
          onPress={isEdit ? onEditPress : onAddUserPress}
        />
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.bottomText}>
          You have {contactDetails?.length} users in you list
        </Text>
        <Text onPress={onUserDetaiPress} style={styles.showText}>
          Show
        </Text>
      </View>
    </View>
  );
};

export default AddUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    gap: hp(2),
    marginHorizontal: wp(5),
  },
  buttonView: {
    marginTop: hp(5),
    marginHorizontal: wp(10),
  },
  addUserText: {
    fontWeight: 'bold',
    marginBottom: hp(2),
    textAlign: 'center',
    fontSize: fontSize(30),
    textDecorationLine: 'underline',
  },
  usersStyle: {
    marginTop: 20,
    textAlign: 'center',
  },
  bottomView: {
    gap: hp(0.5),
    marginTop: hp(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: fontSize(15),
    textDecorationLine: 'underline',
  },
  bottomText: {
    color: '#000',
    fontSize: fontSize(15),
  },
});
