import { useMemo, useState } from "react"
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  Stack,
  Typography
} from "@mui/material"
import { Link } from "react-router-dom"

import { NotificationCard } from "../components/NotificationCard"
import { NotificationFilter } from "../components/NotificationFilter"
import { useNotifications } from "../hooks/useNotifications"

const priorityWeight = {
  Placement: 3,
  Result: 2,
  Event: 1
}

const topOptions = [5, 10, 15, 20]

const getType = (notification) => {
  return notification.Type || notification.type || ""
}

const getTime = (notification) => {
  const time = notification.Timestamp || notification.timestamp || ""
  return new Date(time.replace(" ", "T")).getTime() || 0
}

const sortByPriority = (a, b) => {
  const firstWeight = priorityWeight[getType(a)] || 0
  const secondWeight = priorityWeight[getType(b)] || 0

  if (firstWeight !== secondWeight) {
    return secondWeight - firstWeight
  }

  return getTime(b) - getTime(a)
}

export function PriorityNotificationsPage() {
  const [filter, setFilter] = useState("All")
  const [topCount, setTopCount] = useState(10)

  const page = 1
  const limit = 100

  const { notifications, loading, error } = useNotifications(filter, page, limit)

  const priorityNotifications = useMemo(() => {
    return [...notifications]
      .sort(sortByPriority)
      .slice(0, topCount)
  }, [notifications, topCount])

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const handleTopChange = (e) => {
    setTopCount(Number(e.target.value))
  }

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={700}>
          Priority Notifications
        </Typography>

        <Button component={Link} to="/" variant="outlined" size="small">
          All Notifications
        </Button>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <NotificationFilter value={filter} onChange={handleFilterChange} />

        <Select size="small" value={topCount} onChange={handleTopChange}>
          {topOptions.map((value) => (
            <MenuItem key={value} value={value}>
              Top {value}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">
          Failed to load notifications: {error}
        </Alert>
      )}

      {!loading && !error && priorityNotifications.length === 0 && (
        <Alert severity="info">
          No priority notifications found
        </Alert>
      )}

      {!loading && !error && priorityNotifications.length > 0 && (
        <Stack spacing={1.5}>
          {priorityNotifications.map((notification) => (
            <NotificationCard
              key={notification.ID || notification.id}
              notification={notification}
            />
          ))}
        </Stack>
      )}
    </Box>
  )
}