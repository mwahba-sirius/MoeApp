import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { LoginScreen } from './pages/login/login';
import { PaperTheme } from './components/theme';
import { Provider } from 'react-redux';
import { store } from './store/rootStore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Router } from './components/router';

const Tab = createBottomTabNavigator();
const StackNavigator = createNativeStackNavigator();

export default function App() {
  
  return (
    <Provider store={store}>
      <PaperProvider theme={PaperTheme}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>

      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(180deg,#1494B8 0%,#0C4358 100%)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
