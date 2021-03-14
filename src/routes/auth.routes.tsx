import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Auth.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
