import { Sparkles } from "lucide-react";

const DailySuggestion = () => {
  const suggestions = [
    "Listen to a calming nature story today",
    "Try a simple breathing exercise",
    "Share a favourite recipe with someone",
    "Look through old photographs",
    "Write about a happy memory",
  ];

  // Get a consistent suggestion for today
  const todayIndex = new Date().getDate() % suggestions.length;
  const todaySuggestion = suggestions[todayIndex];

  return (
    <section className="mb-10" aria-labelledby="suggestion-heading">
      <div className="p-6 rounded-3xl bg-gradient-to-r from-sage-light to-calm-blue">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-background/50">
            <Sparkles size={28} className="text-sage" aria-hidden="true" />
          </div>
          <div>
            <h2 id="suggestion-heading" className="text-lg font-medium text-muted-foreground mb-1">
              Today's Gentle Suggestion
            </h2>
            <p className="text-xl font-serif">{todaySuggestion}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailySuggestion;
