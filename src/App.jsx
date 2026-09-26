import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from 'react-router-dom'

import './App.css'

import Dashboard from './pages/Dashboard'
import AddTransaction from './pages/AddTransaction'
import Transactions from './pages/Transactions'

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="navbar-container">

          <NavLink to="/" className="logo">
            MoneyTrack
          </NavLink>

          <div className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              Transactions
            </NavLink>

            <NavLink
              to="/add"
              className={({ isActive }) =>
                isActive
                  ? 'nav-link add-link active'
                  : 'nav-link add-link'
              }
            >
              + Add Transaction
            </NavLink>
          </div>

        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
