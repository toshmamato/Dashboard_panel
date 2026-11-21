import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import {
  BookOpen, GraduationCap, ClipboardList, FileCheck, Award,
  ChartNoAxesColumn, CalendarDays, Clock, Trophy,
  MessageSquare, Bell, UserRound, Settings
} from "lucide-react";

function ProtectedRoute() {
  const authenticated = localStorage.getItem("eduspace_logged_in") === "true";
  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

const pages = {
  courses: ["Mening kurslarim", "Barcha kurslaringiz va o‘quv progressingiz.", BookOpen],
  lessons: ["Darslar", "Barcha darslaringizni ko‘ring va o‘qishni davom ettiring.", GraduationCap],
  assignments: ["Vazifalar", "Bajarilishi kerak bo‘lgan vazifalar.", ClipboardList],
  submissions: ["Topshiriqlar", "Yuborilgan topshiriqlar va tekshirish holati.", FileCheck],
  exams: ["Imtihonlar", "Imtihonlar, testlar va natijalar.", Award],
  grades: ["Baholar", "Barcha fanlardan olgan baholaringiz.", ChartNoAxesColumn],
  attendance: ["Davomat", "Darslarga qatnashish statistikasi.", Clock],
  schedule: ["Dars jadvali", "Haftalik dars jadvalingiz.", CalendarDays],
  calendar: ["Kalendar", "O‘quv tadbirlari va muhim sanalar.", CalendarDays],
  achievements: ["Yutuqlar", "Siz qo‘lga kiritgan yutuqlar.", Trophy],
  messages: ["Xabarlar", "Ustozlar va guruhingiz bilan muloqot.", MessageSquare],
  notifications: ["Bildirishnomalar", "Yangiliklar va tizim bildirishnomalari.", Bell],
  profile: ["Profil", "Shaxsiy ma’lumotlaringiz.", UserRound],
  settings: ["Sozlamalar", "Platforma sozlamalari.", Settings],
};

function PlaceholderPage({ title, description, Icon }) {
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <span className="eyebrow">EDUSPACE / O‘QUV PORTALI</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <div className="placeholder-card">
        <div className="placeholder-icon"><Icon size={28}/></div>
        <h2>{title}</h2>
        <p>Ushbu bo‘lim funksiyalari keyingi ishlab chiqish bosqichida qo‘shiladi.</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthPage/>}/>
        <Route path="/register" element={<AuthPage register/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route element={<MainLayout/>}>
            <Route index element={<Dashboard/>}/>
            {Object.entries(pages).map(([path, [title, description, Icon]]) => (
              <Route
                key={path}
                path={path}
                element={<PlaceholderPage title={title} description={description} Icon={Icon}/>}
              />
            ))}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </BrowserRouter>
  );
}

