import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Header from '../Header/Header';
import PiecesPage from '../PiecesPage/PiecesPage';
import ContentEditorPage from '../ContentEditorPage/ContentEditorPage';
import MediaPage from '../MediaPage/MediaPage';
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { AppContext } from '../../App';


const AppRouter = (): JSX.Element => {

  const { appState } = useContext(AppContext);

  return (
    <>
      <Header />
      <Redirect from='/admin' to='/admin/pieces' />
      <Route exact path="/admin/pieces">
        {Object.keys(appState.pieces).length 
          ? <Redirect from='/admin' to={`/admin/pieces/${Object.keys(appState.pieces)[0]}`} />
          : <PiecesPage />
        }
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
      <Route exact path="/admin/settings">
        <div>
         <AmplifySignOut button-text="Log Out"></AmplifySignOut>
        </div>
      </Route>
    </>
  )
};

export default AppRouter;
