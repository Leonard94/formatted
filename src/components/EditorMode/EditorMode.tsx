import { Select } from '../UI/Select/Select'

export enum EEditorMode {
  SQL = 'SQL',
  JSON = 'JSON',
}

interface ITheme {
  handleModeChange: (mode: EEditorMode) => void
  currentEditorMode: EEditorMode
}

export const EditorMode: React.FC<ITheme> = ({
  handleModeChange,
  currentEditorMode,
}) => {
  const options = Object.values(EEditorMode).map((theme) => ({
    value: theme,
    label: theme.charAt(0).toUpperCase() + theme.slice(1).replace('_', ' '),
  }))

  return (
    <Select
      value={currentEditorMode}
      onChange={(value) => handleModeChange(value as EEditorMode)}
      options={options}
    />
  )
}
