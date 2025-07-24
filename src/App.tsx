
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Audit from "./pages/Audit";
import Issues from "./pages/Issues";
import IssueDetails from "./pages/IssueDetails";
import RaiseIssue from "./pages/RaiseIssue";
import Announcements from "./pages/Announcements";
import Documents from "./pages/Documents";
import More from "./pages/More";
import NotFound from "./pages/NotFound";
import Leads from "./pages/Leads";
import LeadCapture from "./pages/LeadCapture";
import DemoRequests from "./pages/DemoRequests";
import DemoDetails from "./pages/DemoDetails";
import ApprovedSales from "./pages/ApprovedSales";
import ApprovedSalesDetails from "./pages/ApprovedSalesDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/audit" element={
              <ProtectedRoute>
                <Audit />
              </ProtectedRoute>
            } />
            <Route path="/issues" element={
              <ProtectedRoute>
                <Issues />
              </ProtectedRoute>
            } />
            <Route path="/issues/:id" element={
              <ProtectedRoute>
                <IssueDetails />
              </ProtectedRoute>
            } />
            <Route path="/raise-issue" element={
              <ProtectedRoute>
                <RaiseIssue />
              </ProtectedRoute>
            } />
            <Route path="/leads" element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>
            } />
            <Route path="/lead-capture" element={
              <ProtectedRoute>
                <LeadCapture />
              </ProtectedRoute>
            } />
            <Route path="/demo-requests" element={
              <ProtectedRoute>
                <DemoRequests />
              </ProtectedRoute>
            } />
            <Route path="/demo-details/:id" element={<DemoDetails />} />

            <Route path="/approved-sales" element={
              <ProtectedRoute>
                <ApprovedSales />
              </ProtectedRoute>
            } />
            <Route path="/approved-sales/:id" element={
              <ProtectedRoute>
                <ApprovedSalesDetails />
              </ProtectedRoute>
            } />
            <Route path="/announcements" element={
              <ProtectedRoute>
                <Announcements />
              </ProtectedRoute>
            } />
            <Route path="/documents" element={
              <ProtectedRoute>
                <Documents />
              </ProtectedRoute>
            } />
            <Route path="/more" element={
              <ProtectedRoute>
                <More />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
