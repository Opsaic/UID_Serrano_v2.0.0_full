-- Seed Sample Data for Serrano
-- Version: 6.0.0

-- Insert sample company
INSERT INTO public.companies (id, name, address, phone, email, website)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Serrano Doors Inc.',
  '123 Main Street, Portland, OR 97201',
  '(503) 555-0100',
  'info@serrano.ai',
  'https://serrano.ai'
)
ON CONFLICT (id) DO NOTHING;

-- Update admin user with company
UPDATE public.profiles
SET company_id = '00000000-0000-0000-0000-000000000001'
WHERE email = 'admin@serrano.ai';

-- Insert sample contacts
INSERT INTO public.contacts (company_id, name, email, phone, position, status)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'John Smith', 'john@example.com', '(503) 555-0101', 'Project Manager', 'active'),
  ('00000000-0000-0000-0000-000000000001', 'Sarah Johnson', 'sarah@example.com', '(503) 555-0102', 'Architect', 'active'),
  ('00000000-0000-0000-0000-000000000001', 'Mike Davis', 'mike@example.com', '(503) 555-0103', 'Contractor', 'active')
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO public.projects (company_id, name, description, status, start_date, end_date, budget)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Downtown Office Building', 'Custom door installation for new office complex', 'in_progress', '2025-01-01', '2025-06-30', 150000.00),
  ('00000000-0000-0000-0000-000000000001', 'Residential Complex Phase 1', 'Door installation for 50-unit residential building', 'planning', '2025-03-01', '2025-09-30', 200000.00),
  ('00000000-0000-0000-0000-000000000001', 'Hotel Renovation', 'Replace all doors in historic hotel', 'completed', '2024-06-01', '2024-12-31', 180000.00)
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Sample data seeded successfully!' AS message;
