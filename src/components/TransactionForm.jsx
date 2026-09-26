import { useState } from 'react'
import { useTransactions } from '../context/TransactionContext.jsx'

function TransactionForm() {
  const { addTransaction } = useTransactions()

  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !desc.trim() ||
      !category.trim() ||
      !amount ||
      !date
    ) {
      alert('Please fill in all fields.')
      return
    }

    const parsedAmount = parseFloat(amount)

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount.')
      return
    }

    const newTransaction = {
      id: Date.now().toString(),
      desc: desc.trim(),
      category: category.trim(),
      type,
      amount: parsedAmount,
      date
    }

    addTransaction(newTransaction)

    // Reset form
    setDesc('')
    setCategory('')
    setType('expense')
    setAmount('')
    setDate('')
  }

  return (
    <form
      className="transaction-form"
      onSubmit={handleSubmit}
    >
      <h2>Add Transaction</h2>

      <div className="form-row">
        <label htmlFor="desc">
          Description
        </label>

        <input
          id="desc"
          type="text"
          value={desc}
          onChange={(e) =>
            setDesc(e.target.value)
          }
          placeholder="e.g. Groceries"
        />
      </div>

      <div className="form-row">
        <label htmlFor="category">
          Category
        </label>

        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          placeholder="e.g. Food"
        />
      </div>

      <div className="form-row">
        <label htmlFor="type">
          Type
        </label>

        <select
          id="type"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="amount">
          Amount
        </label>

        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          placeholder="0.00"
        />
      </div>

      <div className="form-row">
        <label htmlFor="date">
          Date
        </label>

        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />
      </div>

      <button
        type="submit"
        className="add-btn"
      >
        Add Transaction
      </button>
    </form>
  )
}

export default TransactionForm
