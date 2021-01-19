import Button from "../Button/Button"
import { WorkflowHeaderContainer, WorkflowHeaderActions } from "./StyledWorkflow"

const WorkflowHeader = ({ pieceName, onSearch }: { pieceName: string, onSearch: Function }) => {

    return (
        <WorkflowHeaderContainer>
            <h1>{pieceName}</h1>
            <WorkflowHeaderActions>
                <input placeholder="Search" onChange={e => onSearch(e)} />
                <Button>+ Add</Button>
            </WorkflowHeaderActions>
        </WorkflowHeaderContainer>
    )
}

export default WorkflowHeader;