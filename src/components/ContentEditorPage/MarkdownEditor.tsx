import React, { useState } from 'react';
import { MarkdownEditorContainer } from "./StyledContextEditor";
import ReactMde, { SaveImageHandler } from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import StorageHandler from '../../state/StorageHandler';
import { Piece } from '../../types/types';

interface Props {
  content: string;
  status: string;
  onUpdate: {
    (updates: Partial<Piece>): void
  }
}

const MarkdownEditor = ({ content, status, onUpdate }: Props): JSX.Element => {

  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>(status === 'published' ? 'preview' : 'write');

  const updateContent = async (content: string) => {
    onUpdate({ content })
  }
  const converter = new Showdown.Converter();

  const saveImage: SaveImageHandler = async function*(data: ArrayBuffer) {
    const handler = new StorageHandler();
    const res = await handler.uploadImage(data);
    if (res.key) {
      yield `/${res.key}`;
      return true;
    }
    return false;
  };

  return (
    <MarkdownEditorContainer>
      <ReactMde
        value={content}
        onChange={updateContent}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
        }
        paste={{ saveImage }}
        minEditorHeight={400}
        classes={{ textArea: 'markdown-editor-text', reactMde: 'markdown-editor'}}
      />
    </MarkdownEditorContainer>
  )
};

export default MarkdownEditor;