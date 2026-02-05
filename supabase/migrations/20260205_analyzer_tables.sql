-- Supabase Migration: Website Analyzer Tables
-- Run this in the Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Website Audits Table
CREATE TABLE IF NOT EXISTS website_audits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url TEXT NOT NULL,
  domain TEXT NOT NULL,
  
  -- Overall Scores
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  urgency_score INTEGER CHECK (urgency_score >= 0 AND urgency_score <= 100),
  
  -- Individual Agent Results (JSONB for flexibility)
  performance_data JSONB DEFAULT '{}'::jsonb,
  seo_data JSONB DEFAULT '{}'::jsonb,
  security_data JSONB DEFAULT '{}'::jsonb,
  accessibility_data JSONB DEFAULT '{}'::jsonb,
  ux_data JSONB DEFAULT '{}'::jsonb,
  content_data JSONB DEFAULT '{}'::jsonb,
  
  -- Analysis Metadata
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'analyzing', 'completed', 'failed')),
  error_message TEXT,
  analysis_duration_ms INTEGER,
  
  -- Screenshot (stored as URL or base64)
  screenshot_url TEXT,
  tech_stack TEXT[],
  
  -- Visitor Info
  
  -- Visitor Info
  visitor_id TEXT,
  visitor_email TEXT,
  visitor_name TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_audits_domain ON website_audits(domain);
CREATE INDEX IF NOT EXISTS idx_audits_status ON website_audits(status);
CREATE INDEX IF NOT EXISTS idx_audits_created ON website_audits(created_at DESC);

-- Chat Sessions Table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  
  -- Session Context
  context JSONB DEFAULT '{}'::jsonb,
  current_page TEXT,
  
  -- Metadata
  is_active BOOLEAN DEFAULT true,
  message_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Index for active sessions
CREATE INDEX IF NOT EXISTS idx_sessions_visitor ON chat_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON chat_sessions(is_active);

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  
  -- Message Content
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  
  -- Optional Metadata
  metadata JSONB DEFAULT '{}'::jsonb,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for message retrieval
CREATE INDEX IF NOT EXISTS idx_messages_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON chat_messages(created_at);

-- API Usage Tracking Table (for monitoring)
CREATE TABLE IF NOT EXISTS api_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- API Info
  api_name TEXT NOT NULL CHECK (api_name IN ('gemini', 'perplexity', 'pagespeed', 'maps')),
  api_key_hint TEXT, -- First 10 chars for identification
  
  -- Request Info
  endpoint TEXT,
  status_code INTEGER,
  response_time_ms INTEGER,
  tokens_used INTEGER,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for usage analysis
CREATE INDEX IF NOT EXISTS idx_usage_api ON api_usage(api_name);
CREATE INDEX IF NOT EXISTS idx_usage_created ON api_usage(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_audits_updated_at
  BEFORE UPDATE ON website_audits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE website_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

-- Allow anonymous reads for audits (public reports)
CREATE POLICY "Public audits are viewable" ON website_audits
  FOR SELECT USING (true);

-- Allow anonymous inserts for new audits
CREATE POLICY "Anyone can create audits" ON website_audits
  FOR INSERT WITH CHECK (true);

-- Allow updates only for pending/analyzing status
CREATE POLICY "Audits can be updated during analysis" ON website_audits
  FOR UPDATE USING (status IN ('pending', 'analyzing'));

-- Chat session policies
CREATE POLICY "Sessions are viewable by visitor" ON chat_sessions
  FOR SELECT USING (true);

CREATE POLICY "Anyone can create sessions" ON chat_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Sessions can be updated" ON chat_sessions
  FOR UPDATE USING (true);

-- Chat messages policies
CREATE POLICY "Messages are viewable" ON chat_messages
  FOR SELECT USING (true);

CREATE POLICY "Anyone can send messages" ON chat_messages
  FOR INSERT WITH CHECK (true);

-- API usage is admin only (no public policy)
CREATE POLICY "API usage admin only" ON api_usage
  FOR ALL USING (false);
