-- Seed Sample Data for Serrano
-- Version: 6.0.0

-- Insert sample company
INSERT INTO public.companies (id, name, address, phone, email, website)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Serrano Doors Inc.',
  '{"street": "123 Main Street", "city": "Portland", "state": "OR", "zip": "97201"}'::jsonb,
  '(503) 555-0100',
  'info@serrano.ai',
  'https://serrano.ai'
)
ON CONFLICT (id) DO NOTHING;

-- Insert sample contacts
INSERT INTO public.contacts (company_id, first_name, last_name, email, phone, title)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'John', 'Smith', 'john@example.com', '(503) 555-0101', 'Project Manager'),
  ('00000000-0000-0000-0000-000000000001', 'Sarah', 'Johnson', 'sarah@example.com', '(503) 555-0102', 'Architect'),
  ('00000000-0000-0000-0000-000000000001', 'Mike', 'Davis', 'mike@example.com', '(503) 555-0103', 'Contractor')
ON CONFLICT DO NOTHING;

-- Added project_number field which is required (NOT NULL constraint)
-- Insert sample projects
INSERT INTO public.projects (company_id, project_number, name, description, status, start_date, end_date, budget)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'PROJ-2025-001', 'Downtown Office Building', 'Custom door installation for new office complex', 'in_progress', '2025-01-01', '2025-06-30', 150000.00),
  ('00000000-0000-0000-0000-000000000001', 'PROJ-2025-002', 'Residential Complex Phase 1', 'Door installation for 50-unit residential building', 'planning', '2025-03-01', '2025-09-30', 200000.00),
  ('00000000-0000-0000-0000-000000000001', 'PROJ-2024-050', 'Hotel Renovation', 'Replace all doors in historic hotel', 'completed', '2024-06-01', '2024-12-31', 180000.00)
ON CONFLICT DO NOTHING;

-- Success message
SELECT 'Sample data seeded successfully!' AS message;
