import type { EventCard } from '@/stores/types.ts'

// Функция для генерации случайного числа от 1000 до 30000 (округленного)
export const getRandomAmount = (): number => {
  return Math.round(Math.random() * 290 + 10) * 100
}

// Массив случайных текстов для доходов
export const incomeDescriptions = [
  'Нашли деньги в старой куртке',
  'Выиграли в лотерею',
  'Получили наследство от дальнего родственника',
  'Вернули старый долг',
  'Нашли подработку на выходных',
  'Получили премию на работе',
  'Продали коллекционные предметы',
  'Выиграли в конкурсе',
  'Получили налоговый вычет',
  'Нашли скидочный купон на крупную сумму',
]

// Массив случайных текстов для расходов
export const expenseDescriptions = [
  'Сломался холодильник, нужен ремонт',
  'Неожиданные медицинские расходы',
  'Срочный ремонт автомобиля',
  'Штраф за превышение скорости',
  'Потеряли кошелек с деньгами',
  'Сломалась стиральная машина',
  'Необходимость покупки нового телефона',
  'Непредвиденные расходы на образование',
  'Поломка компьютера',
  'Срочная покупка зимней одежды',
]

// Функция для получения случайного элемента из массива
export const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)] as T
}

export const eventCards: Partial<EventCard>[] = [
  {
    id: 2,
    type: 'emergency_expense',
    title: 'Неожиданные расходы',
    description: '', // Будет заполнено случайным текстом
    cost: 0, // Будет заполнено случайной суммой
    action: 'accept_expense',
  },
  {
    id: 3,
    type: 'windfall',
    title: 'Неожиданный доход',
    description: '', // Будет заполнено случайным текстом
    gain: 0, // Будет заполнено случайной суммой
    action: 'accept_income',
  },
]

// Функция для получения случайной карточки события
export const getRandomEventCard = (): Partial<EventCard> => {
  const cardTemplate = eventCards[Math.floor(Math.random() * eventCards.length)]

  if (!cardTemplate) {
    throw new Error('No event cards available')
  }

  const card = { ...cardTemplate }

  // Заполняем случайными данными в зависимости от типа карточки
  if (card.type === 'windfall') {
    card.description = getRandomItem(incomeDescriptions)
    card.gain = getRandomAmount()
  } else if (card.type === 'emergency_expense') {
    card.description = getRandomItem(expenseDescriptions)
    card.cost = getRandomAmount()
  }

  return card
}
