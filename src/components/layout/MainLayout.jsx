import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, GraduationCap, ClipboardList, Moon, Sun,
  FileCheck, Award, CalendarDays, Clock, ChartNoAxesColumn,
  MessageSquare, Bell, UserRound, Settings, ChevronLeft,
  ChevronRight, Search, Menu
} from "lucide-react";
import { useState } from "react";

const groups = [
  {
    title: "ASOSIY",
    items: [
      { label: "Dashboard", path: "/", icon: LayoutDashboard },
      { label: "Mening kurslarim", path: "/courses", icon: BookOpen },
      { label: "Darslar", path: "/lessons", icon: GraduationCap },
    ]
  },
  {
    title: "TA'LIM",
    items: [
      { label: "Vazifalar", path: "/assignments", icon: ClipboardList },
      { label: "Topshiriqlar", path: "/submissions", icon: FileCheck },
      { label: "Imtihonlar", path: "/exams", icon: Award },
      { label: "Baholar", path: "/grades", icon: ChartNoAxesColumn },
      { label: "Davomat", path: "/attendance", icon: Clock },
    ]
  },
  {
    title: "REJALASHTIRISH",
    items: [
      { label: "Dars jadvali", path: "/schedule", icon: CalendarDays },
      { label: "Kalendar", path: "/calendar", icon: CalendarDays },
    ]
  },
  {
    title: "BOSHQA",
    items: [
      { label: "Yutuqlar", path: "/achievements", icon: Award },
      { label: "Xabarlar", path: "/messages", icon: MessageSquare },
      { label: "Bildirishnomalar", path: "/notifications", icon: Bell },
      { label: "Profil", path: "/profile", icon: UserRound },
      { label: "Sozlamalar", path: "/settings", icon: Settings },
    ]
  }
];

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("eduspace_theme") === "dark");
  const toggleTheme = () => { const next = !dark; setDark(next); localStorage.setItem("eduspace_theme", next ? "dark" : "light"); };

  return (
    <div className={`app-shell ${dark ? "dark" : ""}`}>
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">E</div>
          {!collapsed && (
            <div className="brand-text">
              <strong>EduSpace</strong>
              <span>STUDENT PORTAL</span>
            </div>
          )}
        </div>

        <div className="sidebar-content">
          {groups.map((group) => (
            <div className="nav-group" key={group.title}>
              {!collapsed && <div className="nav-group-title">{group.title}</div>}
              {group.items.map(({ label, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                  title={collapsed ? label : undefined}
                >
                  <Icon size={19} strokeWidth={1.8} />
                  {!collapsed && <span>{label}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </div>

        {!collapsed && (
          <div className="sidebar-help">
            <div className="help-icon">✦</div>
            <strong>Yordam kerakmi?</strong>
            <p>Bizning yordam markazimiz sizga yordam beradi.</p>
            <button onClick={() => alert("Yordam markazi tez orada ishga tushadi!")}>Yordam olish ↗</button>
          </div>
        )}

        <button className="collapse-button" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && "Sidebarni yig‘ish"}
        </button>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <button className="mobile-menu-button" onClick={() => setMobileOpen(true)}>
            <Menu size={21} />
          </button>
          <div className="topbar-search">
            <Search size={18} />
            <input placeholder="Qidirish..." />
            <kbd>⌘ K</kbd>
          </div>

          <div className="topbar-right">
            <button className="icon-button theme-toggle" onClick={toggleTheme} title={dark ? "Light Mode" : "Dark Mode"}>{dark ? <Sun size={19}/> : <Moon size={19}/>}</button>
            <button className="icon-button notification-button" title="Bildirishnomalar">
              <Bell size={19} />
              <span className="notification-dot" />
            </button>
            <div className="topbar-divider" />
            <div className="user-mini">
              <div className="avatar">X</div>
              <div className="user-mini-info">
                <strong>Xondamir</strong>
                <span>O‘quvchi</span>
              </div>
            </div>
          </div>
        </header>

        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}



