import React from 'react'
import styles from './styles.module.scss'

type TProps = {
  isChecked: boolean
  handleChecked: () => void
}

export const Toggle: React.FC<TProps> = ({ isChecked, handleChecked }) => {
  return (
    <label className={styles.toggle}>
      <input
        className={styles.toggle__checkbox}
        type='checkbox'
        checked={isChecked}
        onChange={handleChecked}
      />
      <span className={styles.toggle__switch} />
      <span className={styles.toggle__label}>Убрать кавычки для типов</span>
    </label>
  )
}
