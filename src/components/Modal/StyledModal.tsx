import styled from 'styled-components';

export const Modal = styled.div`
    width: 60%;
    height: 60%;
    background: white;
    overflow-y: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: ${props => props.theme.boxShadows.modal};
    border-radius: 4px;
    padding: ${props => props.theme.spacing.xl};
    z-index: 1;
`;

export const ModalTitle = styled.h1`
    font-weight: bold;
    font-size: ${props => props.theme.spacing.xl};
    margin: 0;
    color: ${props => props.theme.colors.black};
`

export const ModalHeader = styled.div`
    padding: ${props => props.theme.spacing.md};
    display: flex;
    justify-content: space-between;

    svg {
        cursor: pointer;
        margin-left: ${props => props.theme.spacing.md};

        path {
            fill: ${props => props.theme.colors.darkGrey};
        }
        
        &:hover {
            fill: ${props => props.theme.colors.black};
        }
    }
`;

export const ImageModalContainer = styled.div`
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
`;