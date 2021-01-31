import { ThemeProvider } from "styled-components";
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'

export const theme = {
    colors: {
        success: '#29BF12',
        danger: '#F07167',
        warning: '#FFA800',
        main: '#087F8C',
        secondary: '#5AAA95',
        tertiary: '#095256',
        black: '#4c555a',
        lightestGrey: '#f5f7f9',
        lightGrey: '#F5F5F5',
        mediumGrey: '#E5E5E5',
        darkGrey: '#6E6E6E'
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '22px',
        xxl: '32px'
    },
    boxShadows: {
        card: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);'
    }
};

const GlobalStyles = styled.div`
  width: 100%;
  height: 100%;

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.main};
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.colors.tertiary};
    }
  }

  input {
    padding: 8px;
    border: 1px solid ${props => props.theme.colors.mediumGrey};
    color: ${props => props.theme.colors.darkGrey};
    border-radius: 4px;
    margin: ${propse => propse.theme.spacing.xs} 0;
  }

  input:focus {
    outline: none;
  }

  input::placeholder {
    color: ${props => props.theme.colors.grey};
    opacity: 0.4;
  }

  label {
    font-weight: bold;
    font-size: ${propse => propse.theme.spacing.md};
    display: flex;
    flex-direction: column;
    margin-bottom: ${propse => propse.theme.spacing.lg};
  }
`;

const Reset = createGlobalStyle`
  ${reset}
`

const Theme = ({ children }: { children: any }): JSX.Element => (  
  <ThemeProvider theme={theme}>
    <GlobalStyles>{ children }</GlobalStyles>
  </ThemeProvider>
)

export default Theme;
