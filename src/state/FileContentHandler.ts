import { Piece } from "../types/types";
import fm, { FrontMatterResult } from 'front-matter';
import { v4 as uuid } from 'uuid';

class FileContentHandler {

  constructor() {

  }

  /**
   * Convert a piece object into markdown
   * @param post 
   */
  pieceToMarkdown(post: Piece): string {
    let markDownResult = '';
    const frontMatterSep = '---\n';
    markDownResult += frontMatterSep;
    Object.keys(post).forEach((key: string) => {
      // 'content' and 'id' are specials keys that are not stored in front matter
      if (key !== 'content' && key !== 'id') {
        markDownResult += `${key}: ${post[key]}\n`;
      }
    });
    markDownResult += frontMatterSep;
    markDownResult += post.content;
    return markDownResult;
  }

  /**
   * Convert markdown into a Piece object
   * @param text markdown file context
   */
  markdownToPiece(text: string): Piece {
    const frontMatter: FrontMatterResult<Piece> = fm(text);
    const fileData: Piece = {
      ...frontMatter.attributes,
      content: frontMatter.body,
      id: uuid()
    }
    return fileData;
  }
}

export default FileContentHandler;