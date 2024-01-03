import React, {useEffect, useState} from 'react';
import {stackNavigation} from '.';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens

import AddUsers from '../screens/AddUsers';
import {RealmContext} from '../model/RealmSchema';
import {OpenRealmBehaviorType} from 'realm';
import {useApp} from '@realm/react';
import {Text} from 'react-native';
import Realm from 'realm';
import UserDetails from '../screens/UserDetails';

const Stack = createNativeStackNavigator<stackNavigation>();

const StackNavigation = () => {
  const app = useApp();
  const {RealmProvider} = RealmContext;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AnonymousLogin();
  }, []);

  const AnonymousLogin = async () => {
    const credential = Realm.Credentials.anonymous();
    await app.logIn(credential);
    setIsLoggedIn(true);
  };

  return (
    <RealmProvider
      sync={{
        flexible: true,
        newRealmFileBehavior: {
          type: OpenRealmBehaviorType.DownloadBeforeOpen,
        },
        existingRealmFileBehavior: {
          type: OpenRealmBehaviorType.OpenImmediately,
        },
      }}>
      {isLoggedIn ? (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="AddUsers" component={AddUsers} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Text>Loading</Text>
      )}
    </RealmProvider>
  );
};

export default StackNavigation;
