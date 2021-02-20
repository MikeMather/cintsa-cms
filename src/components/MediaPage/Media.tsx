import React, { ChangeEvent } from 'react';
import {AmplifyS3Image} from "@aws-amplify/ui-react";
import { ImageMask, MediaItemContainer } from './StyledMedia';

interface Props {
  imgKey: string
  selected: boolean
  onSelect: { 
    (key: string): void 
  }
}

const Media = ({ imgKey, selected, onSelect }: Props): JSX.Element => {

  return (
    <MediaItemContainer onClick={e => onSelect(imgKey)} selected={selected} >
      <ImageMask>
        <AmplifyS3Image imgKey={`assets/img/${imgKey}`} />
      </ImageMask>
      {imgKey}
    </MediaItemContainer>
  )
}

export default Media;