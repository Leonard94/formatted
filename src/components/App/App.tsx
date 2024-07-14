import { useState, useRef } from 'react'
import AceEditor from 'react-ace'
import { Window } from '../Window/Window'
import { EditorTheme } from '../Theme/Theme'
import { Editor } from '../Editor/Editor'
import { formatJSON } from '../../utils/formatted'
import { ToastManager, ToastContainer } from '../ToastManager/ToastManager'
import { Modal } from '../Modal/Modal'
import { ClearNotification } from '../ClearNotification/ClearNotification'
import { getCompliments, EAction } from '../../utils/utils'
import 'react-toastify/dist/ReactToastify.css'
import styles from './styles.module.scss'

// todo
// [ ] - Добавление кавычек перед парсингом не только на первом уровне
// [ ] - Добавить сохранения введенного кода в LS
// [ ] - Добавить настройки шрифта и тд, что будет сохраняться в localStorage

export const App = () => {
  const [value, setValue] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)
  const editorRef = useRef<AceEditor>(null)
  const [currentTheme, setCurrentTheme] = useState<EditorTheme>(
    EditorTheme.Github
  )

  const handleChangeInput = (value: string) => {
    setValue(value)
  }

  const handleFormatted = () => {
    const result = formatJSON(value)

    if (result instanceof Error) {
      ToastManager.Error('Ошибка: ' + result.message)
    } else {
      ToastManager.Success(getCompliments(EAction.Format))
      setValue(result)
    }
  }

  const handleClear = (wantClear: boolean) => {
    if (wantClear) {
      setValue('')
    }

    setIsShowModal(false)
  }

  const handleCopyText = () => {
    if (editorRef.current) {
      const editor = editorRef.current.editor
      const textToCopy = editor.getValue()

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          ToastManager.Success(getCompliments(EAction.Copy))
        })
        .catch((error) => {
          ToastManager.Error('Ошибка при копировании: ' + error)
        })
    }
  }

  const handleThemeChange = (newTheme: EditorTheme) => {
    setCurrentTheme(newTheme)
  }

  return (
    <>
      <div className={styles.container}>
        <Window
          handleCopyText={handleCopyText}
          handleFormatted={handleFormatted}
          handleClearEditor={() => setIsShowModal(true)}
          handleThemeChange={handleThemeChange}
          currentTheme={currentTheme}
        >
          <Editor
            value={value}
            handleChangeInput={handleChangeInput}
            ref={editorRef}
            theme={currentTheme}
          />
        </Window>
      </div>
      <Modal isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
        <ClearNotification handleClear={handleClear} />
      </Modal>
      <ToastContainer className='toast-container' />
      {/* <Theme
        handleThemeChange={handleThemeChange}
        currentTheme={currentTheme}
      /> */}
    </>
  )
}
