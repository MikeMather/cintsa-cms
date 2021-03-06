import React from 'react'
import PiecesSidebar from '../PiecesSidebar/PiecesSidebar';
import Page from '../styled/Page';
import Workflow from '../Workflow/Workflow';
import { PiecesPageContainer } from './StyledPiecesPage';

const PiecesPage = (): JSX.Element => {
    
    return (
        <Page>
            <PiecesPageContainer>
                <PiecesSidebar />
                <Workflow />
            </PiecesPageContainer>
        </Page>
    )
};

export default PiecesPage;