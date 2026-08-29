'use client';

import { useMemo, useState } from 'react';

export default function ProfilePage(){
  const [age,setAge]=useState(25); const [weight,setWeight]=useState(70); const [height,setHeight]=useState(170);
  const [gender,setGender]=useState('male'); const [activity,setActivity]=useState(1.55); const [goal,setGoal]=useState('maintain');
  const result=useMemo(()=>{
    const bmr=gender==='male' ? 10*weight+6.25*height-5*age+5 : 10*weight+6.25*height-5*age-161;
    const maintenance=Math.round(bmr*Number(activity));
    const calories=goal==='lose'?maintenance-400:goal==='gain'?maintenance+300:maintenance;
    const protein=Math.round(weight*(goal==='gain'?1.8:1.6));
    return {bmr:Math.round(bmr),maintenance,calories,protein};
  },[age,weight,height,gender,activity,goal]);
  return <main className="app"><header className="top"><div className="brand">Fit<span>Track</span></div><nav className="nav"><a className="pill" href="/">Today</a><a className="pill" href="/workout">Workout</a><a className="pill" href="/food">Food</a><span className="pill active-pill">Profile</span></nav></header>
    <section className="hero"><h1>🎯 Your Goals</h1><p>Enter your details to estimate daily calories and protein.</p></section>
    <section className="card form-card"><div className="form-grid"><label>Age<input type="number" min="13" value={age} onChange={e=>setAge(Number(e.target.value))}/></label><label>Weight (kg)<input type="number" min="30" value={weight} onChange={e=>setWeight(Number(e.target.value))}/></label><label>Height (cm)<input type="number" min="100" value={height} onChange={e=>setHeight(Number(e.target.value))}/></label><label>Gender<select value={gender} onChange={e=>setGender(e.target.value)}><option value="male">Male</option><option value="female">Female</option></select></label><label>Activity<select value={activity} onChange={e=>setActivity(Number(e.target.value))}><option value="1.2">Sedentary</option><option value="1.375">Lightly active</option><option value="1.55">Moderately active</option><option value="1.725">Very active</option><option value="1.9">Extra active</option></select></label><label>Goal<select value={goal} onChange={e=>setGoal(e.target.value)}><option value="lose">Lose weight</option><option value="maintain">Maintain weight</option><option value="gain">Gain muscle/weight</option></select></label></div></section>
    <div className="section">Your targets</div><div className="grid"><div className="card"><div className="label">Daily calories</div><div className="value green">{result.calories}</div><small>kcal / day</small></div><div className="card"><div className="label">Protein target</div><div className="value">{result.protein}g</div><small>per day</small></div><div className="card"><div className="label">Maintenance</div><div className="value">{result.maintenance}</div><small>estimated kcal</small></div><div className="card"><div className="label">BMR</div><div className="value">{result.bmr}</div><small>estimated kcal</small></div></div>
    <p className="note">This is an estimate for general fitness planning, not medical advice. Individual calorie needs can differ.</p>
  </main>
}