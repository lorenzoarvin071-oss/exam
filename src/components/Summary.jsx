import { useTransactions } from '../context/TransactionContext.jsx'

function Summary() {
  const { transactions } = useTransactions()

  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    )

  const expense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    )

  const balance = income - expense

  return (
    <div className="summary">
      <div>
        <span>Income</span>
        <strong className="income-text">
          +{income.toFixed(2)}
        </strong>
      </div>

      <div>
        <span>Expense</span>
        <strong className="expense-text">
          -{expense.toFixed(2)}
        </strong>
      </div>

      <div>
        <span>Balance</span>
        <strong>
          {balance.toFixed(2)}
        </strong>
      </div>
    </div>
  )
}

export default Summary
