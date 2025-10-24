-- UID Serrano v2.0.0 - Project Management Tables
-- Part 3: Projects, Tasks, Resources, Timeline

-- Drop existing tables to ensure clean slate
DROP TABLE IF EXISTS schedule_events CASCADE;
DROP TABLE IF EXISTS project_documents CASCADE;
DROP TABLE IF EXISTS project_resources CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;
DROP TABLE IF EXISTS project_phases CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- Projects (enhanced)
-- Removed all foreign key constraints, using plain UUID columns
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_number TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  company_id UUID,
  quote_id UUID,
  type TEXT DEFAULT 'custom_door',
  status TEXT DEFAULT 'planning',
  priority TEXT DEFAULT 'medium',
  start_date DATE,
  end_date DATE,
  estimated_hours DECIMAL(10,2),
  actual_hours DECIMAL(10,2) DEFAULT 0,
  budget DECIMAL(12,2),
  actual_cost DECIMAL(12,2) DEFAULT 0,
  progress INTEGER DEFAULT 0,
  project_manager_id UUID,
  metadata JSONB DEFAULT '{}',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Phases
CREATE TABLE project_phases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  sequence INTEGER NOT NULL,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks (enhanced)
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID,
  phase_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'task',
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  assigned_to UUID,
  estimated_hours DECIMAL(8,2),
  actual_hours DECIMAL(8,2) DEFAULT 0,
  start_date DATE,
  due_date DATE,
  completed_date TIMESTAMP WITH TIME ZONE,
  dependencies JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Resources
CREATE TABLE project_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID,
  user_id UUID,
  role TEXT,
  allocation_percentage INTEGER DEFAULT 100,
  start_date DATE,
  end_date DATE,
  hourly_rate DECIMAL(10,2),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project Documents
CREATE TABLE project_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID,
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  category TEXT,
  uploaded_by UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schedule Events (enhanced)
CREATE TABLE schedule_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  start TIMESTAMP WITH TIME ZONE NOT NULL,
  "end" TIMESTAMP WITH TIME ZONE NOT NULL,
  project_id UUID,
  task_id UUID,
  assigned_to UUID,
  type TEXT DEFAULT 'meeting',
  location TEXT,
  metadata JSONB DEFAULT '{}',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_company_id ON projects(company_id);
CREATE INDEX idx_projects_manager ON projects(project_manager_id);
CREATE INDEX idx_project_phases_project_id ON project_phases(project_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_schedule_events_start ON schedule_events(start);
CREATE INDEX idx_schedule_events_project_id ON schedule_events(project_id);
