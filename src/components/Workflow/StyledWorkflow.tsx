import styled from 'styled-components';

export const WorkflowContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
`;

export const WorkflowHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: ${props => props.theme.spacing.lg} 0 ${props => props.theme.spacing.xl} 0;

    h1 {
        font-weight: bold;
        margin: 0;
        font-size: ${props => props.theme.spacing.xxl}
    }

    h1:first-letter {
        text-transform: capitalize;
    }
`;

export const WorkflowHeaderActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
        width: 180px;
        margin-right: ${props => props.theme.spacing.lg};
    }
`;

export const WorkflowColumnHeader = styled.div<{ color: string }>`
    height: 60px;
    background-color: ${props => props.theme.colors.lightestGrey};
    width: 100%;
    color: ${props => props.theme.colors[props.color]};
    font-weight: bold;
    display: flex;
    align-items: center;
    padding: ${props => props.theme.spacing.md};
    box-sizing: border-box;
    text-transform: capitalize;
    border-radius: 4px;
`;

export const Workflows = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    position: relative;
`;

export const WorkflowColumnContainer = styled.div<{ cardHovering: boolean}>`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 30%;
    margin-right: ${props => props.theme.spacing.xxl};
    border: ${props => props.cardHovering ? `1px solid ${props.theme.colors.mediumGrey}` : '1px solid transparent'};

    &:last-child {
        margin-right: 0;
    }  
`;

export const WorkflowCardContainer = styled.div`
    box-shadow: ${props => props.theme.boxShadows.card};
    box-sizing: border-box;
    cursor: pointer;
    padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md};
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: ${props => props.theme.spacing.lg};

    h4 {
        text-decoration: none;
        color: ${props => props.theme.colors.black};
        font-weight: bold;
        margin: 0;
    }

    small {
        color: ${props => props.theme.colors.darkGrey} !important;
        font-size: ${props => props.theme.spacing.md};
        margin-top: ${props => props.theme.spacing.xs};
    }

    svg {
        width: 25px;
        margin-right: ${props => props.theme.spacing.md};
    }

    &:hover {
        color: ${props => props.theme.colors.main};

        svg path {
            fill: ${props => props.theme.colors.main};
        }
    }
`;

export const WorkflowPlaceholder = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;