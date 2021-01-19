import styled from 'styled-components';

interface ButtonProps {
    size?: 'small' | 'large' | undefined;
    color?: 'white' | 'primary' | 'danger' | 'success' | 'warning' | undefined;
}

const Button = styled.button<ButtonProps>`
    border: 0;
    border-radius: 0px;
    background: ${props => props.color ? props.theme.colors[props.color] : 'white'};
    box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
    color: ${props => props.color ? 'white' : props.theme.colors.secondary};
    font-weight: bold;
    height: 30px;
    padding: 5px 15px;
    border-radius: 4px;
    whitespace: none;

    &:hover {
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(50,50,93,.21), 0 1px 3px rgba(0,0,0,.28);
    }
`;

export default Button;