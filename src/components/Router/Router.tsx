import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import PiecesPage from '../PiecesPage/PiecesPage';
import { InitialState } from '../../types/types';
import { Reducer, STATE_SET } from '../../state/Reducer';
import StorageHandler from '../../state/StorageHandler';
import ContentEditorPage from '../ContentEditorPage/ContentEditorPage';

const initialState: InitialState = {
  pieces: {},
  layouts: []
};

interface ContextType {
  appState: InitialState;
  dispatch: any
}

export const AppContext = createContext<ContextType>({ appState: initialState, dispatch: null });

const AppRouter = () => {
  const [appState, dispatch] = useReducer(Reducer, initialState);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const storageHandler = new StorageHandler();
    setLoading(true);
    storageHandler.getStorageState().then((state: InitialState) => {
      console.log(state);
      dispatch({
        type: STATE_SET,
        payload: state
      });
      setLoading(false);
    });
  }, [])

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      <Header />
      <Route exact path="/admin">
        <PiecesPage />
      </Route>
      <Route exact path="/admin/content/:piece">
        <PiecesPage />
      </Route>
      <Route path="/admin/content/:pieceName/:slug">
        <ContentEditorPage />
      </Route>
      <Route exact path="/admin/media">
      </Route>
    </AppContext.Provider>
  )
};

export default AppRouter;
