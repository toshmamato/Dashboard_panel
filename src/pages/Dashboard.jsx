import { useState } from "react";
import DashboardExtras from "../components/ui/DashboardExtras";
import {
  ArrowUpRight, ArrowRight, BookOpen, Clock3,
  CheckCircle2, Target, Flame, MoreHorizontal
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid
} from "recharts";

const activity = [
  { day: "Du", hours: 1.2 },
  { day: "Se", hours: 2.4 },
  { day: "Ch", hours: 1.8 },
  { day: "Pa", hours: 3.5 },
  { day: "Ju", hours: 2.7 },
  { day: "Sh", hours: 4.1 },
  { day: "Ya", hours: 1.6 },
];

const courses = [
  { name: "Frontend Development", teacher: "Web dasturlash", progress: 72, color: "#635bff", lessons: "18 / 25", image: "FE" },
  { name: "UI/UX Design", teacher: "Dizayn asoslari", progress: 45, color: "#16b8a6", lessons: "9 / 20", image: "UX" },
  { name: "JavaScript Advanced", teacher: "JavaScript", progress: 28, color: "#f0a43c", lessons: "7 / 24", image: "JS" },
];

const tasks = [
  { title: "React Hooks amaliyoti", course: "Frontend Development", date: "Bugun, 18:00", done: false },
  { title: "UI Design loyihasi", course: "UI/UX Design", date: "Ertaga, 12:00", done: false },
  { title: "JavaScript test", course: "JavaScript Advanced", date: "22-noyabr", done: true },
];

export default function Dashboard() {
  const [taskList, setTaskList] = useState(tasks);

  const toggleTask = (index) => {
    setTaskList(prev => prev.map((task, i) => i === index ? { ...task, done: !task.done } : task));
  };

  return (
    <div className="page-content dashboard">
      <div className="welcome-section">
        <div>
          <span className="eyebrow">SHAXSIY O‘QUV PANELI</span>
          <h1>Xush kelibsiz, Xondamir <span className="wave">👋</span></h1>
          <p>Bugun yangi bilim olish uchun ajoyib kun. O‘qishni davom ettiring!</p>
        </div>
        <div className="welcome-date">
          <Clock3 size={16} />
          <span>21-noyabr, 2026</span>
        </div>
      </div>

      <DashboardExtras />

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top"><span className="stat-icon purple"><BookOpen size={19}/></span><span className="stat-trend">+2 this week</span></div>
          <span className="stat-label">Faol kurslar</span><strong className="stat-value">4 <small>ta kurs</small></strong>
          <div className="stat-footer">O‘qishni davom ettiring <ArrowUpRight size={14}/></div>
        </div>
        <div className="stat-card">
          <div className="stat-top"><span className="stat-icon blue"><CheckCircle2 size={19}/></span><span className="stat-trend">+12% o‘sish</span></div>
          <span className="stat-label">Tugallangan darslar</span><strong className="stat-value">28 <small>/ 64</small></strong>
          <div className="stat-progress"><span style={{width:"44%"}}/></div>
        </div>
        <div className="stat-card">
          <div className="stat-top"><span className="stat-icon orange"><Flame size={19}/></span><span className="stat-trend">Faollik</span></div>
          <span className="stat-label">O‘qish ketma-ketligi</span><strong className="stat-value">7 <small>kun</small></strong>
          <div className="stat-footer">Streak davom etmoqda 🔥</div>
        </div>
        <div className="stat-card">
          <div className="stat-top"><span className="stat-icon green"><Target size={19}/></span><span className="stat-trend">Haftalik maqsad</span></div>
          <span className="stat-label">O‘qish vaqti</span><strong className="stat-value">16.5 <small>/ 20 soat</small></strong>
          <div className="stat-progress"><span style={{width:"82.5%"}}/></div>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="panel activity-panel">
          <div className="panel-header">
            <div><h2>O‘qish faolligi</h2><p>Haftalik o‘qish statistikasi</p></div>
            <button className="period-button">Bu hafta <MoreHorizontal size={17}/></button>
          </div>
          <div className="chart-summary"><strong>17.3 <small>soat</small></strong><span className="positive">↗ 18.4% <small>oldingi haftaga</small></span></div>
          <div className="activity-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activity} margin={{top:10,right:6,left:-25,bottom:0}}>
                <defs><linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#655bff" stopOpacity={0.22}/><stop offset="100%" stopColor="#655bff" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid stroke="#eef0f5" strokeDasharray="4 5" vertical={false}/>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:"#9096a5",fontSize:12}} dy={10}/>
                <Tooltip/>
                <Area type="monotone" dataKey="hours" stroke="#655bff" strokeWidth={3} fill="url(#activityFill)" activeDot={{r:5}}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel tasks-panel">
          <div className="panel-header">
            <div><h2>Bugungi vazifalar</h2><p>O‘quv rejangizni nazorat qiling</p></div>
            <button className="text-button">Barchasi <ArrowRight size={15}/></button>
          </div>
          <div className="task-list">
            {taskList.map((task, index) => (
              <div className={`task-item ${task.done ? "task-done" : ""}`} key={task.title}>
                <button className={`task-check ${task.done ? "checked" : ""}`} onClick={() => toggleTask(index)}>
                  {task.done && <CheckCircle2 size={17}/>}
                </button>
                <div className="task-content">
                  <strong>{task.title}</strong>
                  <span>{task.course}</span>
                </div>
                <div className="task-date">{task.date}</div>
              </div>
            ))}
          </div>
          <div className="task-bottom">{taskList.filter(t => t.done).length} / {taskList.length} vazifa bajarildi</div>
        </section>
      </div>

      <section className="panel courses-panel">
        <div className="panel-header">
          <div><h2>Mening kurslarim</h2><p>O‘qishni davom ettirayotgan kurslaringiz</p></div>
          <button className="text-button">Barcha kurslar <ArrowRight size={15}/></button>
        </div>
        <div className="course-grid">
          {courses.map(course => (
            <div className="course-card" key={course.name}>
              <div className="course-cover" style={{"--course-color":course.color}}>
                <span className="course-symbol">{course.image}</span>
                <button className="course-more"><MoreHorizontal size={18}/></button>
                <span className="course-category">{course.teacher}</span>
              </div>
              <div className="course-body">
                <h3>{course.name}</h3>
                <div className="course-progress-label"><span>Progress</span><strong>{course.progress}%</strong></div>
                <div className="course-progress"><span style={{width:`${course.progress}%`,background:course.color}}/></div>
                <div className="course-bottom"><span><BookOpen size={14}/> {course.lessons} dars</span><button>Davom etish <ArrowRight size={14}/></button></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="dashboard-bottom">
        <section className="panel mini-panel">
          <div className="panel-header"><div><h2>O‘quv maqsadi</h2><p>Bu haftadagi rejangiz</p></div></div>
          <div className="goal-content"><div className="goal-circle"><strong>82%</strong><span>yakunlandi</span></div><div><strong>16.5 / 20 soat</strong><p>Yana 3.5 soat o‘qisangiz, maqsadga yetasiz!</p></div></div>
        </section>
        <section className="panel mini-panel">
          <div className="panel-header"><div><h2>Oxirgi faollik</h2><p>So‘nggi o‘quv harakatlaringiz</p></div></div>
          <div className="activity-feed">
            <div className="feed-item"><span className="feed-dot purple-dot"/><div><strong>React darsi yakunlandi</strong><small>Frontend Development · 2 soat oldin</small></div></div>
            <div className="feed-item"><span className="feed-dot green-dot"/><div><strong>Vazifa topshirildi</strong><small>UI/UX Design · Kecha</small></div></div>
            <div className="feed-item"><span className="feed-dot orange-dot"/><div><strong>Yangi dars qo‘shildi</strong><small>JavaScript Advanced · 2 kun oldin</small></div></div>
          </div>
        </section>
      </div>
    </div>
  );
}



