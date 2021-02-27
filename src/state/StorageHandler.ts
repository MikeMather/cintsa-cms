import { Storage } from 'aws-amplify';
import { defaultSettings, InitialState, Piece, StatePieces, StatePiece, PieceSchema, Settings } from '../types/types';
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
  async getPieces(): Promise<StatePieces> {
    const requests: Promise<void>[] = [];
    return Storage.list('admin/pieces')
      .then((keys: any[]) => {
        const pieces: StatePieces = {};
        keys.forEach((key => {
          const pathMatch =  /admin\/pieces\/(.*)\/(.*)?/;
          const match = pathMatch.exec(key.key)
          if (match) {
            const pieceName = match[1];
            const filename = match[2];
            if (pieceName) {
              let filePromise;
              if (!pieces[pieceName]) {
                pieces[pieceName] = { 
                  items: [], 
                  schema: <PieceSchema>{} 
                };
              }
              if (filename === 'schema.json') {
                filePromise = this.getSchema(key.key).then((schema: PieceSchema) => {
                  pieces[pieceName].schema = { ...schema };
                })
              }
              else {
                filePromise = this.getPiece(key.key).then((post: Piece) => {
                  pieces[pieceName].items = [ ...pieces[pieceName].items, post ];
                });
              }
              
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
   * Get all media files in admin/assets/img
   */
  async getMedia(): Promise<string[]> {
    return Storage.list('assets/img').then((images: any[]) => {
      return images.map((key: any) => key.key.split('assets/img/').pop())
        .filter((key: string) => !!key);
    }).catch(err => {
      console.error(err);
      return [];
    });
  }

  /**
   * Get all persisted user settings from localstorage
   */
  getSettings = (): Settings => {
    let settings = defaultSettings;
    const storedSettings = window.localStorage.getItem('cintsa-admin-settings');
    if (storedSettings) {
      settings = JSON.parse(storedSettings);
    }
    return settings;
  }

  /**
   * Get a markdown file from S3 and return the Piece definition with markdown content
   * @param filePath S3 key of file
   */
  async getPiece(filePath: string): Promise<Piece> {
    return Storage.get(filePath, { download: true, cacheControl: 'no-cache' })
      .then((res: any) => {
        return res.Body.text();
      })
      .then((res: string) => {
        const fileData = JSON.parse(res);
        return fileData;
      });
  }

  /**
   * Get a schema file
   * @param filePath S3 key of file
   */
  async getSchema(filePath: string): Promise<PieceSchema> {
    return Storage.get(filePath, { download: true, cacheControl: 'no-cache' })
      .then((res: any) => {
        return res.Body.text()
      })
      .then((content: string) => {
        return JSON.parse(content);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  /**
   * Get a file from S3 and return the raw content
   * @param filePath S3 key of file
   */
  async getFile(filePath: string): Promise<string> {
    return Storage.get(filePath, { download: true, cacheControl: 'no-cache' })
      .then((res: any) => {
        return res.Body.text();
      });
  }

  async savePiece(piece: Piece): Promise<Piece> {
    const content = JSON.stringify(piece);
    return Storage.put(`admin/pieces/${piece.slug}.json`, content)
    .then((res: any) => {
      return piece;
    })
    .catch((err: any) => {
      console.error(err);
      return piece;
    });
  }

  async savePieceSchema(schema: PieceSchema): Promise<PieceSchema> {
    const content = JSON.stringify(schema);
    return Storage.put(`admin/pieces/${schema.name}/schema.json`, content)
    .then((res: any) => {
      return schema;
    })
    .catch((err: any) => {
      console.error(err);
      return schema;
    });
  }

  async deletePiece(piece: Piece): Promise<void> {
    return Storage.remove(`admin/pieces/${piece.slug}.json`).then((res: any) => {
      return Storage.remove(`${piece.slug}/index.html`);
    });
  }

  async deleteRenderedFile(path: string): Promise<void> {
    return Storage.remove(`${path}/index.html`);
  }

  async getStorageState(): Promise<Partial<InitialState>> {
    const layouts = await this.getLayouts();
    const pieces = await this.getPieces();
    const media = await this.getMedia();
    const settings = this.getSettings();
    return Promise.all([layouts, pieces]).then(([ layouts, pieces ]) => {
      return {
        layouts, 
        pieces, 
        media,
        settings
      };
    });
  }

  async uploadImage(arrayBuffer: ArrayBuffer, key?: string): Promise<{key: string}> {
    const blob = new Blob([arrayBuffer]);
    const name = key || `${uuid()}.jpg`;
    return Storage.put(`assets/img/${name}`, blob, {
        contentType: 'image/jpg'
    })
    .catch(err => {
      console.error(err);
      return err;
    })
  }

  async deleteImage(name: string): Promise<void> {
    return Storage.remove(`assets/img/${name}`);
  }
}

export default StorageHandler;