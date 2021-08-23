import { useState } from 'react';
import { defaultGrid, getHex } from './constants';

const SpriteMakerProviderProps = () => {
  const [sprite] = useState('0'.repeat(16));

  return {
    sprite,
    getHex,
    defaultGrid,
  };
};

export default SpriteMakerProviderProps;
