import styled from 'styled-components';

interface TextProps {
    color?: 'white' | 'primary' | 'danger' | 'success' | 'warning' | undefined;
    size?: 'small' | 'large' | undefined;
    weight?: 'bold' | undefined;
}

export const Text = styled.p<TextProps>`
    color: ${props => props.color ? props.theme.colors[props.color] : props.theme.colors.black};
    font-weight: ${props => props.weight ? props.weight : 'normal'};
    font-size: ${props => props.size === 'small' ? props.theme.spacing.md : props.size === 'large' ? props.theme.spacing.lg : props.theme.spacing.lg};

    svg path {
        fill: ${props => props.color ? props.theme.colors[props.color] : props.theme.colors.black};
    }
`