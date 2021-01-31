import { Piece } from "../../types/types";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FrontMatterContainer, FrontMatter } from './StyledContextEditor';
import Button from "../Button/Button";
import cogoToast from "cogo-toast";
import { useLocation } from "react-router";
import format from 'date-fns/format';

interface Props extends Piece {
  onUpdate: { (piece: Piece): void }
}

interface FMKey {
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
          key,
          value: data[key]
        });
      }
    });

    // add date as default extra front matter
    if (/new$/.test(location.pathname)) {
      fm = [
        ...fm,
        { key: 'date', value: Date.now().toString() }
      ];
    }
    setFrontMatter(fm);
  }, [piece.id]);

  const update = async (fm: FMKey[], updatePiece: Piece) => {
    setFrontMatter(fm);
    const pieceVals: {[key: string]: string} = {};
    fm.forEach(({ key, value }: FMKey) => {
      pieceVals[key] = value;
    });
    onUpdate({
      ...updatePiece,
      ...pieceVals
    })
  }

  const updateFmPropery = (prop: 'key' | 'value', key: string, e: ChangeEvent<HTMLInputElement>): void => {
    const newFm = [ ...frontMatter ];
    const inputVal = e.target.value;
    const fmKeyIndex: number = frontMatter.findIndex((fm: FMKey) => fm.key === key);
    newFm[fmKeyIndex] = {
      key: prop === 'key' ? formatFmKey(inputVal) : newFm[fmKeyIndex].key,
      value: prop === 'value' ? inputVal : newFm[fmKeyIndex].value,
    };
    update(newFm, localPiece);
  }

  const addKey = () => {
    const newFm = [ ...frontMatter ];
    newFm.push({
      key: '',
      value: ''
    });
    update(newFm, localPiece);
  }

  const deleteKey = (key: string) => {
    const newFm = [ ...frontMatter ];
    const fmKeyIndex: number = frontMatter.findIndex((fm: FMKey) => fm.key === key);
    newFm.splice(fmKeyIndex, 1);
    const newPiece = { ...localPiece };
    delete newPiece[key];
    setLocalPiece(newPiece);
    update(newFm, newPiece);
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
      <p>You can add additional key-value data to be added to the front-matter of your post.</p>
      {
        !!frontMatter.length && frontMatter.map(({ key, value }: FMKey, index: number) => (
          <FrontMatterContainer key={index}>
            <label>Key
              <input type="text" value={key} onChange={e => updateFmPropery('key', key, e)} />
            </label>
            <label>Value
              <input type="text" value={value} onChange={e => updateFmPropery('value', key, e)} />
            </label>
            <Button color="danger" onClick={e => deleteKey(key)}>x</Button>
          </FrontMatterContainer>
        ))
      }
      <Button onClick={addKey}>Add</Button>
    </FrontMatter>  
  )
};

export default FrontMatterList;