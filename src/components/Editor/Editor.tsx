import React from 'react'
import { EditorTheme } from '../Theme/Theme'
import { TTab } from '../Settings/Settings'
import { EEditorMode } from '../EditorMode/EditorMode'
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
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/ext-language_tools'

interface EditorProps {
  value: string
  handleChangeInput: (value: string) => void
  theme: EditorTheme
  fzValue: number
  tabValue: TTab
  currentMode: EEditorMode
}

export const Editor = React.forwardRef<AceEditor, EditorProps>(
  (
    { value, handleChangeInput, theme, fzValue, tabValue, currentMode },
    ref
  ) => {
    return (
      <AceEditor
        ref={ref}
        mode={currentMode}
        theme={theme}
        onChange={handleChangeInput}
        value={value}
        name='json-editor'
        setOptions={{
          showLineNumbers: true,
          tabSize: tabValue,
          fontSize: fzValue,
        }}
        editorProps={{ $blockScrolling: true }}
        placeholder={
          currentMode === EEditorMode.JSON
            ? 'Для твоего JSONa'
            : 'Не на SQL мне тут'
        }
        width='100%'
        height='65vh'
        enableBasicAutocompletion
        enableLiveAutocompletion
      />
    )
  }
)
