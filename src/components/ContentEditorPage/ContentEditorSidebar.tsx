import React, { useEffect, useState } from 'react';
import { Piece } from "../../types/types";
import { ContentEditorSidebarContainer } from "./StyledContextEditor";
import { useContext } from "react";
import { AppContext } from "../../App";
import Button from '../Button/Button';
import { useHistory } from 'react-router';
import { PIECE_DELETED } from '../../state/Reducer';
import { Select } from '../styled/Select';

interface Props extends Piece {
  pieceName: string
  onUpdate: {
    (updates: Partial<Piece>): void
  }
}

const ContentEditorSidebar = ({ pieceName, onUpdate, ...piece }: Props): JSX.Element => {
  const { appState, dispatch } = useContext(AppContext);
  const [pieceCount, setPieceCount] = useState<number>(appState.pieces[pieceName] ? appState.pieces[pieceName].items.length : 0);
  const history = useHistory();

  const statusOptions = [
    {value: 'draft', label: 'Draft'},
    {value: 'review', label: 'Review'},
    {value: 'published', label: 'Published'},
  ];

  const layoutOptions = appState.layouts.map((layout: string) => ({
    value: layout, label: layout
  }))
  
  const statusColors: {[key: string]: 'danger' | 'warning' | 'success'} = {
    draft: 'danger',
    review: 'warning',
    published: 'success'
  }

  const updateVals = async (value: string, key: string) => {
    onUpdate({
        [key]: value
    });
  };

  // Go back if piece was deleted
  useEffect(() => {
    if (appState.pieces[pieceName] && appState.pieces[pieceName].items.length < pieceCount) {
      history.goBack();
    }
  }, [appState.pieces[pieceName].items])

  const confirmDelete = () => {
    const confirmed = confirm('Are you sure you want to delete this piece?');
    if (confirmed) {
      dispatch({
        type: PIECE_DELETED,
        payload: {
          pieceName,
          piece
        }
      });
    }
  }

  return (
    <ContentEditorSidebarContainer>
      <label>
          Slug
          <a href={`/${piece.slug}`}>{piece.slug}</a>
      </label>
      <label>
        Status
        <Select onChange={e => updateVals(e.target.value, 'status')} value={piece.status} color={statusColors[piece.status]}>
          {statusOptions.map((option: { value: string, label: string}) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}          
        </Select>
      </label>
      <label>
        Layout
        <Select onChange={e => updateVals(e.target.value, 'layout')} value={piece.layout}>
          {layoutOptions.map((option: { value: string, label: string}) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}          
        </Select>
      </label>
      <Button color="danger" onClick={confirmDelete}>Delete Piece</Button>
    </ContentEditorSidebarContainer>
  )
};


export default ContentEditorSidebar;