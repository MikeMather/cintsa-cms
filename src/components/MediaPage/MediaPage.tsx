import React, { useContext, useState, useEffect } from 'react';
import Page from '../styled/Page';
import { AppContext } from '../../App';
import Media from './Media';
import { MediaActions, MediaContainer } from './StyledMedia';
import UploadFileDrop from './UploadFileDrop';
import Button from '../Button/Button';
import { MEDIA_DELETED } from '../../state/Reducer';


const MediaPage = (): JSX.Element => {

  const { appState, dispatch } = useContext(AppContext);
  const [media, setMedia] = useState<string[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<string>('');

  useEffect(() => {

    setMedia(appState.media);
  }, [appState.media]);

  const onSelectMedia = (key: string): void => {
    const newMedia = [ ...media ];
    const imageIndex = media.findIndex((img: string) => img === key);
    setMedia(newMedia);
    setSelectedMedia(newMedia[imageIndex]);
  }

  const onDeleteMedia = (): void => {
    if (selectedMedia) {
      dispatch({
        type: MEDIA_DELETED,
        payload: selectedMedia
      });
    }
  }

  return (
    <Page>
      <MediaActions>
        <small>Drop files to upload</small>
        <Button color={'danger'} disabled={!selectedMedia} onClick={onDeleteMedia}>Delete</Button>
      </MediaActions>
      <UploadFileDrop>
        <MediaContainer>
          {media.map((key: string) => {
              return <Media key={key} imgKey={key} selected={key === selectedMedia} onSelect={onSelectMedia} />
          })}
        </MediaContainer>
      </UploadFileDrop>
    </Page>
  )
}

export default MediaPage;