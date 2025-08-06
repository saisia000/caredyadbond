import { useState } from "react";
import { ThankYouPage } from "./ThankYouPage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SurveyHeader } from "./survey/SurveyHeader";
import { QuestionGroup } from "./survey/QuestionGroup";
import { QuestionField } from "./survey/QuestionField";
import { RadioGroup } from "./survey/RadioGroup";
import { CheckboxGroup } from "./survey/CheckboxGroup";
import { ScaleRating } from "./survey/ScaleRating";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SurveyData {
  // Basic Info
  name: string;
  email: string;
  
  // Section 1: About You
  role: string;
  duration: string;
  ageGroup: string;
  
  // Section 2: Relationship & Well-being
  emotionalConnection: number | undefined;
  connectionChallenges: string[];
  isolationFrequency: string;
  relationshipStress: string;
  meaningfulMoment: string;
  
  // Section 3: Support & Coping
  improveTogether: string;
  copingBehaviors: string;
  usedTechnology: string[];
  technologyDetails: string;
  digitalToolOpenness: string;
  usefulFeatures: string[];
  techWorries: string;
  
  // Section 4: "Magical" AI Aspect
  aiWishes: string;
  
  // Section 5: Needs & Community
  extraHour: string;
  supportNeeded: string;
  
  // Section 6: Participation
  futureParticipation: string;
  contactEmail: string;
  updatesEmail: string;
}

const initialData: SurveyData = {
  name: "",
  email: "",
  role: "",
  duration: "",
  ageGroup: "",
  emotionalConnection: undefined,
  connectionChallenges: [],
  isolationFrequency: "",
  relationshipStress: "",
  meaningfulMoment: "",
  improveTogether: "",
  copingBehaviors: "",
  usedTechnology: [],
  technologyDetails: "",
  digitalToolOpenness: "",
  usefulFeatures: [],
  techWorries: "",
  aiWishes: "",
  extraHour: "",
  supportNeeded: "",
  futureParticipation: "",
  contactEmail: "",
  updatesEmail: "",
};

export const CareDyadSurvey = () => {
  const [data, setData] = useState<SurveyData>(initialData);
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const sections = [
    "Welcome",
    "About You", 
    "Relationship & Well-being",
    "Support & Coping",
    "AI Features",
    "Needs & Community",
    "Participation"
  ];

  const progress = (currentSection / (sections.length - 1)) * 100;

  const handleSubmit = async () => {
    try {
      // Map survey data to database structure
      const surveyResponse = {
        name: data.name,
        email: data.email,
        role: data.role,
        age: data.ageGroup,
        relationship_duration: data.duration,
        emotional_connection: data.emotionalConnection,
        main_challenges: data.connectionChallenges,
        isolation_frequency: data.isolationFrequency,
        relationship_stress: data.relationshipStress,
        meaningful_moment: data.meaningfulMoment,
        improve_together: data.improveTogether,
        coping_behaviors: data.copingBehaviors,
        used_technology: data.usedTechnology,
        technology_details: data.technologyDetails,
        digital_tool_openness: data.digitalToolOpenness,
        useful_features: data.usefulFeatures,
        tech_worries: data.techWorries,
        ai_wishes: data.aiWishes,
        extra_hour: data.extraHour,
        support_needed: data.supportNeeded,
        future_participation: data.futureParticipation,
        other_comments: `Contact Email: ${data.contactEmail}\nUpdates Email: ${data.updatesEmail}`
      };

      const { error } = await supabase
        .from('survey_responses')
        .insert([surveyResponse]);

      if (error) {
        console.error('Error saving survey:', error);
        toast({
          title: "Error",
          description: "Failed to save survey. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log("Survey submitted successfully:", data);
      setIsSubmitted(true);
      toast({
        title: "Survey Submitted!",
        description: "Thank you for your participation.",
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const updateData = (field: keyof SurveyData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  // Show thank you page after submission
  if (isSubmitted) {
    return (
      <ThankYouPage>
        <div className="min-h-screen bg-gradient-to-br from-warm/40 via-primary/10 to-accent/20 py-16 px-4 flex items-center justify-center">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-white/50">
              <div className="flex items-center justify-center mb-8">
                <img 
                  src="/lovable-uploads/cb8c47f5-58b7-4893-a236-a2141bbc0802.png" 
                  alt="Thank you penguin dyad" 
                  className="w-48 h-auto drop-shadow-lg"
                />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-8">
                Thank You! 💖
              </h1>
              <p className="text-xl text-foreground leading-relaxed mb-8 font-medium">
                Thank you so much for sharing your story and insights. Every response shapes what we build. 
                Together, we hope to make survivorship and caregiving more connected, compassionate, and a little less lonely.
              </p>
              <p className="text-sm text-muted-foreground/80 italic">
                <strong>Privacy Statement:</strong> Your responses are confidential and will only be used for research 
                and development of support tools for survivors and caregivers.
              </p>
            </div>
          </div>
        </div>
      </ThankYouPage>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-comfort py-8 px-4">
      {/* CTA Button - Let's Connect */}
      <div className="fixed top-4 right-4 z-50">
        <a 
          href="https://calendly.com/caredyadbonding/30min?month=2025-08" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className="bg-cta-connect hover:bg-cta-connect/90 text-cta-connect-foreground font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
            Let's Connect
          </Button>
        </a>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-8">
        <SurveyHeader
          title="CareDyadBond Project"
          description="Survivor & Caregiver Connection Survey"
          progress={progress}
        />

        {/* Video Section */}
        <div className="w-full max-w-2xl mx-auto mb-8">
          <video 
            className="w-full h-auto rounded-xl shadow-lg border border-border/20"
            controls
            poster="/lovable-uploads/penguin-dyad.png"
          >
            <source src="/cdbp.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Welcome Section */}
        {currentSection === 0 && (
          <QuestionGroup title="Welcome">
            <div className="text-center space-y-6">
              <p className="text-lg text-foreground leading-relaxed">
                Your voice will help shape a new, empathy-driven support tool for cancer survivors and caregivers. 
                This confidential survey takes about 5–8 minutes.
              </p>
              <p className="text-base text-muted-foreground">
                Please answer only what feels comfortable. Thank you for guiding us toward a kinder, 
                more connected caregiving world.
              </p>
              <Button onClick={nextSection} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                Begin Survey
              </Button>
            </div>
          </QuestionGroup>
        )}

        {/* Section 1: About You */}
        {currentSection === 1 && (
          <QuestionGroup title="Section 1: About You">
            <QuestionField label="Name" required>
              <Input
                type="text"
                value={data.name}
                onChange={(e) => updateData("name", e.target.value)}
                placeholder="Enter your full name"
                className="border-border focus:border-primary"
              />
            </QuestionField>

            <QuestionField label="Email" required>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => updateData("email", e.target.value)}
                placeholder="your.email@example.com"
                className="border-border focus:border-primary"
              />
            </QuestionField>

            <QuestionField label="Which best describes you?" required>
              <RadioGroup
                name="role"
                options={[
                  { value: "survivor", label: "Cancer survivor" },
                  { value: "caregiver", label: "Caregiver" },
                  { value: "both", label: "Both" },
                  { value: "other", label: "Other (please specify)" }
                ]}
                value={data.role}
                onChange={(value) => updateData("role", value)}
              />
            </QuestionField>

            <QuestionField label="How long have you been in this role?" required>
              <RadioGroup
                name="duration"
                options={[
                  { value: "less-6", label: "Less than 6 months" },
                  { value: "6-12", label: "6–12 months" },
                  { value: "1-3", label: "1–3 years" },
                  { value: "3-5", label: "3–5 years" },
                  { value: "more-5", label: "More than 5 years" }
                ]}
                value={data.duration}
                onChange={(value) => updateData("duration", value)}
              />
            </QuestionField>

            <QuestionField label="What is your age group?" required>
              <RadioGroup
                name="ageGroup"
                options={[
                  { value: "under-25", label: "Under 25" },
                  { value: "25-34", label: "25–34" },
                  { value: "35-44", label: "35–44" },
                  { value: "45-54", label: "45–54" },
                  { value: "55-64", label: "55–64" },
                  { value: "65+", label: "65+" },
                  { value: "prefer-not", label: "Prefer not to say" }
                ]}
                value={data.ageGroup}
                onChange={(value) => updateData("ageGroup", value)}
              />
            </QuestionField>
          </QuestionGroup>
        )}

        {/* Section 2: Relationship & Well-being */}
        {currentSection === 2 && (
          <QuestionGroup title="Section 2: Relationship & Well-being">
            <QuestionField label="On a scale of 1–5, how emotionally connected do you feel with your survivor/caregiver most days?" required>
              <ScaleRating
                name="emotionalConnection"
                min={1}
                max={5}
                value={data.emotionalConnection}
                onChange={(value) => updateData("emotionalConnection", value)}
                minLabel="Not at all connected"
                maxLabel="Very connected"
              />
            </QuestionField>

            <QuestionField label="What are the biggest challenges you face in maintaining or rebuilding that emotional connection?" required>
              <CheckboxGroup
                name="connectionChallenges"
                options={[
                  { value: "time-energy", label: "Lack of time/energy" },
                  { value: "stress-burnout", label: "Stress or burnout" },
                  { value: "difficult-conversations", label: "Avoiding difficult conversations" },
                  { value: "isolation", label: "Feelings of isolation/loneliness" },
                  { value: "changing-roles", label: "Changing roles/identities" },
                  { value: "other", label: "Other (please specify)" }
                ]}
                values={data.connectionChallenges}
                onChange={(values) => updateData("connectionChallenges", values)}
              />
            </QuestionField>

            <QuestionField label="Do you ever feel a sense of isolation or loneliness related to your role?" required>
              <RadioGroup
                name="isolationFrequency"
                options={[
                  { value: "never", label: "Never" },
                  { value: "rarely", label: "Rarely" },
                  { value: "sometimes", label: "Sometimes" },
                  { value: "often", label: "Often" },
                  { value: "almost-always", label: "Almost always" }
                ]}
                value={data.isolationFrequency}
                onChange={(value) => updateData("isolationFrequency", value)}
              />
            </QuestionField>

            <QuestionField label="What causes the most stress or strain in your relationship as a survivor/caregiver?" required>
              <Textarea
                value={data.relationshipStress}
                onChange={(e) => updateData("relationshipStress", e.target.value)}
                placeholder="Share your thoughts..."
                className="min-h-24 resize-none border-border focus:border-primary"
              />
            </QuestionField>

            <QuestionField label="Can you share a simple, meaningful moment you and your survivor/caregiver experienced together? What did it feel like?" required>
              <Textarea
                value={data.meaningfulMoment}
                onChange={(e) => updateData("meaningfulMoment", e.target.value)}
                placeholder="Tell us about a special moment..."
                className="min-h-24 resize-none border-border focus:border-primary"
              />
            </QuestionField>
          </QuestionGroup>
        )}

        {/* Section 3: Support & Coping */}
        {currentSection === 3 && (
          <QuestionGroup title="Section 3: Support & Coping">
            <QuestionField 
              label="What emotional connection or shared experience do you wish you and your survivor/caregiver had more of?" 
              description="Think about conversations, rituals, ways of feeling close or supported."
              required
            >
              <Textarea
                value={data.improveTogether}
                onChange={(e) => updateData("improveTogether", e.target.value)}
                placeholder="Share your thoughts..."
                className="min-h-24 resize-none border-border focus:border-primary"
              />
            </QuestionField>

            <QuestionField label="When you're feeling emotionally disconnected or overwhelmed in your survivor–caregiver relationship, what do you usually do?" required>
              <Textarea
                value={data.copingBehaviors}
                onChange={(e) => updateData("copingBehaviors", e.target.value)}
                placeholder="e.g., talk to someone, meditate, distract yourself, use an app, ignore it, etc."
                className="min-h-24 resize-none border-border focus:border-primary"
              />
            </QuestionField>

            <QuestionField label="Have you ever used any technology or app to support your emotions or your relationship with your survivor/caregiver?" required>
              <CheckboxGroup
                name="usedTechnology"
                options={[
                  { value: "meditation", label: "Meditation (e.g. Calm, Headspace)" },
                  { value: "journaling", label: "Journaling or mood tracking (e.g. Wysa, Daylio)" },
                  { value: "therapy", label: "Therapy (e.g. BetterHelp, Talkspace)" },
                  { value: "communities", label: "Support communities (e.g. Facebook Groups, CaringBridge)" },
                  { value: "none", label: "None of these" },
                  { value: "other", label: "Other (please specify)" }
                ]}
                values={data.usedTechnology}
                onChange={(values) => updateData("usedTechnology", values)}
              />
            </QuestionField>

            {data.usedTechnology.length > 0 && !data.usedTechnology.includes("none") && (
              <QuestionField label="Which one(s)? Tell us more." required>
                <Textarea
                  value={data.technologyDetails}
                  onChange={(e) => updateData("technologyDetails", e.target.value)}
                  placeholder="Tell us about the apps or tools you've used..."
                  className="min-h-20 resize-none border-border focus:border-primary"
                />
              </QuestionField>
            )}

            <QuestionField label="How open are you to using a digital tool to help you and your survivor/caregiver bond?" required>
              <RadioGroup
                name="digitalToolOpenness"
                options={[
                  { value: "not-open", label: "Not at all open" },
                  { value: "somewhat-open", label: "Somewhat open" },
                  { value: "neutral", label: "Neutral" },
                  { value: "open", label: "Open" },
                  { value: "very-open", label: "Very open" }
                ]}
                value={data.digitalToolOpenness}
                onChange={(value) => updateData("digitalToolOpenness", value)}
              />
            </QuestionField>

            <QuestionField label="What features would be most useful to you in a support tool? (Select all that apply)" required>
              <CheckboxGroup
                name="usefulFeatures"
                options={[
                  { value: "mood-tracking", label: "Mood tracking/check-ins" },
                  { value: "conversation-prompts", label: "Conversation prompts for honest talks" },
                  { value: "guided-reflection", label: "Guided reflection or journaling" },
                  { value: "sharing-moments", label: "Sharing/celebrating positive moments" },
                  { value: "peer-community", label: "Connecting with a peer community" },
                  { value: "coping-exercises", label: "Coping exercises (stress, mindfulness)" },
                  { value: "private-communication", label: "Private and secure communication" },
                  { value: "other", label: "Other (please specify)" }
                ]}
                values={data.usefulFeatures}
                onChange={(values) => updateData("usefulFeatures", values)}
              />
            </QuestionField>

            <QuestionField 
              label="What worries or hesitations would you have about using a tech-based or AI-powered support tool?" 
              description="e.g. privacy, emotional tone, cost, effectiveness, trust, too impersonal, etc."
              required
            >
              <Textarea
                value={data.techWorries}
                onChange={(e) => updateData("techWorries", e.target.value)}
                placeholder="Share any concerns you might have..."
                className="min-h-24 resize-none border-border focus:border-primary"
              />
            </QuestionField>
          </QuestionGroup>
        )}

        {/* Section 4: AI Features */}
        {currentSection === 4 && (
          <QuestionGroup title={'Section 4: "Magical" AI Aspect—Dream Future Features'}>
            <div className="bg-support p-6 rounded-lg border border-border/50 mb-6">
              <h3 className="font-semibold text-support-foreground mb-3">Beyond the basics...</h3>
              <p className="text-support-foreground leading-relaxed">
                We're exploring how AI might gently support the deep bond between survivors and caregivers. 
                Our new project uses AI not just to log moods, but to gently detect shifting tides in your relationship, 
                suggest reconnection activities right when you need them, and give both survivor and caregiver real, 
                actionable insight into your unique bond.
              </p>
            </div>

            <QuestionField label="If an app could 'magically' help you and your partner feel closer, what would you want it to notice or do for you—no matter how futuristic it sounds?" required>
              <Textarea
                value={data.aiWishes}
                onChange={(e) => updateData("aiWishes", e.target.value)}
                placeholder="Dream big! What would be most helpful for your relationship?"
                className="min-h-32 resize-none border-border focus:border-primary"
              />
              <div className="mt-3 text-sm text-muted-foreground">
                <p className="font-medium mb-2">Ideas to inspire you:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Give you "bond bolstering" nudges at the right moment</li>
                  <li>Understand your unique relationship style</li>
                  <li>Surprise you with gratitude/strength reminders</li>
                  <li>Quietly alert when burnout feels near—before crisis hits</li>
                </ul>
              </div>
            </QuestionField>
          </QuestionGroup>
        )}

        {/* Section 5: Needs & Community */}
        {currentSection === 5 && (
          <QuestionGroup title="Section 5: Needs & Community">
            <QuestionField label="If you had an extra hour just for yourself, what would you do?" required>
              <Textarea
                value={data.extraHour}
                onChange={(e) => updateData("extraHour", e.target.value)}
                placeholder="Tell us how you'd spend that precious time..."
                className="min-h-20 resize-none border-border focus:border-primary"
              />
            </QuestionField>

            <QuestionField label="What support would make you feel most seen or understood as a survivor/caregiver that you don't have today?" required>
              <Textarea
                value={data.supportNeeded}
                onChange={(e) => updateData("supportNeeded", e.target.value)}
                placeholder="What kind of support are you missing?"
                className="min-h-24 resize-none border-border focus:border-primary"
              />
            </QuestionField>
          </QuestionGroup>
        )}

        {/* Section 6: Participation */}
        {currentSection === 6 && (
          <QuestionGroup title="Section 6: Participation & Follow-up">
            <QuestionField label="Would you be willing to share more feedback or try early versions of a new tool?" required>
              <RadioGroup
                name="futureParticipation"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "maybe", label: "Maybe" }
                ]}
                value={data.futureParticipation}
                onChange={(value) => updateData("futureParticipation", value)}
              />
            </QuestionField>

            {(data.futureParticipation === "yes" || data.futureParticipation === "maybe") && (
              <QuestionField label="Please leave your email:" required>
                <Input
                  type="email"
                  value={data.contactEmail}
                  onChange={(e) => updateData("contactEmail", e.target.value)}
                  placeholder="your.email@example.com"
                  className="border-border focus:border-primary"
                />
              </QuestionField>
            )}

            <QuestionField label="If you'd like occasional updates or to connect with others on a similar journey, drop your email here:">
              <Input
                type="email"
                value={data.updatesEmail}
                onChange={(e) => updateData("updatesEmail", e.target.value)}
                placeholder="your.email@example.com"
                className="border-border focus:border-primary"
              />
              <p className="text-sm text-muted-foreground mt-2">No spam, opt-out any time.</p>
            </QuestionField>
          </QuestionGroup>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8">
          <Button
            variant="outline"
            onClick={prevSection}
            disabled={currentSection <= 1}
            className="border-border hover:bg-muted"
          >
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            {currentSection + 1} of {sections.length}
          </div>

          {currentSection === sections.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            >
              Submit Survey
            </Button>
          ) : (
            <Button
              onClick={nextSection}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
