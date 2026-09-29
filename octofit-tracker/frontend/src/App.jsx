import { Link, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function Home() {
  return (
    <div className="intro">
      <img src={logo} alt="OctoFit Tracker" className="app-logo" />
      <h1 className="mt-4">OctoFit Tracker</h1>
      <p>Track your progress, train together, and keep moving.</p>
    </div>
  )
}

function App() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="" className="navbar-logo" />
            OctoFit Tracker
          </Link>
          <ul className="navbar-nav flex-row flex-wrap gap-3">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink className="nav-link" to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<p>Page not found. <Link to="/">Go home</Link></p>} />
        </Routes>
      </main>
    </>
  )
}

export default App
