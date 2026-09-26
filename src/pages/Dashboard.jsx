import { Link } from 'react-router-dom'
import TransactionList from '../components/TransactionList.jsx'
import { useTransactions } from '../context/TransactionContext.jsx'

function Dashboard() {
  const { transactions } = useTransactions()

  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const expense = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const balance = income - expense

  const categoryTotals = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((categories, transaction) => {
      const category = transaction.category

      categories[category] =
        (categories[category] || 0) + transaction.amount

      return categories
    }, {})

  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date) - new Date(a.date)
    )
    .slice(0, 5)

  return (
    <section className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="dashboard-label">
            FINANCIAL OVERVIEW
          </p>

          <h1>Transaction Tracker</h1>

          <p className="dashboard-subtitle">
            Monitor your money and keep track of your
            financial activity.
          </p>
        </div>

        <Link
          to="/add"
          className="dashboard-add-btn"
        >
          + Add Transaction
        </Link>
      </div>

      {/* Main Statistics */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue">
            💰
          </div>

          <div>
            <span>Balance</span>
            <strong>
              ₱{balance.toLocaleString('en-PH', {
                minimumFractionDigits: 2
              })}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            ↗
          </div>

          <div>
            <span>Income</span>
            <strong className="income-text">
              ₱{income.toLocaleString('en-PH', {
                minimumFractionDigits: 2
              })}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon red">
            ↘
          </div>

          <div>
            <span>Expenses</span>
            <strong className="expense-text">
              ₱{expense.toLocaleString('en-PH', {
                minimumFractionDigits: 2
              })}
            </strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            #
          </div>

          <div>
            <span>Total Transactions</span>
            <strong>
              {transactions.length}
            </strong>
          </div>
        </div>

      </div>

      {/* Dashboard Content */}
      <div className="dashboard-grid">

        {/* Recent Transactions */}
        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <h2>Recent Transactions</h2>

              <p>
                Your latest financial activity
              </p>
            </div>

            <Link to="/transactions">
              View all
            </Link>
          </div>

          {recentTransactions.length === 0 ? (
            <div className="dashboard-empty">

              <span>📊</span>

              <h3>No transactions yet</h3>

              <p>
                Start by adding your first transaction.
              </p>

              <Link to="/add">
                Add Transaction
              </Link>

            </div>
          ) : (
            <TransactionList
              transactions={recentTransactions}
            />
          )}

        </div>

        {/* Expense Categories */}
        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <h2>Expense Categories</h2>

              <p>
                Where your money is going
              </p>
            </div>
          </div>

          {topCategories.length === 0 ? (
            <div className="dashboard-empty">

              <span>📈</span>

              <p>
                No expense data available yet.
              </p>

            </div>
          ) : (
            <div className="category-list">

              {topCategories.map(
                ([category, total]) => {

                  const percentage =
                    expense > 0
                      ? (total / expense) * 100
                      : 0

                  return (
                    <div
                      className="category-item"
                      key={category}
                    >

                      <div className="category-info">
                        <span>
                          {category}
                        </span>

                        <strong>
                          ₱{total.toLocaleString(
                            'en-PH',
                            {
                              minimumFractionDigits: 2
                            }
                          )}
                        </strong>
                      </div>

                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${percentage}%`
                          }}
                        />
                      </div>

                      <small>
                        {percentage.toFixed(1)}%
                      </small>

                    </div>
                  )
                }
              )}

            </div>
          )}

        </div>

      </div>

    </section>
  )
}

export default Dashboard
