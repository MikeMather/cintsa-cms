import React from 'react';
import { Piece } from "../../types/types";
import { ContentEditorSidebarContainer } from "./StyledContextEditor";
import Select from 'react-select'
import { useContext } from "react";
import { AppContext } from "../Router/Router";
import { theme } from "../styled/Theme";
import FrontMatterList from './FrontMatterList';

interface Props extends Piece {
  pieceName: string
  onUpdate: Function
}

const ContentEditorSidebar = ({ pieceName, onUpdate, ...piece }: Props) => {
  const { appState } = useContext(AppContext);

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

  return (
    <ContentEditorSidebarContainer>
      <label>
          Slug
          <p>{piece.slug}</p>
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
      <FrontMatterList {...piece} onUpdate={onUpdate} />
    </ContentEditorSidebarContainer>
  )
};


export default ContentEditorSidebar;