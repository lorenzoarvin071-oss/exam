import { createContext, useContext, useEffect, useState } from 'react'

const TransactionContext = createContext()

const STORAGE_KEY = 'transactions'

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Failed to load transactions:', error)
      return []
    }
  })

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(transactions)
    )
  }, [transactions])

  // Add transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      transaction,
      ...prev
    ])
  }

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    )
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  return useContext(TransactionContext)
}
