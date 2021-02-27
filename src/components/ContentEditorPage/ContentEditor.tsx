import React from 'react';
import { PieceSchema, PieceSchemaField, Piece } from '../../types/types';
import DateField from '../Fields/DateField';
import ImageField from '../Fields/ImageField';
import MarkdownField from '../Fields/MarkdownField';
import { ContentFieldsContainer } from './StyledContextEditor';

interface Props {
  schema: PieceSchema
  piece: Piece
  onUpdate: {
    (updates: Partial<Piece>): void
  }
}

const ContentEditor = ({ schema, piece, onUpdate }: Props): JSX.Element => {
  return (
    <ContentFieldsContainer>
      {schema.fields && schema.fields.map((field: PieceSchemaField) => {
        switch (field.type) {
          case 'text':
            return <label key={field.name}>
              {field.label}
              <textarea onChange={e => onUpdate({ [field.name]: e.target.value })} value={piece[field.name]} />
            </label>
          case 'markdown':
            return <label key={field.name}>
              {field.label}
              <MarkdownField onUpdate={onUpdate} piece={piece} field={field.name} />
            </label>
          case 'date':
            return <label key={field.name}>
              {field.label}
              <DateField onUpdate={value => onUpdate({ [field.name]: value })} value={piece[field.name]} />
            </label>
          case 'image':
            return <label key={field.name}>
              {field.label}
              <ImageField onUpdate={value => onUpdate({ [field.name]: value})} value={piece[field.name]} />
            </label>
        }
      })}
    </ContentFieldsContainer>
  )
}

export default ContentEditor;