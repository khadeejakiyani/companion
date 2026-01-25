import { Coffee, Bell, Leaf } from "lucide-react";

const planItems = [
  {
    id: "tea-time",
    icon: Coffee,
    title: "Tea Time",
    description: "Join your circle at 3:00 PM",
    bgClass: "bg-soft-peach",
    iconColor: "text-amber-700",
  },
  {
    id: "reminder",
    icon: Bell,
    title: "Reminder",
    description: "Take your afternoon walk",
    bgClass: "bg-calm-blue",
    iconColor: "text-blue-700",
  },
  {
    id: "calm-moment",
    icon: Leaf,
    title: "Calm Moment",
    description: "5 minutes of gentle breathing",
    bgClass: "bg-sage-light",
    iconColor: "text-sage",
  },
];

const TodaysPlan = () => {
  return (
    <section aria-labelledby="plan-heading">
      <h2 id="plan-heading" className="text-2xl font-serif mb-6">
        Today's Plan
      </h2>
      
      <div className="space-y-4">
        {planItems.map((item) => (
          <button
            key={item.id}
            className={`w-full activity-card ${item.bgClass} flex items-center gap-5 text-left`}
            aria-label={`${item.title}: ${item.description}`}
          >
            <div className={`p-4 rounded-2xl bg-background/50 ${item.iconColor}`}>
              <item.icon size={32} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TodaysPlan;
