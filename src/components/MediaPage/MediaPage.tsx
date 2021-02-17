import React, { useContext, useState, useEffect } from 'react';
import { AmplifyS3Album } from "@aws-amplify/ui-react";
import Page from '../styled/Page';
import { AppContext } from '../Router/Router';
import Media from './Media';
import { MediaContainer } from './StyledMedia';

interface Media {
  key: string
  selected: boolean
}

const MediaPage = (): JSX.Element => {

  const { appState } = useContext(AppContext);
  const [media, setMedia] = useState<Media[]>([]);

  useEffect(() => {
    const images = appState.media.map((key: string) => ({
      key,
      selected: false
    }));
    setMedia(images);
  }, []);

  const onSelectMedia = (value: string, key: string): void => {
    const newMedia = [ ...media ];
    const imageIndex = media.findIndex((img: Media) => img.key === key);
    newMedia[imageIndex] = { key, selected: !newMedia[imageIndex].selected };
    setMedia(newMedia);
  }

  return (
    <Page>
      <MediaContainer>
        {media.map(({key, selected}: Media) => {
            return <Media key={key} imgKey={key} selected={selected} onSelect={onSelectMedia} />
        })}
      </MediaContainer>
    </Page>
  )
}

export default MediaPage;