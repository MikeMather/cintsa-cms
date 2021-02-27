import { ContentEditorContainer, ContentEditorHeader, PieceEditorContainer, StyledFloatingButton, PreviewFrame } from "./StyledContextEditor"
import Page from "../styled/Page";
import { useHistory, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Piece, PieceSchema } from '../../types/types';
import ContentEditorSidebar from "./ContentEditorSidebar";
import ContentEditorTitle from "./ContentEditorTitle";
import { PIECE_UPDATED } from '../../state/Reducer';
import FloatingButton from "../Button/FloatingButton";
import FilePreview from './FilePreview';
import ContentEditor from "./ContentEditor";
import { v4 as uuid } from 'uuid';

const emptyPiece: Piece = {
  id: uuid(),
  title: '',
  layout: '',
  status: 'draft',
  slug: ''
};

const ContentEditorPage = (): JSX.Element => {
  const { pieceName, slug } = useParams<{ pieceName: string, slug: string | undefined }>();
  const [schema, setSchema] = useState<PieceSchema>({} as PieceSchema);
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const { appState, dispatch } = useContext(AppContext);
  const history = useHistory();
  const [piece, setPiece] = useState<Piece>({
    ...emptyPiece,
    layout: appState.layouts[0]
  });
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

  useEffect(() => {
    // Piece was saved
    if (unsavedChanges) {
      setUnsavedChanges(false);
      history.goBack();
    }
    
  }, [appState.pieces[pieceName]?.items])

  useEffect(() => {
    if (pieceName && appState.pieces[pieceName]) {
      setSchema(appState.pieces[pieceName].schema);
      const post = appState.pieces[pieceName].items.find((post: Piece) => (
          post.slug === `${pieceName}/${slug}`
      ));
      if (post) {
        setPiece(post);
      }
    }
  }, [pieceName, slug, appState.pieces]);

  const slugify = (text: string): string => {
    const slug = text.toLowerCase()
    .replace(/[^\w ]+/g,'')
    .replace(/ +/g,'-');
    return `${pieceName}/${slug}`
  };

  const updatePiece = (updates: Partial<Piece>): void => {
    setUnsavedChanges(true);
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
  }

  const togglePreview = (): void => {
    setPreviewMode(!previewMode);
  }

  return (
    <Page>
      <ContentEditorContainer>
        {!previewMode
          ? <>
            <ContentEditorHeader>
            <ContentEditorTitle 
              pieceName={pieceName} 
              onUpdate={updatePiece}
              title={piece.title} 
              onSave={savePiece}
              unsavedChanges={unsavedChanges}
            />
            </ContentEditorHeader>
            <PieceEditorContainer>
              <ContentEditorSidebar 
                pieceName={pieceName} 
                onUpdate={updatePiece}
                {...piece}
              />
              <ContentEditor onUpdate={updatePiece} piece={piece} schema={schema} />
            </PieceEditorContainer>
          </>
          : <FilePreview piece={piece} />
        }
        <StyledFloatingButton>
          <FloatingButton onClick={togglePreview}>{ previewMode ? 'Write' : 'Preview' }</FloatingButton>
        </StyledFloatingButton>
      </ContentEditorContainer>
    </Page>
  )
};

export default ContentEditorPage;