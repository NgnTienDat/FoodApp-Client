
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/CustomerNavigation';
import { MyDispatchContext, MyUserContext, SearchProvider } from './src/config/UserContexts';
import { useReducer } from 'react';
import MyUserReducer from './src/config/UserReducers';


import 'react-native-gesture-handler';
import CartProvider from './src/config/CartContext';


export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        {children}
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
};


export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <SearchProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SearchProvider>
      </CartProvider>
    </UserProvider>
  );
}


// export default function App() {
//   const [user, dispatch] = useReducer(MyUserReducer, null)
  
//   return (
//     <NavigationContainer>
//       <MyUserContext.Provider value={user}>
//         <MyDispatchContext.Provider value={dispatch}>
//           <RootNavigator />
//         </MyDispatchContext.Provider>
//       </MyUserContext.Provider>
//     </NavigationContainer>
//   );
// }


