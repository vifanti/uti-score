import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import SAPS3Questionary from '../pages/SAPS3Questionary';
import PSIQuestionary from '../pages/PSIQuestionary';
import PRISMIIQuestionary from '../pages/PRISMIIQuestionary';
import APACHEIIQuestionary from '../pages/APACHEIIQuestionary';
import SOFAQuestionary from '../pages/SOFAQuestionary';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#fff' },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen
      name="SAPS3Questionary"
      component={SAPS3Questionary}
      options={{
        headerShown: true,
        title: 'Escala SAPS-3',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#951E14',
        },
      }}
    />
    <App.Screen
      name="PSIQuestionary"
      component={PSIQuestionary}
      options={{
        headerShown: true,
        title: 'Escala PSI',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#951E14',
        },
      }}
    />
    <App.Screen
      name="PRISMIIQuestionary"
      component={PRISMIIQuestionary}
      options={{
        headerShown: true,
        title: 'Escala PRISM II',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#951E14',
        },
      }}
    />
    <App.Screen
      name="APACHEIIQuestionary"
      component={APACHEIIQuestionary}
      options={{
        headerShown: true,
        title: 'Escala APACHE II',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#951E14',
        },
      }}
    />
    <App.Screen
      name="SOFAQuestionary"
      component={SOFAQuestionary}
      options={{
        headerShown: true,
        title: 'Escala SOFA',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#951E14',
        },
      }}
    />
  </App.Navigator>
);

export default AppRoutes;
