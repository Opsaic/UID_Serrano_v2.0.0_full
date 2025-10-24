-- UID Serrano v2.0.0 - Row Level Security (RLS)
-- Part 7: Enable RLS and create policies

-- Simplified RLS policies for easier setup
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
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

-- Drop existing policies if they exist
DROP POLICY IF EXISTS profiles_select_authenticated ON profiles;
DROP POLICY IF EXISTS profiles_update_own ON profiles;
DROP POLICY IF EXISTS companies_all_authenticated ON companies;
DROP POLICY IF EXISTS contacts_all_authenticated ON contacts;
DROP POLICY IF EXISTS leads_all_authenticated ON leads;
DROP POLICY IF EXISTS opportunities_all_authenticated ON opportunities;
DROP POLICY IF EXISTS quotes_all_authenticated ON quotes;
DROP POLICY IF EXISTS projects_all_authenticated ON projects;
DROP POLICY IF EXISTS tasks_all_authenticated ON tasks;
DROP POLICY IF EXISTS invoices_all_authenticated ON invoices;
DROP POLICY IF EXISTS payments_all_authenticated ON payments;
DROP POLICY IF EXISTS expenses_all_authenticated ON expenses;
DROP POLICY IF EXISTS models_all_authenticated ON models;
DROP POLICY IF EXISTS ar_sessions_all_authenticated ON ar_sessions;
DROP POLICY IF EXISTS door_configurations_all_authenticated ON door_configurations;
DROP POLICY IF EXISTS notifications_all_authenticated ON notifications;

-- Create simple policies for all authenticated users
-- Profiles
CREATE POLICY profiles_select_authenticated ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY profiles_update_own ON profiles FOR UPDATE TO authenticated USING (id = auth.uid());

-- All other tables: allow full access to authenticated users
CREATE POLICY companies_all_authenticated ON companies FOR ALL TO authenticated USING (true);
CREATE POLICY contacts_all_authenticated ON contacts FOR ALL TO authenticated USING (true);
CREATE POLICY leads_all_authenticated ON leads FOR ALL TO authenticated USING (true);
CREATE POLICY opportunities_all_authenticated ON opportunities FOR ALL TO authenticated USING (true);
CREATE POLICY quotes_all_authenticated ON quotes FOR ALL TO authenticated USING (true);
CREATE POLICY projects_all_authenticated ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY tasks_all_authenticated ON tasks FOR ALL TO authenticated USING (true);
CREATE POLICY invoices_all_authenticated ON invoices FOR ALL TO authenticated USING (true);
CREATE POLICY payments_all_authenticated ON payments FOR ALL TO authenticated USING (true);
CREATE POLICY expenses_all_authenticated ON expenses FOR ALL TO authenticated USING (true);
CREATE POLICY models_all_authenticated ON models FOR ALL TO authenticated USING (true);
CREATE POLICY ar_sessions_all_authenticated ON ar_sessions FOR ALL TO authenticated USING (true);
CREATE POLICY door_configurations_all_authenticated ON door_configurations FOR ALL TO authenticated USING (true);
-- Changed notifications to use same pattern as other tables for simplicity
CREATE POLICY notifications_all_authenticated ON notifications FOR ALL TO authenticated USING (true);

-- Note: These policies allow all authenticated users full access to all tables.
-- In production, implement role-based policies for better security.
