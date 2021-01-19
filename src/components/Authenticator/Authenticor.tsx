import React, { useContext, useEffect, useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { AppContext } from '../Router/Router';
import { STATE_SET } from '../../state/Reducer';


const Authenticator = ({ children }: { children: any }) => {
  const [configured, setConfigured] = useState(false);
  const { appState, dispatch } = useContext(AppContext);
  
  useEffect(() => {
    fetch('/aws-exports.json')
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

  return (
    configured 
    ? <AmplifyAuthenticator>
      { children }
    </AmplifyAuthenticator>
    : null
  )
};

export default Authenticator;