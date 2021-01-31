import React from 'react';
import { AmplifyS3Album } from "@aws-amplify/ui-react";
import Page from '../styled/Page';

const MediaPage = (): JSX.Element => {

    return (
        <Page>
            <AmplifyS3Album 
                path="assets/img"
            />
        </Page>
    )
}

export default MediaPage;