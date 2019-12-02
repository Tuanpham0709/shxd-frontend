import { useState, useMemo, useEffect } from 'react';

export interface IAuthState {
  user?: any
  token?: string;
}

const useAuthState = () => {
  const initialState: IAuthState = {};

  const [state, setState] = useState(initialState);

  const actions = useMemo(() => getActions(setState), [setState]);

  useEffect(()=> {

  }, [state]);

  return { state, actions }
};

const autoRefreshToken = () => {
  setTimeout(function() {
    console.log('refresh token');
    autoRefreshToken();
  }, 10 * 60000)
};
autoRefreshToken();

export interface IActions {
  setUser?(...args): void;
  setToken?(...args): void;
}

const getActions = (setState): IActions => ({
  setUser: (user: any) => {
    setState(state => ({ ...state, user}))
  },
  setToken: (token: string) => {
    setState(state => ({ ...state, token}))
  }
});

export default useAuthState;
