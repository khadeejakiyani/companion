import { Mic, Headphones } from "lucide-react";

interface Person {
  id: string;
  name: string;
  status: "available" | "resting";
  avatar: string;
  relationship: string;
}

interface PersonCardProps {
  person: Person;
}

const PersonCard = ({ person }: PersonCardProps) => {
  const isAvailable = person.status === "available";

  return (
    <article className="person-card">
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-sage-light flex items-center justify-center text-4xl">
          {person.avatar}
        </div>
        
        {/* Info */}
        <div className="flex-1">
          <h3 className="text-xl font-medium">{person.name}</h3>
          <p className="text-muted-foreground">{person.relationship}</p>
          <div className="flex items-center gap-2 mt-1">
            <span 
              className={`w-3 h-3 rounded-full ${
                isAvailable ? 'bg-sage' : 'bg-muted'
              }`}
              aria-hidden="true"
            />
            <span className="text-sm">
              {isAvailable ? "Available" : "Resting"}
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-primary text-primary-foreground font-medium"
          aria-label={`Send voice message to ${person.name}`}
        >
          <Mic size={24} aria-hidden="true" />
          <span>Send Voice Message</span>
        </button>
        
        <button
          className="flex items-center justify-center p-4 rounded-2xl bg-secondary text-secondary-foreground"
          aria-label={`Listen to messages from ${person.name}`}
        >
          <Headphones size={24} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

export default PersonCard;
