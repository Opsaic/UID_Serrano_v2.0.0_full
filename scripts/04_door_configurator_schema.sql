-- ============================================================
-- UID Serrano v6.0.0 - Door Configurator Schema Update
-- Project Horizon • Supabase Project: hlqtcxndetjvtdkisinr
-- ============================================================

-- 1. Create configurator_sessions table
CREATE TABLE IF NOT EXISTS public.configurator_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    configuration_id UUID REFERENCES public.door_configurations(id) ON DELETE SET NULL,
    session_data JSONB,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

COMMENT ON TABLE public.configurator_sessions IS 'Tracks individual user configurator sessions';

CREATE INDEX IF NOT EXISTS idx_configurator_sessions_user_id ON public.configurator_sessions(user_id);

-- 2. Alter door_configurations table
ALTER TABLE public.door_configurations
ADD COLUMN IF NOT EXISTS width_in NUMERIC,
ADD COLUMN IF NOT EXISTS height_in NUMERIC,
ADD COLUMN IF NOT EXISTS material_id UUID REFERENCES public.materials_library(id),
ADD COLUMN IF NOT EXISTS finish TEXT,
ADD COLUMN IF NOT EXISTS glass_type TEXT,
ADD COLUMN IF NOT EXISTS swing TEXT,
ADD COLUMN IF NOT EXISTS jamb_type TEXT,
ADD COLUMN IF NOT EXISTS handle_style TEXT;

-- 3. Create configuration_pricing view
CREATE OR REPLACE VIEW public.configuration_pricing AS
SELECT
    dc.id AS configuration_id,
    COALESCE(SUM(am.quantity * ml.unit_cost), 0) AS materials_cost,
    COALESCE(fr.rate_amount, 0) AS freight_cost,
    COALESCE(SUM(am.quantity * ml.unit_cost) + fr.rate_amount, 0) AS total_price,
    dc.material_id,
    dc.model_id,
    dc.finish,
    dc.width_in,
    dc.height_in
FROM public.door_configurations dc
LEFT JOIN public.assembly_materials am ON am.assembly_id = dc.id
LEFT JOIN public.materials_library ml ON ml.id = am.material_id
LEFT JOIN public.freight_rates_cache fr ON fr.id = (
    SELECT id FROM public.freight_rates_cache 
    ORDER BY cached_at DESC LIMIT 1
)
GROUP BY dc.id, fr.rate_amount, dc.material_id, dc.model_id, dc.finish, dc.width_in, dc.height_in;

-- 4. RLS Policies
ALTER TABLE public.configurator_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own configurator sessions"
ON public.configurator_sessions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own configurator sessions"
ON public.configurator_sessions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own configurator sessions"
ON public.configurator_sessions
FOR UPDATE
USING (auth.uid() = user_id);
