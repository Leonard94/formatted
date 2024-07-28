import styles from './styles.module.scss'
import { Theme, EditorTheme } from '../Theme/Theme'
import { EEditorMode } from '../EditorMode/EditorMode'
import { EditorMode } from '../EditorMode/EditorMode'
import { FileIcon, CopyIcon, CloseIcon } from '../../icons'

type TProps = {
  children: JSX.Element
  handleCopyText: () => void
  handleFormatted: () => void
  handleClearEditor: () => void
  handleThemeChange: (theme: EditorTheme) => void
  currentTheme: EditorTheme
  currentEditorMode: EEditorMode
  handleModeChange: (mode: EEditorMode) => void
}

export const Window: React.FC<TProps> = ({
  children,
  handleCopyText,
  handleFormatted,
  handleClearEditor,
  handleThemeChange,
  currentTheme,
  currentEditorMode,
  handleModeChange,
}) => {
  return (
    <div className={styles.window}>
      <div className={styles.window__header}>
        <div className={styles.title}>
          <FileIcon />
          <Theme
            handleThemeChange={handleThemeChange}
            currentTheme={currentTheme}
          />
        </div>
        <EditorMode
          currentEditorMode={currentEditorMode}
          handleModeChange={handleModeChange}
        />
        <div className={styles.controls}>
          <span onClick={handleFormatted}>F</span>
          <span onClick={handleCopyText}>
            <CopyIcon />
          </span>
          <span onClick={handleClearEditor}>
            <CloseIcon />
          </span>
        </div>
      </div>
      <div className={styles.window__content}>{children}</div>
    </div>
  )
}
