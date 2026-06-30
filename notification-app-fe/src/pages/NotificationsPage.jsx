import { useState } from "react"
import {
  Alert,
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography
} from "@mui/material"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { Link } from "react-router-dom"

import { NotificationCard } from "../components/NotificationCard"
import { NotificationFilter } from "../components/NotificationFilter"
import { useNotifications } from "../hooks/useNotifications"

export function NotificationsPage() {
  const [filter, setFilter] = useState("All")
  const [page, setPage] = useState(1)

  const limit = 10

  const { notifications, total, totalPages, loading, error } =
    useNotifications(filter, page, limit)

  const unreadCount = total

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
    setPage(1)
  }

  const handlePageChange = (_, newPage) => {
    setPage(newPage)
  }

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Badge badgeContent={unreadCount} color="primary" max={99}>
            <NotificationsIcon sx={{ fontSize: 28 }} />
          </Badge>

          <Typography variant="h5" fontWeight={700}>
            Notifications
          </Typography>
        </Stack>

        <Button component={Link} to="/priority" variant="contained" size="small">
          Priority
        </Button>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ marginBottom: 3 }}>
        <NotificationFilter value={filter} onChange={handleFilterChange} />
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">Failed to load notifications: {error}</Alert>
      )}

      {!loading && !error && notifications.length === 0 && (
        <Alert severity="info">No notifications found</Alert>
      )}

      {!loading && !error && notifications.length > 0 && (
        <Stack spacing={1.5}>
          {notifications.map((n) => (
            <NotificationCard key={n.ID || n.id} notification={n} />
          ))}
        </Stack>
      )}

      {!loading && !error && totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  )
}