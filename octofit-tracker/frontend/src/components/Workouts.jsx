import { API_BASE_URL, useApiData } from '../api.js'
import DataTable from './DataTable.jsx'

// Resolves to https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
const endpoint = `${API_BASE_URL}/workouts/`

const columns = [
  { header: 'Workout', render: (workout) => workout.title },
  { header: 'Description', render: (workout) => workout.description },
  { header: 'Type', render: (workout) => workout.activityType },
  { header: 'Difficulty', render: (workout) => workout.difficulty },
  { header: 'Target (min)', render: (workout) => workout.targetMinutes },
]

function Workouts() {
  const { items, loading, error } = useApiData(endpoint)
  return <DataTable title="Workouts" items={items} loading={loading} error={error} columns={columns} />
}

export default Workouts
