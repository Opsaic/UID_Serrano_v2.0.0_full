-- UID Serrano v2.0.0 - Visualization & AR Tables
-- Part 5: 3D Models, AR Sessions, Configurations

-- 3D Models (enhanced)
CREATE TABLE IF NOT EXISTS models (
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
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AR Sessions (enhanced)
CREATE TABLE IF NOT EXISTS ar_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id),
  model_id UUID REFERENCES models(id),
  user_id UUID REFERENCES users(id),
  session_type TEXT DEFAULT 'preview',
  duration INTEGER,
  data JSONB DEFAULT '{}',
  screenshots JSONB DEFAULT '[]',
  annotations JSONB DEFAULT '[]',
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Door Configurations
CREATE TABLE IF NOT EXISTS door_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id),
  quote_id UUID REFERENCES quotes(id),
  model_id UUID REFERENCES models(id),
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
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_models_category ON models(category);
CREATE INDEX IF NOT EXISTS idx_models_tags ON models USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_ar_sessions_project_id ON ar_sessions(project_id);
CREATE INDEX IF NOT EXISTS idx_ar_sessions_user_id ON ar_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_door_configurations_project_id ON door_configurations(project_id);
CREATE INDEX IF NOT EXISTS idx_door_configurations_status ON door_configurations(status);
