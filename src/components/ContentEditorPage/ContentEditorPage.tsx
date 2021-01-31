import { ContentEditorContainer, ContentEditorHeader, PieceEditorContainer } from "./StyledContextEditor"
import Page from "../styled/Page";
import { useParams } from "react-router-dom";
import MarkdownEditor from "./MarkdownEditor";
import React, { useContext, useEffect, useState } from "react";
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
  slug: ''
};

const ContentEditorPage = (): JSX.Element => {
  const { pieceName, slug } = useParams<{ pieceName: string, slug: string | undefined }>();
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
  }, [pieceName, slug, appState.pieces]);

  const slugify = (text: string): string => {
    const slug = text.toLowerCase()
    .replace(/[^\w ]+/g,'')
    .replace(/ +/g,'-');
    return `${pieceName}/${slug}`
  };

  const updatePiece = (updates: Partial<Piece>): void => {
    if (updates.title) {
      updates.slug = slugify(updates.title);
    }
    setPiece({
      ...piece,
      ...updates
    });
  };

  const savePiece = (): void => {
    dispatch({
      type: PIECE_UPDATED,
      payload: {
        pieceName,
        piece
      }
    })
    history.push(`/admin/pieces/${pieceName}`);
  }

  const editorProps = {
    pieceName,
    onUpdate: updatePiece,
    setPiece
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
          <MarkdownEditor onUpdate={updatePiece} content={piece.content} status={piece.status} />
        </PieceEditorContainer>
      </ContentEditorContainer>
    </Page>
  )
};

export default ContentEditorPage;