import React from 'react'
import styles from './styles.module.scss'

export type TTab = 2 | 4

type TProps = {
  fzValue: number
  tabValue: TTab
  onTabChange: (number: TTab) => void
  onFzChange: (number: number) => void
}

const FONTS_SIZE_MIN = 10
const FONTS_SIZE_MAX = 20

const FONT_SIZES = Array.from(
  { length: FONTS_SIZE_MAX - FONTS_SIZE_MIN + 1 },
  (v, i) => i + FONTS_SIZE_MIN
)

export const Settings: React.FC<TProps> = ({
  fzValue,
  tabValue,
  onTabChange,
  onFzChange,
}) => {
  console.log('tabValue', tabValue)
  return (
    <div>
      <div className={styles.title}>Давай выберем настройки</div>
      <div className={styles.subtitle}>
        Они не сохранятся при перезагрузке потому что мне было лень. А оно надо?
      </div>
      <div className={styles.settings}>
        <div className={styles.settings__item}>
          <label>Херово видно?</label>
          <select
            value={fzValue}
            onChange={(e) => onFzChange(Number(e.target.value))}
            className={styles.select}
          >
            {FONT_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {fzValue !== 12 && (
            <div className={styles.info}>Если что по дефолту 12px</div>
          )}
        </div>
        <div className={styles.settings__item}>
          <label>Тебе нравится табуляция в 2 пробела?</label>
          <input
            type='checkbox'
            checked={tabValue === 2}
            onChange={() => onTabChange(tabValue === 2 ? 4 : 2)}
            className={styles.checkbox}
          />
          {tabValue === 2 && (
            <div className={styles.info}>А, ты из этих... ну ок</div>
          )}
        </div>
      </div>
    </div>
  )
}
