import { ContentEditorContainer, ContentEditorHeader, PieceEditorContainer, StyledFloatingButton, PreviewFrame } from "./StyledContextEditor"
import Page from "../styled/Page";
import { useParams } from "react-router-dom";
import MarkdownEditor from "./MarkdownEditor";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import { Piece } from '../../types/types';
import ContentEditorSidebar from "./ContentEditorSidebar";
import ContentEditorTitle from "./ContentEditorTitle";
import { useHistory } from "react-router-dom";
import { PIECE_UPDATED } from '../../state/Reducer';
import FloatingButton from "../Button/FloatingButton";
import FilePreview from './FilePreview';

const emptyPiece: Piece = {
  id: '',
  title: '',
  layout: '',
  status: 'draft',
  slug: ''
};

const ContentEditorPage = (): JSX.Element => {
  const { pieceName, slug } = useParams<{ pieceName: string, slug: string | undefined }>();
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const { appState, dispatch } = useContext(AppContext);
  const [piece, setPiece] = useState<Piece>({
    ...emptyPiece,
    layout: appState.layouts[0]
  });
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

  useEffect(() => {
    if (pieceName && appState.pieces[pieceName]) {
      const post = appState.pieces[pieceName].find((post: Piece) => (
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
    setUnsavedChanges(false);
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
                collapsed={fullWidth}
                {...piece}
              />
              <MarkdownEditor 
                onUpdate={updatePiece} 
                content={piece.content} 
                status={piece.status} 
                fullWidth={fullWidth} 
                setFullWidth={setFullWidth}
              />
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