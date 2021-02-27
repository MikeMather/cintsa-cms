import styled from 'styled-components';
import mdeStyles from '!!raw-loader!react-mde/lib/styles/css/react-mde-all.css';

export const MarkdownEditorContainer = styled.div`
  height: 100%;
  margin-top: ${props => props.theme.spacing.sm};
  ${mdeStyles}

  .markdown-editor {
    overflow: scroll;
    min-height: 400px !important;
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

  .mde-textarea-wrapper textarea {
    min-height: 400px !important;
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

export const ImageFieldContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  
  input {
      margin-right: ${props => props.theme.spacing.lg};
  }
`;

export const StyledDateField = styled.input`
  width: 200px;
`;

export const ImagePreview = styled.div`
  width: 200px;
  height: 200px;
  margin-top: ${props => props.theme.spacing.sm};
  margin-right: ${props => props.theme.spacing.md};
`;

export const ImagePreviewPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.mediumGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${props => props.theme.spacing.md};
  box-sizing: border-box;
  color: ${props => props.theme.colors.darkGrey};

  svg {
    width: 30px;
    margin-right: 10px;

    path {
      fill: ${props => props.theme.colors.darkGrey};
    }
  }
`