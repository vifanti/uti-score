import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <SafeAreaProvider>{children}</SafeAreaProvider>
  </AuthProvider>
);

export default AppProvider;
