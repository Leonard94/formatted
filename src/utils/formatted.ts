/* eslint-disable @typescript-eslint/no-explicit-any */

import { TTab } from '../components/Settings/Settings'
// const WORDS_TO_UNQUOTE = [
//   'true',
//   'false',
//   'null',
//   'undefined',
//   'boolean',
//   'int',
//   'string',
// ]

const addQuotesToWords = (json: string): string => {
  return (
    json
      // Добавляем кавычки к ключам объектов, если они не заключены в кавычки
      .replace(/(\b\w+\b)(?=\s*:)/g, '"$1"')
      // Добавляем кавычки ко всем значениям, кроме чисел, строк в кавычках и значений с одинарными кавычками
      .replace(/:\s*([^",\{\[\]\}\s]+)(?=[,\}\]])/g, ':"$1"')
  )
}

export const formatJSON = (value: string, tabValue: TTab) => {
  try {
    const correctedJSON = value
      .replace(/'/g, '"') // Заменяем одинарные кавычки на двойные
      .replace(/,\s*([}\]])/g, '$1') // Удаляем запятые перед закрывающими скобками
      .replace(/([{,])\s*(\w+)\s*:/g, '$1"$2":') // Добавляем кавычки к ключам
      .replace(/:\s*'([^']*)'/g, ':"$1"') // Заменяем одинарные кавычки на двойные в значениях
      .replace(
        /([^\\])(")((?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z?))\2/g,
        '$1$3'
      ) // Удаляем кавычки вокруг дат ISO 8601

    const quotedValue = addQuotesToWords(correctedJSON)

    // Парсим JSON
    const parsedValue = JSON.parse(quotedValue)

    // Форматируем JSON
    const formattedJSON = JSON.stringify(parsedValue, null, tabValue)

    // Удаляем кавычки у специальных слов
    // WORDS_TO_UNQUOTE.forEach((word) => {
    //   const regex = new RegExp(`"(${word})"`, 'g')
    //   formattedJSON = formattedJSON.replace(regex, '$1')
    // })

    return formattedJSON
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
    return new Error()
  }
}
