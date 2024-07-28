import { useState } from 'react'
import styles from './styles.module.scss'
import { Modal } from '../Modal/Modal'
import { HISTORY_UPDATE } from './HistoryUpdate'

export const UpdateNews = () => {
  const [isShowHit, setIsShowHit] = useState(false)

  const newsTitle = Object.keys(HISTORY_UPDATE)

  return (
    <>
      <div className={styles.container} onClick={() => setIsShowHit(true)}>
        <div className={styles.hint}>?</div>
      </div>
      <Modal isOpen={isShowHit} onClose={() => setIsShowHit(false)}>
        <div className={styles.news}>
          {newsTitle.map((title, index) => (
            <div key={index} className={styles.item}>
              <h2 className={styles.item__title}>{title}</h2>
              {HISTORY_UPDATE[title].map((text) => (
                <p className={styles.item__text}>- {text}</p>
              ))}
            </div>
          ))}
        </div>
      </Modal>
    </>
  )
}
