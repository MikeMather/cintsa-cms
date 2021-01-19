import React from 'react';
import Theme from './components/styled/Theme';
import Blanket from './components/styled/Blanket';
import Modal from './components/styled/Modal';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppRouter from './components/Router/Router';
import Authenticator from './components/Authenticator/Authenticor';


const App = () => (
  <BrowserRouter basename="/">
    <Switch>
      <Route path="/admin">
        <Theme>
          <Blanket>
            <Modal>
              <Authenticator>
                <AppRouter />
              </Authenticator>
            </Modal>
          </Blanket>
        </Theme>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
