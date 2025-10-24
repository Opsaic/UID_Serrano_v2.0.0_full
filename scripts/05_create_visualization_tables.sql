-- UID Serrano v2.0.0 - Visualization & AR Tables
-- Part 5: 3D Models, AR Sessions, Configurations

-- Drop existing tables to ensure clean slate
DROP TABLE IF EXISTS door_configurations CASCADE;
DROP TABLE IF EXISTS ar_sessions CASCADE;
DROP TABLE IF EXISTS models CASCADE;

-- 3D Models (enhanced)
-- Removed all foreign key constraints, using plain UUID columns
CREATE TABLE models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'door',
  src TEXT NOT NULL,
  ios_src TEXT,
  thumbnail_url TEXT,
  file_size INTEGER,
  dimensions JSONB DEFAULT '{}',
  materials JSONB DEFAULT '[]',
  configurations JSONB DEFAULT '{}',
  tags TEXT[],
  is_public BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AR Sessions (enhanced)
CREATE TABLE ar_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID,
  model_id UUID,
  user_id UUID,
  session_type TEXT DEFAULT 'preview',
  duration INTEGER,
  data JSONB DEFAULT '{}',
  screenshots JSONB DEFAULT '[]',
  annotations JSONB DEFAULT '[]',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Door Configurations
CREATE TABLE door_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID,
  quote_id UUID,
  model_id UUID,
  name TEXT NOT NULL,
  door_type TEXT,
  dimensions JSONB NOT NULL,
  materials JSONB DEFAULT '{}',
  hardware JSONB DEFAULT '{}',
  finish JSONB DEFAULT '{}',
  glass_options JSONB DEFAULT '{}',
  custom_features JSONB DEFAULT '[]',
  price_breakdown JSONB DEFAULT '{}',
  total_price DECIMAL(12,2),
  status TEXT DEFAULT 'draft',
  metadata JSONB DEFAULT '{}',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_models_category ON models(category);
CREATE INDEX idx_models_tags ON models USING GIN(tags);
CREATE INDEX idx_ar_sessions_project_id ON ar_sessions(project_id);
CREATE INDEX idx_ar_sessions_user_id ON ar_sessions(user_id);
CREATE INDEX idx_door_configurations_project_id ON door_configurations(project_id);
CREATE INDEX idx_door_configurations_status ON door_configurations(status);
