import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Modal, ModalHeader, ModalTitle } from './StyledModal';
import CloseIcon from '../../icons/close.svg';
import CreatePieceForm from '../CreatePieceForm/CreatePieceForm';

interface Props {
  onClose: {
    (): void
  }
}

const CreatePieceModal = ({ onClose }: Props): JSX.Element => {

  const { appState } = useContext(AppContext);

  return (
    <Modal>
      <ModalHeader>
        <div>
          <ModalTitle>Create a new Piece</ModalTitle>
        </div>
        <CloseIcon onClick={onClose} width={25}/>
      </ModalHeader>
      <CreatePieceForm onCreate={onClose} />
    </Modal>
  )
};

export default CreatePieceModal;