import { AmplifyS3Image } from '@aws-amplify/ui-react';
import React, { useContext } from 'react';
import { MediaItemContainer } from '../MediaPage/StyledMedia';
import { AppContext } from '../Router/Router';
import { Modal, ImageModalContainer, ModalHeader, ModalTitle } from './StyledModal';
import CloseIcon from '../../icons/close.svg';

interface Props {
  onClose: {
    (imgKey: string): void
  }
}

const ImageSelectModal = ({ onClose }: Props): JSX.Element => {

  const { appState } = useContext(AppContext);

  return (
    <Modal>
      <ModalHeader>
        <ModalTitle>Select an Image</ModalTitle>
        <CloseIcon onClick={() => onClose('')} width={25}/>
      </ModalHeader>
      <ImageModalContainer>
        {appState.media.map((key: string) => (
          <MediaItemContainer key={key} onClick={() => onClose(key)} >
            <AmplifyS3Image imgKey={`assets/img/${key}`} />
            {key}
          </MediaItemContainer>
        ))}
      </ImageModalContainer>
    </Modal>
  )
};

export default ImageSelectModal;