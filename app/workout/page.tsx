const plans = [
  { name: 'Push Day', focus: 'Chest · Shoulders · Triceps', icon: '🔥', exercises: ['Barbell Bench Press','Incline Dumbbell Press','Cable Chest Fly','Dumbbell Shoulder Press','Lateral Raise','Triceps Pushdown'] },
  { name: 'Pull Day', focus: 'Back · Biceps', icon: '💪', exercises: ['Lat Pulldown','Seated Cable Row','One-Arm Dumbbell Row','Face Pull','Barbell Curl','Hammer Curl'] },
  { name: 'Leg Day', focus: 'Quads · Hamstrings · Glutes · Calves', icon: '🦵', exercises: ['Barbell Back Squat','Leg Press','Romanian Deadlift','Leg Curl','Hip Thrust','Standing Calf Raise'] },
  { name: 'Full Body', focus: 'Complete body workout', icon: '🏋️', exercises: ['Goblet Squat','Dumbbell Bench Press','Lat Pulldown','Dumbbell Shoulder Press','Romanian Deadlift','Plank'] },
];

const categories = ['All','Chest','Back','Shoulders','Biceps','Triceps','Legs','Abs','Cardio'];

export default function WorkoutPage() {
  return <main className="app">
    <header className="top"><div className="brand">Fit<span>Track</span></div><div className="nav"><a className="pill" href="/">Today</a><span className="pill active-pill">Workout</span><span className="pill">Profile</span></div></header>
    <section className="hero"><h1>Workout Library 🏋️</h1><p>Choose a plan or explore exercises by muscle group.</p></section>
    <div className="section">Workout plans</div>
    <div className="plan-grid">{plans.map(plan => <a className="plan-card" href={'#'+plan.name.replaceAll(' ','-').toLowerCase()} key={plan.name}><div className="exercise-art">{plan.icon}</div><div className="plan-body"><h2>{plan.name}</h2><p>{plan.focus}</p><span>{plan.exercises.length} exercises →</span></div></a>)}</div>
    <div className="section">Exercise library</div>
    <div className="chips">{categories.map(category => <button className="chip" key={category}>{category}</button>)}</div>
    <div className="exercise-list">{plans.flatMap(plan => plan.exercises.slice(0,3).map((name,i) => ({name,focus:plan.focus,icon:['🏋️','💪','🔥'][i%3]}))).map((exercise,i) => <div className="exercise-row" key={exercise.name}><div className="exercise-thumb">{exercise.icon}</div><div className="exercise-info"><strong>{exercise.name}</strong><small>{exercise.focus}</small></div><span className="sets">3 × 10–12</span></div>)}</div>
  </main>
}
