import React from 'react';
import { ChangeEvent } from "react";
import { Piece } from "../../types/types";
import { ButtonContainer, TitleContainer } from "./StyledContextEditor";
import { Link, useHistory } from "react-router-dom";
import Button from '../Button/Button';
import { Text } from '../styled/Typography';


interface Props {
  pieceName: string;
  title: string;
  onUpdate: {
    (updates: Partial<Piece>): void
  };
  onSave: {
    (): void
  };
  unsavedChanges: boolean;
}

const ContentEditorTitle = ({ pieceName, title, onUpdate, onSave, unsavedChanges }: Props) => {

  const history = useHistory();

  const updateTitle = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = e.target;
    onUpdate({
      title: value
    });
  };
  
  const cancel = () => {
    if (unsavedChanges) {
      const confirmedCancel = confirm('You have unsaved changes. Are you sure you want to cancel?');
      if (confirmedCancel) {
        history.push(`/admin/pieces/${pieceName}`)
      }
    }
    else {
      history.push(`/admin/pieces/${pieceName}`)
    }
  }

  return (
    <TitleContainer>
      <input placeholder="Title" defaultValue={title} name="title" type="text" onChange={updateTitle} />
      <div>
        <ButtonContainer>
          {unsavedChanges && <Text color="danger" size="small">Unsaved changes</Text>}
          <Button onClick={cancel}>Cancel</Button>
          <Button color="success" onClick={e => onSave()}>Save</Button>
        </ButtonContainer>
      </div>
    </TitleContainer>
  )
};

export default React.memo(ContentEditorTitle);