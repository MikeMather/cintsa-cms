import React from 'react';
import { ChangeEvent } from "react";
import { Piece } from "../../types/types";
import { ButtonContainer, TitleContainer } from "./StyledContextEditor";
import { Link } from "react-router-dom";
import ArrowLeft from '../../icons/arrowLeft.svg';
import Button from '../Button/Button';


interface Props {
  pieceName: string;
  title: string;
  onUpdate: {
    (updates: Partial<Piece>): void
  };
  onSave: {
    (): void
  };
}

const ContentEditorTitle = ({ pieceName, title, onUpdate, onSave }: Props) => {

  const updateTitle = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = e.target;
    onUpdate({
      title: value
    });
  };

  return (
    <TitleContainer>
      <input placeholder="Title" defaultValue={title} name="title" type="text" onChange={updateTitle} />
      <ButtonContainer>
        <Link to={`/admin/pieces/${pieceName}`}>
          <Button>Cancel</Button>
        </Link>
        <Button color="success" onClick={e => onSave()}>Save</Button>
      </ButtonContainer>
    </TitleContainer>
  )
};

export default React.memo(ContentEditorTitle);