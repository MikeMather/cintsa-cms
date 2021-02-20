import styled from 'styled-components';


export const MediaContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
`;

export const ImageMask = styled.div`
  width: 100%;
  height: 80%;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.xs};

  amplify-s3-image {
    --width: 100%;
  }
`;

export const MediaItemContainer = styled.div<{selected?: boolean}>`
  width: 200px;
  height: 220px;
  position: relative;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.white};
  margin-right: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  color: ${props => props.theme.colors.darkGrey};
  box-shadow: ${props => props.theme.boxShadows.card};
  word-break: break-all;
  border: ${props => props.selected ? `1px solid ${props.theme.colors.main}` : 'none'};

  &:hover {
    box-shadow: ${props => props.theme.boxShadows.cardHover};
  }

  input {
    margin-right: ${props => props.theme.spacing.sm};
  }
`;

interface FileDropProps {
  dragOver: boolean
}

export const FileDropContainer = styled.div<FileDropProps>`
  border: ${props => props.dragOver ? `1px dashed ${props.theme.colors.main}` : 'none'};
`;

export const FileDropBlanket = styled.div`
  backdrop-filter: blur(4px);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 0.8;

  svg path {
    fill: ${props => props.theme.colors.lightBlue};
  }

  h3 {
    color: ${props => props.theme.colors.lightBlue};
  }
`;

export const MediaActions = styled.div`
  width: 100%;
  padding: ${props => props.theme.spacing.md} 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    margin-left: ${props => props.theme.spacing.md};
  }
`;