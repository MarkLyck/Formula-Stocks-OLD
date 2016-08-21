import React from 'react'
import {Editor, EditorState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js'

import store from '../../store'

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  submitArticle(editorState) {
    let content = convertToRaw(editorState.getCurrentContent())
    store.articles.data.create({
      content: content,
      title: this.refs.title.value
    })
  }


  render() {
    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    // <InlineStyleControls
    //   editorState={editorState}
    //   onToggle={this.toggleInlineStyle}
    // />

    return (
      <div className="RichEditor-root">

        <div className="controls">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>

        <input type="text" className="article-title" placeholder="Title" ref="title"/>

        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Write an article"
            ref="editor"
            spellCheck={true}
          />
        </div>
        <button className="filled-btn submit-article" onClick={this.submitArticle.bind(this, editorState)}>Submit</button>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'RichEditor-styleButton ' + this.props.classes;
    if (this.props.active) {
      className += ' RichEditor-activeButton ' + this.props.classes;
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

var INLINE_STYLES = [
  {label: '', style: 'BOLD', className: 'bold-text'},
  {label: '', style: 'ITALIC', className: 'italic-text'},
  {label: '', style: 'UNDERLINE', className: 'underline-text'},
  // {label: 'Monospace', style: 'CODE', className: 'monospace-text'},
];

const BLOCK_TYPES = [
  {label: '1', style: 'header-one', className: 'h1'},
  {label: '2', style: 'header-two', className: 'h2'},
  {label: '', style: 'blockquote', className: 'block-quote'},
  {label: '', style: 'unordered-list-item', className: 'UL'},
  {label: '', style: 'ordered-list-item', className: 'OL'},
  // {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">

      {BLOCK_TYPES.map((type, i) =>
        <StyleButton
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          classes={type.className}
          key={i}
        />
      )}
    </div>
  );
};



const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type, i) =>
        <StyleButton
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          classes={type.className}
          key={i}
        />
      )}
    </div>
  );
};

export default RichEditor
