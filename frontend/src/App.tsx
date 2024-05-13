import { Container } from '@mui/material';
import AdminLayout from './app/layouts/AdminLayout';
import { Route, Routes } from 'react-router-dom';
import { AdminAllPages, AdminCreatePage } from './admin/page/adminPages';

const App = () => {
  return (
    <AdminLayout>
      <Container>
        <Routes>
          <Route path="/pages" element={<AdminAllPages />} />
          <Route path="/pages/new-page" element={<AdminCreatePage />} />
        </Routes>
      </Container>
    </AdminLayout>
  );
};

export default App;
