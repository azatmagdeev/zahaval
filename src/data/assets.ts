import type { Active, Passive } from '@/stores/types.ts'

// Массив активов (приносят доход)
export const actives: Active[] = [
  {
    name: 'Работа',
    worth: 0,
    income: 150000,
    hidden: true
  },
  {
    name: 'Депозит в банке',
    worth: 150000,
    income: 750, // 6% годовых
    hidden: false
  },
  {
    name: 'Акции Сбербанка',
    worth: 50000,
    income: 2500, // дивиденды ~5%
    hidden: false
  },
  {
    name: 'Сдача квартиры',
    worth: 3000000,
    income: 25000, // аренда
    hidden: false
  },
  {
    name: 'Фонд облигаций',
    worth: 100000,
    income: 800, // 8% годовых
    hidden: false
  }
]

// Массив пассивов (создают расходы)
export const passives: Passive[] = [
  {
    name: 'Автомобиль',
    worth: 2500000,
    cost: 15000, // страховка, ТО, бензин
    hidden: false
  },
  {
    name: 'Ипотека',
    worth: 5000000,
    cost: 21000, // ежемесячный платеж
    hidden: false
  },
  {
    name: 'Кредитная карта',
    worth: 0, // не имеет стоимости как актив
    cost: 3000, // минимальный платеж
    hidden: false
  },
  {
    name: 'Абонемент в спортзал',
    worth: 0,
    cost: 2000,
    hidden: false
  },
  {
    name: 'Страхование жизни',
    worth: 0,
    cost: 5000,
    hidden: true // скрытый пассив (игрок еще не оформил)
  }
]
