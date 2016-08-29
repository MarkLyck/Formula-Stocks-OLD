import React from 'react';
import classnames from 'classnames';

export default ({ label, icon, active, onToggle, style }) => (
  <li
    className={"toolbar-icon " + classnames({ active })}
    onMouseDown={(e) => {
      e.preventDefault();
      onToggle(style)
    }}
  >
    {label ? label : <i className={icon}></i>}
  </li>
);
