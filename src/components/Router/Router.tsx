import React, { createContext, useEffect, useReducer, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Header from '../Header/Header';
import PiecesPage from '../PiecesPage/PiecesPage';
import { InitialState } from '../../types/types';
import { Reducer, STATE_SET } from '../../state/Reducer';
import StorageHandler from '../../state/StorageHandler';
import ContentEditorPage from '../ContentEditorPage/ContentEditorPage';
import MediaPage from '../MediaPage/MediaPage';
import Loading from '../Loading/Loading';

const initialState: InitialState = {
  pieces: {},
  layouts: []
};

interface ContextType {
  appState: InitialState;
  dispatch: any
}

export const AppContext = createContext<ContextType>({ appState: initialState, dispatch: null });

const AppRouter = (): JSX.Element => {
  const [appState, dispatch] = useReducer(Reducer, initialState);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const storageHandler = new StorageHandler();
    setLoading(true);
    storageHandler.getStorageState().then((state: InitialState) => {
      dispatch({
        type: STATE_SET,
        payload: state
      });
      setLoading(false);
    });
  }, [])

  return (
    loading 
    ? <Loading />
    : <AppContext.Provider value={{ appState, dispatch }}>
      <Header />
      <Redirect from='/admin' to='/admin/pieces' />
      <Route exact path="/admin/pieces">
        <PiecesPage />
      </Route>
      <Route exact path="/admin/pieces/:piece">
        <PiecesPage />
      </Route>
      <Route path="/admin/pieces/new/:pieceName">
        <ContentEditorPage />
      </Route>
      <Route path="/admin/pieces/:pieceName/:slug">
        <ContentEditorPage />
      </Route>
      <Route exact path="/admin/media">
        <MediaPage />
      </Route>
    </AppContext.Provider>
  )
};

export default AppRouter;
