import { SurveyCard } from "./SurveyCard";

interface QuestionGroupProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const QuestionGroup = ({ title, children, className }: QuestionGroupProps) => {
  return (
    <SurveyCard className={className}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-foreground border-b border-border pb-3">
          {title}
        </h2>
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </SurveyCard>
  );
};