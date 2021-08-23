import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import SpriteMakerContext from './SpriteMakerContext';
import SpriteMakerModule from './SpriteMakerModule';

const spriteMakerContext = createContext(null);
const spriteMaker = new SpriteMakerModule();

export const SpriteMakerProvider = ({ children, hex }) => {
  const props = SpriteMakerContext(spriteMaker, hex);
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
  hex: PropTypes.string,
};

SpriteMakerProvider.defaultProps = {
  hex: '0'.repeat(16),
};

export const useSpriteMaker = () => useContext(spriteMakerContext);
