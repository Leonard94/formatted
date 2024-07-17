import { useState, useEffect, useRef } from 'react'
import AceEditor from 'react-ace'
import { Window } from '../Window/Window'
import { Settings } from '../Settings/Settings'
import { EditorTheme } from '../Theme/Theme'
import { Editor } from '../Editor/Editor'
import { formatToJson, handleRemoveQuoteDataTypes } from '../../utils/formatted'
import { ToastManager, ToastContainer } from '../ToastManager/ToastManager'
import { Modal } from '../Modal/Modal'
import { ClearNotification } from '../ClearNotification/ClearNotification'
import { getCompliments, EAction } from '../../utils/utils'
import 'react-toastify/dist/ReactToastify.css'
import styles from './styles.module.scss'
import { TTab } from '../Settings/Settings'
import { SplashScreen } from '../SplashScreen/SplashScreen'
import { Toggle } from '../Toggle/Toggle'

// todo
// [ ] - Добавить сохранения введенного кода в LS
// [ ] - Добавить настройки шрифта и тд, что будет сохраняться в localStorage

export const App = () => {
  const [showSplash, setShowSplash] = useState(true)
  const [value, setValue] = useState('')
  const [isShowModalClear, setIsShowModalClear] = useState(false)
  const [isShowModalSettings, setIsShowModalSettings] = useState(false)
  const [fzValue, setFzValue] = useState<number>(12)
  const [tabValue, setTabValue] = useState<TTab>(4)
  const [needUnquoteDataTypes, setNeedUnquoteDataTypes] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<EditorTheme>(
    EditorTheme.Github
  )
  const editorRef = useRef<AceEditor>(null)

  const handleChangeInput = (value: string) => {
    setValue(value)
  }

  const handleFormatted = () => {
    if (!value) {
      return
    }

    const result = formatToJson(value, tabValue)

    if (result instanceof Error) {
      ToastManager.Error('Ошибка: ' + result.message)
    } else {
      ToastManager.Success(getCompliments(EAction.Format))
      setValue(needUnquoteDataTypes ? handleRemoveQuoteDataTypes(result) : result)
    }
  }

  const handleClear = (wantClear: boolean) => {
    if (wantClear) {
      setValue('')
    }

    setIsShowModalClear(false)
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <div className={styles.container}>
            <button
              className={styles.settings}
              onClick={() => setIsShowModalSettings(true)}
            >
              Настроим?
            </button>
            <Window
              handleCopyText={handleCopyText}
              handleFormatted={handleFormatted}
              handleClearEditor={() => setIsShowModalClear(true)}
              handleThemeChange={handleThemeChange}
              currentTheme={currentTheme}
            >
              <Editor
                value={value}
                handleChangeInput={handleChangeInput}
                ref={editorRef}
                theme={currentTheme}
                fzValue={fzValue}
                tabValue={tabValue}
              />
            </Window>
            <Toggle isChecked={needUnquoteDataTypes} handleChecked={() =>
              setNeedUnquoteDataTypes(!needUnquoteDataTypes)
            } />
          </div>
          <Modal
            isOpen={isShowModalClear}
            onClose={() => setIsShowModalClear(false)}
          >
            <ClearNotification handleClear={handleClear} />
          </Modal>
          <Modal
            isOpen={isShowModalSettings}
            onClose={() => setIsShowModalSettings(false)}
          >
            <Settings
              tabValue={tabValue}
              fzValue={fzValue}
              onTabChange={(value) => setTabValue(value)}
              onFzChange={(value) => setFzValue(value)}
            />
          </Modal>
          <ToastContainer className='toast-container' />
          <span className={styles.about}>Обновлено: 16.07.24</span>
        </>
      )}
    </>
  )
}
