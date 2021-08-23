import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import SpriteMakerContext from './SpriteMakerContext';

const spriteMakerContext = createContext(null);

export const SpriteMakerProvider = ({ children }) => {
  const props = SpriteMakerContext();
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
