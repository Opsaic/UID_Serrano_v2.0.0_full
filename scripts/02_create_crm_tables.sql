-- UID Serrano v2.0.0 - CRM Module Tables
-- Part 2: CRM (Clients, Leads, Contacts, Opportunities)

-- Drop existing tables to ensure clean slate
DROP TABLE IF EXISTS quotes CASCADE;
DROP TABLE IF EXISTS opportunities CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

-- Companies/Clients
-- Removed all foreign key constraints, using plain UUID columns
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  address JSONB DEFAULT '{}',
  tax_id TEXT,
  credit_limit DECIMAL(12,2),
  payment_terms TEXT DEFAULT 'Net 30',
  status TEXT DEFAULT 'active',
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  title TEXT,
  email TEXT,
  phone TEXT,
  mobile TEXT,
  is_primary BOOLEAN DEFAULT false,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  source TEXT,
  status TEXT DEFAULT 'new',
  score INTEGER DEFAULT 0,
  estimated_value DECIMAL(12,2),
  probability INTEGER DEFAULT 0,
  expected_close_date DATE,
  assigned_to UUID,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Opportunities
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID,
  lead_id UUID,
  name TEXT NOT NULL,
  description TEXT,
  value DECIMAL(12,2),
  stage TEXT DEFAULT 'qualification',
  probability INTEGER DEFAULT 0,
  expected_close_date DATE,
  assigned_to UUID,
  status TEXT DEFAULT 'open',
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quotes
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_number TEXT UNIQUE NOT NULL,
  company_id UUID,
  opportunity_id UUID,
  contact_id UUID,
  title TEXT NOT NULL,
  description TEXT,
  subtotal DECIMAL(12,2) DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 0,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  total DECIMAL(12,2) DEFAULT 0,
  status TEXT DEFAULT 'draft',
  valid_until DATE,
  terms TEXT,
  notes TEXT,
  line_items JSONB DEFAULT '[]',
  metadata JSONB DEFAULT '{}',
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_contacts_company_id ON contacts(company_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX idx_opportunities_company_id ON opportunities(company_id);
CREATE INDEX idx_opportunities_stage ON opportunities(stage);
CREATE INDEX idx_quotes_company_id ON quotes(company_id);
CREATE INDEX idx_quotes_status ON quotes(status);
