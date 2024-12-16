
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/CustomerNavigation';




export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  );
}


