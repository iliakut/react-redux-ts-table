export type RowFirm = {
  id: number
  name: string
  budget: number
  budget_spent: number,
  date_of_first_purchase: string
}

export type Firm = {
  id: number
  name: string
  budget: number
  budgetSpent: number
  budgetLeft: number
  dateOfFirstPurchase: string
}

export type FirmKeys = keyof Firm