import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { defaultGrid, getHex } from './constants';

export const useSpriteMakerProviderProps = () => {
  const [sprite] = useState('0'.repeat(16));

  return {
    sprite,
    getHex,
    defaultGrid,
  };
};

const spriteMakerContext = createContext(null);

export const SpriteMakerProvider = ({ children }) => {
  const props = useSpriteMakerProviderProps();
  return (
    <spriteMakerContext.Provider
      value={props}
    >
      {children}
    </spriteMakerContext.Provider>
  );
};

SpriteMakerProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export const useSpriteMaker = () => useContext(spriteMakerContext);
