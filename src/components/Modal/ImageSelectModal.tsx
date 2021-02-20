import { AmplifyS3Image } from '@aws-amplify/ui-react';
import React, { useContext } from 'react';
import { MediaItemContainer } from '../MediaPage/StyledMedia';
import { AppContext } from '../../App';
import { Modal, ImageModalContainer, ModalHeader, ModalTitle } from './StyledModal';
import CloseIcon from '../../icons/close.svg';
import Media from '../MediaPage/Media';
import UploadFileDrop from '../MediaPage/UploadFileDrop';

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
        <div>
          <ModalTitle>Select an Image</ModalTitle>
          <small>Or drop a file to upload</small>
        </div>
        <CloseIcon onClick={() => onClose('')} width={25}/>
      </ModalHeader>
      <UploadFileDrop>
        <ImageModalContainer>
          {appState.media.map((key: string) => (
            <Media key={key} imgKey={key} selected={false} onSelect={onClose} />
          ))}
        </ImageModalContainer>
      </UploadFileDrop>
    </Modal>
  )
};

export default ImageSelectModal;