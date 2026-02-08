import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

type AuthMode = "signin" | "signup" | "forgot";

const AuthPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      toast({ title: emailResult.error.errors[0].message, variant: "destructive" });
      return false;
    }
    if (mode !== "forgot") {
      const pwResult = passwordSchema.safeParse(password);
      if (!pwResult.success) {
        toast({ title: pwResult.error.errors[0].message, variant: "destructive" });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (error.message.includes("Invalid login")) {
            toast({ title: t("auth.invalidCredentials"), variant: "destructive" });
          } else if (error.message.includes("Email not confirmed")) {
            toast({ title: t("auth.emailNotConfirmed"), variant: "destructive" });
          } else {
            toast({ title: error.message, variant: "destructive" });
          }
        }
      } else if (mode === "signup") {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl },
        });
        if (error) {
          if (error.message.includes("already registered")) {
            toast({ title: t("auth.alreadyRegistered"), variant: "destructive" });
          } else {
            toast({ title: error.message, variant: "destructive" });
          }
        } else {
          toast({ title: t("auth.checkEmail") });
          setMode("signin");
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/`,
        });
        if (error) {
          toast({ title: error.message, variant: "destructive" });
        } else {
          toast({ title: t("auth.resetSent") });
          setMode("signin");
        }
      }
    } catch {
      toast({ title: "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="container max-w-2xl mx-auto px-4 py-4 flex justify-end">
        <LanguageSwitcher />
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <span className="text-8xl" role="img" aria-label="Welcome">🌸</span>
          </div>

          <h1 className="text-3xl font-serif mb-2">{t("auth.title")}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {mode === "signin" && t("auth.signinSubtitle")}
            {mode === "signup" && t("auth.signupSubtitle")}
            {mode === "forgot" && t("auth.forgotSubtitle")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              className="text-xl h-16 text-center rounded-2xl"
              autoComplete="email"
              autoFocus
            />

            {mode !== "forgot" && (
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("auth.passwordPlaceholder")}
                className="text-xl h-16 text-center rounded-2xl"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full h-16 text-xl rounded-2xl"
              disabled={loading}
            >
              {loading ? "..." : (
                mode === "signin" ? t("auth.signIn") :
                mode === "signup" ? t("auth.signUp") :
                t("auth.resetPassword")
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-3">
            {mode === "signin" && (
              <>
                <button
                  onClick={() => setMode("forgot")}
                  className="block mx-auto text-muted-foreground hover:text-foreground transition-colors min-h-0 min-w-0 text-base"
                >
                  {t("auth.forgotLink")}
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className="block mx-auto text-primary hover:text-primary/80 transition-colors min-h-0 min-w-0 text-base font-medium"
                >
                  {t("auth.signupLink")}
                </button>
              </>
            )}
            {(mode === "signup" || mode === "forgot") && (
              <button
                onClick={() => setMode("signin")}
                className="block mx-auto text-primary hover:text-primary/80 transition-colors min-h-0 min-w-0 text-base font-medium"
              >
                {t("auth.signinLink")}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
