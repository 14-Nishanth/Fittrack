'use client';

import { useEffect, useMemo, useState } from 'react';

const exercises=['Barbell Bench Press','Incline Dumbbell Press','Cable Chest Fly','Dumbbell Shoulder Press','Lateral Raise','Triceps Pushdown'];

type Log={exercise:string;set:number;reps:number;weight:number};

export default function Session(){
 const [exercise,setExercise]=useState(exercises[0]); const [weight,setWeight]=useState(20); const [reps,setReps]=useState(10); const [logs,setLogs]=useState<Log[]>([]); const [seconds,setSeconds]=useState(60); const [running,setRunning]=useState(false);
 useEffect(()=>{if(!running)return; const id=setInterval(()=>setSeconds(s=>{if(s<=1){setRunning(false);return 0}return s-1}),1000); return()=>clearInterval(id)},[running]);
 const nextSet=useMemo(()=>logs.filter(x=>x.exercise===exercise).length+1,[logs,exercise]);
 function addSet(){setLogs([...logs,{exercise,set:nextSet,reps,weight}]);setSeconds(60);setRunning(true)}
 return <main className="app"><header className="top"><div className="brand">Fit<span>Track</span></div><nav className="nav"><a className="pill" href="/">Today</a><a className="pill active-pill" href="/workout">Workout</a><a className="pill" href="/food">Food</a></nav></header>
 <section className="hero"><h1>🏋️ Push Day</h1><p>Log every set and track your training session.</p></section>
 <section className="card"><label className="field">Exercise<select value={exercise} onChange={e=>setExercise(e.target.value)}>{exercises.map(x=><option key={x}>{x}</option>)}</select></label><div className="log-grid"><label className="field">Weight (kg)<input type="number" value={weight} min="0" onChange={e=>setWeight(Number(e.target.value))}/></label><label className="field">Reps<input type="number" value={reps} min="1" onChange={e=>setReps(Number(e.target.value))}/></label></div><button className="primary" onClick={addSet}>+ Log Set {nextSet}</button></section>
 <section className="card timer"><div><div className="label">Rest timer</div><div className="timer-value">{String(Math.floor(seconds/60)).padStart(2,'0')}:{String(seconds%60).padStart(2,'0')}</div></div><button onClick={()=>{setSeconds(60);setRunning(true)}}>{running?'Reset':'Start'} 60s</button></section>
 <div className="section">Session history</div><div className="exercise-list">{logs.length===0?<div className="card">No sets logged yet. Add your first set above.</div>:logs.map((x,i)=><div className="exercise-row" key={i}><div className="exercise-thumb">💪</div><div className="exercise-info"><strong>{x.exercise}</strong><small>Set {x.set} · {x.reps} reps · {x.weight} kg</small></div><span className="sets">Done ✓</span></div>)}</div>
 </main>
}
