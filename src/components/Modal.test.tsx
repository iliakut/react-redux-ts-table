import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Modal from './Modal';
import { setFirms, setStateNewBudget } from '../features/firms/firmsSlice';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn()
}));

jest.mock('../features/firms/firmsSlice', () => ({
  __esModule: true,
  ...jest.requireActual('../features/firms/firmsSlice'),
  setStateNewBudget: jest.fn(() => ({
    type: 'counter/setStateNewBudget'
  }))
}));

const testFirm = {
  id: 1,
  name: 'Test Firm',
  budget: 10,
  budgetSpent: 5,
  budgetLeft: 5,
  dateOfFirstPurchase: '2119-07-07'
};

describe('Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    store.dispatch(setFirms([testFirm]))
    render(
      <Provider store={store}>
        <Modal id={1}/>
      </Provider>
    );
  });

  it('Button with name of the firm in document', () => {
    expect(screen.getByText('Test Firm')).toBeInTheDocument();
  });

  it('Opened modal, confirm is not disabled', () => {
    screen.getByText('Test Firm').click();
    expect(screen.getByText('Enter new total budget value')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Confirm').closest('button')).not.toBeDisabled();
  });

  it('Confirm disabled', () => {
    screen.getByText('Test Firm').click();
    const input = screen.getByLabelText('Budget');
    fireEvent.change(input, { target: { value: '4' } })

    expect(screen.getByText('Confirm').closest('button')).toBeDisabled();
  });

  it('Change budged value', () => {
    screen.getByText('Test Firm').click();
    const input = screen.getByLabelText('Budget');
    fireEvent.change(input, { target: { value: '11' } })
    screen.getByText('Confirm').click();
    expect(setStateNewBudget).toHaveBeenCalledWith({
      id: 1,
      budget: 11
    });
  });
});