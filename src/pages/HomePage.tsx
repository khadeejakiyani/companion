import { useState } from "react";
import MoodCheckIn from "@/components/home/MoodCheckIn";
import TodaysPlan from "@/components/home/TodaysPlan";
import Greeting from "@/components/home/Greeting";

const HomePage = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      {/* Warm greeting */}
      <Greeting />
      
      {/* Mood check-in */}
      <MoodCheckIn 
        selectedMood={selectedMood} 
        onMoodSelect={setSelectedMood} 
      />
      
      {/* Today's plan */}
      <TodaysPlan />
    </div>
  );
};

export default HomePage;
