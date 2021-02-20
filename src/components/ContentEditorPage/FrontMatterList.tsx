import { Piece } from "../../types/types";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FrontMatterContainer, FrontMatter } from './StyledContextEditor';
import Button from "../Button/Button";
import cogoToast from "cogo-toast";
import { useLocation } from "react-router";
import { v4 as uuid} from 'uuid';

interface Props extends Piece {
  onUpdate: { (piece: Partial<Piece>): void }
}

interface FMKey {
  id: string;
  key: string;
  value: string;
}

const FrontMatterList = ({ onUpdate, ...piece }: Props): JSX.Element => {

  const [frontMatter, setFrontMatter] = useState<FMKey[]>([]);
  const [localPiece, setLocalPiece] = useState<Piece>(piece);
  const location = useLocation();

  const reservedKeys = ['content', 'layout', 'title', 'slug', 'id', 'status'];

  useEffect(() => {
    let fm: FMKey[] = []
    setLocalPiece(piece);
    const data = { ...piece }
    Object.keys(data).forEach((key: string) => {
      if (!reservedKeys.includes(key)) {
        fm.push({
          id: uuid(),
          key,
          value: data[key]
        });
      }
    });

    // add date as default extra front matter
    if (/new$/.test(location.pathname)) {
      fm = [
        ...fm,
        { id: uuid(), key: 'date', value: new Date().toString() }
      ];
    }
    update(fm);
  }, [piece.id]);

  const update = async (fm: FMKey[]) => {
    setFrontMatter(fm);
    const pieceVals: {[key: string]: string} = {};
    fm.forEach(({ key, value }: FMKey) => {
      pieceVals[key] = value;
    });
    onUpdate({
      ...pieceVals
    })
  }

  const updateFmPropery = (prop: 'key' | 'value', id: string, e: ChangeEvent<HTMLInputElement>): void => {
    const newFm = [ ...frontMatter ];
    const inputVal = e.target.value;
    const fmKeyIndex: number = frontMatter.findIndex((fm: FMKey) => fm.id === id);
    newFm[fmKeyIndex] = {
      id,
      key: prop === 'key' ? formatFmKey(inputVal) : newFm[fmKeyIndex].key,
      value: prop === 'value' ? inputVal : newFm[fmKeyIndex].value,
    };
    console.log(newFm[fmKeyIndex]);
    update(newFm);
  }

  const addKey = () => {
    const newFm = [ ...frontMatter ];
    newFm.push({
      id: uuid(),
      key: '',
      value: ''
    });
    update(newFm);
  }

  const deleteKey = (id: string) => {
    const newFm = [ ...frontMatter ];
    const fmKeyIndex: number = frontMatter.findIndex((fm: FMKey) => fm.id === id);
    const deleted: FMKey = frontMatter[fmKeyIndex];
    newFm.splice(fmKeyIndex, 1);
    const newPiece = { ...localPiece };
    delete newPiece[deleted.key];
    update(newFm);
  }

  const formatFmKey = (key: string): string => {
    if (reservedKeys.includes(key)) {
      cogoToast.error(`${key} is a reserved key`);
      return key.slice(0, key.length - 1)
    }
    return key.replace(/\W|_/g, '');
  }

  return (
    <FrontMatter>
      <label>Additional data</label>
      <p>You can add additional key-value data to be added to the front-matter of your piece.</p>
      {
        !!frontMatter.length && frontMatter.map(({ id, key, value }: FMKey, index: number) => (
          <FrontMatterContainer key={index}>
            <label>Key
              <input type="text" value={key} disabled={key==='date'} onChange={e => updateFmPropery('key', id, e)} />
            </label>
            <label>Value
              <input type="text" value={value} disabled={key==='date'} onChange={e => updateFmPropery('value', id, e)} />
            </label>
            {key !== 'date' && <Button color="danger" onClick={e => deleteKey(id)}>x</Button>}
          </FrontMatterContainer>
        ))
      }
      <Button onClick={addKey}>Add</Button>
    </FrontMatter>  
  )
};

export default FrontMatterList;