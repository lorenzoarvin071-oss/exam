import { useTransactions } from '../context/TransactionContext.jsx'

function TransactionList() {
  const {
    transactions,
    deleteTransaction
  } = useTransactions()

  if (transactions.length === 0) {
    return (
      <p className="empty-state">
        No transactions yet.
      </p>
    )
  }

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((transaction) => (
          <tr
            key={transaction.id}
            className={transaction.type}
          >
            <td>{transaction.date}</td>

            <td>{transaction.desc}</td>

            <td>{transaction.category}</td>

            <td>{transaction.type}</td>

            <td>
              {transaction.type === 'expense'
                ? '-'
                : '+'}

              {transaction.amount.toFixed(2)}
            </td>

            <td>
              <button
                type="button"
                className="delete-btn"
                onClick={() =>
                  deleteTransaction(
                    transaction.id
                  )
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TransactionList
