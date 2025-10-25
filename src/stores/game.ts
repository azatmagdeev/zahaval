// stores/gameStore.js
import { defineStore } from 'pinia';

// types/game.types.ts
export type GameStatus = 'playing' | 'won' | 'lost';

export type AssetType = 'stock' | 'bonds' | 'real_estate' | 'business' | 'deposit' | 'crypto' | 'other';

export type LiabilityType = 'mortgage' | 'car_loan' | 'consumer_loan' | 'credit_card' | 'student_loan' | 'other';

export type CardAction = 'buy' | 'sell' | 'take_loan' | 'skip' | 'accept_income' | 'accept_expense';

export type EventType = 'investment_opportunity' | 'emergency_expense' | 'windfall' | 'loan_offer' | 'asset_sale' | 'market_crash' | 'income_change' | 'expense_change';

export type PopupType = 'income_expenses' | 'assets_liabilities' | 'chart' | 'journal' | 'settings' | null;

export type Difficulty = 'easy' | 'medium' | 'hard';

// Интерфейсы для основных сущностей
export interface Asset {
  id: number;
  name: string;
  type: AssetType;
  monthlyIncome: number;
  value: number;
  purchasePrice: number;
  riskLevel?: 'low' | 'medium' | 'high';
  hidden?: boolean;
}

export interface Liability {
  id: number;
  name: string;
  type: LiabilityType;
  monthlyExpense: number;
  remainingAmount: number;
  initialAmount: number;
  interestRate?: number;
}

export interface EventCard {
  id: number;
  cardId: number;
  type: EventType;
  title: string;
  description: string;
  cost?: number;
  monthlyIncome?: number;
  gain?: number;
  amount?: number;
  monthlyExpense?: number;
  assetId?: number;
  salePrice?: number;
  action: CardAction;
  risk?: 'low' | 'medium' | 'high';
}

export interface MonthlyReport {
  month: number;
  income: number;
  expenses: number;
  cashFlow: number;
  cash: number;
  creditCardDebt: number;
  netWorth: number;
  assetsValue: number;
  liabilitiesValue: number;
  timestamp: string;
}

export interface JournalEntry {
  type: 'monthly_report' | 'event';
  month?: number;
  title: string;
  description: string;
  action?: CardAction;
  timestamp: string;
}

export interface IncomeExpenseItem {
  name: string;
  amount: number;
  type: 'base' | 'asset' | 'liability';
}

export interface ChartDataPoint {
  month: number;
  netWorth: number;
  goal: number;
}

export interface GameSettings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  difficulty: Difficulty;
}

export interface GameStatistics {
  totalIncome: number;
  totalExpenses: number;
  netWorth: number;
  assetsValue: number;
  liabilitiesValue: number;
}

// State интерфейс для Pinia store
export interface GameState {
  gameId: number;
  currentMonth: number;
  currentMove: number;
  totalMonths: number;
  movesPerMonth: number;
  gameStatus: GameStatus;

  income: number;
  expenses: number;
  cash: number;
  creditCardDebt: number;

  financialGoal: number;
  initialNetWorth: number;

  assets: Asset[];
  liabilities: Liability[];

  currentCard: EventCard | null;

  eventHistory: EventCard[];
  monthlyReports: MonthlyReport[];

  activePopup: PopupType;

  settings: GameSettings;
}
// stores/gameStore.ts
// import type {
//   GameState,
//   GameStatus,
//   Asset,
//   Liability,
//   EventCard,
//   MonthlyReport,
//   JournalEntry,
//   IncomeExpenseItem,
//   ChartDataPoint,
//   GameSettings,
//   PopupType,
//   CardAction,
//   Difficulty
// } from '@/types/game.types';

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    gameId: 1,
    currentMonth: 1,
    currentMove: 1,
    totalMonths: 60,
    movesPerMonth: 4,
    gameStatus: 'playing',

    income: 3000,
    expenses: 2500,
    cash: 5000,
    creditCardDebt: 0,

    financialGoal: 100000,
    initialNetWorth: 5000,

    assets: [
      {
        id: 1,
        name: 'Акции',
        type: 'stock',
        monthlyIncome: 100,
        value: 5000,
        purchasePrice: 5000,
        riskLevel: 'high'
      },
      {
        id: 2,
        name: 'Облигации',
        type: 'bonds',
        monthlyIncome: 50,
        value: 2000,
        purchasePrice: 2000,
        riskLevel: 'low'
      }
    ],

    liabilities: [
      {
        id: 1,
        name: 'Ипотека',
        type: 'mortgage',
        monthlyExpense: 800,
        remainingAmount: 150000,
        initialAmount: 150000,
        interestRate: 7
      },
      {
        id: 2,
        name: 'Автокредит',
        type: 'car_loan',
        monthlyExpense: 300,
        remainingAmount: 20000,
        initialAmount: 20000,
        interestRate: 9
      }
    ],

    currentCard: null,

    eventHistory: [],
    monthlyReports: [],

    activePopup: null,

    settings: {
      soundEnabled: true,
      animationsEnabled: true,
      difficulty: 'medium'
    }
  }),

  getters: {
    // Денежный поток (доходы минус расходы)
    cashFlow: (state): number => state.income - state.expenses,

    // Общий доход от активов
    totalAssetIncome: (state): number =>
      state.assets.reduce((sum: number, asset: Asset) => sum + asset.monthlyIncome, 0),

    // Общие расходы от пассивов
    totalLiabilityExpenses: (state): number =>
      state.liabilities.reduce((sum: number, liability: Liability) => sum + liability.monthlyExpense, 0),

    // Общая стоимость активов
    totalAssetsValue: (state): number =>
      state.assets.reduce((sum: number, asset: Asset) => sum + asset.value, 0),

    // Общая сумма долгов по пассивам
    totalLiabilitiesValue: (state): number =>
      state.liabilities.reduce((sum: number, liability: Liability) => sum + liability.remainingAmount, 0),

    // Чистая стоимость
    netWorth: (state): number =>
      state.cash + state.totalAssetsValue - state.totalLiabilitiesValue - state.creditCardDebt,

    // Прогресс к цели (от 0 до 100)
    goalProgress: (state): number => {
      const progress = ((state.netWorth - state.initialNetWorth) / (state.financialGoal - state.initialNetWorth)) * 100;
      return Math.max(0, Math.min(100, progress));
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
      {
        name: 'Основной доход',
        amount: state.income - state.totalAssetIncome,
        type: 'base'
      },
      ...state.assets.map((asset: Asset): IncomeExpenseItem => ({
        name: asset.name,
        amount: asset.monthlyIncome,
        type: 'asset'
      }))
    ],

    // Расходы для таблицы (базовые + от пассивов)
    expensesBreakdown: (state): IncomeExpenseItem[] => [
      {
        name: 'Основные расходы',
        amount: state.expenses - state.totalLiabilityExpenses,
        type: 'base'
      },
      ...state.liabilities.map((liability: Liability): IncomeExpenseItem => ({
        name: liability.name,
        amount: liability.monthlyExpense,
        type: 'liability'
      }))
    ],

    // Данные для графика прогресса
    progressChartData: (state): ChartDataPoint[] => {
      const data: ChartDataPoint[] = [
        {
          month: 0,
          netWorth: state.initialNetWorth,
          goal: state.initialNetWorth
        }
      ];

      state.monthlyReports.forEach((report: MonthlyReport) => {
        data.push({
          month: report.month,
          netWorth: report.netWorth,
          goal: state.initialNetWorth + ((state.financialGoal - state.initialNetWorth) * report.month / state.totalMonths)
        });
      });

      // Добавляем текущий прогресс если месяц еще не завершен
      if (state.monthlyReports.length < state.currentMonth - 1) {
        data.push({
          month: state.currentMonth - 1,
          netWorth: state.netWorth,
          goal: state.initialNetWorth + ((state.financialGoal - state.initialNetWorth) * (state.currentMonth - 1) / state.totalMonths)
        });
      }

      return data;
    },

    // История событий для журнала
    journalEntries: (state): JournalEntry[] => {
      const entries: JournalEntry[] = [];

      // Добавляем месячные отчеты
      state.monthlyReports.forEach((report: MonthlyReport) => {
        entries.push({
          type: 'monthly_report',
          month: report.month,
          title: `Отчет за месяц ${report.month}`,
          description: `Чистая стоимость: ${report.netWorth.toLocaleString()} руб.`,
          timestamp: report.timestamp
        });
      });

      // Добавляем события
      state.eventHistory.forEach((event: EventCard) => {
        entries.push({
          type: 'event',
          title: event.title,
          description: event.description,
          action: event.action,
          timestamp: event.timestamp
        });
      });

      return entries.sort((a: JournalEntry, b: JournalEntry) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }
  },

  actions: {
    // Следующий ход
    nextMove(): void {
      if (this.gameStatus !== 'playing') return;

      this.currentMove++;

      // Если прошел месяц
      if (this.currentMove > this.currentMonth * this.movesPerMonth) {
        this.endMonth();
      }

      // Генерация новой карточки события
      this.generateEventCard();
    },

    // Завершение месяца
    endMonth(): void {
      // Начисление денежного потока
      this.cash += this.cashFlow;

      // Если денег не хватает - увеличиваем долг по кредитке
      if (this.cash < 0) {
        this.creditCardDebt += Math.abs(this.cash);
        this.cash = 0;
      }

      // Создание отчета за месяц
      const monthlyReport: MonthlyReport = {
        month: this.currentMonth,
        income: this.income,
        expenses: this.expenses,
        cashFlow: this.cashFlow,
        cash: this.cash,
        creditCardDebt: this.creditCardDebt,
        netWorth: this.netWorth,
        assetsValue: this.totalAssetsValue,
        liabilitiesValue: this.totalLiabilitiesValue,
        timestamp: new Date().toISOString()
      };

      this.monthlyReports.push(monthlyReport);
      this.currentMonth++;

      // Проверка условий окончания игры
      this.checkGameEnd();
    },

    // Генерация карточки события
    generateEventCard(): void {
      const eventTemplates: Omit<EventCard, 'cardId'>[] = [
        {
          id: 1,
          type: 'investment_opportunity',
          title: 'Инвестиция в стартап',
          description: 'Предлагается инвестировать в перспективный стартап',
          cost: 5000,
          monthlyIncome: 200,
          action: 'buy'
        },
        {
          id: 2,
          type: 'emergency_expense',
          title: 'Неожиданные расходы',
          description: 'Сломался холодильник, нужен ремонт',
          cost: 300,
          action: 'accept_expense'
        },
        {
          id: 3,
          type: 'windfall',
          title: 'Неожиданный доход',
          description: 'Нашли старые акции, которые выросли в цене',
          gain: 2000,
          action: 'accept_income'
        },
        {
          id: 4,
          type: 'loan_offer',
          title: 'Предложение кредита',
          description: 'Банк предлагает выгодный кредит',
          amount: 10000,
          monthlyExpense: 150,
          action: 'take_loan'
        },
        {
          id: 5,
          type: 'asset_sale',
          title: 'Предложение продажи',
          description: 'Кто-то хочет купить ваши акции',
          assetId: 1,
          salePrice: 5500,
          action: 'sell'
        }
      ];

      const randomEvent = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
      this.currentCard = {
        ...randomEvent,
        cardId: Date.now()
      } as EventCard;
    },

    // Обработка действий с карточкой
    processCardAction(action: CardAction): void {
      if (!this.currentCard) return;

      switch (action) {
        case 'buy':
          this.buyAsset(this.currentCard);
          break;
        case 'sell':
          this.sellAsset(this.currentCard);
          break;
        case 'take_loan':
          this.takeLoan(this.currentCard);
          break;
        case 'skip':
          // Пропуск карточки
          break;
        case 'accept_income':
          this.addRandomIncome(this.currentCard.gain || 0);
          break;
        case 'accept_expense':
          this.addRandomExpense(this.currentCard.cost || 0);
          break;
      }

      // Добавляем событие в историю
      this.eventHistory.push({
        ...this.currentCard,
        action: action,
        timestamp: new Date().toISOString()
      });

      this.currentCard = null;
    },

    // Покупка актива
    buyAsset(cardData: EventCard): void {
      if (this.cash >= (cardData.cost || 0)) {
        const newAsset: Asset = {
          id: Date.now(),
          name: cardData.title,
          type: 'other',
          monthlyIncome: cardData.monthlyIncome || 0,
          value: cardData.cost || 0,
          purchasePrice: cardData.cost || 0
        };

        this.assets.push(newAsset);
        this.cash -= cardData.cost || 0;
        this.income += cardData.monthlyIncome || 0;
      }
    },

    // Продажа актива
    sellAsset(cardData: EventCard): void {
      if (!cardData.assetId) return;

      const assetIndex = this.assets.findIndex(asset => asset.id === cardData.assetId);
      if (assetIndex !== -1) {
        const asset = this.assets[assetIndex];
        this.cash += cardData.salePrice || 0;
        this.income -= asset.monthlyIncome;
        this.assets.splice(assetIndex, 1);
      }
    },

    // Взятие кредита
    takeLoan(cardData: EventCard): void {
      const newLiability: Liability = {
        id: Date.now(),
        name: cardData.title,
        type: 'consumer_loan',
        monthlyExpense: cardData.monthlyExpense || 0,
        remainingAmount: cardData.amount || 0,
        initialAmount: cardData.amount || 0
      };

      this.liabilities.push(newLiability);
      this.cash += cardData.amount || 0;
      this.expenses += cardData.monthlyExpense || 0;
    },

    // Случайный доход
    addRandomIncome(amount: number): void {
      this.cash += amount;
    },

    // Случайный расход
    addRandomExpense(amount: number): void {
      if (this.cash >= amount) {
        this.cash -= amount;
      } else {
        const deficit = amount - this.cash;
        this.cash = 0;
        this.creditCardDebt += deficit;
      }
    },

    // Открытие попапа
    openPopup(popupName: PopupType): void {
      this.activePopup = popupName;
    },

    // Закрытие попапа
    closePopup(): void {
      this.activePopup = null;
    },

    // Проверка окончания игры
    checkGameEnd(): void {
      if (this.isGoalAchieved) {
        this.gameStatus = 'won';
      } else if (this.isTimeOver) {
        this.gameStatus = 'lost';
      }
    },

    // Обновление настроек
    updateSettings(newSettings: Partial<GameSettings>): void {
      this.settings = { ...this.settings, ...newSettings };
    },

    // Начало новой игры
    newGame(settings?: { financialGoal?: number; totalMonths?: number; difficulty?: Difficulty }): void {
      this.$reset();
      this.gameId++;

      if (settings?.financialGoal) {
        this.financialGoal = settings.financialGoal;
      }
      if (settings?.totalMonths) {
        this.totalMonths = settings.totalMonths;
      }
      if (settings?.difficulty) {
        this.settings.difficulty = settings.difficulty;
      }

      this.initialNetWorth = this.netWorth;
      this.generateEventCard();
    },

    // Сброс игры
    resetGame(): void {
      this.newGame();
    }
  }
});
