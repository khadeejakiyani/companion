import ActivityCard from "@/components/activities/ActivityCard";
import DailySuggestion from "@/components/activities/DailySuggestion";
import { BookOpen, Scissors, Puzzle, Brain } from "lucide-react";

const activities = [
  {
    id: "listen-story",
    icon: BookOpen,
    title: "Listen to a Story",
    description: "Relaxing tales and poetry",
    bgClass: "bg-calm-blue",
    iconColor: "text-blue-700",
  },
  {
    id: "crafts",
    icon: Scissors,
    title: "Knitting & Crafts",
    description: "Simple patterns and ideas",
    bgClass: "bg-rose-light",
    iconColor: "text-rose",
  },
  {
    id: "games",
    icon: Puzzle,
    title: "Gentle Games",
    description: "Puzzles and word games",
    bgClass: "bg-sage-light",
    iconColor: "text-sage",
  },
  {
    id: "memories",
    icon: Brain,
    title: "Memory Prompts",
    description: "Share your favourite memories",
    bgClass: "bg-sunny-yellow",
    iconColor: "text-amber-700",
  },
];

const ActivitiesPage = () => {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-3xl font-serif mb-2">Activities</h1>
        <p className="text-lg text-muted-foreground">
          Gentle ways to spend your time
        </p>
      </header>

      {/* Daily suggestion */}
      <DailySuggestion />

      {/* Activities grid */}
      <section aria-labelledby="activities-heading">
        <h2 id="activities-heading" className="text-2xl font-serif mb-6">
          Choose an Activity
        </h2>
        
        <div className="grid gap-4 sm:grid-cols-2">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ActivitiesPage;
