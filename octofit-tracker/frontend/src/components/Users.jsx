import { API_BASE_URL, useApiData } from '../api.js'
import DataTable from './DataTable.jsx'

// Resolves to https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
const endpoint = `${API_BASE_URL}/users/`

const columns = [
  { header: 'Username', render: (user) => user.username },
  { header: 'Name', render: (user) => user.displayName },
  { header: 'Email', render: (user) => user.email },
]

function Users() {
  const { items, loading, error } = useApiData(endpoint)
  return <DataTable title="Users" items={items} loading={loading} error={error} columns={columns} />
}

export default Users
