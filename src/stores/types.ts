// types/game.types.ts
export type GameStatus = 'playing' | 'won' | 'lost'

export type AssetType =
  | 'stock'
  | 'bonds'
  | 'real_estate'
  | 'business'
  | 'deposit'
  | 'crypto'
  | 'other'
  | 'work'

export type LiabilityType =
  | 'mortgage'
  | 'car_loan'
  | 'consumer_loan'
  | 'credit_card'
  | 'student_loan'
  | 'other'
  | 'common'

export type CardAction = 'buy' | 'sell' | 'take_loan' | 'skip' | 'accept_income' | 'accept_expense'

export type EventType =
  | 'investment_opportunity'
  | 'emergency_expense'
  | 'windfall'
  | 'loan_offer'
  | 'asset_sale'
  | 'market_crash'
  | 'income_change'
  | 'expense_change'

export type Difficulty = 'easy' | 'medium' | 'hard'

// Интерфейсы для основных сущностей
export interface Asset {
  id: number
  name: string
  type: AssetType
  monthlyIncome: number
  value: number
  purchasePrice: number
  riskLevel?: 'low' | 'medium' | 'high'
  hidden?: boolean
}

export interface Liability {
  id: number
  name: string
  type: LiabilityType
  monthlyExpense: number
  remainingAmount: number
  initialAmount: number
  interestRate?: number
  hidden?: boolean
}

export interface EventCard {
  id: number
  cardId: number
  type: EventType
  title: string
  description: string
  cost?: number
  monthlyIncome?: number
  gain?: number
  amount?: number
  monthlyExpense?: number
  assetId?: number
  salePrice?: number
  action: CardAction
  risk?: 'low' | 'medium' | 'high'
  timestamp: string
}

export interface MonthlyReport {
  month: number
  income: number
  expenses: number
  cashFlow: number
  cash: number
  creditCardDebt: number
  netWorth: number
  assetsValue: number
  liabilitiesValue: number
  timestamp: string
}

export interface JournalEntry {
  type: 'monthly_report' | 'event'
  month?: number
  title: string
  description: string
  action?: CardAction
  timestamp: string
}

export interface IncomeExpenseItem {
  name: string
  amount: number
  type: 'base' | 'asset' | 'liability'
}

export interface ChartDataPoint {
  month: number
  netWorth: number
  goal: number
}

export interface GameSettings {
  soundEnabled: boolean
  animationsEnabled: boolean
  difficulty: Difficulty
}

// export interface GameStatistics {
//   totalIncome: number
//   totalExpenses: number
//   netWorth: number
//   assetsValue: number
//   liabilitiesValue: number
// }

// State интерфейс для Pinia store
export interface GameState {
  gameId: number
  currentMonth: number
  currentMove: number
  totalMonths: number
  movesPerMonth: number
  gameStatus: GameStatus
  cash: number
  creditCardDebt: number

  financialGoal: number
  initialNetWorth: number

  assets: Asset[]
  liabilities: Liability[]

  currentCard: EventCard | null

  eventHistory: EventCard[]
  monthlyReports: MonthlyReport[]

  settings: GameSettings

  // getters
  totalAssetsValue: number
  totalLiabilitiesValue: number
  netWorth: number
  totalAssetIncome: number
  totalLiabilityExpenses: number
}
