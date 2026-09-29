import { API_BASE_URL, displayUser, useApiData } from '../api.js'
import DataTable from './DataTable.jsx'

// Resolves to https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
const endpoint = `${API_BASE_URL}/teams/`

const columns = [
  { header: 'Team', render: (team) => team.name },
  { header: 'Members', render: (team) => (team.members?.length ? team.members.map(displayUser).join(', ') : '—') },
]

function Teams() {
  const { items, loading, error } = useApiData(endpoint)
  return <DataTable title="Teams" items={items} loading={loading} error={error} columns={columns} />
}

export default Teams
