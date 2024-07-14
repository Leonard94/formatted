import styles from './styles.module.scss'

export enum EditorTheme {
  Github = 'github',
  Monokai = 'monokai',
  Tomorrow = 'tomorrow',
  Kuroir = 'kuroir',
  Twilight = 'twilight',
  Xcode = 'xcode',
  Textmate = 'textmate',
  SolarizedDark = 'solarized_dark',
  SolarizedLight = 'solarized_light',
  Terminal = 'terminal',
}

interface ITheme {
  handleThemeChange: (value: EditorTheme) => void
  currentTheme: EditorTheme
}

export const Theme: React.FC<ITheme> = ({
  currentTheme,
  handleThemeChange,
}) => {
  return (
    <div className={styles.themeContainer}>
      {/* <label htmlFor='theme-select' className={styles.themeLabel}>
        Тема редактора
      </label> */}
      <select
        id='theme-select'
        className={styles.themeSelect}
        value={currentTheme}
        onChange={(e) => handleThemeChange(e.target.value as EditorTheme)}
      >
        {Object.values(EditorTheme).map((theme) => (
          <option key={theme} value={theme}>
            {theme.charAt(0).toUpperCase() + theme.slice(1).replace('_', ' ')}
          </option>
        ))}
      </select>
    </div>
  )
}
