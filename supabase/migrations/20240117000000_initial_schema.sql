-- Initial Schema for Lagos Fashion Intelligence System

-- 1. ENUMS
CREATE TYPE user_role AS ENUM ('Admin', 'Researcher', 'Viewer');
CREATE TYPE event_type AS ENUM ('Runway Show', 'Pop-up Store', 'Exhibition', 'Product Launch', 'Fashion Talk', 'Networking Mixer', 'Fashion Week', 'Gala');
CREATE TYPE verification_status AS ENUM ('verified', 'community', 'estimated', 'unverified');
CREATE TYPE sponsorship_tier AS ENUM ('Title/Presenting', 'Gold', 'Silver', 'Bronze', 'Platinum', 'In-Kind');
CREATE TYPE industry_type AS ENUM ('Banking & Finance', 'Telecommunications', 'Beverages & Alcohol', 'Beauty & Cosmetics', 'Automotive', 'Fashion Retail', 'Technology', 'Real Estate', 'Fashion & Apparel', 'Other');
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'done');

-- 2. TABLES

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'Viewer',
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date DATE NOT NULL,
  end_date DATE,
  location TEXT,
  venue TEXT,
  type event_type NOT NULL,
  status TEXT CHECK (status IN ('upcoming', 'completed', 'cancelled')) DEFAULT 'upcoming',
  estimated_attendance INTEGER DEFAULT 0,
  actual_attendance INTEGER,
  demographics JSONB DEFAULT '{"ageRange": "", "genderSplit": {"male": 0, "female": 0, "other": 0}, "incomeLevel": "", "interests": []}',
  success_metrics JSONB,
  analysis JSONB,
  autopsy_report TEXT,
  budget JSONB DEFAULT '{"min": 0, "max": 0, "currency": "₦"}',
  media_metrics JSONB DEFAULT '{"socialReach": 0, "pressArticles": 0, "instagramPosts": 0, "twitterMentions": 0, "engagement": 0}',
  tags TEXT[] DEFAULT '{}',
  description TEXT,
  organizer TEXT,
  image_url TEXT,
  banner_image TEXT,
  recurring BOOLEAN DEFAULT FALSE,
  previous_editions INTEGER DEFAULT 0,
  verification JSONB DEFAULT '{"status": "unverified"}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Sponsors
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry industry_type NOT NULL,
  logo TEXT,
  description TEXT,
  website TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  total_sponsorship NUMERIC DEFAULT 0,
  total_investment_budget NUMERIC DEFAULT 0,
  average_roi NUMERIC DEFAULT 0,
  preferred_tiers sponsorship_tier[] DEFAULT '{}',
  target_demographics JSONB DEFAULT '{"ageRange": "", "genderSplit": {"male": 0, "female": 0, "other": 0}, "incomeLevel": "", "interests": []}',
  active_since DATE DEFAULT CURRENT_DATE,
  internal_notes TEXT,
  intel JSONB DEFAULT '{"winningStrategy": "", "careabouts": [], "trends": "", "redFlags": []}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sponsorships (Junction Table)
CREATE TABLE sponsorships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  tier sponsorship_tier NOT NULL,
  deal_amount NUMERIC DEFAULT 0,
  deliverables TEXT,
  activation_strategy TEXT[] DEFAULT '{}',
  roi JSONB DEFAULT '{"mediaValue": 0, "impressions": 0, "engagement": 0, "leadGeneration": 0, "brandAwareness": 0, "overallScore": 0}',
  verification JSONB DEFAULT '{"status": "unverified"}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- My Events (Wizard Data)
CREATE TABLE my_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT,
  target_audience TEXT[] DEFAULT '{}',
  budget_goal NUMERIC DEFAULT 0,
  currency TEXT DEFAULT '₦',
  unique_angle TEXT,
  status TEXT CHECK (status IN ('draft', 'planned', 'active')) DEFAULT 'draft',
  ai_recommendations JSONB DEFAULT '{"marketGaps": [], "sponsorMatches": []}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Notes
CREATE TABLE team_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('event', 'sponsor')),
  entity_id UUID NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES team_notes(id) ON DELETE CASCADE,
  mentions UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assigner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  assignee_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  status task_status DEFAULT 'todo',
  related_entity_type TEXT CHECK (related_entity_type IN ('event', 'sponsor', 'sponsorship')),
  related_entity_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Log
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  type TEXT NOT NULL, -- create, update, delete
  entity_type TEXT NOT NULL,
  entity_name TEXT,
  entity_id UUID,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RLS POLICIES

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE my_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can view, User can update own
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Events: 
CREATE POLICY "Team can view events." ON events FOR SELECT USING (true);
CREATE POLICY "Admins and Researchers can edit events." ON events 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND (profiles.role = 'Admin' OR profiles.role = 'Researcher')
    )
  );

-- Sponsors: Same as Events
CREATE POLICY "Team can view sponsors." ON sponsors FOR SELECT USING (true);
CREATE POLICY "Admins and Researchers can edit sponsors." ON sponsors 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND (profiles.role = 'Admin' OR profiles.role = 'Researcher')
    )
  );

-- My Events: Own only
CREATE POLICY "Users can see own wizard events." ON my_events FOR ALL USING (auth.uid() = user_id);

-- Team Notes: Team can view, Author can edit
CREATE POLICY "Team can view notes." ON team_notes FOR SELECT USING (true);
CREATE POLICY "Authors can edit own notes." ON team_notes FOR ALL USING (auth.uid() = author_id);

-- Tasks: Team can view, Involved can edit
CREATE POLICY "Team can view tasks." ON tasks FOR SELECT USING (true);
CREATE POLICY "Assigned or assigned can edit tasks." ON tasks 
  FOR ALL USING (auth.uid() = assigner_id OR auth.uid() = assignee_id);

-- 4. TRIGGERS FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
