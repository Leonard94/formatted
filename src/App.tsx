import { useState } from 'react'
import styles from './styles.module.scss'

// todo
// [ ] - Добавить копирование по кнопке
// [ ] - Добавить настройки шрифта и тд, что будет сохраняться в localStorage
// [ ] - Добавить смену темы
// [ ] - Редактирование и output в одном месте

const WORDS_TO_UNQUOTE = [
  'true',
  'false',
  'null',
  'undefined',
  'boolean',
  'int',
  'string',
]

export const App = () => {
  const [value, setValue] = useState('')
  const [output, setOutput] = useState<null | string>(null)
  const [error, setError] = useState<null | string>(null)

  const formatJSON = () => {
    try {
      const correctedJSON = value
        .replace(/'/g, '"')
        .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']')
        .replace(/}\s*{/g, '},{')
        .replace(/]\s*\[/g, '],[')
        .replace(/}\s*]/g, '}]')
        .replace(/\[\s*{/g, '[{')
        .replace(/}\s*,\s*]/g, '}]')

      const parsedValue = JSON.parse(correctedJSON)
      let formattedJSON = JSON.stringify(parsedValue, null, 2)

      WORDS_TO_UNQUOTE.forEach((word) => {
        const regex = new RegExp(`"(${word})"`, 'g')
        formattedJSON = formattedJSON.replace(regex, '$1')
      })

      setOutput(formattedJSON)
      setError(null)
    } catch (e) {
      setError('Что-то не так, нужно проверить скобки')
      setOutput(null)
    }
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)

    if (error) {
      setError(null)
    }
  }

  return (
    <div className={styles.container}>
      <textarea
        value={value}
        onChange={handleChangeInput}
        placeholder='Enter your JSON here'
      />
      <button onClick={formatJSON}>Formatted</button>
      {output && <pre className={styles.output}>{output}</pre>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}
