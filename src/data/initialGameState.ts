import type { Asset, Liability } from '@/stores/types.ts'

export const initialState = {
  totalMonths: 60,
  financialGoal: 0, //избавиться от долгов
  assets: [
    {
      id: 1,
      name: 'Работа',
      type: 'work',
      monthlyIncome: 150000,
      value: 0,
      purchasePrice: 0,
      hidden: true,
    },
    {
      id: 2,
      name: 'Наличные',
      type: 'cash',
      monthlyIncome: 0,
      value: 10000,
      purchasePrice: 0,
    },
    // {
    //   id: 2,
    //   name: 'Облигации',
    //   type: 'bonds',
    //   monthlyIncome: 50,
    //   value: 2000,
    //   purchasePrice: 2000,
    //   riskLevel: 'low',
    // },
  ] as Asset[],
  liabilities: [
    {
      id: 1,
      name: 'Общие расходы',
      type: 'common',
      monthlyExpense: 75000,
      remainingAmount: 0,
      initialAmount: 0,
      interestRate: 0,
      hidden: true,
    },
    {
      id: 2,
      name: 'Кредитная карта',
      type: 'credit_card',
      monthlyExpense: 0,
      remainingAmount: 0,
      interestRate: 50,
    },
    {
      id: 3,
      name: 'Автокредит',
      type: 'car_loan',
      remainingAmount: 2370000,
      interestRate: 14.2,
      remainingMonths: 84,
    },
    // {
    //   id: 4,
    //   name: 'Долг родне',
    //   type: 'other',
    //   remainingAmount: 300000,
    //   interestRate: 0,
    //   remainingMonths: 24,
    // },
  ] as Liability[],
}
