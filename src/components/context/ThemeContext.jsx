import React, {
  createContext, useContext, useState, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { themes, themeNames } from '../../themes';

const ThemeCtx = createContext(null);

const STORAGE_KEY = 'ti99-theme';

function applyThemeVars(themeName) {
  const t = themes[themeName];
  if (!t) return;
  const root = document.documentElement;
  Object.entries(t).forEach(([key, val]) => {
    root.style.setProperty(`--ti-${key}`, val);
  });
}

export function ThemeProvider({ children, defaultTheme = 'classic' }) {
  const [themeName, setThemeNameState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return themeNames.includes(stored) ? stored : defaultTheme;
  });

  useEffect(() => {
    applyThemeVars(themeName);
    localStorage.setItem(STORAGE_KEY, themeName);
  }, [themeName]);

  const toggleTheme = useCallback(() => {
    setThemeNameState((prev) => (prev === 'classic' ? 'dark' : 'classic'));
  }, []);

  const setThemeName = useCallback((name) => {
    if (themeNames.includes(name)) {
      setThemeNameState(name);
    }
  }, []);

  const value = useMemo(
    () => ({ themeName, toggleTheme, setThemeName }),
    [themeName, toggleTheme, setThemeName],
  );

  return (
    <ThemeCtx.Provider value={value}>
      {children}
    </ThemeCtx.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTheme: PropTypes.string,
};

ThemeProvider.defaultProps = {
  defaultTheme: 'classic',
};

export const useTheme = () => useContext(ThemeCtx);
