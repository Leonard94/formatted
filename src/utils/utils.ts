export const getLineNumbers = (value: string) => {
  return value.split('\n')
}

export enum EAction {
  Copy = 'скопирован',
  Format = 'отформатирован',
}

export const getCompliments = (action: EAction) => {
  const actionValue = action === EAction.Copy ? EAction.Copy : EAction.Format

  const COMPLIMENTS = [
    `Отлично! Твой код ${actionValue}`,
    `Булат будет тобой доволен! Твой код успешно ${actionValue}`,
    `Супер! Твой код ${actionValue} без проблем`,
    `Молодец! Твой код теперь ${actionValue}`,
    `Отличная работа! Код ${actionValue}`,
    `Великолепно! Код был успешно ${actionValue}`,
    `Потрясающе! Код ${actionValue}`,
    `Фантастика! Твой код ${actionValue}`,
    `Хорошая работа! Код был ${actionValue}`,
  ]

  const randomIndex = Math.floor(Math.random() * COMPLIMENTS.length)

  return COMPLIMENTS[randomIndex]
}
