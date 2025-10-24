-- UID Serrano v2.0.0 - Operational Tables
-- Part 6: Notifications, Integrations, Settings

-- Drop existing tables to ensure clean slate
DROP TABLE IF EXISTS activity_feed CASCADE;
DROP TABLE IF EXISTS system_settings CASCADE;
DROP TABLE IF EXISTS integrations CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;

-- Notifications (enhanced)
-- Removed all foreign key constraints, using plain UUID columns
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  type TEXT DEFAULT 'info',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  action_url TEXT,
  is_read BOOLEAN DEFAULT false,
  priority TEXT DEFAULT 'normal',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Integrations (enhanced)
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider TEXT NOT NULL,
  name TEXT NOT NULL,
  api_key TEXT,
  api_secret TEXT,
  config JSONB DEFAULT '{}',
  status TEXT DEFAULT 'active',
  last_sync TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Settings
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  updated_by UUID,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity Feed
CREATE TABLE activity_feed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_integrations_provider ON integrations(provider);
CREATE INDEX idx_activity_feed_user_id ON activity_feed(user_id);
CREATE INDEX idx_activity_feed_created_at ON activity_feed(created_at DESC);
