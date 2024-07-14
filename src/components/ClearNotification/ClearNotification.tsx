import React from 'react'
import styles from './styles.module.scss'

type TProps = {
  handleClear: (isClear: boolean) => void
}

export const ClearNotification: React.FC<TProps> = ({ handleClear }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Очистить весь твой шикарный код? 🤨</h1>
      <div className={styles.row}>
        <button
          className={`${styles.btn} ${styles.btn__cancel}`}
          onClick={() => handleClear(false)}
        >
          Нет 👎
        </button>
        <button
          className={`${styles.btn} ${styles.btn__accept}`}
          onClick={() => handleClear(true)}
        >
          Да 👍
        </button>
      </div>
    </div>
  )
}
