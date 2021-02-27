import { deletePiece, updatePiece } from "./Modifiers";
import { InitialState, Piece, PieceSchema } from "../types/types";
import StorageHandler from '../state/StorageHandler';
import cogoToast from 'cogo-toast';
import { PIECE_UPDATED, PIECE_DELETED, PIECE_TYPE_ADDED, MEDIA_ADDED, MEDIA_DELETED, SETTINGS_UPDATED } from './Reducer';
import { Settings } from "http2";

interface Action {
  type: string
  payload: any
}

interface MiddlewareReducer {
  (action: Action): void
}

interface Dispatch {
  (action: Action): void
}

const uploadFile = (piece: Piece): Promise<Piece | void> => {
  const handler = new StorageHandler();
  return cogoToast.loading('Saving piece...').then(() => {
    handler.savePiece(piece).then(() => {
        cogoToast.success(`Piece updated`);
        return piece;
    }).catch(() => {
        cogoToast.error(`Couldn't save piece`)
    });
  });
}

const deleteFile = (piece: Piece): Promise<Piece | void> => {
  const handler = new StorageHandler();
  return cogoToast.loading(`Deleting piece`)
    .then(() => {
      handler.deletePiece(piece).then(() => {
          cogoToast.success(`Piece deleted`);
          return piece;
      }).catch(() => {
          cogoToast.error(`Couldn't delete piece`);
      });
    });
}

const uploadImage = ({ file, name }: { file: File, name: string}): Promise<void> => {
  const handler = new StorageHandler();
  return cogoToast.loading(`Uploading media`)
    .then(() => {
      file.arrayBuffer().then((buffer: ArrayBuffer) => {
        handler.uploadImage(buffer, file.name)
          .then((res: { key: string }) => {
            cogoToast.success(`Upload successful`);
          })
          .catch((err: any) => {
            console.error(err);
            cogoToast.error(`Error uploading media`);
          });
    })
  })
}

const deleteImage = (name: string): Promise<void> => {
  const handler = new StorageHandler();
  return cogoToast.loading(`Deleting media`)
    .then(() => {
      handler.deleteImage(name)
        .then(() => {
          cogoToast.success(`Media deleted`);
        })
        .catch((err: any) => {
          console.error(err);
          cogoToast.error(`Error deleting media`);
        });
  })
}

const persistSettings = (settings: Settings): void => {
  window.localStorage.setItem('cintsa-admin-settings', JSON.stringify(settings));
}

const savePieceSchema = (schema: PieceSchema): Promise<void> => {
  const handler = new StorageHandler();
  return cogoToast.loading(`Creating piece`)
    .then(() => {
      handler.savePieceSchema(schema)
        .then(() => {
          cogoToast.success(`Piece created`);
        })
        .catch((err: any) => {
          console.error(err);
          cogoToast.error(`Error creating piece`);
        });
  })
}

const DispatchMiddleware = (dispatch: Dispatch): MiddlewareReducer => {
  return (action: { type: string, payload: any }) => {
    switch (action.type) {
      case PIECE_UPDATED:
        uploadFile(action.payload.piece)
          .then((piece: Piece | void) => {
            dispatch(action);
          });
        return;
      case PIECE_DELETED:
        deleteFile(action.payload.piece)
          .then(() => {
            dispatch(action);
          });
        return;
      case PIECE_TYPE_ADDED:
        savePieceSchema(action.payload).then(() => {
          dispatch(action);
        })
        return;
      case MEDIA_ADDED:
        uploadImage(action.payload)
          .then(() => {
            // No read-after-write consistency in s3
            setTimeout(() => {
              dispatch(action);
            }, 1500)
          })
        return;
      case MEDIA_DELETED:
        deleteImage(action.payload).then(() => {
          dispatch(action);
        })
        return;
      case SETTINGS_UPDATED:
        persistSettings(action.payload);
        dispatch(action);
        return;
    }
    dispatch(action);
    return;
  }  
}

export default DispatchMiddleware;