import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from "../Button/Button"
import { WorkflowHeaderContainer, WorkflowHeaderActions } from "./StyledWorkflow"

const WorkflowHeader = ({ pieceName, onSearch }: { pieceName: string, onSearch: { (e: ChangeEvent<HTMLInputElement>): void } }): JSX.Element => {

    return (
        <WorkflowHeaderContainer>
            <h1>{pieceName}</h1>
            <WorkflowHeaderActions>
                <input placeholder="Search" onChange={e => onSearch(e)} />
                <Link to={`/admin/pieces/${pieceName}/new`} ><Button color="success">+ Add</Button></Link>
            </WorkflowHeaderActions>
        </WorkflowHeaderContainer>
    )
}

export default WorkflowHeader;