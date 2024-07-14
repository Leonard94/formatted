import React from 'react'
import { EditorTheme } from '../Theme/Theme'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/theme-kuroir'
import 'ace-builds/src-noconflict/theme-twilight'
import 'ace-builds/src-noconflict/theme-xcode'
import 'ace-builds/src-noconflict/theme-textmate'
import 'ace-builds/src-noconflict/theme-solarized_dark'
import 'ace-builds/src-noconflict/theme-solarized_light'
import 'ace-builds/src-noconflict/theme-terminal'

interface EditorProps {
  value: string
  handleChangeInput: (value: string) => void
  theme: EditorTheme
}

export const Editor = React.forwardRef<AceEditor, EditorProps>(
  ({ value, handleChangeInput, theme }, ref) => {
    return (
      <AceEditor
        ref={ref}
        mode='json'
        theme={theme}
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
        height='65vh'
        enableBasicAutocompletion
        enableLiveAutocompletion
      />
    )
  }
)
