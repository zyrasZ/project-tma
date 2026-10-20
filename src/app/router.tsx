import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { AdminLayout } from '../components/layout/admin/AdminLayout';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';
import { LandingPage } from '../pages/Landing/LandingPage';
import { LoginPage } from '../pages/Login/LoginPage';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { CompanyManagementPage } from '../pages/Admin/CompanyManagement/CompanyManagementPage';
import { StaffLayout } from '../components/layout/staff/StaffLayout';
import { OverviewPage } from '../pages/Staff/Overview/OverviewPage';
import { StationManagementPage } from '../pages/Staff/Stations/StationManagementPage';
import { FuelParamsPage } from '../pages/Staff/Stations/FuelParamsPage';
import { InvoiceConfigPage } from '../pages/Staff/InvoiceConfig/InvoiceConfigPage';
import { InvoiceReportPage } from '../pages/Staff/Reports/InvoiceReport/InvoiceReportPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes (chỉ cần đăng nhập) */}
        <Route path="/app" element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            
            {/* Manager Routes */}
            <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
              {/* <Route path="users" element={<UsersPage />} /> */}
            </Route>
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/companies" replace />} />
            <Route path="companies" element={<CompanyManagementPage />} />
          </Route>
        </Route>
        
        {/* Staff Routes */}
        <Route path="/staff" element={<ProtectedRoute allowedRoles={['staff']} />}>
          <Route element={<StaffLayout />}>
            <Route index element={<Navigate to="/staff/overview" replace />} />
            <Route path="overview" element={<OverviewPage />} />
            <Route path="stations">
              <Route index element={<StationManagementPage />} />
              <Route path=":id/fuel-params" element={<FuelParamsPage />} />
            </Route>
            <Route path="invoices">
              <Route index element={<InvoiceConfigPage />} />
              <Route path="config" element={<InvoiceConfigPage />} />
            </Route>
            <Route path="reports">
              <Route index element={<InvoiceReportPage />} />
              <Route path="invoices" element={<InvoiceReportPage />} />
            </Route>
          </Route>
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
