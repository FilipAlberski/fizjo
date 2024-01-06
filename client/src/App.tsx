import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './pages/Public';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
      </Route>
    </Routes>
  );
}

export default App;
