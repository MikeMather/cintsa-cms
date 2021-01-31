import React, { ChangeEvent } from 'react';
import Theme from './components/styled/Theme';
import Blanket from './components/styled/Blanket';
import AppContainer from './components/styled/AppContainer';
import { HashRouter, Switch, Route } from 'react-router-dom';
import AppRouter from './components/Router/Router';
import Authenticator from './components/Authenticator/Authenticor';


const App = (): JSX.Element => (
  <HashRouter basename="/" >
    <Switch>
      <Route path="/admin">
        <Theme>
          <Blanket>
            <AppContainer>
              <Authenticator>
                <AppRouter />
              </Authenticator>
            </AppContainer>
          </Blanket>
        </Theme>
      </Route>
    </Switch>
  </HashRouter>
);

export default App;
