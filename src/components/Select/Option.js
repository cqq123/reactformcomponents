import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './Option.scss';

const Option = ({
  className, value, onSelect,
}) => (
  <div
    onClick={() => { onSelect(value); }}
    className={cn(style.main, className)}
  >
    <span>{value}</span>
  </div>
);

Option.defaultProps = {
  onSelect: () => {},
};
Option.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};
export default Option;
