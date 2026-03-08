import React from 'react';
import PropTypes from 'prop-types';

function Block({ color, state, clicked }) {
  return (
    <button
      type="button"
      aria-label="sprite pixel"
      data-testid="block"
      style={{
        border: 'none',
        backgroundColor: state ? `#${color}` : 'var(--ti-blockOff)',
        width: '30px',
        height: '30px',
        margin: '2px',
        transition: 'all .25s',
      }}
      className={state ? 'on' : 'off'}
      onClick={() => {
        clicked();
      }}
    />
  );
}

Block.propTypes = {
  /**
   * indicates the toggle state of the block
   */
  state: PropTypes.bool,
  /**
   * hexadecimal RGB value
   */
  color: PropTypes.string,
  /**
   * callback handler for click events
   */
  clicked: PropTypes.func,
};

Block.defaultProps = {
  state: false,
  color: '000',
  clicked: null,
};

export default Block;
