import axios from 'axios'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STATUS = {
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error'
}

const STATUS_COLOR = {
  [STATUS.LOADING]: 'bg-yellow-500',
  [STATUS.READY]: 'bg-green-500',
  [STATUS.ERROR]: 'bg-red-500'
}

const STATUS_TEXT = {
  [STATUS.LOADING]: 'Loading...',
  [STATUS.READY]: 'Online',
  [STATUS.ERROR]: 'Offline'
}

const ContentService = createContext({
  baseURL: '',
  content: null,
  loading: false,
  getRemoteContent: () => {},
  statusColor: STATUS_COLOR[STATUS.LOADING],
  statusText: STATUS_TEXT[STATUS.LOADING]
})

const baseURL = process.env.REACT_APP_CONFIG_SERVER_URL || 'http://localhost:8080'

const client = axios.create({
  baseURL
})

export function ContentServiceProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [serviceStatus, setServiceStatus] = useState('loading')
  const [content, setContent] = useState(null)

  const getRemoteContent = useCallback(async () => {
    setLoading(true)
    try {
      const response = await client.get('/content')
      setContent(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const pingServer = useCallback(async () => {
    try {
      const response = await client.get('/ping')
      if (response.data !== 'pong') {
        throw new Error('Invalid response')
      }
      setServiceStatus(STATUS.READY)
    } catch (error) {
      setServiceStatus(STATUS.ERROR)
    }
  }, [])

  useEffect(() => {
    pingServer()
    const interval = setInterval(pingServer, 10000)
    return () => clearInterval(interval)
  }, [pingServer])

  return (
    <ContentService.Provider value={{
      baseURL,
      content,
      loading,
      getRemoteContent,
      statusColor: STATUS_COLOR[serviceStatus],
      statusText: STATUS_TEXT[serviceStatus]
    }}>
      {children}
    </ContentService.Provider>
  )
}

export const useContentService = () => useContext(ContentService)
