import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye, EyeOff, GraduationCap, ArrowRight,
  Mail, Lock, User, Sparkles
} from "lucide-react";

export default function AuthPage({ register = false }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const update = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Email va parolni kiriting.");
      return;
    }

    if (register) {
      if (!form.firstName.trim() || !form.lastName.trim()) {
        setError("Ism va familiyangizni kiriting.");
        return;
      }

      if (form.password.length < 6) {
        setError("Parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Parollar bir-biriga mos kelmayapti.");
        return;
      }

      const users = JSON.parse(localStorage.getItem("eduspace_users") || "[]");
      const exists = users.some(user => user.email === form.email.toLowerCase());

      if (exists) {
        setError("Bu email bilan hisob allaqachon mavjud.");
        return;
      }

      const newUser = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.toLowerCase(),
        password: form.password,
      };

      localStorage.setItem("eduspace_users", JSON.stringify([...users, newUser]));
      localStorage.setItem("eduspace_user", JSON.stringify(newUser));
      localStorage.setItem("eduspace_logged_in", "true");
      navigate("/");
      return;
    }

    const users = JSON.parse(localStorage.getItem("eduspace_users") || "[]");
    const user = users.find(
      item => item.email === form.email.toLowerCase() && item.password === form.password
    );

    if (!user) {
      setError("Email yoki parol noto‘g‘ri.");
      return;
    }

    localStorage.setItem("eduspace_user", JSON.stringify(user));
    localStorage.setItem("eduspace_logged_in", "true");
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-background-glow glow-left"/>
      <div className="auth-background-glow glow-right"/>

      <div className="auth-brand">
        <div className="auth-logo"><GraduationCap size={23}/></div>
        <div><strong>EduSpace</strong><span>STUDENT PLATFORM</span></div>
      </div>

      <div className="auth-card">
        <div className="auth-card-top">
          <div className="auth-welcome-icon"><Sparkles size={22}/></div>
          <span className="auth-tag">YOUR FUTURE STARTS HERE</span>
        </div>

        <h1>{register ? "Hisob yarating" : "Xush kelibsiz!"}</h1>
        <p className="auth-description">
          {register
            ? "EduSpace platformasi bilan bilim va maqsadlaringiz sari qadam qo‘ying."
            : "O‘qishni davom ettirish uchun hisobingizga kiring."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {register && (
            <div className="auth-name-row">
              <div className="auth-field">
                <label>Ism</label>
                <div className="auth-input-wrap">
                  <User size={17}/>
                  <input value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="Ismingiz"/>
                </div>
              </div>
              <div className="auth-field">
                <label>Familiya</label>
                <div className="auth-input-wrap">
                  <User size={17}/>
                  <input value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Familiyangiz"/>
                </div>
              </div>
            </div>
          )}

          <div className="auth-field">
            <label>Email manzil</label>
            <div className="auth-input-wrap">
              <Mail size={17}/>
              <input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="name@example.com"/>
            </div>
          </div>

          <div className="auth-field">
            <label>Parol</label>
            <div className="auth-input-wrap">
              <Lock size={17}/>
              <input type={showPassword ? "text" : "password"} value={form.password} onChange={e => update("password", e.target.value)} placeholder="Parolingiz" />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}
              </button>
            </div>
          </div>

          {register && (
            <div className="auth-field">
              <label>Parolni tasdiqlash</label>
              <div className="auth-input-wrap">
                <Lock size={17}/>
                <input type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} placeholder="Parolni qayta kiriting"/>
                <button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <EyeOff size={17}/> : <Eye size={17}/>}
                </button>
              </div>
            </div>
          )}

          {!register && (
            <div className="auth-form-extra">
              <label className="remember-label"><input type="checkbox"/> Meni eslab qol</label>
              <button type="button" className="forgot-button" onClick={() => alert("Parolni tiklash backend ulangandan keyin ishga tushadi.")}>Parolni unutdingiz?</button>
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {register ? "Hisob yaratish" : "Tizimga kirish"}
            <ArrowRight size={17}/>
          </button>
        </form>

        <div className="auth-divider"><span>YOKI</span></div>

        <button className="auth-demo-button" type="button" onClick={() => alert("Google login keyingi backend bosqichida ulanadi.")}>
          <span className="google-mark">G</span>
          Google orqali davom etish
        </button>

        <div className="auth-switch">
          {register ? "Hisobingiz bormi?" : "Hisobingiz yo‘qmi?"}
          <Link to={register ? "/login" : "/register"}>
            {register ? "Kirish" : "Ro‘yxatdan o‘tish"}
          </Link>
        </div>
      </div>

      <div className="auth-footer">© 2026 EduSpace · Learn without limits.</div>
    </div>
  );
}
