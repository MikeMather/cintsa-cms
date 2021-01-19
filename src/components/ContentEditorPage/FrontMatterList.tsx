import { Piece } from "../../types/types";
import { ChangeEvent, useEffect, useState } from 'react';
import { FrontMatterContainer, FrontMatter } from './StyledContextEditor';
import Button from "../Button/Button";
import cogoToast from "cogo-toast";

interface Props extends Piece {
  onUpdate: Function
}

interface FMKey {
  key: string;
  value: string;
}

const FrontMatterList = ({ onUpdate, ...data }: Props) => {

  const [frontMatter, setFrontMatter] = useState<FMKey[]>([]);

  const reservedKeys = ['content', 'layout', 'title', 'slug', 'id', 'status'];

  useEffect(() => {
    const fm: FMKey[] = []
    Object.keys(data).forEach((key: string) => {
      if (!reservedKeys.includes(key)) {
        fm.push({
          key,
          value: data[key]
        });
      }
    });
    setFrontMatter(fm);
  }, []);

  const update = async (fm: FMKey[]) => {
    setFrontMatter(fm);
    const pieceVals: {[key: string]: string} = {};
    fm.forEach(({ key, value }: FMKey) => {
      pieceVals[key] = value;
    });
    onUpdate({
      ...data,

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
    setFrontMatter(newFm);
  }

  const addKey = () => {
    const newFm = [ ...frontMatter ];
    newFm.push({
      key: '',
      value: ''
    });
    setFrontMatter(newFm);
  }

  const deleteKey = (key: string) => {
    const newFm = [ ...frontMatter ];
    const fmKeyIndex: number = frontMatter.findIndex((fm: FMKey) => fm.key === key);
    newFm.splice(fmKeyIndex, 1);
    setFrontMatter(newFm);
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