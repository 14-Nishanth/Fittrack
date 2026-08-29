'use client';

import { useMemo, useState } from 'react';

const foods = [
  {name:'Chicken Breast',serving:'100 g',calories:165,protein:31,carbs:0,fat:3.6,fiber:0,sugar:0,sodium:74,emoji:'🍗'},
  {name:'Egg',serving:'1 large',calories:72,protein:6.3,carbs:.4,fat:4.8,fiber:0,sugar:.2,sodium:71,emoji:'🥚'},
  {name:'Cooked White Rice',serving:'100 g',calories:130,protein:2.7,carbs:28,fat:.3,fiber:.4,sugar:.1,sodium:1,emoji:'🍚'},
  {name:'Sambar',serving:'1 cup (200 g)',calories:130,protein:6,carbs:20,fat:3,fiber:5,sugar:4,sodium:450,emoji:'🥣'},
  {name:'Rasam',serving:'1 cup (200 g)',calories:55,protein:2,carbs:8,fat:1.5,fiber:2,sugar:3,sodium:500,emoji:'🥣'},
  {name:'Paneer',serving:'100 g',calories:265,protein:18.3,carbs:6.1,fat:20.8,fiber:0,sugar:2.6,sodium:22,emoji:'🧀'},
  {name:'Dal, cooked',serving:'100 g',calories:116,protein:9,carbs:20,fat:.4,fiber:7.9,sugar:1.8,sodium:2,emoji:'🥣'},
  {name:'Rajma',serving:'100 g cooked',calories:127,protein:8.7,carbs:22.8,fat:.5,fiber:6.4,sugar:.3,sodium:2,emoji:'🫘'},
  {name:'Chole / Chickpeas',serving:'100 g cooked',calories:164,protein:8.9,carbs:27.4,fat:2.6,fiber:7.6,sugar:4.8,sodium:7,emoji:'🫘'},
  {name:'Moong Dal',serving:'100 g cooked',calories:105,protein:7,carbs:19.2,fat:.4,fiber:7.6,sugar:2,sodium:2,emoji:'🥣'},
  {name:'Idli',serving:'2 pieces',calories:116,protein:4,carbs:24,fat:.5,fiber:1.5,sugar:1,sodium:220,emoji:'⚪'},
  {name:'Dosa',serving:'1 medium',calories:168,protein:3.9,carbs:29,fat:4.3,fiber:1.5,sugar:1,sodium:240,emoji:'🥞'},
  {name:'Masala Dosa',serving:'1 medium',calories:250,protein:5,carbs:39,fat:8,fiber:3,sugar:2,sodium:420,emoji:'🥞'},
  {name:'Vada',serving:'1 piece',calories:140,protein:4,carbs:16,fat:7,fiber:2,sugar:1,sodium:180,emoji:'🍩'},
  {name:'Upma',serving:'1 cup',calories:220,protein:6,carbs:34,fat:7,fiber:3,sugar:3,sodium:350,emoji:'🥣'},
  {name:'Poha',serving:'1 cup',calories:180,protein:4,carbs:32,fat:4,fiber:2,sugar:2,sodium:280,emoji:'🍚'},
  {name:'Pongal',serving:'1 cup',calories:220,protein:6,carbs:34,fat:7,fiber:3,sugar:1,sodium:300,emoji:'🍚'},
  {name:'Curd Rice',serving:'1 cup',calories:210,protein:6,carbs:34,fat:5,fiber:.5,sugar:4,sodium:180,emoji:'🍚'},
  {name:'Chicken Biryani',serving:'1 cup',calories:330,protein:18,carbs:42,fat:11,fiber:2,sugar:2,sodium:650,emoji:'🍛'},
  {name:'Vegetable Biryani',serving:'1 cup',calories:250,protein:6,carbs:43,fat:6,fiber:4,sugar:4,sodium:500,emoji:'🍛'},
  {name:'Chapati / Roti',serving:'1 medium',calories:120,protein:3.5,carbs:18.5,fat:3.2,fiber:3,sugar:.5,sodium:120,emoji:'🫓'},
  {name:'Paratha',serving:'1 medium',calories:210,protein:5,carbs:30,fat:8,fiber:3,sugar:1,sodium:250,emoji:'🫓'},
  {name:'Aloo Paratha',serving:'1 medium',calories:250,protein:5,carbs:38,fat:8,fiber:4,sugar:2,sodium:300,emoji:'🫓'},
  {name:'Naan',serving:'1 piece',calories:260,protein:8,carbs:45,fat:5,fiber:2,sugar:3,sodium:430,emoji:'🫓'},
  {name:'Chicken Curry',serving:'1 cup',calories:280,protein:28,carbs:8,fat:15,fiber:2,sugar:4,sodium:600,emoji:'🍛'},
  {name:'Palak Paneer',serving:'1 cup',calories:300,protein:14,carbs:10,fat:23,fiber:4,sugar:3,sodium:500,emoji:'🥬'},
  {name:'Aloo Gobi',serving:'1 cup',calories:180,protein:4,carbs:22,fat:8,fiber:5,sugar:5,sodium:350,emoji:'🥔'},
  {name:'Bhindi Masala',serving:'1 cup',calories:160,protein:4,carbs:18,fat:8,fiber:6,sugar:5,sodium:300,emoji:'🥬'},
  {name:'Samosa',serving:'1 piece',calories:180,protein:4,carbs:22,fat:9,fiber:2,sugar:1,sodium:300,emoji:'🔺'},
  {name:'Pav Bhaji',serving:'1 plate',calories:400,protein:10,carbs:58,fat:14,fiber:8,sugar:8,sodium:850,emoji:'🍞'},
  {name:'Pani Puri',serving:'6 pieces',calories:180,protein:4,carbs:30,fat:5,fiber:3,sugar:4,sodium:600,emoji:'🟤'},
  {name:'Dhokla',serving:'100 g',calories:160,protein:8,carbs:24,fat:4,fiber:2,sugar:3,sodium:450,emoji:'🟨'},
  {name:'Misal Pav',serving:'1 plate',calories:450,protein:18,carbs:55,fat:18,fiber:10,sugar:7,sodium:900,emoji:'🍛'},
  {name:'Oats',serving:'100 g dry',calories:389,protein:16.9,carbs:66.3,fat:6.9,fiber:10.6,sugar:.9,sodium:2,emoji:'🥣'},
  {name:'Almonds',serving:'30 g',calories:174,protein:6.4,carbs:6.5,fat:15,fiber:3.7,sugar:1.3,sodium:0,emoji:'🌰'},
  {name:'Banana',serving:'100 g',calories:89,protein:1.1,carbs:23,fat:.3,fiber:2.6,sugar:12.2,sodium:1,emoji:'🍌'},
  {name:'Apple',serving:'100 g',calories:52,protein:.3,carbs:13.8,fat:.2,fiber:2.4,sugar:10.4,sodium:1,emoji:'🍎'},
  {name:'Greek Yogurt',serving:'100 g',calories:59,protein:10.2,carbs:3.6,fat:.4,fiber:0,sugar:3.2,sodium:36,emoji:'🥛'},
  {name:'Milk',serving:'250 ml',calories:150,protein:8,carbs:12,fat:8,fiber:0,sugar:12,sodium:105,emoji:'🥛'},
  {name:'Peanuts',serving:'30 g',calories:170,protein:7.3,carbs:4.8,fat:14.6,fiber:2.5,sugar:1.4,sodium:2,emoji:'🥜'},
] as const;

export default function FoodPage(){
 const [query,setQuery]=useState(''); const [meal,setMeal]=useState('Breakfast'); const [selected,setSelected]=useState<typeof foods>([]);
 const filtered=useMemo(()=>foods.filter(f=>f.name.toLowerCase().includes(query.toLowerCase())),[query]);
 const totals=selected.reduce((a,f)=>({calories:a.calories+f.calories,protein:a.protein+f.protein,carbs:a.carbs+f.carbs,fat:a.fat+f.fat}),{calories:0,protein:0,carbs:0,fat:0});
 return <main className="app"><header className="top"><div className="brand">Fit<span>Track</span></div><nav className="nav"><a className="pill" href="/">Today</a><a className="pill" href="/workout">Workout</a><span className="pill active-pill">Food</span><a className="pill" href="/profile">Profile</a></nav></header>
 <section className="hero"><h1>🍎 Food & Nutrition</h1><p>Indian foods and everyday foods with calories and nutrition.</p></section>
 <div className="food-toolbar"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search sambar, dosa, rice, paneer..."/><select value={meal} onChange={e=>setMeal(e.target.value)}><option>Breakfast</option><option>Lunch</option><option>Dinner</option><option>Snack</option></select></div>
 <div className="section">Food database · {filtered.length} foods</div><div className="food-list">{filtered.map(f=><article className="card nutrition" key={f.name}><div className="food-image"><span>{f.emoji}</span><img src={'https://source.unsplash.com/640x360/?'+encodeURIComponent(f.name+',food')} alt={f.name} loading="lazy" onError={e=>{e.currentTarget.style.display='none'}}/></div><div className="food-head"><div><strong>{f.name}</strong><small>{f.serving}</small></div><b>{f.calories} kcal</b></div><div className="nutrients"><span>Protein <b>{f.protein}g</b></span><span>Carbs <b>{f.carbs}g</b></span><span>Fat <b>{f.fat}g</b></span><span>Fiber <b>{f.fiber}g</b></span><span>Sugar <b>{f.sugar}g</b></span><span>Sodium <b>{f.sodium}mg</b></span></div><button onClick={()=>setSelected([...selected,f])}>+ Add to {meal}</button></article>)}</div>
 <section className="card daily"><h2>Today's added foods</h2><p>{selected.length} items · {totals.calories} kcal</p><div className="grid mini"><div><b>{totals.protein.toFixed(1)}g</b><small>Protein</small></div><div><b>{totals.carbs.toFixed(1)}g</b><small>Carbs</small></div><div><b>{totals.fat.toFixed(1)}g</b><small>Fat</small></div></div></section>
 <p className="note">Nutrition values are representative estimates; recipes, brands and portions can change the numbers.</p></main>
}