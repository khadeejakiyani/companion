import { LucideIcon } from "lucide-react";

interface Activity {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  bgClass: string;
  iconColor: string;
}

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  return (
    <button
      className={`activity-card ${activity.bgClass} flex flex-col items-center text-center p-8`}
      aria-label={`${activity.title}: ${activity.description}`}
    >
      <div className={`p-4 rounded-2xl bg-background/50 mb-4 ${activity.iconColor}`}>
        <activity.icon size={40} strokeWidth={1.5} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-medium mb-2">{activity.title}</h3>
      <p className="text-muted-foreground">{activity.description}</p>
    </button>
  );
};

export default ActivityCard;
