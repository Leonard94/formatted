import React from 'react'
import styles from './styles.module.scss'
import { getLineNumbers } from '../../utils/utils'

interface EditorProps {
  value: string
  handleChangeInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const Editor = React.forwardRef<HTMLTextAreaElement, EditorProps>(
  ({ value, handleChangeInput }, ref) => {
    const lines = getLineNumbers(value).map((_, index) => (
      <div key={index} className={styles.lineNumber}>
        {index + 1}
      </div>
    ))

    return (
      <div className={styles.editor}>
        <div className={styles.line_numbers}>{lines}</div>
        <textarea
          ref={ref}
          value={value}
          onChange={handleChangeInput}
          placeholder='Для твоего JSONa'
          className={styles.editor}
        />
      </div>
    )
  }
)