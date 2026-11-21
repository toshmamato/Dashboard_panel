import { useState } from "react";
import { Zap, Target, BookOpen, Timer, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

export default function DashboardExtras() {
  const [completed, setCompleted] = useState([false, false, false]);
  const missions = [
    { title: "Bitta darsni tugatish", xp: 50, icon: BookOpen },
    { title: "20 daqiqa o‘qish", xp: 30, icon: Timer },
    { title: "Vazifani bajarish", xp: 100, icon: Target },
  ];

  const earnedXP = missions.reduce(
    (total, mission, index) => total + (completed[index] ? mission.xp : 0),
    0
  );

  return (
    <section className="extras-section">
      <div className="premium-banner">
        <div className="banner-glow banner-glow-one" />
        <div className="banner-glow banner-glow-two" />

        <div className="banner-content">
          <div className="banner-label">
            <Sparkles size={14} /> YOUR LEARNING JOURNEY
          </div>
          <h2>Har kuni o‘zingizning<br />eng yaxshi versiyangiz bo‘ling.</h2>
          <p>Bugun ham bilimlaringizni oshiring va yangi marralarni zabt eting.</p>

          <div className="banner-actions">
            <button className="banner-button" onClick={() => document.getElementById("daily-missions")?.scrollIntoView({ behavior: "smooth" })}>
              Kunlik maqsadlar <ArrowRight size={16}/>
            </button>
            <span className="banner-xp"><Zap size={16}/> +{earnedXP} XP bugun</span>
          </div>
        </div>

        <div className="banner-art">
          <div className="banner-orbit orbit-one"/>
          <div className="banner-orbit orbit-two"/>
          <div className="banner-core">
            <div className="banner-core-inner">
              <Sparkles size={37}/>
            </div>
          </div>
          <div className="floating-xp xp-one"><Zap size={14}/> XP</div>
          <div className="floating-xp xp-two">✦ LEVEL UP</div>
          <div className="floating-xp xp-three">✧</div>
        </div>
      </div>

      <div className="mission-card" id="daily-missions">
        <div className="mission-header">
          <div>
            <span className="mission-eyebrow">BUGUNGI CHALLENGE</span>
            <h3>Daily Missions <span>✦</span></h3>
            <p>Bugungi kichik maqsadlar, katta natijalar.</p>
          </div>
          <div className="mission-reward">
            <Zap size={17}/>
            <strong>+180 XP</strong>
          </div>
        </div>

        <div className="mission-progress-info">
          <span>{completed.filter(Boolean).length} / 3 maqsad bajarildi</span>
          <strong>{Math.round(completed.filter(Boolean).length / 3 * 100)}%</strong>
        </div>
        <div className="mission-progress-bar">
          <span style={{ width: `${completed.filter(Boolean).length / 3 * 100}%` }}/>
        </div>

        <div className="mission-list">
          {missions.map((mission, index) => {
            const Icon = mission.icon;
            return (
              <button
                key={mission.title}
                className={`mission-item ${completed[index] ? "mission-completed" : ""}`}
                onClick={() => setCompleted(prev => prev.map((value, i) => i === index ? !value : value))}
              >
                <div className="mission-icon"><Icon size={18}/></div>
                <div className="mission-text">
                  <strong>{mission.title}</strong>
                  <span>{completed[index] ? "Bajarildi! Ajoyib 🎉" : "Kunlik maqsad"}</span>
                </div>
                <div className="mission-xp">+{mission.xp} XP</div>
                <div className={`mission-check ${completed[index] ? "checked" : ""}`}>
                  {completed[index] && <CheckCircle2 size={16}/>}
                </div>
              </button>
            );
          })}
        </div>

        {completed.every(Boolean) && (
          <div className="mission-complete-message">
            <Sparkles size={17}/> Barcha kunlik maqsadlar bajarildi! +180 XP
          </div>
        )}
      </div>
    </section>
  );
}
