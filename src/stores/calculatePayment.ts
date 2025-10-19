export type Credit = {
  name: string
  debt: number // сумма долга
  period?: number // срок в месяцах, у кредитной карты нет
  limit?: number // для кредитной карты
  percent: number // процент годовых
  payment?: number // ежемесячный платеж (вычисляемое)
}

export type PaymentBreakdown = {
  totalPayment: number // общая сумма платежа
  principalPart: number // часть, идущая на погашение тела кредита
  interestPart: number // часть, идущая на погашение процентов
  remainingDebt: number // остаток долга после платежа
}

function calculateMonthlyPayment(credit: Credit): PaymentBreakdown {
  const monthlyRate = credit.percent / 100 / 12; // месячная процентная ставка

  // Для кредитных карт (без срока) используем минимальный платеж
  if (!credit.period) {
    const minPaymentPercentage = 0.05; // 5%
    const totalPayment = Math.max(credit.debt * minPaymentPercentage, 1000);

    // Для кредитной карты сначала платятся проценты, потом тело
    const interestPart = Math.min(credit.debt * monthlyRate, totalPayment);
    const principalPart = totalPayment - interestPart;
    const remainingDebt = Math.max(0, credit.debt - principalPart);

    return {
      totalPayment: Math.round(totalPayment),
      principalPart: Math.round(principalPart),
      interestPart: Math.round(interestPart),
      remainingDebt: Math.round(remainingDebt)
    };
  }

  // Аннуитетный платеж для обычного кредита
  const annuityCoefficient = (monthlyRate * Math.pow(1 + monthlyRate, credit.period)) /
    (Math.pow(1 + monthlyRate, credit.period) - 1);

  const totalPayment = credit.debt * annuityCoefficient;
  const interestPart = credit.debt * monthlyRate;
  const principalPart = totalPayment - interestPart;
  const remainingDebt = Math.max(0, credit.debt - principalPart);

  return {
    totalPayment: Math.round(totalPayment),
    principalPart: Math.round(principalPart),
    interestPart: Math.round(interestPart),
    remainingDebt: Math.round(remainingDebt)
  };
}

// Альтернативная функция, которая принимает сумму платежа и возвращает разбивку
function calculatePaymentBreakdown(credit: Credit, paymentAmount?: number): PaymentBreakdown {
  const monthlyRate = credit.percent / 100 / 12;
  const totalPayment = paymentAmount || calculateMonthlyPayment(credit).totalPayment;

  const interestPart = Math.min(credit.debt * monthlyRate, totalPayment);
  const principalPart = Math.min(totalPayment - interestPart, credit.debt);
  const remainingDebt = Math.max(0, credit.debt - principalPart);

  return {
    totalPayment: Math.round(totalPayment),
    principalPart: Math.round(principalPart),
    interestPart: Math.round(interestPart),
    remainingDebt: Math.round(remainingDebt)
  };
}

// Примеры использования:
const consumerCredit: Credit = {
  name: "Потребительский кредит",
  debt: 100000,
  period: 12,
  percent: 15
};

const creditCard: Credit = {
  name: "Кредитная карта",
  debt: 50000,
  percent: 25,
  limit: 100000
};

// Расчет платежей
const consumerPayment = calculateMonthlyPayment(consumerCredit);
const creditCardPayment = calculateMonthlyPayment(creditCard);

console.log('Потребительский кредит:');
console.log(`Общий платеж: ${consumerPayment.totalPayment} руб.`);
console.log(`- Погашение тела: ${consumerPayment.principalPart} руб.`);
console.log(`- Погашение процентов: ${consumerPayment.interestPart} руб.`);
console.log(`- Остаток долга: ${consumerPayment.remainingDebt} руб.`);

console.log('\nКредитная карта:');
console.log(`Общий платеж: ${creditCardPayment.totalPayment} руб.`);
console.log(`- Погашение тела: ${creditCardPayment.principalPart} руб.`);
console.log(`- Погашение процентов: ${creditCardPayment.interestPart} руб.`);
console.log(`- Остаток долга: ${creditCardPayment.remainingDebt} руб.`);

// Функция для применения платежа к кредиту
function applyPayment(credit: Credit, payment: PaymentBreakdown): Credit {
  return {
    ...credit,
    debt: payment.remainingDebt
  };
}

// Пример применения платежа
const updatedCredit = applyPayment(consumerCredit, consumerPayment);
console.log(`\nПосле платежа долг по кредиту "${updatedCredit.name}": ${updatedCredit.debt} руб.`);
