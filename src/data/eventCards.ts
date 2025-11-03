import type { EventCard } from '@/stores/types.ts'

export const eventCards:Partial<EventCard>[] = [
  // {
  //   id: 1,
  //   type: 'investment_opportunity',
  //   title: 'Инвестиция в стартап',
  //   description: 'Предлагается инвестировать в перспективный стартап',
  //   cost: 5000,
  //   monthlyIncome: 200,
  //   action: 'buy',
  // },
  {
    id: 2,
    type: 'emergency_expense',
    title: 'Неожиданные расходы',
    description: 'Сломался холодильник, нужен ремонт',
    cost: 2000,
    action: 'accept_expense',
  },
  {
    id: 3,
    type: 'windfall',
    title: 'Неожиданный доход',
    description: 'Удалось продать пару ненужных вещей',
    gain: 2000,
    action: 'accept_income',
  },
  // {
  //   id: 4,
  //   type: 'loan_offer',
  //   title: 'Предложение кредита',
  //   description: 'Банк предлагает выгодный кредит',
  //   amount: 10000,
  //   monthlyExpense: 150,
  //   action: 'take_loan',
  // },
  // {
  //   id: 5,
  //   type: 'asset_sale',
  //   title: 'Предложение продажи',
  //   description: 'Кто-то хочет купить ваши акции',
  //   assetId: 1,
  //   salePrice: 5500,
  //   action: 'sell',
  // },
]
