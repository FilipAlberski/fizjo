import { Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';

import { Public, Login } from './pages'; //index.tsx
import DashLayout from './components/layouts/DashLayout';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dashboard" element={<DashLayout />}>
          <Route index element={<h1>Dashboard</h1>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
