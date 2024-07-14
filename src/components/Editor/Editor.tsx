import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'

interface EditorProps {
  value: string
  handleChangeInput: (value: string) => void
}

export const Editor = React.forwardRef<AceEditor, EditorProps>(
  ({ value, handleChangeInput }, ref) => {
    return (
      <AceEditor
        ref={ref}
        mode='json'
        theme='github'
        onChange={handleChangeInput}
        value={value}
        name='json-editor'
        setOptions={{
          showLineNumbers: true,
          tabSize: 4,
        }}
        editorProps={{ $blockScrolling: true }}
        placeholder='Для твоего JSONa'
        width='100%'
        height='400px'
        enableBasicAutocompletion
        enableLiveAutocompletion
      />
    )
  }
)
