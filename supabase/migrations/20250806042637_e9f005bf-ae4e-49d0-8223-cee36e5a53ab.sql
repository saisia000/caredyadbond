-- Create survey_responses table to store all survey data
CREATE TABLE public.survey_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Personal Information
  name TEXT,
  email TEXT,
  phone TEXT,
  age TEXT,
  gender TEXT,
  relationship_status TEXT,
  
  -- Cancer Information
  cancer_type TEXT,
  diagnosis_date TEXT,
  treatment_status TEXT,
  role TEXT, -- survivor or caregiver
  
  -- Relationship Information
  relationship_type TEXT,
  relationship_duration TEXT,
  living_situation TEXT,
  children TEXT,
  
  -- Support and Communication
  communication_frequency TEXT,
  communication_methods TEXT[],
  main_challenges TEXT[],
  support_sources TEXT[],
  healthcare_involvement TEXT,
  
  -- Technology and Resources
  technology_comfort TEXT,
  preferred_devices TEXT[],
  current_resources TEXT[],
  resource_gaps TEXT,
  app_interest TEXT,
  app_features TEXT[],
  
  -- Additional Information
  biggest_challenge TEXT,
  additional_support TEXT,
  program_interest TEXT,
  other_comments TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert survey responses (public survey)
CREATE POLICY "Anyone can submit survey responses" 
ON public.survey_responses 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading survey responses (for analytics)
CREATE POLICY "Survey responses are readable" 
ON public.survey_responses 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_survey_responses_updated_at
  BEFORE UPDATE ON public.survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();