import { Sun, Cloud, Moon, Sunrise } from "lucide-react";

const Greeting = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good Morning", icon: Sunrise, emoji: "🌅" };
    if (hour < 17) return { text: "Good Afternoon", icon: Sun, emoji: "☀️" };
    if (hour < 21) return { text: "Good Evening", icon: Cloud, emoji: "🌤️" };
    return { text: "Good Night", icon: Moon, emoji: "🌙" };
  };

  const greeting = getGreeting();

  return (
    <section className="greeting-card mb-8" aria-label="Daily greeting">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl" role="img" aria-hidden="true">
          {greeting.emoji}
        </span>
        <div>
          <h1 className="text-3xl font-serif">{greeting.text}</h1>
          <p className="text-lg text-muted-foreground mt-1">
            It's lovely to see you today
          </p>
        </div>
      </div>
    </section>
  );
};

export default Greeting;
