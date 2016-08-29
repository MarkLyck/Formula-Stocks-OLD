import React from 'react';
import ToolbarIcon from '../components/ToolbarIcon';

const INLINE_STYLES = [
  { icon: 'a-bold', style: 'BOLD' },
  { icon: 'a-italic', style: 'ITALIC' }
];

export default ({ editorState, onToggle, position }) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div
      className="toolbar"
      id="inlineToolbar"
      style={position}
    >
      <ul className="toolbar-icons">
        {INLINE_STYLES.map(type =>
          <ToolbarIcon
            key={type.label || type.icon}
            active={currentStyle.has(type.style)}
            label={type.label}
            icon={type.icon}
            onToggle={onToggle}
            style={type.style}
          />
        )}
      </ul>
    </div>
  )
};
