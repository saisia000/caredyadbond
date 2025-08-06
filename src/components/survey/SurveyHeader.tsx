interface SurveyHeaderProps {
  title: string;
  description?: string;
  progress?: number;
}

export const SurveyHeader = ({ title, description, progress }: SurveyHeaderProps) => {
  return (
    <div className="text-center mb-8">
      {progress !== undefined && (
        <div className="mb-6">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
        </div>
      )}
      <h1 className="text-3xl font-bold text-foreground mb-4">{title}</h1>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};