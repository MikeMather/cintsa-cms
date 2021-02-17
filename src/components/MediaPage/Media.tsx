import React, { ChangeEvent } from 'react';
import {AmplifyS3Image} from "@aws-amplify/ui-react";
import { MediaItemContainer } from './StyledMedia';

interface Props {
  imgKey: string
  selected: boolean
  onSelect: { 
    (checked: string, key: string): void 
  }
}

const Media = ({ imgKey, selected, onSelect }: Props): JSX.Element => {

  return (
    <label>
      <MediaItemContainer>
        <AmplifyS3Image imgKey={`assets/img/${imgKey}`} />
          <input type="checkbox" checked={selected} onChange={e => onSelect(e.target.value, imgKey)} />
          {imgKey}
      </MediaItemContainer>
    </label>
  )
}

export default Media;