import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import AnimationContext from './AnimationContext';

const animationContext = createContext(null);

export function AnimationProvider({ children }) {
  const value = AnimationContext();
  return (
    <animationContext.Provider value={value}>
      {children}
    </animationContext.Provider>
  );
}

AnimationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export const useAnimation = () => useContext(animationContext);
