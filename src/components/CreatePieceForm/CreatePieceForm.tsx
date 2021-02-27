import React, { useContext, useEffect, useState } from 'react';
import { PieceSchema, PieceSchemaField } from '../../types/types';
import Button from '../Button/Button';
import { FieldContainer, PieceFormContainer } from './StyledCreatePiecesForm';
import { v4 as uuid } from 'uuid';
import { Select } from '../styled/Select';
import { AppContext } from '../../App';
import { PIECE_TYPE_ADDED } from '../../state/Reducer';

const defaultSchema: PieceSchema = {
  id: '',
  label: '',
  name: '',
  fields: []
}

const CreatePieceForm = ({ onCreate }: { onCreate: { (): void }}): JSX.Element => {

  const [schema, setSchema] = useState<PieceSchema>(defaultSchema)
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    setSchema({
      ...schema,
      id: uuid()
    });
  }, [])

  const addField = (): void => {
    const newField: PieceSchemaField = {
      id: uuid(),
      type: 'text',
      name: '',
      label: ''
    };
    setSchema({
      ...schema,
      fields: [ ...schema.fields, newField ]
    });
  }

  const assertValidRefName = (val: string): boolean => {
    const match = val.match(/^([a-zA-Z_$][0-9a-zA-Z_$]*)$/);
    if (val === '') {
      return true;
    }
    else if (match) {
      return match[1] === val
    }
    return false;
  }
 
  const updateField = (id: string | undefined, key: string, value: string): void => {
    const fieldIndex = schema.fields.findIndex((field: PieceSchemaField) => field.id === id);
    if (key === 'name' && !assertValidRefName(value)) {
      return;
    }
    let updatedField = schema.fields[fieldIndex];
    updatedField = {
      ...updatedField,
      [key]: value
    }
    const updatedSchema = { ...schema };
    updatedSchema.fields[fieldIndex] = updatedField;
    setSchema(updatedSchema);
  }

  const updateRootField = (field: string, val: string): void => {
    if (field === 'name') {
      if (assertValidRefName(val)) {
        setSchema({ ...schema, [field]: val});
      }
    }
    else {
      setSchema({ ...schema, [field]: val});
    }
  }

  const addPiece = (): void => {
    const newSchema = { ...schema };
    newSchema.fields.forEach((field: PieceSchemaField) => {
      delete field.id;
    });
    dispatch({
      type: PIECE_TYPE_ADDED,
      payload: newSchema
    })
    onCreate();
  }

  return (
    <PieceFormContainer>
      <div>
        <h3>Piece Details</h3>
        <label>
          Label
          <input type="text" name="name" placeholder="The name you'll see in the editor. E.g. Blog Posts" 
            value={schema.label}
            onChange={e => updateRootField('label', e.target.value)}
          />
        </label>

        <label>
          Template reference name
          <input type="text" name="name" 
            placeholder="The name you'll use to reference this piece in your templates. E.g. blogPosts" 
            value={schema.name}
            onChange={e => updateRootField('name', e.target.value)}
          />
        </label>

        <h3>Data fields</h3>
        {schema.fields.map((field: PieceSchemaField) => (
          <FieldContainer key={field.id}>
            <label>
              Label
              <input type="text" name="field-name" placeholder="The name you'll see in the editor. E.g. Cover Image" 
                onChange={e => updateField(field.id, 'label', e.target.value)}
                value={field.label}
              />
            </label>
            <label>
              Template reference name
              <input type="text" name="field-ref-name" 
                placeholder="The name you'll use to reference this field in your templates. E.g. coverImage" 
                onChange={e => updateField(field.id, 'name', e.target.value)}
                value={field.name}
              />
            </label>
            <label>
              Field type
              <Select onChange={e => updateField(field.id, 'type', e.target.value)} value={field.type}>
                <option value="text">Text</option>
                <option value="textarea">Text area</option>
                <option value="markdown">Markdown</option>
                <option value="image">Image</option>
                <option value="date">Date</option>
              </Select>
            </label>
          </FieldContainer>
        ))}
        <Button onClick={addField}>Add Field</Button>
      </div>
      <Button color={'success'} onClick={addPiece}>Save</Button>
    </PieceFormContainer>
  )
};

export default CreatePieceForm;