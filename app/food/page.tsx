'use client';

import { useMemo, useState } from 'react';

const foods = [
  {name:'Chicken Breast',serving:'100 g',calories:165,protein:31,carbs:0,fat:3.6,fiber:0,sugar:0,sodium:74},
  {name:'Egg',serving:'1 large',calories:72,protein:6.3,carbs:0.4,fat:4.8,fiber:0,sugar:0.2,sodium:71},
  {name:'Cooked White Rice',serving:'100 g',calories:130,protein:2.7,carbs:28,fat:0.3,fiber:0.4,sugar:0.1,sodium:1},
  {name:'Banana',serving:'100 g',calories:89,protein:1.1,carbs:23,fat:0.3,fiber:2.6,sugar:12.2,sodium:1},
  {name:'Paneer',serving:'100 g',calories:265,protein:18.3,carbs:6.1,fat:20.8,fiber:0,sugar:2.6,sodium:22},
  {name:'Dal, cooked',serving:'100 g',calories:116,protein:9,carbs:20,fat:0.4,fiber:7.9,sugar:1.8,sodium:2},
  {name:'Oats, dry',serving:'100 g',calories:389,protein:16.9,carbs:66.3,fat:6.9,fiber:10.6,sugar:0.9,sodium:2},
  {name:'Almonds',serving:'30 g',calories:174,protein:6.4,carbs:6.5,fat:15,fiber:3.7,sugar:1.3,sodium:0},
  {name:'Greek Yogurt',serving:'100 g',calories:59,protein:10.2,carbs:3.6,fat:0.4,fiber:0,sugar:3.2,sodium:36},
  {name:'Apple',serving:'100 g',calories:52,protein:0.3,carbs:13.8,fat:0.2,fiber:2.4,sugar:10.4,sodium:1},
];

export default function FoodPage(){
  const [query,setQuery]=useState('');
  const [meal,setMeal]=useState('Breakfast');
  const [selected,setSelected]=useState<typeof foods>([]);
  const filtered=useMemo(()=>foods.filter(f=>f.name.toLowerCase().includes(query.toLowerCase())),[query]);
  const totals=selected.reduce((a,f)=>({calories:a.calories+f.calories,protein:a.protein+f.protein,carbs:a.carbs+f.carbs,fat:a.fat+f.fat}),{calories:0,protein:0,carbs:0,fat:0});
  return <main className="app"><header className="top"><div className="brand">Fit<span>Track</span></div><nav className="nav"><a className="pill" href="/">Today</a><a className="pill" href="/workout">Workout</a></nav></header>
    <section className="hero"><h1>🍎 Food & Nutrition</h1><p>Search foods, check nutrients and build your daily meals.</p></section>
    <div className="food-toolbar"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search chicken, rice, paneer..."/><select value={meal} onChange={e=>setMeal(e.target.value)}><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option></select></div>
    <div className="section">Food database</div>
    <div className="food-list">{filtered.map(f=><article className="card nutrition" key={f.name}><div className="food-head"><div><strong>{f.name}</strong><small>{f.serving}</small></div><b>{f.calories} kcal</b></div><div className="nutrients"><span>Protein <b>{f.protein}g</b></span><span>Carbs <b>{f.carbs}g</b></span><span>Fat <b>{f.fat}g</b></span><span>Fiber <b>{f.fiber}g</b></span><span>Sugar <b>{f.sugar}g</b></span><span>Sodium <b>{f.sodium}mg</b></span></div><button onClick={()=>setSelected([...selected,f])}>+ Add to {meal}</button></article>)}</div>
    <section className="card daily"><h2>Today's added foods</h2><p>{selected.length} items · {totals.calories} kcal</p><div className="grid mini"><div><b>{totals.protein.toFixed(1)}g</b><small>Protein</small></div><div><b>{totals.carbs.toFixed(1)}g</b><small>Carbs</small></div><div><b>{totals.fat.toFixed(1)}g</b><small>Fat</small></div></div></section>
    <p className="note">Nutrition values are representative estimates and can vary by brand, recipe and preparation method.</p>
  </main>
}
