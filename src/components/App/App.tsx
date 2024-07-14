import { useState, useRef } from 'react'
import { Window } from '../Window/Window'
import styles from './styles.module.scss'
import { Editor } from '../Editor/Editor'
import { formatJSON } from '../../utils/formatted'
import 'react-toastify/dist/ReactToastify.css'
import { ToastManager, ToastContainer } from '../ToastManager/ToastManager'
import { Modal } from '../Modal/Modal'
import { ClearNotification } from '../ClearNotification/ClearNotification'

// todo
// [х] - Добавить копирование по кнопке
// [х] - Редактирование и output в одном месте
// [х] - По крестику очищать всё
// [x] - Увеличить область textarea а то при клике на область курсор не становится
// [ ] - Добавить подсветку кода
// [ ] - Добавление кавычек перед парсингом не только на первом уровне
// [ ] - Добавить сохранения введенного кода в LS
// [ ] - Добавить настройки шрифта и тд, что будет сохраняться в localStorage
// [ ] - Добавить смену темы

export const App = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<null | string>(null)
  const [isShowModal, setIsShowModal] = useState(false)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)

    if (error) {
      setError(null)
    }
  }

  const handleFormatted = () => {
    const result = formatJSON(value)

    if (result instanceof Error) {
      setError(result.message)
      ToastManager.Error('Ошибка: ' + result.message)
    } else {
      setError(null)
      setValue(result)
    }
  }

  const handleClear = (wantClear: boolean) => {
    if (wantClear) {
      setValue('')
      setError('')
    }

    setIsShowModal(false)
  }

  const handleCopyText = () => {
    if (editorRef.current) {
      const textArea = editorRef.current
      const textToCopy = textArea.value

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          ToastManager.Success('Текст скопирован!')
        })
        .catch((error) => {
          ToastManager.Error('Ошибка при копировани: ' + error)
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
