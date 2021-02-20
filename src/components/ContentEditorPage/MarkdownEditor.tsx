import React, { useContext, useEffect, useRef, useState } from 'react';
import { MarkdownEditorContainer } from "./StyledContextEditor";
import ReactMde, { SaveImageHandler, Command, getDefaultToolbarCommands } from "react-mde";
import * as Showdown from "showdown";
import StorageHandler from '../../state/StorageHandler';
import { Piece } from '../../types/types';
import ImageSelectModal from '../Modal/ImageSelectModal';
import ImageAlbumIcon from '../../icons/imageAlbum.svg';
import FullWidthIcon from '../../icons/fullScreen.svg';
import { AppContext } from '../../App';
import { MEDIA_ADDED } from '../../state/Reducer';


interface Props {
  content: string;
  status: string;
  fullWidth: boolean;
  onUpdate: {
    (updates: Partial<Piece>): void
  };
  setFullWidth: {
    (fullWidth: boolean): void
  }
}

interface imageSelectOptions {
  open: boolean
  callback: {
    (result: string): void
  }
}

const MarkdownEditor = ({ content, status, onUpdate, fullWidth, setFullWidth }: Props): JSX.Element => {

  const { dispatch } = useContext(AppContext);
  const [imageSelectOptions, setImageSelectOptions] = useState<imageSelectOptions>({ open: false, callback: Function });
  const fullWidthRef = useRef(fullWidth);

  useEffect(() => {
    fullWidthRef.current = fullWidth;
  }, [fullWidth])

  const updateContent = async (content: string) => {
    onUpdate({ content })
  }
  const converter = new Showdown.Converter();

  const saveImage: SaveImageHandler = async function*(data: ArrayBuffer) {
    const handler = new StorageHandler();
    const res = await handler.uploadImage(data);
    dispatch({
      type: MEDIA_ADDED,
      payload: res.key
    });
    if (res.key) {
      yield `/${res.key}`;
      return true;
    }
    return false;
  };

  const AddImageIcon = () => (
    <span role="img" aria-label="select-image">
      <ImageAlbumIcon />
    </span>
  );

  const FullWidthCommandIcon = () => (
    <span role="img" aria-label="full-screen">
      <FullWidthIcon />
    </span>
  )

  const addImageCommand: Command = {
    icon: AddImageIcon,
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

  const toggleFullWidth = (): void => {
    setFullWidth(!fullWidthRef.current);
  }

  const fullWidthCommand: Command = {
    icon: FullWidthCommandIcon,
    execute: opts => {
      toggleFullWidth();
    }
  };

  return (
    <MarkdownEditorContainer fullWidth={fullWidth}>
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
          addImageCommand, fullWidthCommand
        }}
        toolbarCommands={[...getDefaultToolbarCommands(), ["addImageCommand", 'fullWidthCommand']]}
      />
      {imageSelectOptions.open &&
        <ImageSelectModal onClose={imageSelectOptions.callback} />
      }
    </MarkdownEditorContainer>
  )
};

export default MarkdownEditor;