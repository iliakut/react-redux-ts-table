import { Firm, RowFirm } from '../types/types';


export const prepareData = (rowFirm: RowFirm[]): Firm[] => {
  return rowFirm.map(firm => ({
    id: firm.id,
    name: firm.name,
    budget: firm.budget,
    budgetSpent: Number(firm.budget_spent.toFixed(2)),
    budgetLeft: Number((firm.budget - firm.budget_spent).toFixed(2)),
    dateOfFirstPurchase: firm.date_of_first_purchase
  }))
}