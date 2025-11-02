import type { Liability } from '@/stores/types.ts'

export type PaymentBreakdown = {
  totalPayment: number // общая сумма платежа
  principalPart: number // часть, идущая на погашение тела кредита
  interestPart: number // часть, идущая на погашение процентов
  remainingDebt: number // остаток долга после платежа
}

export function calculateMonthlyPayment(liability: Liability): PaymentBreakdown {
  const monthlyRate = (liability.interestRate || 0) / 100 / 12 // месячная процентная ставка

  if (liability.remainingMonths === undefined) {
    throw new Error('У кредита нет срока')
  }

  // Аннуитетный платеж для обычного кредита
  const annuityCoefficient =
    (monthlyRate * Math.pow(1 + monthlyRate, liability.remainingMonths)) /
    (Math.pow(1 + monthlyRate, liability.remainingMonths) - 1)

  const totalPayment = liability.remainingAmount * annuityCoefficient
  const interestPart = liability.remainingAmount * monthlyRate
  const principalPart = totalPayment - interestPart
  const remainingDebt = Math.max(0, liability.remainingAmount - principalPart)

  return {
    totalPayment: Math.round(totalPayment),
    principalPart: Math.round(principalPart),
    interestPart: Math.round(interestPart),
    remainingDebt: Math.round(remainingDebt),
  }
}

