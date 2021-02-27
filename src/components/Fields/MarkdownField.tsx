import React, { useContext, useState } from 'react';
import { MarkdownEditorContainer } from "./StyledFields";
import ReactMde, { SaveImageHandler, Command, getDefaultToolbarCommands } from "react-mde";
import * as Showdown from "showdown";
import StorageHandler from '../../state/StorageHandler';
import { Piece } from '../../types/types';
import ImageSelectModal from '../Modal/ImageSelectModal';
import ImageAlbumIcon from '../../icons/imageAlbum.svg';
import { AppContext } from '../../App';
import { MEDIA_ADDED } from '../../state/Reducer';


interface Props {
  field: string
  onUpdate: {
    (updates: Partial<Piece>): void
  };
  piece: Piece
}

interface imageSelectOptions {
  open: boolean
  callback: {
    (result: string): void
  }
}

const MarkdownField = ({ field, piece, onUpdate }: Props): JSX.Element => {

  const { dispatch } = useContext(AppContext);
  const [imageSelectOptions, setImageSelectOptions] = useState<imageSelectOptions>({ open: false, callback: Function });

  const updateContent = async (content: string) => {
    onUpdate({ [field]: content })
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

  const addImageCommand: Command = {
    icon: AddImageIcon,
    execute: opts => {
      setImageSelectOptions({
        open: true,
        callback: (result: string) => {
          opts.textApi.replaceSelection(`![](/assets/img/${result})`);
          setImageSelectOptions({ ...imageSelectOptions, open: false });
        }
      })
    }
  };

  return (
    <MarkdownEditorContainer>
      <ReactMde
        value={piece[field]}
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

export default MarkdownField;