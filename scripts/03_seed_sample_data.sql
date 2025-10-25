-- Seed Sample Data for Serrano
-- Version: 6.0.0
-- Updated to match actual database schema

-- Insert sample company (matches actual companies table schema)
INSERT INTO public.companies (
  id, 
  name, 
  address, 
  phone, 
  email, 
  website,
  status,
  created_at
)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Serrano Doors Inc.',
  '{"street": "123 Main Street", "city": "Portland", "state": "OR", "zip": "97201"}'::jsonb,
  '(503) 555-0100',
  'info@serrano.ai',
  'https://serrano.ai',
  'active',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  website = EXCLUDED.website;

-- Insert sample contacts (matches actual contacts table schema)
INSERT INTO public.contacts (
  id,
  company_id, 
  first_name, 
  last_name, 
  email, 
  phone, 
  title,
  is_primary,
  created_at
)
VALUES
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'John', 'Smith', 'john@example.com', '(503) 555-0101', 'Project Manager', true, NOW()),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Sarah', 'Johnson', 'sarah@example.com', '(503) 555-0102', 'Architect', false, NOW()),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Mike', 'Davis', 'mike@example.com', '(503) 555-0103', 'Contractor', false, NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert sample projects (matches actual projects table schema with all required fields)
INSERT INTO public.projects (
  id,
  company_id, 
  project_number, 
  name, 
  description, 
  status, 
  start_date, 
  end_date, 
  budget,
  type,
  priority,
  created_at
)
VALUES
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'PROJ-2025-001', 'Downtown Office Building', 'Custom door installation for new office complex', 'in_progress', '2025-01-01', '2025-06-30', 150000.00, 'custom_door', 'high', NOW()),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'PROJ-2025-002', 'Residential Complex Phase 1', 'Door installation for 50-unit residential building', 'planning', '2025-03-01', '2025-09-30', 200000.00, 'standard_door', 'medium', NOW()),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'PROJ-2024-050', 'Hotel Renovation', 'Replace all doors in historic hotel', 'completed', '2024-06-01', '2024-12-31', 180000.00, 'custom_door', 'medium', NOW())
ON CONFLICT (project_number) DO NOTHING;

-- Success message
SELECT 'Sample data seeded successfully!' AS message;
