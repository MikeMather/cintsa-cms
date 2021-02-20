import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from "../Button/Button"
import { WorkflowHeaderContainer, WorkflowHeaderActions, LayoutOptions, LayoutOption } from "./StyledWorkflow"
import RowViewIcon from '../../icons/rows.svg';
import ColumnViewIcon from '../../icons/columns.svg';

interface Props {
  pieceName: string
  layout: 'rows' | 'columns' | null
  onSearch: { 
    (e: ChangeEvent<HTMLInputElement>): void 
  }
  onLayoutChange: {
    (layout: 'rows' | 'columns'): void
  }
}

const WorkflowHeader = ({ pieceName, onSearch, onLayoutChange, layout }: Props): JSX.Element => {
  return (
    <div>
      <WorkflowHeaderContainer>
        <h1>{pieceName}</h1>
        <WorkflowHeaderActions>
          <input placeholder="Search" onChange={e => onSearch(e)} />
          <Link to={`/admin/pieces/${pieceName}/new`} ><Button color="success">+ Add</Button></Link>
        </WorkflowHeaderActions>
      </WorkflowHeaderContainer>
      <LayoutOptions>
        <LayoutOption selected={layout==='rows'} onClick={e => onLayoutChange('rows')}>
          <RowViewIcon />
        </LayoutOption>
        <LayoutOption selected={layout==='columns'} onClick={e => onLayoutChange('columns')}>
          <ColumnViewIcon />
        </LayoutOption>
      </LayoutOptions>
    </div>
  )
}

export default WorkflowHeader;