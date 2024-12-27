
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/CustomerNavigation';
import { MyDispatchContext, MyUserContext } from './src/config/UserContexts';
import { useReducer } from 'react';
import MyUserReducer from './src/config/UserReducers';




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
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
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


