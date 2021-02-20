import React, { useContext, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { FileDropContainer, FileDropBlanket } from './StyledMedia';
import UploadIcon from '../../icons/upload.svg';
import { AppContext } from '../../App';
import { MEDIA_ADDED } from '../../state/Reducer';

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

const UploadFileDrop = ({ children }: Props): JSX.Element => {

  const { dispatch } = useContext(AppContext);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleFileDrop = async (files: FileList | null, event: React.SyntheticEvent): Promise<void> => {
    if (files?.length) {
      const file = files[0];
      dispatch({
        type: MEDIA_ADDED,
        payload: {
          file,
          name: file.name
        }
      });
    }    
    setIsHovered(false);
  }

  return (
    <FileDropContainer dragOver={isHovered}>
      <FileDrop
        onFrameDragEnter={(event) => setIsHovered(true)}
        onFrameDragLeave={(event) => setIsHovered(false)}
        onDrop={handleFileDrop}
      >
        {isHovered && <FileDropBlanket>
          <UploadIcon width={70} />
          <h3>Drop your file to upload</h3>
        </FileDropBlanket>}
        {children}
      </FileDrop>
    </FileDropContainer>
  )
};

export default UploadFileDrop;