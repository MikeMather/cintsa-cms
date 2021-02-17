import { Storage } from 'aws-amplify';
import { Piece } from '../types/types';
import nj, { Callback, LoaderSource } from 'nunjucks';
import * as Showdown from "showdown";

const S3Loader = nj.Loader.extend({
  async: true,
  // @ts-ignore
  getSource: function (name: string, callback: Callback<Error, LoaderSource>): void {
    const key = name.split('admin/')[1];
    Storage.get(`admin/${key}`, { download: true, cacheControl: 'no-cache' })
      .then((res: any) => res.Body.text())
      .then((body: string) => {
        callback(null, {
          src: body.replaceAll('../', 'admin/'),
          path: name,
          noCache: false
        });
      })
  }
});

class FilePreviewHandler {
  // @ts-ignore
  env = new nj.Environment([new S3Loader()])
  converter = new Showdown.Converter();

  constructor() {
    //
  }

  async getPreview(piece: Piece): Promise<string> {
    return new Promise((resolve, reject) => {
      const layout = `admin/layouts/${piece.layout}.njk`
      const view = {
        ...piece,
        content: this.converter.makeHtml(piece.content)
      }
      this.env.render(layout, view, (err, data) => {
        if (!err) {
          resolve(data as string)
        }
        else {
          reject('')
        }
      });
    })
  }

}

export default FilePreviewHandler;