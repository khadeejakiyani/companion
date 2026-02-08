import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

type OnboardingStep = "auth" | "login" | "mood" | "home";

interface OnboardingContextType {
  step: OnboardingStep;
  userName: string;
  selectedMood: string | null;
  user: User | null;
  session: Session | null;
  setUserName: (name: string) => void;
  setSelectedMood: (mood: string | null) => void;
  completeLogin: () => void;
  completeMoodCheckIn: () => void;
  resetOnboarding: () => void;
  signOut: () => Promise<void>;
  isOnboardingComplete: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState<OnboardingStep>("auth");
  const [userName, setUserName] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // Auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // User authenticated - move to name step if on auth
        const savedStep = localStorage.getItem("companion_step") as OnboardingStep;
        const savedName = localStorage.getItem("companion_userName");
        const savedMood = localStorage.getItem("companion_todayMood");

        if (savedName) setUserName(savedName);
        if (savedMood) setSelectedMood(savedMood);

        if (savedStep === "home" && savedName) {
          setStep("home");
        } else if (savedStep === "mood" && savedName) {
          setStep("mood");
        } else {
          setStep("login");
        }
      } else {
        setStep("auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const savedStep = localStorage.getItem("companion_step") as OnboardingStep;
        const savedName = localStorage.getItem("companion_userName");
        const savedMood = localStorage.getItem("companion_todayMood");

        if (savedName) setUserName(savedName);
        if (savedMood) setSelectedMood(savedMood);

        if (savedStep === "home" && savedName) {
          setStep("home");
        } else if (savedStep === "mood" && savedName) {
          setStep("mood");
        } else {
          setStep("login");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const completeLogin = () => {
    localStorage.setItem("companion_userName", userName);
    localStorage.setItem("companion_step", "mood");

    // Save display name to profile
    if (user) {
      setTimeout(() => {
        supabase.from("profiles").update({ display_name: userName }).eq("user_id", user.id);
      }, 0);
    }

    setStep("mood");
  };

  const completeMoodCheckIn = () => {
    if (selectedMood) {
      localStorage.setItem("companion_todayMood", selectedMood);
    }
    localStorage.setItem("companion_step", "home");
    setStep("home");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    resetOnboarding();
  };

  const resetOnboarding = () => {
    localStorage.removeItem("companion_userName");
    localStorage.removeItem("companion_step");
    localStorage.removeItem("companion_todayMood");
    setUserName("");
    setSelectedMood(null);
    setStep("auth");
  };

  const isOnboardingComplete = step === "home";

  return (
    <OnboardingContext.Provider
      value={{
        step,
        userName,
        selectedMood,
        user,
        session,
        setUserName,
        setSelectedMood,
        completeLogin,
        completeMoodCheckIn,
        resetOnboarding,
        signOut,
        isOnboardingComplete,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};
