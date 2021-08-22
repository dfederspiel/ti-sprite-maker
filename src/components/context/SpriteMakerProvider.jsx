import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const useProvideSpriteMakerContext = () => {
  const [test, setTest] = useState(1);
  const doThing = (val) => {
    setTest(val);
  };
  return {
    doThing,
    test,
  };
};

const spriteMakerContext = createContext(null);

export const SpriteMakerProvider = ({ children }) => {
  const providerContext = useProvideSpriteMakerContext();
  return (
    <spriteMakerContext.Provider
      value={providerContext}
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
