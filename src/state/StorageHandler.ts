import { Storage } from 'aws-amplify';
import { InitialState, Piece } from '../types/types';
import FileContentHandler from './FileContentHandler';
import { v4 as uuid } from 'uuid';

class StorageHandler {
  
  fileHandler: FileContentHandler;
  bucketUrl = '';

  constructor() {
    this.fileHandler = new FileContentHandler();
  }

  /**
   * Get layouts options from /admin/layouts
   */
  async getLayouts(): Promise<string[]> {
    return Storage.list('admin/layouts')
      .then((keys: any[]) => {
          return keys.map((key: any) => {
            const layoutNameMatch = /admin\/layouts\/(.*)\.njk/;
            const match = layoutNameMatch.exec(key.key)
            if (match) {
              return match[1];
            }
            return '';
          })
      })
      .catch(err => {
        console.error(err);
        return [];
      });
  }


  /**
   * Get all piece content from S3 in /admin/<pieceName>/<post name>
   */
  async getPieces(): Promise<{[key: string]: Piece[]}> {
    const requests: Promise<void>[] = [];
    return Storage.list('admin/pieces')
      .then((keys: any[]) => {
        const pieces: {[key: string]: Piece[]} = {};
        keys.forEach((key => {
          const pathMatch =  /admin\/pieces\/(.*)\/(.*)?/;
          const match = pathMatch.exec(key.key)
          if (match) {
            const pieceName = match[1];
            const filename = match[2];
            if (pieceName) {
              const filePromise = this.getFile(key.key).then((post: Piece) => {
                if (pieces[pieceName]) {
                  pieces[pieceName] = [ ...pieces[pieceName], post ];
                }
                else {
                  pieces[pieceName] = [post];
                }
              });
              requests.push(filePromise);
            }
          }
        }));
        return Promise.all(requests).then(() => {
          return pieces;
        });
      })
      .catch((err) => {
        console.error(err);
        return {};
      });
  }

  /**
   * Get a file from S3 and return the Piece definition with markdown content
   * @param filePath S3 key of file
   */
  async getFile(filePath: string): Promise<Piece> {
    return Storage.get(filePath, { download: true, cacheControl: 'no-cache' })
      .then((res: any) => {
        return res.Body.text();
      })
      .then((res: string) => {
        const fileData = this.fileHandler.markdownToPiece(res);
        return fileData;
      });
  }

  async savePiece(piece: Piece): Promise<Piece> {
    const content = this.fileHandler.pieceToMarkdown(piece);
    return Storage.put(`admin/pieces/${piece.slug}.md`, content).then((res: any) => {
      return piece;
    });
  }

  async deletePiece(piece: Piece): Promise<void> {
    return Storage.remove(`admin/pieces/${piece.slug}.md`).then((res: any) => {
      return Storage.remove(`${piece.slug}/index.html`);
    });
  }

  async getStorageState(): Promise<InitialState> {
    const layouts = await this.getLayouts();
    const pieces = await this.getPieces();
    return Promise.all([layouts, pieces]).then(([ layouts, pieces ]) => {
      return { layouts, pieces };
    });
  }

  async uploadImage(arrayBuffer: ArrayBuffer): Promise<{key: string}> {
    const blob = new Blob([arrayBuffer]);
    return Storage.put(`assets/img/${uuid()}.jpg`, blob, {
        contentType: 'image/jpg'
    })
    .catch(err => {
      console.error(err);
      return err;
    })
  }

}

export default StorageHandler;