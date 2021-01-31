import React from 'react';
import { Piece } from "../../types/types";
import { ContentEditorSidebarContainer } from "./StyledContextEditor";
import Select from 'react-select'
import { useContext } from "react";
import { AppContext } from "../Router/Router";
import { theme } from "../styled/Theme";
import FrontMatterList from './FrontMatterList';
import Button from '../Button/Button';
import StorageHandler from '../../state/StorageHandler';
import { useHistory } from 'react-router';
import { PIECE_DELETED } from '../../state/Reducer';

interface Props extends Piece {
  pieceName: string
  setPiece: {
    (piece: Piece): void
  }
  onUpdate: {
    (updates: Partial<Piece>): void
  }
}

const ContentEditorSidebar = ({ pieceName, onUpdate, setPiece, ...piece }: Props): JSX.Element => {
  const { appState, dispatch } = useContext(AppContext);
  const history = useHistory();

  const statusOptions = [
    {value: 'draft', label: 'Draft'},
    {value: 'review', label: 'Review'},
    {value: 'published', label: 'Published'},
  ];

  const layoutOptions = appState.layouts.map((layout: string) => ({
    value: layout, label: layout
  }))
  const statusColors: {[key: string]: string}= {
    draft: theme.colors.danger,
    review: theme.colors.warning,
    published: theme.colors.success
  }

  const selectColorGenerator = (provided: any, state: any) => ({
    ...provided,
    color: statusColors[state.data.value] || theme.colors.main,
    textTransform: 'capitalize'
  })

  const selectStyles = {
    option: selectColorGenerator,
    singleValue: selectColorGenerator
  };

  const updateVals = async (value: string, key: string) => {
    onUpdate({
        [key]: value
    });
  };

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
        <Select
            value={{ label: piece.status, value: piece.status }}
            options={statusOptions}
            styles={selectStyles}
            onChange={e => updateVals(e?.value || '', 'status')}
        />
      </label>
      <label>
        Layout
        <Select
            value={{ label: piece.layout, value: piece.layout }}
            options={layoutOptions}
            styles={selectStyles}
            onChange={e => updateVals(e?.value || '', 'layout')}
        />
      </label>
      <FrontMatterList {...piece} onUpdate={setPiece} />
      <Button color="danger" onClick={confirmDelete}>Delete Piece</Button>
    </ContentEditorSidebarContainer>
  )
};


export default ContentEditorSidebar;