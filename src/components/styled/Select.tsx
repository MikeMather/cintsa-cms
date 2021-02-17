import styled from 'styled-components';

interface SelectProps {
    color?: 'white' | 'primary' | 'danger' | 'success' | 'warning' | undefined;
}

export const Select = styled.select<SelectProps>`
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.xs};
    font-weight: bold;
    border-color: ${props => props.theme.colors.mediumGrey};
    color: ${props => props.color ? props.theme.colors[props.color] : props.theme.colors.black};
`;