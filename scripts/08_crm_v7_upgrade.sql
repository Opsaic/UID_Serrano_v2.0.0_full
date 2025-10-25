-- UID Serrano CRM v7.0.0 "OmniSync" Upgrade
-- Adds market vertical, territory, and pricing tier support

-- Add new columns to companies table
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS market_vertical TEXT,
ADD COLUMN IF NOT EXISTS account_type TEXT,
ADD COLUMN IF NOT EXISTS territory TEXT,
ADD COLUMN IF NOT EXISTS preferred_pricing_tier TEXT,
ADD COLUMN IF NOT EXISTS annual_revenue NUMERIC(15,2);

-- Create market_verticals table
CREATE TABLE IF NOT EXISTS market_verticals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  target_industries JSONB DEFAULT '[]',
  typical_deal_size_min NUMERIC(12,2),
  typical_deal_size_max NUMERIC(12,2),
  sales_cycle_days INTEGER,
  key_decision_makers JSONB DEFAULT '[]',
  competitive_landscape TEXT,
  value_proposition TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create territories table
CREATE TABLE IF NOT EXISTS territories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  region TEXT,
  states JSONB DEFAULT '[]',
  zip_codes JSONB DEFAULT '[]',
  assigned_rep_id UUID,
  quota_annual NUMERIC(12,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pricing_tiers table
CREATE TABLE IF NOT EXISTS pricing_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tier_name TEXT NOT NULL UNIQUE,
  description TEXT,
  discount_percentage NUMERIC(5,2) DEFAULT 0,
  minimum_order_value NUMERIC(12,2),
  payment_terms TEXT DEFAULT 'Net 30',
  volume_requirements JSONB DEFAULT '{}',
  benefits JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_companies_market_vertical ON companies(market_vertical);
CREATE INDEX IF NOT EXISTS idx_companies_territory ON companies(territory);
CREATE INDEX IF NOT EXISTS idx_companies_account_type ON companies(account_type);
CREATE INDEX IF NOT EXISTS idx_companies_pricing_tier ON companies(preferred_pricing_tier);
CREATE INDEX IF NOT EXISTS idx_companies_annual_revenue ON companies(annual_revenue);

-- Create indexes for new tables
CREATE INDEX IF NOT EXISTS idx_market_verticals_name ON market_verticals(name);
CREATE INDEX IF NOT EXISTS idx_territories_name ON territories(name);
CREATE INDEX IF NOT EXISTS idx_territories_assigned_rep ON territories(assigned_rep_id);
CREATE INDEX IF NOT EXISTS idx_pricing_tiers_name ON pricing_tiers(tier_name);

-- Insert default market verticals
INSERT INTO market_verticals (name, description, typical_deal_size_min, typical_deal_size_max, sales_cycle_days)
VALUES 
  ('Commercial Construction', 'Large-scale commercial building projects', 50000, 500000, 90),
  ('Residential Development', 'Multi-family and single-family residential projects', 25000, 250000, 60),
  ('Industrial Manufacturing', 'Manufacturing facilities and warehouses', 75000, 750000, 120),
  ('Healthcare Facilities', 'Hospitals, clinics, and medical centers', 100000, 1000000, 150),
  ('Education Institutions', 'Schools, universities, and training centers', 50000, 500000, 120),
  ('Hospitality', 'Hotels, resorts, and restaurants', 40000, 400000, 90),
  ('Government & Municipal', 'Government buildings and public facilities', 75000, 750000, 180)
ON CONFLICT (name) DO NOTHING;

-- Insert default territories
INSERT INTO territories (name, description, region)
VALUES 
  ('Northeast', 'New England and Mid-Atlantic states', 'Northeast'),
  ('Southeast', 'Southern Atlantic and Gulf Coast states', 'Southeast'),
  ('Midwest', 'Great Lakes and Central Plains states', 'Midwest'),
  ('Southwest', 'Mountain and Desert Southwest states', 'Southwest'),
  ('West Coast', 'Pacific Coast states', 'West'),
  ('National', 'National accounts and multi-region projects', 'National')
ON CONFLICT (name) DO NOTHING;

-- Insert default pricing tiers
INSERT INTO pricing_tiers (tier_name, description, discount_percentage, minimum_order_value, payment_terms)
VALUES 
  ('Standard', 'Standard pricing for new and small accounts', 0, 0, 'Net 30'),
  ('Preferred', 'Preferred pricing for established accounts', 5, 25000, 'Net 30'),
  ('Premium', 'Premium pricing for high-volume accounts', 10, 100000, 'Net 45'),
  ('Enterprise', 'Enterprise pricing for strategic partners', 15, 500000, 'Net 60'),
  ('Government', 'Special pricing for government contracts', 8, 50000, 'Net 60')
ON CONFLICT (tier_name) DO NOTHING;

-- Update existing companies with default values
UPDATE companies 
SET 
  account_type = 'standard',
  territory = 'National',
  preferred_pricing_tier = 'Standard'
WHERE account_type IS NULL OR territory IS NULL OR preferred_pricing_tier IS NULL;
