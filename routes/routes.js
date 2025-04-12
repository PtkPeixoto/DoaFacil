import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from '../View/Dashboard/index';
import Cadastro from '../View/Cadastro';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Dashboard">
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Cadastro" component={Cadastro} />
          </Drawer.Navigator>
        </NavigationContainer>
      );
};

export default AppNavigator;