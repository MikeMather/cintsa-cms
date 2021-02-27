import React, { useState } from 'react';
import Button from '../Button/Button';
import { ImageMask } from '../MediaPage/StyledMedia';
import ImageSelectModal from '../Modal/ImageSelectModal';
import { ImageFieldContainer, ImagePreview, ImagePreviewPlaceholder } from './StyledFields';
import ImageIcon from '../../icons/image.svg';

interface Props {
  onUpdate: {
    (value: string): void
  }
  value: string
}

const ImageField = ({ onUpdate, value }: Props): JSX.Element => {

  const [showImageSelect, setShowImageSelect] = useState<boolean>(false);

  const onSelect = (key: string) => {
    onUpdate(`/assets/img/${key}`);
    setShowImageSelect(false);
  }

  return (
    <ImageFieldContainer>
      <ImagePreview>
        <ImageMask>
          {value 
            ? <img src={value} />
            : <ImagePreviewPlaceholder>
              <ImageIcon />
              <p>Select an image or use a url</p>
            </ImagePreviewPlaceholder>
          }
        </ImageMask>
      </ImagePreview>
      <input type="url" value={value} onChange={e => onUpdate(e.target.value)} placeholder="Select an image or use a URL"/>
      <Button onClick={() => setShowImageSelect(true)}>Select Image</Button>
      {showImageSelect && <ImageSelectModal onClose={onSelect} />}
    </ImageFieldContainer>
  )
};

export default ImageField;