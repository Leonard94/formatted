type HistoryUpdateType = {
  [key: string]: string[]
}

export const HISTORY_UPDATE: HistoryUpdateType = {
  '28.08.24': [
    'Добавлен раздел с новостями обновлений',
    'Добавлена поддержка SQL: посдветка кода и форматирование',
    'Выбрать режим: SQL или JSON можно в редакторе',
    'Важно: подсветка кода лучше всего работает в теме Monokai',
    'Некоторые технические улучшения'
  ],
  '17.08.24': [
    'Теперь можно убирать кавычки у типов данных с помощью переключателя',
    'При форматировании JSON автоматически расставляет кавычки и запятые',
  ],
}
