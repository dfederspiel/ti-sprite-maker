import React from 'react';
import PropTypes from 'prop-types';

const Block = ({ color, state, clicked }) => (
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  <button
    type="button"
    data-testid="block"
    style={{
      border: 'none',
      backgroundColor: state ? `#${color}` : 'white',
      width: '30px',
      height: '30px',
      margin: '2px',
      transition: 'all .5s',
    }}
    className={state ? 'on' : 'off'}
    onClick={() => {
      clicked();
    }}
  />
);

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
