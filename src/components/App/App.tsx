import { useState, useRef } from 'react'
import { Window } from '../Window/Window'
import styles from './styles.module.scss'
import { Editor } from '../Editor/Editor'
import { formatJSON } from '../../utils/formatted'
import 'react-toastify/dist/ReactToastify.css'
import { ToastManager, ToastContainer } from '../ToastManager/ToastManager'
import { Modal } from '../Modal/Modal'
import { ClearNotification } from '../ClearNotification/ClearNotification'
import AceEditor from 'react-ace'
import { getCompliments, EAction } from '../../utils/utils'

// todo
// [ ] - Добавление кавычек перед парсингом не только на первом уровне
// [ ] - Добавить сохранения введенного кода в LS
// [ ] - Добавить настройки шрифта и тд, что будет сохраняться в localStorage
// [ ] - Добавить смену темы
// [ ] - При tab добавлять несколько пробелов

export const App = () => {
  const [value, setValue] = useState('')
  const [isShowModal, setIsShowModal] = useState(false)
  const editorRef = useRef<AceEditor>(null)

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

  return (
    <>
      <div className={styles.container}>
        <Window
          handleCopyText={handleCopyText}
          handleFormatted={handleFormatted}
          handleClearEditor={() => setIsShowModal(true)}
        >
          <Editor
            value={value}
            handleChangeInput={handleChangeInput}
            ref={editorRef}
          />
        </Window>
      </div>
      <Modal isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
        <ClearNotification handleClear={handleClear} />
      </Modal>
      <ToastContainer className='toast-container' />
    </>
  )
}
