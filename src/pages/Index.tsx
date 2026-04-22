import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Crown, Clock, BookOpen, Dumbbell, Phone, Video, Film, Trophy, Moon, Send } from "lucide-react";

const WEBHOOK_URL = "https://appointfunnels11.app.n8n.cloud/webhook/appointfunnels.com";

const fields: { key: string; label: string; icon: typeof Clock; placeholder: string }[] = [
  { key: "hoursWorked", label: "Hours Worked", icon: Clock, placeholder: "e.g. 10 hrs" },
  { key: "pagesRead", label: "Pages Read", icon: BookOpen, placeholder: "e.g. 25 pages" },
  { key: "pushups", label: "Pushups", icon: Dumbbell, placeholder: "e.g. 100 reps" },
  { key: "coldCalls", label: "Cold Calls Done Today", icon: Phone, placeholder: "e.g. 50 calls" },
  { key: "longFormShoots", label: "Long Form Content Shoots", icon: Video, placeholder: "e.g. 1 video" },
  { key: "shortFormShoots", label: "Short Form Content Shoots", icon: Film, placeholder: "e.g. 5 reels" },
  { key: "sleepHours", label: "Sleep (hours)", icon: Moon, placeholder: "e.g. 7.5 hrs" },
];

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({
    hoursWorked: "", pagesRead: "", pushups: "", coldCalls: "",
    longFormShoots: "", shortFormShoots: "", sleepHours: "", milestones: "",
  });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        date: new Date().toISOString(),
        source: "Appoint Funnels CEO Tracker",
      };
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify(payload),
      });
      toast({ title: "Logged ✓", description: "Your daily metrics have been sent." });
      setForm({
        hoursWorked: "", pagesRead: "", pushups: "", coldCalls: "",
        longFormShoots: "", shortFormShoots: "", sleepHours: "", milestones: "",
      });
    } catch {
      toast({ title: "Send failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        {/* Hero */}
        <header className="text-center mb-14 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-card/50 backdrop-blur-sm mb-6">
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Daily Discipline Tracker</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-4">
            The{" "}
            <span className="bg-gradient-gold bg-clip-text text-transparent">Appoint Funnels</span>
            <br />
            CEO
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            What gets measured, gets mastered. Log today's metrics and compound your edge.
          </p>
        </header>

        {/* Form Card */}
        <form
          onSubmit={onSubmit}
          className="bg-gradient-card border border-border rounded-2xl p-6 md:p-10 shadow-elegant animate-fade-up"
          style={{ animationDelay: "0.15s", opacity: 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map(({ key, label, icon: Icon, placeholder }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="flex items-center gap-2 text-sm font-medium text-foreground/90">
                  <Icon className="w-4 h-4 text-gold" />
                  {label}
                </Label>
                <Input
                  id={key}
                  type="text"
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                  required
                  maxLength={200}
                  className="bg-input/60 border-border focus-visible:ring-gold focus-visible:border-gold h-11"
                />
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="milestones" className="flex items-center gap-2 text-sm font-medium text-foreground/90">
              <Trophy className="w-4 h-4 text-gold" />
              Milestones
            </Label>
            <Textarea
              id="milestones"
              placeholder="What did you ship, win, or break through today?"
              value={form.milestones}
              onChange={(e) => update("milestones", e.target.value)}
              required
              rows={4}
              maxLength={1000}
              className="bg-input/60 border-border focus-visible:ring-gold focus-visible:border-gold resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-8 h-12 text-base font-semibold bg-gradient-gold text-primary-foreground hover:opacity-90 shadow-gold hover:shadow-gold transition-smooth border-0"
          >
            <Send className="w-4 h-4 mr-2" />
            {loading ? "Sending..." : "Log Today's Metrics"}
          </Button>
        </form>

        <footer className="text-center mt-12 text-sm text-muted-foreground">
          <p>Built for the relentless. — Appoint Funnels</p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
