import React from 'react';
import {stackNavigation} from '../navigation';
import {fontSize, hp} from '../utils/utilities';
import ButtonConst from '../components/ButtonConst';
import {RealmContext, userDetails} from '../model/RealmSchema';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

type UserDetailScreen = NativeStackScreenProps<
  stackNavigation,
  'UserDetails'
> & {
  navigation: () => void;
};

export interface UserItems {
  _id: object;
  age: number;
  city: string;
  name: string;
}

const UserDetails: React.FC<UserDetailScreen> = ({navigation}) => {
  const {useQuery, useRealm} = RealmContext;
  const realm = useRealm();
  const contactDetails = useQuery(userDetails);

  const onBackPress = () => {
    navigation.goBack();
  };

  const renderItem = ({item}: {item: UserItems}) => (
    <View style={styles.card}>
      <Text style={styles.name}>Name: {item.name}</Text>
      <Text style={styles.info}>Age: {item.age}</Text>
      <Text style={styles.info}>City: {item.city}</Text>

      <View style={styles.buttonContainer}>
        <ButtonConst
          title="Edit"
          onPress={() => handleEdit(item)}
          customButtonStyle={styles.button}
          customeTextStyle={styles.buttonText}
        />
        <ButtonConst
          title="Delete"
          customButtonStyle={styles.button}
          onPress={() => handleDelete(item)}
          customeTextStyle={styles.buttonText}
        />
      </View>
    </View>
  );

  const handleEdit = (item: UserItems) => {
    navigation.navigate('AddUsers', {editData: item});
  };

  const handleDelete = (item: UserItems) => {
    const taskToDelete = realm.objectForPrimaryKey('Users', item?._id);
    if (taskToDelete) {
      realm.write(() => {
        realm.delete(taskToDelete);
      });
    }
  };

  const ListEmptyComponent = () => {
    return <Text style={styles.noDataTextStyle}>No Data</Text>;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.topBackButtonView}>
        <ButtonConst title="Back" onPress={onBackPress} />
      </View>
      <FlatList
        bounces={false}
        data={contactDetails}
        renderItem={renderItem}
        style={styles.listContainer}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={item => item._id?.toString()}
      />
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: hp(1.6),
  },
  topBackButtonView: {
    marginLeft: hp(1),
    alignItems: 'flex-start',
  },

  card: {
    elevation: 3,
    padding: hp(2.5),
    borderRadius: hp(1),
    marginBottom: hp(1.7),
    backgroundColor: '#fff',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: hp(0.8),
    fontSize: fontSize(20),
  },
  info: {
    color: '#555',
    fontSize: fontSize(18),
  },
  buttonContainer: {
    marginTop: hp(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    borderRadius: 5,
    padding: hp(1.1),
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noDataTextStyle: {
    color: '#000',
    textAlign: 'center',
    fontSize: fontSize(25),
  },
});
