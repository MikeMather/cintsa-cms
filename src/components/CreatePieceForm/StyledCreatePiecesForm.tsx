import styled from 'styled-components';

export const PieceFormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    color: ${props => props.theme.colors.black};

    padding: ${props => props.theme.spacing.lg};
    
    & > div {
        width: 70%;
        max-width: 350px;
        margin: 0 auto;
    }
`;

export const FieldContainer = styled.div`
    border: 2px solid ${props => props.theme.colors.main};
    border-radius: 4px;
    padding: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.lg};
`;