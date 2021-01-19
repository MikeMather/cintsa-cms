import { Piece } from "../../types/types";
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { AppContext } from "../Router/Router"
import { useParams } from 'react-router-dom';
import { WorkflowContainer, Workflows } from "./StyledWorkflow";
import WorkflowColumn from "./WorkflowColumn";
import WorkflowHeader from "./WorkflowHeader";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { PIECE_UPDATED } from "../../state/Reducer";

type Content = {
    draft: Piece[],
    review: Piece[],
    published: Piece[],
    [key: string]: Piece[]
};

interface RouteParams {
    piece: string
}

const Workflow = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { piece } = useParams<RouteParams>()
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [content, setContent] = useState<Content>({
    draft: [],
    review: [],
    published: []
  });
  const [filteredContent, setFilteredContent] = useState<Content>(content);

  const getContent = (contentList: Piece[]): Content => {
    const structuredContent: Content = contentList.reduce<Content>((main: Content, item: Piece) => {
      main[item.status] = [ ...main[item.status], item ];
      return main;
    }, { draft: [], review: [], published: [] });
    return structuredContent;
  }

  const onSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    if (value) {
      setSearchTerm(value);
      setFilteredContent(filterContent(value, content));
    }
    else {
      setFilteredContent(content);
    }
  };

  const filterContent = (searchVal: string, structuredContent: Content): Content => {
    const newContent: Content = { draft: [], review: [], published: [] };
    Object.keys(structuredContent).forEach((key: string) => {
      const filtered = structuredContent[key].filter((post: Piece) => post.title.toLowerCase().includes(searchVal.toLowerCase()));
      newContent[key] = filtered;
    });
    return newContent;
  }

  useEffect(() => {
    if (piece) {
      const structuredContent = getContent(appState.pieces[piece])
      setContent(structuredContent);
      setFilteredContent(filterContent(searchTerm, structuredContent));
    }
  }, [appState, piece]);

  const onPostMove = (event: { piece: Piece }, moveTo: string): void => {
    dispatch({
      type: PIECE_UPDATED,
      payload: {
        pieceName: piece,
        piece: {
          ...event.piece,
          status: moveTo
        }
      }
    });
  };

  return  (
    <WorkflowContainer>
      <WorkflowHeader pieceName={piece} onSearch={onSearch} />
      <Workflows>
        <DndProvider backend={HTML5Backend}>
          <WorkflowColumn content={filteredContent.draft} stage={'draft'} onPostMove={onPostMove} />
          <WorkflowColumn content={filteredContent.review} stage={'review'} onPostMove={onPostMove} />
          <WorkflowColumn content={filteredContent.published} stage={'published'} onPostMove={onPostMove} />
        </DndProvider>
      </Workflows>
    </WorkflowContainer>
  )
}

export default Workflow;