import React, { useEffect, useState } from 'react';
import { Piece } from '../../types/types';
import { PreviewFrame } from './StyledContextEditor';
import FilePreviewHandler from '../../state/FilePreviewHandler';

const FilePreview = ({ piece }: { piece: Piece }): JSX.Element => {

  const [previewContent, setPreviewContent] = useState<string>('');
  const previewHandler = new FilePreviewHandler();
  let previewPath: string;
  if (piece.status === 'published') {
    previewPath = `${piece.slug}/index.html`;
  }
  else {
    previewPath = `admin/previews/${piece.slug}/index.html`;
  }

  const getPreviewContent = async () => {
    const html = await previewHandler.getPreview(piece);
    setPreviewContent(html);
  }

  useEffect(() => {
    getPreviewContent();
  }, [])

  return (
    <PreviewFrame srcDoc={previewContent} seamless={true} />
  )
};

export default FilePreview