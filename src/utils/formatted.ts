import { TTab } from '../components/Settings/Settings'

export const formatToJson = (value: string, valueTab: TTab): string | Error => {
  // Функция для очистки и подготовки JSON строки
  const cleanJsonString = (str: string): string => {
    // Заменяем одинарные кавычки на двойные
    str = str.replace(/'/g, '"');

    // Добавляем кавычки к ключам без кавычек
    str = str.replace(/(\w+)(?=\s*:)/g, '"$1"');

    // Добавляем кавычки к значениям без кавычек
    str = str.replace(/:(\s*)(true|false|null|\d+|\w+)(\s*[,}\]])/g, ':"$2"$3');

    // Удаляем запятые перед закрывающимися скобками
    str = str.replace(/,\s*([\]}])/g, '$1');

    // Добавляем запятые после значений, если их нет
    str = str.replace(/([}\]])([\s\n]*)(["{\[])/g, '$1,$2$3');

    return str;
  }

  try {
    // Очищаем и подготавливаем входную строку
    const cleanedValue = cleanJsonString(value);
    console.log('cleanedValue =>>', cleanedValue)

    // Пытаемся распарсить очищенный JSON
    const parsedValue = JSON.parse(cleanedValue);

    // Форматируем результат
    const formatted = JSON.stringify(parsedValue, null, valueTab);

    return formatted;
  } catch (e) {
    return new Error('Invalid input: ' + (e as Error).message);
  }
}