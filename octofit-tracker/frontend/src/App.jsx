import { Link, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'

function App() {
  return (
    <main className="container py-5">
      <Routes>
        <Route path="/" element={
          <div className="intro">
            <img src={logo} alt="OctoFit Tracker" className="app-logo" />
            <h1 className="mt-4">OctoFit Tracker</h1>
            <p>Track your progress, train together, and keep moving.</p>
          </div>
        } />
        <Route path="*" element={<p>Page not found. <Link to="/">Go home</Link></p>} />
      </Routes>
    </main>
  )
}

export default App
