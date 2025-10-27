import type { Asset, Liability } from '@/stores/types.ts'

export const initialState = {
  totalMonths: 60,
  cash: 10000,
  financialGoal: 2500000,
  assets: [
    {
      id: 1,
      name: 'Работа',
      type: 'work',
      monthlyIncome: 100000,
      value: 0,
      purchasePrice: 0,
      //riskLevel: 'high',
      hidden: true,
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
      monthlyExpense: 70000,
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
      interestRate: 50
    },
  ] as Liability[],
}
