import styled from 'styled-components';

export const ContentEditorContainer = styled.div`
  width: 100%;
  padding-bottom: ${props => props.theme.spacing.lg};
`;

export const ContentEditorHeader = styled.div`
  width: 100%;

  svg {
    width: 25px;
  }
  a:hover {
    svg path {
      fill: ${props => props.theme.colors.main};
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  
  button, p {
    margin-left: ${props => props.theme.spacing.md};
  }
`;

export const PieceEditorContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const ContentEditorSidebarContainer = styled.div`
  width: 25%;
  height: 100%;
  margin-right: ${props => props.theme.spacing.lg};

  label {
    margin-bottom: ${props => props.theme.spacing.xxl};
  }

  a {
    border: none;
    background: none;
    font-weight: normal;
    padding-left: 0;
    font-size: ${props => props.theme.spacing.lg};
    margin: 0;
    margin-bottom: ${props => props.theme.spacing.sm};
    padding-top: ${props => props.theme.spacing.sm};
    box-sizing: border-box;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    width: 70%;
    font-size: ${props => props.theme.spacing.xl};
    font-weight: bold;
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.black};
  }
`;


export const StyledFloatingButton = styled.div`
  position: fixed;
  right: 7%;
  bottom: 7%;
`;

export const PreviewFrame = styled.iframe`
  width: 100%;
  height: 90vh;
`;

export const ContentFieldsContainer = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.lightestGrey};
  border-radius: 4px;
  box-sizing: border-box;
  padding: ${props => props.theme.spacing.xxl};
`