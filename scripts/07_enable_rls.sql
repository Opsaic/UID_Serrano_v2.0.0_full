-- UID Serrano v2.0.0 - Row Level Security (RLS)
-- Part 7: Enable RLS and create policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE ar_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE door_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (can be customized based on role requirements)
-- Users can read their own data
CREATE POLICY users_select_own ON users FOR SELECT USING (auth.uid() = id);

-- Authenticated users can read companies
CREATE POLICY companies_select_authenticated ON companies FOR SELECT TO authenticated USING (true);

-- Users can read their assigned projects
CREATE POLICY projects_select_assigned ON projects FOR SELECT TO authenticated 
  USING (project_manager_id = auth.uid() OR created_by = auth.uid());

-- Users can read their assigned tasks
CREATE POLICY tasks_select_assigned ON tasks FOR SELECT TO authenticated 
  USING (assigned_to = auth.uid() OR created_by = auth.uid());

-- Users can read their own notifications
CREATE POLICY notifications_select_own ON notifications FOR SELECT USING (user_id = auth.uid());

-- Note: Additional policies should be created based on specific role requirements
-- Admin users should have full access, sales users should have CRM access, etc.
