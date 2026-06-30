import { useState, useEffect } from "react"
import { fetchNotifications } from "../api/notifications"

export function useNotifications(filter, page, limit) {
  const [notifications, setNotifications] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError("")

        const data = await fetchNotifications(limit, page, filter)

        const list = data.notifications ?? []

        setNotifications(list)
        setTotal(data.total ?? list.length)
      } catch (err) {
        setError("Unable to load notifications")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [filter, page, limit])

  const totalPages = Math.ceil(total / limit) || 1

  return {
    notifications,
    total,
    totalPages,
    loading,
    error
  }
}