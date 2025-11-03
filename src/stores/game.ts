// stores/gameStore.js
import { defineStore } from 'pinia'

import type {
  GameState,
  Asset,
  Liability,
  EventCard,
  MonthlyReportType,
  JournalEntry,
  IncomeExpenseItem,
  ChartDataPoint,
  CardAction,
} from './types.ts'
import {
  eventCards,
  expenseDescriptions,
  getRandomAmount,
  getRandomItem,
  incomeDescriptions,
} from '@/data/eventCards.ts'
import { initialState } from '@/data/initialGameState.ts'
import { calculateMonthlyPayment } from '@/stores/calculatePayment.ts'
import { usePopup } from '@/stores/popup.ts'
import MonthlyReport from '@/MonthlyReport.vue'

export const useGameStore = defineStore('game', {
  state: (): GameState =>
    ({
      gameId: 1,
      currentMonth: 1,
      currentMove: 0,
      totalMonths: initialState.totalMonths,
      movesPerMonth: 4,
      gameStatus: 'playing',
      financialGoal: initialState.financialGoal,
      assets: initialState.assets,
      liabilities: initialState.liabilities,
      currentCard: null,
      eventHistory: [],
      monthlyReports: [],
      settings: {
        soundEnabled: true,
        animationsEnabled: true,
        difficulty: 'medium',
      },
      initialNetWorth: 0, // Будет установлена при инициализации
      previousCardId: null, // ID предыдущей карточки
    }) as unknown as GameState,

  getters: {
    // наличные
    cashAsset: (state): Asset => {
      const cashAsset = state.assets.find((a) => a.type === 'cash')
      if (!cashAsset) throw new Error('Нет наличных')
      return cashAsset
    },

    // Кредитная карта (как один из пассивов)
    creditCard: (state): Liability => {
      return state.liabilities.find((l) => l.type === 'credit_card') || ({} as Liability)
    },

    // Денежный поток (доходы минус расходы)
    cashFlow: (state): number => {
      return state.totalAssetIncome - state.totalLiabilityExpenses
    },

    // Общий доход от активов
    totalAssetIncome: (state): number =>
      state.assets.reduce((sum: number, asset: Asset) => sum + asset.monthlyIncome, 0),

    // Общие расходы от пассивов
    totalLiabilityExpenses: (state): number =>
      state.liabilities.reduce((sum: number, liability: Liability) => {
        if (liability.monthlyExpense === undefined) {
          const breakDown = calculateMonthlyPayment(liability)
          liability.monthlyExpense = breakDown.totalPayment
        }
        return sum + liability.monthlyExpense
      }, 0),

    // Общая стоимость активов
    totalAssetsValue: (state): number =>
      state.assets.reduce((sum: number, asset: Asset) => sum + asset.value, 0),

    // Общая сумма долгов по пассивам
    totalLiabilitiesValue: (state): number =>
      state.liabilities.reduce((sum, liability) => sum + liability.remainingAmount, 0),

    // Чистая стоимость
    netWorth: (state): number => {
      return state.totalAssetsValue - state.totalLiabilitiesValue
    },

    goalProgress: (state): number => {
      const startNetWorth = state.initialNetWorth // Отрицательное значение (начальные долги)
      const targetNetWorth = state.financialGoal // 0 или положительное значение

      // Текущий прогресс от начальной точки к цели
      const progress = ((state.netWorth - startNetWorth) / (targetNetWorth - startNetWorth)) * 100

      return Math.max(0, Math.min(100, Math.floor(progress)))
    },

    // Оставшееся количество месяцев
    remainingMonths: (state): number => Math.max(0, state.totalMonths - state.currentMonth + 1),

    // Текущий ход в месяце (1-4)
    currentMoveInMonth: (state): number => ((state.currentMove - 1) % state.movesPerMonth) + 1,

    // Проверка достижения цели
    isGoalAchieved: (state): boolean => state.netWorth >= state.financialGoal,

    // Проверка окончания времени
    isTimeOver: (state): boolean => state.currentMonth > state.totalMonths,

    // Доходы для таблицы (базовый + от активов)
    incomeBreakdown: (state): IncomeExpenseItem[] => [
      ...state.assets.map(
        (asset: Asset): IncomeExpenseItem => ({
          name: asset.name,
          amount: asset.monthlyIncome,
          type: 'asset',
        }),
      ),
    ],

    // Расходы для таблицы (базовые + от пассивов)
    expensesBreakdown: (state): IncomeExpenseItem[] => [
      ...state.liabilities.map((liability: Liability): IncomeExpenseItem => {
        if (liability.monthlyExpense === undefined) {
          const breakDown = calculateMonthlyPayment(liability)
          liability.monthlyExpense = breakDown.totalPayment
        }

        return {
          name: liability.name,
          amount: liability.monthlyExpense,
          type: 'liability',
        }
      }),
    ],

    // Данные для графика прогресса
    progressChartData: (state): ChartDataPoint[] => {
      const data: ChartDataPoint[] = [
        {
          month: 0,
          netWorth: state.initialNetWorth,
          goal: state.financialGoal, // Показываем целевую линию как константу
        },
      ]

      state.monthlyReports.forEach((report: MonthlyReportType) => {
        data.push({
          month: report.month,
          netWorth: report.netWorth,
          goal: state.financialGoal, // Целевая линия постоянна
        })
      })

      // Добавляем текущий прогресс если месяц еще не завершен
      if (state.monthlyReports.length < state.currentMonth - 1) {
        data.push({
          month: state.currentMonth - 1,
          netWorth: state.netWorth,
          goal: state.financialGoal,
        })
      }

      return data
    },

    // История событий для журнала
    journalEntries: (state): JournalEntry[] => {
      const entries: JournalEntry[] = []

      // Добавляем месячные отчеты
      state.monthlyReports.forEach((report: MonthlyReportType) => {
        entries.push({
          type: 'monthly_report',
          month: report.month,
          title: `Отчет за месяц ${report.month}`,
          description: `Чистая стоимость: ${report.netWorth.toLocaleString()} руб.`,
          timestamp: report.timestamp,
        })
      })

      // Добавляем события
      state.eventHistory.forEach((event: EventCard) => {
        entries.push({
          type: 'event',
          title: event.title,
          description: event.description,
          action: event.action,
          timestamp: event.timestamp,
        })
      })

      return entries.sort(
        (a: JournalEntry, b: JournalEntry) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
    },

    // Доступные карточки событий (кроме предыдущей)
    availableEventCards: (state): Partial<EventCard>[] => {
      if (state.previousCardId === null) {
        return eventCards // Первая карточка - любая
      }
      return eventCards.filter((card) => card.id !== state.previousCardId)
    },
  },

  actions: {
    // Инициализация игры
    initGame(): void {
      // Сохраняем начальную чистую стоимость для расчетов прогресса
      this.initialNetWorth = this.netWorth
      // Сбрасываем предыдущую карточку при начале новой игры
      this.previousCardId = 2
      this.generateEventCard()
    },

    // Следующий ход
    nextMove(): void {
      if (this.gameStatus !== 'playing') return

      this.currentMove++

      // Если прошел месяц
      if (this.currentMove > this.currentMonth * this.movesPerMonth) {
        this.endMonth()
      }

      // Генерация новой карточки события
      this.generateEventCard()
    },

    // обновить данные кредитной карты
    updateCreditDebt(amount: number): void {
      const creditCard = this.creditCard
      creditCard.remainingAmount += amount
      // Конвертируем годовую ставку в месячную
      const monthlyInterestRate = Number(creditCard.interestRate) / 100 / 12
      // Вычисляем проценты за месяц
      creditCard.monthlyExpense = Math.ceil(creditCard.remainingAmount * monthlyInterestRate)
    },

    // Завершение месяца
    endMonth(): void {
      // Обработка кредитов с фиксированным сроком
      this.processTermLoans()

      // Начисление денежного потока
      this.cashAsset.value += this.cashFlow

      // Если денег не хватает - увеличиваем долг по кредитке
      if (this.cashAsset.value < 0) {
        this.updateCreditDebt(Math.abs(this.cashAsset.value))
        this.cashAsset.value = 0
      }

      // Создание отчета за месяц
      const monthlyReport: MonthlyReportType = {
        month: this.currentMonth,
        income: this.totalAssetIncome,
        expenses: this.totalLiabilityExpenses,
        cashFlow: this.cashFlow,
        cash: this.cashAsset.value,
        netWorth: this.netWorth,
        assetsValue: this.totalAssetsValue,
        liabilitiesValue: this.totalLiabilitiesValue,
        timestamp: new Date().toISOString(),
      }

      usePopup().setContent(MonthlyReport)

      this.monthlyReports.push(monthlyReport)
      this.currentMonth++

      // Проверка условий окончания игры
      this.checkGameEnd()
    },

    // Обработка кредитов с фиксированным сроком
    processTermLoans(): void {
      for (const liability of this.liabilities) {
        // Пропускаем кредитные карты (у них нет фиксированного срока)
        if (liability.type === 'credit_card') continue

        // Если у кредита есть срок и он больше 0
        if (liability.remainingMonths && liability.remainingMonths > 0) {
          // Вычисляем ежемесячный платеж

          const breakDown = calculateMonthlyPayment(liability)
          liability.monthlyExpense = breakDown.totalPayment
          // Уменьшаем основной долг на часть платежа, идущую в погашение основного долга
          liability.remainingAmount = breakDown.remainingDebt

          // Уменьшаем срок кредита
          liability.remainingMonths -= 1

          // Если срок кредита истек или долг полностью погашен, удаляем кредит
          if (liability.remainingMonths <= 0 || liability.remainingAmount <= 0) {
            this.liabilities = this.liabilities.filter((l) => l !== liability)
          }
        }
      }
    },

    // Генерация карточки события
    // В stores/gameStore.js обновите функцию generateEventCard
    generateEventCard(): void {
      const availableCards = this.availableEventCards

      // Выбираем случайную карточку из доступных (кроме предыдущей)
      const randomIndex = Math.floor(Math.random() * availableCards.length)
      const selectedCardTemplate = availableCards[randomIndex]

      if (!selectedCardTemplate) {
        // Если по какой-то причине нет доступных карточек, берем любую
        const fallbackIndex = Math.floor(Math.random() * eventCards.length)
        const fallbackCardTemplate = eventCards[fallbackIndex]
        if (!fallbackCardTemplate) throw new Error('не удалось подобрать карточку')

        const fallbackCard = this.createRandomizedCard(fallbackCardTemplate)
        this.currentCard = {
          ...fallbackCard,
          cardId: Date.now(),
        } as EventCard
        this.previousCardId = fallbackCard.id
        return
      }

      const selectedCard = this.createRandomizedCard(selectedCardTemplate)
      this.currentCard = {
        ...selectedCard,
        cardId: Date.now(),
      } as EventCard

      // Сохраняем ID текущей карточки как предыдущую для следующего хода
      this.previousCardId = selectedCard.id
    },

    // Новая функция для создания карточки со случайными данными
    createRandomizedCard(cardTemplate: Partial<EventCard>): Partial<EventCard> {
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
    },

    // Обработка действий с карточкой
    processCardAction(action: CardAction): void {
      if (!this.currentCard) return

      switch (action) {
        case 'buy':
          this.buyAsset(this.currentCard)
          break
        case 'sell':
          this.sellAsset(this.currentCard)
          break
        /* case 'take_loan':
           this.takeLoan(this.currentCard)
           break*/
        case 'skip':
          // Пропуск карточки
          break
        case 'accept_income':
          this.addRandomIncome(this.currentCard.gain || 0)
          break
        case 'accept_expense':
          this.addRandomExpense(this.currentCard.cost || 0)
          break
      }

      // Добавляем событие в историю
      this.eventHistory.push({
        ...this.currentCard,
        action: action,
        timestamp: new Date().toISOString(),
      })

      this.currentCard = null
    },

    // Покупка актива
    buyAsset(cardData: EventCard): void {
      if (this.cashAsset.value >= (cardData.cost || 0)) {
        const newAsset: Asset = {
          id: Date.now(),
          name: cardData.title,
          type: 'other',
          monthlyIncome: cardData.monthlyIncome || 0,
          value: cardData.cost || 0,
          purchasePrice: cardData.cost || 0,
        }

        this.assets.push(newAsset)
        this.cashAsset.value -= cardData.cost || 0
      }
    },

    // Продажа актива
    sellAsset(cardData: EventCard): void {
      if (!cardData.assetId) return

      const assetIndex = this.assets.findIndex((asset) => asset.id === cardData.assetId)
      if (assetIndex !== -1) {
        const asset = this.assets[assetIndex]
        if (!asset) {
          throw new Error('!asset')
        }
        this.cashAsset.value += cardData.salePrice || 0
        this.assets.splice(assetIndex, 1)
      }
    },

    // Случайный доход
    addRandomIncome(amount: number): void {
      this.cashAsset.value += amount
    },

    // Случайный расход
    addRandomExpense(amount: number): void {
      if (this.cashAsset.value >= amount) {
        this.cashAsset.value -= amount
      } else {
        const deficit = amount - this.cashAsset.value
        this.cashAsset.value = 0
        this.updateCreditDebt(deficit)
      }
    },

    // Проверка окончания игры
    checkGameEnd(): void {
      if (this.isGoalAchieved) {
        this.gameStatus = 'won'
      } else if (this.isTimeOver) {
        this.gameStatus = 'lost'
      }
    },

    //Начало новой игры
    newGame(settings?: { financialGoal?: number; totalMonths?: number }): void {
      this.$reset()
      this.gameId++

      if (settings?.financialGoal) {
        this.financialGoal = settings.financialGoal
      }
      if (settings?.totalMonths) {
        this.totalMonths = settings.totalMonths
      }

      // Инициализируем игру после сброса
      this.initGame()
    },
  },
})
