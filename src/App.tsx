import React, { createContext, useEffect, useReducer, useState } from 'react';
import Theme from './components/styled/Theme';
import Blanket from './components/styled/Blanket';
import AppContainer from './components/styled/AppContainer';
import { HashRouter, Switch, Route } from 'react-router-dom';
import AppRouter from './components/Router/Router';
import Authenticator from './components/Authenticator/Authenticor';
import Loading from './components/Loading/Loading';
import DispatchMiddleware from './state/DispatchMiddleware';
import { InitialState } from './types/types';
import { Reducer, STATE_SET } from './state/Reducer';
import StorageHandler from './state/StorageHandler';

export const initialState: InitialState = {
  auth: {
    signedIn: false,
    username: ''
  },
  pieces: {},
  layouts: [],
  media: [],
  settings: {
    layout: {
      workflowView: 'rows'
    }
  }
};

interface ContextType {
  appState: InitialState;
  dispatch: any
}

export const AppContext = createContext<ContextType>({ appState: initialState, dispatch: null });


const App = (): JSX.Element => {
  const [appState, dispatch] = useReducer(Reducer, initialState);
  const [loading, setLoading] = useState(true);

  const getAppState = (): void => {
    const storageHandler = new StorageHandler();
    setLoading(true);
    storageHandler.getStorageState().then((state: Partial<InitialState>) => {
      dispatch({
        type: STATE_SET,
        payload: {
          ...appState,
          ...state
        }
      });
      setLoading(false);
    });
  }

  useEffect(() => {
    if (appState.auth.signedIn) {
      getAppState();
    }
  }, [appState.auth.signedIn])

  return (
    <HashRouter basename="/" >
      <Theme>
        <Blanket>
          <AppContainer>
            <AppContext.Provider value={{ appState, dispatch: DispatchMiddleware(dispatch) }}>
              <Authenticator>
                {loading 
                  ? <Loading />
                  : <Switch>
                    <Route path="/">
                      <AppRouter />
                    </Route>
                  </Switch>
                }
              </Authenticator>
            </AppContext.Provider>
          </AppContainer>
        </Blanket>
      </Theme>
    </HashRouter>
  );
}

export default App;
