import { ContentEditorContainer, ContentEditorHeader, PieceEditorContainer } from "./StyledContextEditor"
import Page from "../styled/Page";
import { useParams } from "react-router-dom";
import MarkdownEditor from "./MarkdownEditor";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Router/Router";
import { Piece } from '../../types/types';
import ContentEditorSidebar from "./ContentEditorSidebar";
import ContentEditorTitle from "./ContentEditorTitle";
import cogoToast from "cogo-toast";
import { useHistory } from "react-router-dom";
import { PIECE_UPDATED } from '../../state/Reducer';

const emptyPiece: Piece = {
  id: '',
  title: '',
  layout: '',
  status: 'draft',
  slug: '',
  name: ''
};

const ContentEditorPage = () => {
  const { pieceName, slug } = useParams<{ pieceName: string, slug: string }>();
  const { appState, dispatch } = useContext(AppContext);
  const [piece, setPiece] = useState<Piece>(emptyPiece);
  const history = useHistory();

  useEffect(() => {
    if (pieceName && appState.pieces[pieceName]) {
      const post = appState.pieces[pieceName].find((post: Piece) => (
          post.slug === `${pieceName}/${slug}`
      ));
      setPiece(post || emptyPiece);
    }
  }, [pieceName, slug]);

  const slugify = (text: string): string => {
    const slug = text.toLowerCase()
    .replace(/[^\w ]+/g,'')
    .replace(/ +/g,'-');
    return `${pieceName}/${slug}`
  };

  const updatePiece = (updates: Partial<Piece>) => {
    if (updates.title) {
      updates.slug = slugify(updates.title);
    }
    setPiece({
      ...piece,
      ...updates
    });
  };

  const savePiece = (): void => {
    cogoToast.loading('Saving piece...').then(() => {
      dispatch({
        type: PIECE_UPDATED,
        payload: {
          pieceName,
          piece
        }
      })
      history.push(`/admin/content/${pieceName}`);
    })
  }

  const editorProps = {
    pieceName,
    onUpdate: updatePiece
  }

  return (
    <Page>
      <ContentEditorContainer>
        <ContentEditorHeader>
          <ContentEditorTitle {...editorProps} title={piece.title} onSave={savePiece}/>
        </ContentEditorHeader>
        <PieceEditorContainer>
          <ContentEditorSidebar 
            {...editorProps}  
            {...piece}
          />
          <MarkdownEditor onUpdate={updatePiece} content={piece.content} />
        </PieceEditorContainer>
      </ContentEditorContainer>
    </Page>
  )
};

export default ContentEditorPage;