import React, { useState } from 'react';
import { MarkdownEditorContainer } from "./StyledContextEditor";
import ReactMde, { SaveImageHandler, Command, getDefaultToolbarCommands } from "react-mde";
import * as Showdown from "showdown";
import StorageHandler from '../../state/StorageHandler';
import { Piece } from '../../types/types';
import ImageSelectModal from '../Modal/ImageSelectModal';
import ImageAlbumIcon from '../../icons/imageAlbum.svg';


interface Props {
  content: string;
  status: string;
  onUpdate: {
    (updates: Partial<Piece>): void
  }
}

interface imageSelectOptions {
  open: boolean
  callback: {
    (result: string): void
  }
}

const MarkdownEditor = ({ content, status, onUpdate }: Props): JSX.Element => {

  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>(status === 'published' ? 'preview' : 'write');
  const [imageSelectOptions, setImageSelectOptions] = useState<imageSelectOptions>({ open: false, callback: Function });

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

  const CommandIcon = () => (
    <span role="img" aria-label="select-image">
      <ImageAlbumIcon />
    </span>
  );

  const addImageCommand: Command = {
    icon: CommandIcon,
    execute: opts => {
      setImageSelectOptions({
        open: true,
        callback: (result: string) => {
          opts.textApi.replaceSelection(`![](${window.location.origin}/assets/img/${result})`);
          setImageSelectOptions({ ...imageSelectOptions, open: false });
        }
      })
    }
  };

  return (
    <MarkdownEditorContainer>
      <ReactMde
        value={content}
        onChange={updateContent}
        generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
        }
        paste={{ saveImage }}
        minEditorHeight={400}
        classes={{ textArea: 'markdown-editor-text', reactMde: 'markdown-editor'}}
        commands={{
          addImageCommand
        }}
        toolbarCommands={[...getDefaultToolbarCommands(), ["addImageCommand"]]}
      />
      {imageSelectOptions.open &&
        <ImageSelectModal onClose={imageSelectOptions.callback} />
      }
    </MarkdownEditorContainer>
  )
};

export default MarkdownEditor;