// types/game.types.ts
export type GameStatus = 'playing' | 'won' | 'lost'

export type AssetType =
  | 'cash'
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
  expenseName?: string
  type: LiabilityType
  monthlyExpense: number
  remainingAmount: number
  remainingMonths?: number
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

export interface MonthlyReportType {
  month: number
  income: number
  expenses: number
  cashFlow: number
  cash: number
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

//type PositiveNumber = number

// State интерфейс для Pinia store
export interface GameState {
  gameId: number
  currentMonth: number
  currentMove: number
  totalMonths: number
  movesPerMonth: number
  gameStatus: GameStatus

  financialGoal: number
  initialNetWorth: number

  assets: Asset[]
  liabilities: Liability[]

  currentCard: EventCard | null

  eventHistory: EventCard[]
  monthlyReports: MonthlyReportType[]

  settings: GameSettings

  // getters
  cashAsset: Asset
  totalAssetsValue: number
  totalLiabilitiesValue: number
  netWorth: number
  totalAssetIncome: number
  totalLiabilityExpenses: number
  creditCard: Liability
  previousCardId: number | undefined
}
