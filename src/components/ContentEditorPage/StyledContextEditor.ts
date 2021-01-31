import styled from 'styled-components';

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
    height: 15px;
    padding-left: 0;
    font-size: ${props => props.theme.spacing.lg};
    margin: 0;
    margin-bottom: ${props => props.theme.spacing.sm};
    padding-top: ${props => props.theme.spacing.sm};
    box-sizing: border-box;
  }
`;

export const MarkdownEditorContainer = styled.div`
  height: 100%;
  width: 75%;

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
    height: 25px;
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