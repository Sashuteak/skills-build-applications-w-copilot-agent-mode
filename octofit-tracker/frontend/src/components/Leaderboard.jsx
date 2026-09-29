import { API_BASE_URL, displayUser, useApiData } from '../api.js'
import DataTable from './DataTable.jsx'

// Resolves to https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
const endpoint = `${API_BASE_URL}/leaderboard/`

const columns = [
  { header: 'Rank', render: (entry, index) => entry.rank ?? index + 1 },
  { header: 'User', render: (entry) => displayUser(entry.user) },
  { header: 'Points', render: (entry) => entry.points ?? 0 },
]

function Leaderboard() {
  const { items, loading, error } = useApiData(endpoint)
  return <DataTable title="Leaderboard" items={items} loading={loading} error={error} columns={columns} />
}

export default Leaderboard
