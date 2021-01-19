import styled from 'styled-components';

export const HeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    border-bottom: 1px solid ${props => props.theme.colors.mediumGrey};
    height: 80px;
    padding: 20px;
    box-sizing: border-box;
`;

type NavButtonProps = {
    active: boolean;
}

export const NavButton = styled.div<NavButtonProps>`
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0 ${props => props.theme.spacing.xl};

    a {
        font-weight: bold;
        font-size: ${props => props.theme.spacing.lg};
        color: ${props => props.active ? props.theme.colors.main : props.theme.colors.black};
        text-decoration: none;
        display: flex;
        align-items: center;
    }

    svg {
        width: 20px;
        margin-right: ${props => props.theme.spacing.sm};
        
        path {
            fill: ${props => props.active ? props.theme.colors.main : props.theme.colors.black};
        }
    }

    a:hover {
        color: ${props => props.theme.colors.main};
        
        svg path {
            fill: ${props => props.theme.colors.main} !important;
        }
    }
`;