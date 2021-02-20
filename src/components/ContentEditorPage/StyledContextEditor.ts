import styled from 'styled-components';
import mdeStyles from '!!raw-loader!react-mde/lib/styles/css/react-mde-all.css';

export const ContentEditorContainer = styled.div`
  width: 100%;
  height: 100%;
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
  
  button {
    margin-left: ${props => props.theme.spacing.md};
  }
`;

export const PieceEditorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const ContentEditorSidebarContainer = styled.div<{collapsed: boolean}>`
  width: ${props => props.collapsed ? '0%' : '25%'};
  display: ${props => props.collapsed ? 'none' : 'block'};
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

export const MarkdownEditorContainer = styled.div<{fullWidth: boolean}>`
  height: 100%;
  width: ${props => props.fullWidth ? '100%' : '75%'};
  ${mdeStyles}

  .markdown-editor {
    overflow: scroll;
    height: 90% !important;
    position: relative;
    border-radius: 4px;
    border-color: ${props => props.theme.colors.mediumGrey};
  }

  .markdown-editor-text {
    height: 100% !important;
    line-height: 18px;
    font-size: 14px;
    font-family: 'Poppins', 'Helvetica', sans-serif;
  }

  .mde-header + div {
    height: 88% !important;
  }

  .mde-textarea-wrapper {
    height: 100% !important;
  }

  .mde-header {
    background: ${props => props.theme.colors.lightestGrey};
    color: ${props => props.theme.colors.black};
  }

  .mde-header .mde-tabs {
    display: none;
  }

  .mde-preview-content img {
    max-width: 100%;
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

export const FrontMatterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${props => props.theme.spacing.lg};

  label {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  label:first-of-type {
    width: 30%;
    margin-right: ${props => props.theme.spacing.md};
  }

  label:last-of-type {
    width: 55%;
    margin-right: ${props => props.theme.spacing.sm};
  }

  button {
    margin-top: ${props => props.theme.spacing.sm};
  }
`;

export const FrontMatter = styled.div`
  display: block;
  margin-bottom: ${props => props.theme.spacing.lg};

  label {
    margin: 0;
  }

  p {
    margin: 0;
    margin-bottom: ${props => props.theme.spacing.xxl};
    color: ${props => props.theme.colors.darkGrey};
    font-size: ${props => props.theme.spacing.md};
  }

  button {
    margin-top: ${props => props.theme.spacing.md};
  }
`

export const StyledFloatingButton = styled.div`
  position: absolute;
  right: 5%;
  bottom: 5%;
`;

export const PreviewFrame = styled.iframe`
  width: 100%;
  height: 100%;
`;