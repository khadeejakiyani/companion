import { Mic, Plus } from "lucide-react";

const RecordStoryButton = () => {
  return (
    <section className="mb-10">
      <button
        className="w-full p-6 rounded-3xl bg-gradient-to-r from-rose-light to-soft-peach flex items-center gap-5 shadow-gentle hover:shadow-gentle-lg transition-shadow"
        aria-label="Record a new story"
      >
        <div className="p-4 rounded-full bg-primary text-primary-foreground">
          <Mic size={32} aria-hidden="true" />
        </div>
        <div className="flex-1 text-left">
          <h2 className="text-2xl font-serif">Record a New Story</h2>
          <p className="text-muted-foreground">
            Share a memory, recipe, or piece of advice
          </p>
        </div>
        <Plus size={28} className="text-muted-foreground" aria-hidden="true" />
      </button>
    </section>
  );
};

export default RecordStoryButton;
