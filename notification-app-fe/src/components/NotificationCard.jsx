import { Card, CardContent, Chip, Stack, Typography } from "@mui/material"

export function NotificationCard({ notification }) {
  const type = notification.Type || notification.type
  const message = notification.Message || notification.message
  const time = notification.Timestamp || notification.timestamp
  const id = notification.ID || notification.id

  const getColor = () => {
    if (type === "Placement") {
      return "success"
    }

    if (type === "Result") {
      return "warning"
    }

    return "primary"
  }

  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Chip label={type} color={getColor()} size="small" />

            <Typography variant="caption" color="text.secondary">
              {time}
            </Typography>
          </Stack>

          <Typography variant="h6" fontWeight={700}>
            {message}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-all" }}>
            {id}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}