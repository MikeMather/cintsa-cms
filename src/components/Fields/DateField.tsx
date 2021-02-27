import React from 'react';
import { StyledDateField } from './StyledFields';

interface Props {
    value: string
    onUpdate: {
        (value: string): void
    }
}

const DateField = ({ onUpdate, value }: Props): JSX.Element => (
    <StyledDateField type="date" onChange={e => onUpdate(e.target.value)} value={value} />
);

export default DateField;