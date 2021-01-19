import React, { useState } from 'react';
import { MarkdownEditorContainer } from "./StyledContextEditor";
import ReactMde, { SaveImageHandler } from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import StorageHandler from '../../state/StorageHandler';

const MarkdownEditor = ({ content, onUpdate }: { content: string, onUpdate: Function }) => {

  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');

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
      />
    </MarkdownEditorContainer>
  )
};

export default MarkdownEditor;