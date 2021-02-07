import { FirmKeys } from '../types/types';

type TableConfigType = {
  headers: string[]
  rowsToShow: FirmKeys[]
}

export const tableConfig: TableConfigType = {
  headers: [
    'Company Name',
    'Date of a first purchase',
    'Total budget',
    'Budget spent',
    'Budget left'
  ],
  rowsToShow: [
    'name',
    'dateOfFirstPurchase',
    'budget',
    'budgetSpent',
    'budgetLeft'
  ]
}