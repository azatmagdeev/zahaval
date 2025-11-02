// stores/gameStore.js
import { defineStore } from 'pinia'

import type {
  GameState,
  Asset,
  Liability,
  EventCard,
  MonthlyReport,
  JournalEntry,
  IncomeExpenseItem,
  ChartDataPoint,
  CardAction,
} from './types.ts'
import { eventCards } from '@/data/eventCards.ts'
import { initialState } from '@/data/initialGameState.ts'
import { calculateMonthlyPayment } from '@/stores/calculatePayment.ts'

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
    }) as unknown as GameState,

  //
  getters: {

    // наличные
    cashAsset: (state):Asset => {
      const cashAsset = state.assets.find(a => (a.type === 'cash'))
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
    netWorth: (state): number => state.cashAsset.value + state.totalAssetsValue - state.totalLiabilitiesValue,

    // Прогресс к цели (от 0 до 100)
    goalProgress: (state): number => {
      const progress = (state.netWorth / state.financialGoal) * 100

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
          goal: state.initialNetWorth,
        },
      ]

      state.monthlyReports.forEach((report: MonthlyReport) => {
        data.push({
          month: report.month,
          netWorth: report.netWorth,
          goal:
            state.initialNetWorth +
            ((state.financialGoal - state.initialNetWorth) * report.month) / state.totalMonths,
        })
      })

      // Добавляем текущий прогресс если месяц еще не завершен
      if (state.monthlyReports.length < state.currentMonth - 1) {
        data.push({
          month: state.currentMonth - 1,
          netWorth: state.netWorth,
          goal:
            state.initialNetWorth +
            ((state.financialGoal - state.initialNetWorth) * (state.currentMonth - 1)) /
              state.totalMonths,
        })
      }

      return data
    },

    // История событий для журнала
    journalEntries: (state): JournalEntry[] => {
      const entries: JournalEntry[] = []

      // Добавляем месячные отчеты
      state.monthlyReports.forEach((report: MonthlyReport) => {
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
  },

  actions: {
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
      // Начисление денежного потока
      this.cashAsset.value += this.cashFlow

      // Если денег не хватает - увеличиваем долг по кредитке
      if (this.cashAsset.value < 0) {
        this.updateCreditDebt(Math.abs(this.cashAsset.value))
        this.cashAsset.value = 0
      }

      // Создание отчета за месяц
      const monthlyReport: MonthlyReport = {
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

      this.monthlyReports.push(monthlyReport)
      this.currentMonth++

      // Проверка условий окончания игры
      this.checkGameEnd()
    },

    // Генерация карточки события
    generateEventCard(): void {
      const eventTemplates = eventCards
      const randomEvent = eventTemplates[Math.floor(Math.random() * eventTemplates.length)]
      this.currentCard = {
        ...randomEvent,
        cardId: Date.now(),
      } as EventCard
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

    // Взятие кредита
    // takeLoan(cardData: EventCard): void {
    //   const newLiability: Liability = {
    //     id: Date.now(),
    //     name: cardData.title,
    //     type: 'consumer_loan',
    //     monthlyExpense: cardData.monthlyExpense || 0,
    //     remainingAmount: cardData.amount || 0,
    //     initialAmount: cardData.amount || 0,
    //   }
    //
    //   this.liabilities.push(newLiability)
    //   this.cash += cardData.amount || 0
    // },

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

    // // Открытие попапа
    // openPopup(popupName: PopupType): void {
    //   this.activePopup = popupName;
    // },

    // // Закрытие попапа
    // closePopup(): void {
    //   this.activePopup = null;
    // },

    // Проверка окончания игры
    checkGameEnd(): void {
      if (this.isGoalAchieved) {
        this.gameStatus = 'won'
      } else if (this.isTimeOver) {
        this.gameStatus = 'lost'
      }
    },

    // Обновление настроек
    // updateSettings(newSettings: Partial<GameSettings>): void {
    //   this.settings = { ...this.settings, ...newSettings }
    // },

    //Начало новой игры
    newGame(settings?: {
      financialGoal?: number
      totalMonths?: number
      //difficulty?: Difficulty
    }): void {
      this.$reset()
      this.gameId++

      if (settings?.financialGoal) {
        this.financialGoal = settings.financialGoal
      }
      if (settings?.totalMonths) {
        this.totalMonths = settings.totalMonths
      }
      // if (settings?.difficulty) {
      //   this.settings.difficulty = settings.difficulty
      // }

      this.initialNetWorth = this.netWorth
      this.generateEventCard()
    },

    // Сброс игры
    // resetGame(): void {
    //   this.newGame()
    // },
  },
})
