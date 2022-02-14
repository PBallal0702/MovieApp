import React from 'react';
import Home from './screens/home'
import Detail from './screens/detail';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from './components/Navbar';
import Search from './screens/search';

const Stack = createNativeStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          headerTransparent:true,
          header:({navigation})=><Navbar navigation ={navigation} main={true} />
        }} />
        <Stack.Screen name="Detail" component={Detail} options={{
          headerTransparent:true,
          header:({navigation})=><Navbar navigation ={navigation} main={false} />
        }} />
        <Stack.Screen name="Search" component={Search} options={{
          headerTransparent:true,
          header:({navigation})=><Navbar navigation ={navigation} main={false} />
        }} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}
export default App;

