import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import StackNavigation from './src/navigation/StackNavigation';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Warning: ...']);

const App = () => {
  return (
    <AppProvider id="realmdemo-yqeuu">
      <UserProvider fallback={<StackNavigation />}>
        <StackNavigation />
      </UserProvider>
    </AppProvider>
  );
};

export default App;
