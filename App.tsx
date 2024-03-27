import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { LoginScreen } from './pages/login/login';
import { PaperTheme } from './components/theme';
import { Provider } from 'react-redux';
import { store } from './store/rootStore';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={PaperTheme}>
        <LoginScreen />
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
