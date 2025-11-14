
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import MainShell from './components/layout/MainShell.jsx';
import Dashboard from './pages/app/Dashboard.jsx';
import Customers from './pages/app/Customers.jsx';
import Inbox from './pages/app/Inbox.jsx';
import Automation from './pages/app/Automation.jsx';
import Pricing from './pages/app/Pricing.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app" element={<MainShell />}>
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="automation" element={<Automation />} />
        <Route path="pricing" element={<Pricing />} />
      </Route>
    </Routes>
  );
}
