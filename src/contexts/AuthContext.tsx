import React  from 'react';
import useAppState, { IAuthState, IActions  } from './useAuthState';

interface IAuthContext {
  state: IAuthState;
  actions: IActions;
}

export const AuthContext = React.createContext<IAuthContext>({
  state: {},
  actions: {}
});

export const AuthContextProvider:React.FC = (props) => {
  const {state, actions} = useAppState();
  return (
    <AuthContext.Provider value={{state, actions}}>
      {
        props.children
      }
    </AuthContext.Provider>
  );
};
