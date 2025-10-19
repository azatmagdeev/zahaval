export type Credit = {
  name: string
  debt: number //сумма долга
  period?: number //срок в месяцах, у кредитной карты нет
  limit?: number // для кредитной карты
  percent: number // процент годовых
  payment?: number // ежемесячный платеж (вычисляемое)
}

export type Active = {
  name: string
  worth: number //стоимость актива (цена покупки)
  income: number //доход от актива
  hidden: boolean // не показывать в списке активов
}

export type Passive = {
  name: string
  worth: number
  cost: number
  hidden: boolean
}

export type Income = {
  summ: number
  actives: Active[]
}

export type Cost = {
  summ: number
  passives: Passive[]
}

const credit1: Credit = {
  name: 'Автокредит',
  period: 84,
  percent: 14.2,
  debt: 2500000,
}

console.log(credit1)
