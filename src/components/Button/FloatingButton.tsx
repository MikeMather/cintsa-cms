import styled from 'styled-components';

interface ButtonProps {
    color?: 'white' | 'primary' | 'danger' | 'success' | 'warning' | undefined;
}

const FloatingButton = styled.button<ButtonProps>`
    border: 0;
    border-radius: 0px;
    background: ${props => props.color ? props.theme.colors[props.color] : 'white'};
    box-shadow: ${props => props.theme.boxShadows.floatingButton};
    color: ${props => props.color ? 'white' : props.theme.colors.secondary};
    font-weight: bold;
    height: 30px;
    padding: 5px 15px;
    border-radius: 4px;
    whitespace: none;

    &:hover {
        cursor: pointer;
    }
`;

export default FloatingButton;