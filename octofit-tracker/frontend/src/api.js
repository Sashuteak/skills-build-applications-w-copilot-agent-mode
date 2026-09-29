import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME

// Without VITE_CODESPACE_NAME, fall back to the local API instead of https://undefined-8000...
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

if (!codespaceName) {
  console.warn('VITE_CODESPACE_NAME is not set; using', API_BASE_URL)
}

export function toItems(data) {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object') {
    for (const key of ['results', 'items', 'data']) {
      if (Array.isArray(data[key])) return data[key]
    }
  }
  return []
}

export function useApiData(endpoint) {
  const [state, setState] = useState({ items: [], loading: true, error: null })

  useEffect(() => {
    const controller = new AbortController()

    fetch(endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
        return response.json()
      })
      .then((data) => {
        console.log('Fetched', endpoint, data)
        setState({ items: toItems(data), loading: false, error: null })
      })
      .catch((error) => {
        if (error.name === 'AbortError') return
        console.error('Error fetching', endpoint, error)
        setState({ items: [], loading: false, error: error.message })
      })

    return () => controller.abort()
  }, [endpoint])

  return state
}

export function displayUser(user) {
  if (!user) return '—'
  if (typeof user === 'string') return user
  return user.displayName || user.username || '—'
}
