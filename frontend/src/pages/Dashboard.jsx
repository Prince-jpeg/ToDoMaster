import React from 'react';
import { useNavigate } from 'react-router-dom';

const s = {
  page: { minHeight:'100vh', backgroundColor:'#faf7f2', fontFamily:"'Georgia', serif" },
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 40px', backgroundColor:'#fff', borderBottom:'1px solid #f0ebe3' },
  logo: { fontSize:'22px', fontWeight:'bold', color:'#d4694a' },
  avatar: { width:'40px', height:'40px', borderRadius:'50%', backgroundColor:'#d4694a', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', fontSize:'16px', cursor:'pointer' },
  content: { maxWidth:'860px', margin:'0 auto', padding:'40px 24px' },
  greeting: { fontSize:'30px', fontWeight:'bold', color:'#1a1a1a', marginBottom:'4px' },
  subtext: { color:'#999', fontSize:'14px', marginBottom:'32px' },
  statsRow: { display:'flex', gap:'20px', marginBottom:'40px' },
  statCard: { flex:1, backgroundColor:'#fff', borderRadius:'12px', padding:'24px', textAlign:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' },
  statNum: { fontSize:'36px', fontWeight:'bold', color:'#d4694a', display:'block' },
  statLabel: { fontSize:'13px', color:'#888', marginTop:'4px' },
  sectionHeader: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' },
  sectionTitle: { fontSize:'20px', fontWeight:'bold', color:'#1a1a1a' },
  addBtn: { backgroundColor:'#d4694a', color:'#fff', border:'none', borderRadius:'8px', padding:'10px 18px', fontSize:'13px', fontWeight:'600', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' },
  taskCard: { backgroundColor:'#fff', borderRadius:'12px', padding:'18px 20px', marginBottom:'12px', boxShadow:'0 2px 10px rgba(0,0,0,0.04)', display:'flex', alignItems:'center', gap:'14px' },
  taskCardDone: { backgroundColor:'#f0fdf4', borderRadius:'12px', padding:'18px 20px', marginBottom:'12px', boxShadow:'0 2px 10px rgba(0,0,0,0.04)', display:'flex', alignItems:'center', gap:'14px' },
  taskInfo: { flex:1 },
  taskTitle: { fontSize:'15px', fontWeight:'600', color:'#1a1a1a' },
  taskTitleDone: { fontSize:'15px', fontWeight:'600', color:'#888', textDecoration:'line-through' },
  taskDesc: { fontSize:'12px', color:'#aaa', marginTop:'2px' },
  taskDate: { fontSize:'12px', color:'#bbb', marginTop:'4px', display:'flex', alignItems:'center', gap:'4px' },
  checkbox: { width:'20px', height:'20px', accentColor:'#d4694a', cursor:'pointer', flexShrink:0 },
};

const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const CalIcon = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;

const TASKS = [
  { id:1, title:'Complete Math Assignment', desc:'Chapter 5 problems 1-20', date:'February 8', done:false },
  { id:2, title:'Study for Chemistry Quiz', desc:'', date:'February 5', done:true },
  { id:3, title:'Read History Chapter 12', desc:'', date:'February 10', done:false },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const firstName = user.fullName?.split(' ')[0] || user.email?.split('@')[0] || 'User';
  const initial = firstName[0]?.toUpperCase() || 'U';
  const total = TASKS.length, completed = TASKS.filter(t => t.done).length, pending = total - completed;

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <span style={s.logo}>ToDoMaster</span>
        <div style={s.avatar} onClick={() => navigate('/profile')} title="Go to Profile">{initial}</div>
      </nav>
      <div style={s.content}>
        <h1 style={s.greeting}>Welcome back, {firstName}!</h1>
        <p style={s.subtext}>Here's what you need to get done today</p>
        <div style={s.statsRow}>
          {[['Total Tasks', total], ['Completed', completed], ['Pending', pending]].map(([label, val]) => (
            <div key={label} style={s.statCard}>
              <span style={s.statNum}>{val}</span>
              <div style={s.statLabel}>{label}</div>
            </div>
          ))}
        </div>
        <div style={s.sectionHeader}>
          <span style={s.sectionTitle}>Your Tasks</span>
          <button style={s.addBtn}><PlusIcon /> Add New Task</button>
        </div>
        {TASKS.map(task => (
          <div key={task.id} style={task.done ? s.taskCardDone : s.taskCard}>
            <input type="checkbox" style={s.checkbox} defaultChecked={task.done} readOnly />
            <div style={s.taskInfo}>
              <div style={task.done ? s.taskTitleDone : s.taskTitle}>{task.title}</div>
              {task.desc && <div style={s.taskDesc}>{task.desc}</div>}
              <div style={s.taskDate}><CalIcon /> {task.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}