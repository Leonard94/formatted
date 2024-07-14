import styles from './styles.module.scss'

type TProps = {
  children: JSX.Element
  handleCopyText: () => void
  handleFormatted: () => void
  handleClearEditor: () => void
}

export const Window: React.FC<TProps> = ({
  children,
  handleCopyText,
  handleFormatted,
  handleClearEditor,
}) => {
  return (
    <div className={styles.window}>
      <div className={styles.window__header}>
        <div className={styles.title}>
          <svg
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='file'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 384 512'
          >
            <path
              fill='currentColor'
              d='M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V448C384 483.3 355.3 512 320 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256z'
            ></path>
          </svg>
          CreatedByLeonard.tsx
        </div>
        <div className={styles.controls}>
          <span onClick={handleFormatted}>F</span>
          <span onClick={handleCopyText}>
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='fas'
              data-icon='copy'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
            >
              <path
                fill='currentColor'
                d='M384 96L384 0h-112c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48H464c26.51 0 48-21.49 48-48V128h-95.1C398.4 128 384 113.6 384 96zM416 0v96h96L416 0zM192 352V128h-144c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48L288 416h-32C220.7 416 192 387.3 192 352z'
              ></path>
            </svg>
          </span>
          <span onClick={handleClearEditor}>
            <svg
              aria-hidden='true'
              focusable='false'
              data-prefix='fas'
              data-icon='xmark'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 320 512'
            >
              <path
                fill='currentColor'
                d='M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z'
              ></path>
            </svg>
          </span>
        </div>
      </div>
      <div className={styles.window__content}>{children}</div>
    </div>
  )
}
