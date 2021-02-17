import styled from 'styled-components';


export const MediaContainer = styled.div`
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
`;

export const MediaItemContainer = styled.div`
  width: 200px;
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

  &:hover {
    box-shadow: ${props => props.theme.boxShadows.cardHover};
  }
  

  amplify-s3-image {
    --width: 100%;
  }

  input {
    margin-right: ${props => props.theme.spacing.sm};
  }
`;