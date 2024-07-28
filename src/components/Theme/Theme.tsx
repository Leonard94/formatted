import { Select } from '../UI/Select/Select'

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
  const options = Object.values(EditorTheme).map((theme) => ({
    value: theme,
    label: theme.charAt(0).toUpperCase() + theme.slice(1).replace('_', ' '),
  }))

  return (
    <Select
      value={currentTheme}
      onChange={(value) => handleThemeChange(value as EditorTheme)}
      options={options}
    />
  )
}
