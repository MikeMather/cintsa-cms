import React from 'react';
import { ChangeEvent } from "react";
import { Piece } from "../../types/types";
import { ButtonContainer, TitleContainer } from "./StyledContextEditor";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '../../icons/arrowLeft.svg';
import Button from '../Button/Button';


const ContentEditorTitle = ({ pieceName, title, onUpdate, onSave }: { pieceName: string, title: string, onUpdate: Function, onSave: Function }) => {

  const updateTitle = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = e.target;
    onUpdate({
      title: value
    });
  };

  return (
    <TitleContainer>
      <input defaultValue={title} name="title" type="text" onChange={updateTitle} />
      <ButtonContainer>
        <Link to={`/admin/content/${pieceName}`}>
          <Button>Cancel</Button>
        </Link>
        <Button color="success" onClick={e => onSave()}>Save</Button>
      </ButtonContainer>
    </TitleContainer>
  )
};

export default React.memo(ContentEditorTitle);