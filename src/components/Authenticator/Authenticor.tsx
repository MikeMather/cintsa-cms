import React, { useContext, useEffect, useState } from 'react';
import { Amplify, Auth, auth0SignInButton } from 'aws-amplify';
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AppContext, initialState } from '../../App';
import { AUTH_STATE_UPDATED, STATE_SET } from '../../state/Reducer';

const Authenticator = ({ children }: { children: any }): JSX.Element | null => {
  const [configured, setConfigured] = useState(false);
  const { dispatch } = useContext(AppContext);
  
  useEffect(() => {
    fetch('/assets/js/aws-exports.json')
    .then(res => res.json())
    .then(config => {
      const awsConf = {
        Auth: { 
          ...config.Auth,
          mandatorySignIn: true
        },
        Storage: { 
          ...config.Storage,
          identityPoolId: config.Auth.identityPoolId,
          customPrefix: {
            public: '',
            protected: '',
            private: ''
          }
        }
      }
      Amplify.configure(awsConf);
      Auth.configure(awsConf);
      setConfigured(true);
    }).catch(err => console.log(err))
}, [])

useEffect(() => {
  return onAuthUIStateChange((nextAuthState: any, authData: any) => {
    if (authData && nextAuthState === 'signedin') {
      dispatch({
        type: AUTH_STATE_UPDATED,
        payload: {
          username: authData.username,
          signedIn: nextAuthState === 'signedin'
        }
      })
    }
    else if (nextAuthState === 'signedout') {
      dispatch({
        type: STATE_SET,
        payload: {
          ...initialState
        }
      })
    }
  });
}, [])

  return (
    configured 
    ? <AmplifyAuthenticator>
      { children }
    </AmplifyAuthenticator>
    : null
  )
};

export default Authenticator;