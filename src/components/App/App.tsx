import { useState, useRef } from 'react'
import { Window } from '../Window/Window'
import styles from './styles.module.scss'
import { Editor } from '../Editor/Editor'
import { formatJSON } from '../../utils/formatted'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// todo
// [х] - Добавить копирование по кнопке
// [х] - Редактирование и output в одном месте
// [ ] - По крестику очищать всё
// [ ] - Увеличить область textarea а то при клике на область курсор не становится
// [ ] - Добавить подсветку кода
// [ ] - Добавление кавычек перед парсингом не только на первом уровне
// [ ] - Добавить сохранения введенного кода в LS
// [ ] - Добавить настройки шрифта и тд, что будет сохраняться в localStorage
// [ ] - Добавить смену темы

export const App = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState<null | string>(null)
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
      toast.error('Ошибка: ' + result.message)
    } else {
      setError(null)
      setValue(result)
    }
  }

  const handleCopyText = () => {
    if (editorRef.current) {
      const textArea = editorRef.current
      const textToCopy = textArea.value

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          toast.success('Текст скопирован!', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          })
        })
        .catch((err) => {
          console.error('Ошибка при копировании: ', err)
          toast.error('Ошибка при копировании')
        })
    }
  }

  return (
    <>
      <div className={styles.container}>
        <Window
          handleCopyText={handleCopyText}
          handleFormatted={handleFormatted}
        >
          <Editor
            value={value}
            handleChangeInput={handleChangeInput}
            ref={editorRef}
          />
        </Window>
      </div>
      <ToastContainer className='toast-container' />
    </>
  )
}