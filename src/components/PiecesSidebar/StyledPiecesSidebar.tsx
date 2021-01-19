import styled from 'styled-components';

export const SidebarHeader = styled.div`
    font-size: ${props => props.theme.spacing.xl};
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    height: 42px;
    margin-top: ${props => props.theme.spacing.xl};

    p {
        margin: 0;
    }
`;

export const SidebarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    margin-right: ${props => props.theme.spacing.xxl};
`;

export const SidebarPieceList = styled.div`
    display: flex;
    flex-direction: column;
`;
