import { Coffee, Users } from "lucide-react";

const TeaTimeButton = () => {
  return (
    <section className="mb-10">
      <button
        className="w-full p-6 rounded-3xl bg-gradient-to-r from-soft-peach to-rose-light flex items-center gap-5 shadow-gentle hover:shadow-gentle-lg transition-shadow"
        aria-label="Start Tea Time group call with your circle"
      >
        <div className="p-4 rounded-2xl bg-background/60">
          <Coffee size={36} className="text-amber-700" aria-hidden="true" />
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-2xl font-serif">Tea Time</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            <Users size={18} aria-hidden="true" />
            <span>Join your circle for a chat</span>
          </p>
        </div>
        <div className="text-lg font-medium text-muted-foreground">
          3:00 PM
        </div>
      </button>
    </section>
  );
};

export default TeaTimeButton;
