import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NotificationsPage } from "./pages/NotificationsPage"
import { PriorityNotificationsPage } from "./pages/PriorityNotificationsPage"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotificationsPage />} />
        <Route path="/priority" element={<PriorityNotificationsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App