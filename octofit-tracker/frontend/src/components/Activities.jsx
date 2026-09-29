import { API_BASE_URL, displayUser, useApiData } from '../api.js'
import DataTable from './DataTable.jsx'

// Resolves to https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
const endpoint = `${API_BASE_URL}/activities/`

const columns = [
  { header: 'User', render: (activity) => displayUser(activity.user) },
  { header: 'Type', render: (activity) => activity.activityType },
  { header: 'Duration (min)', render: (activity) => activity.durationMinutes },
  { header: 'Distance (km)', render: (activity) => activity.distanceKm ?? 0 },
  { header: 'Points', render: (activity) => activity.points ?? 0 },
  { header: 'Date', render: (activity) => (activity.date ? new Date(activity.date).toLocaleDateString() : '—') },
]

function Activities() {
  const { items, loading, error } = useApiData(endpoint)
  return <DataTable title="Activities" items={items} loading={loading} error={error} columns={columns} />
}

export default Activities
