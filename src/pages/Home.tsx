import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useAppState } from '@/hooks/useAppState';
import { DAYS, DayType } from '@/data/days';
import { MEALS } from '@/data/meals';
import { TECHNIQUE } from '@/data/technique';
import { PEAK_STEPS } from '@/data/peak';

type Tab = 'schedule' | 'meals' | 'technique' | 'peak';

const getColorForType = (type: DayType) => {
  switch (type) {
    case 'heavy': return '#C8F53E';
    case 'pump': return '#7DF5C8';
    case 'rest': return '#8A8780';
    case 'peak': return '#F5A623';
    default: return '#F0EDE6';
  }
};

export default function Home() {
  const { state, toggleExercise, toggleMeal, toggleDayComplete, setActiveDay } = useAppState();
  const [activeTab, setActiveTab] = useState<Tab>('schedule');

  const progress = Math.round((state.completedDays.length / 8) * 100);

  const handleCompleteDay = (dayNum: number) => {
    const isNowComplete = !state.completedDays.includes(dayNum);
    toggleDayComplete(dayNum);
    
    if (isNowComplete) {
      if (state.completedDays.length + 1 === 8) {
        toast.success('8-Day plan complete. Measure now!');
      } else {
        toast.success(`Day ${dayNum} complete — rest up!`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Header */}
      <header className="pt-6 pb-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="font-mono text-sm tracking-wider text-muted-foreground flex items-center gap-2">
              ARM<span style={{ color: '#C8F53E' }}>{`->`}</span>PLAN <span className="opacity-50">/ 8 DAYS</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground text-right">
              {state.completedDays.length}/8 DONE <br/>
              <span className="opacity-50">12" STARTING SIZE</span>
            </div>
          </div>

          <h1 className="font-sans font-extrabold text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em] mb-2 uppercase">
            8-DAY <br/>
            <span style={{ color: '#C8F53E' }}>ARM</span> PLAN
          </h1>
          <p className="font-mono text-sm text-muted-foreground mb-8 max-w-lg">
            10kg dumbbells · 150g protein · 2x daily sessions · May 5–12 · Goal: 12.5-13" unflexed on Day 8
          </p>

          {/* Progress */}
          <div className="bg-card border border-white/10 rounded-xl p-4 mb-6">
            <div className="flex justify-between text-xs font-mono mb-3">
              <span className="text-muted-foreground uppercase">Overall progress</span>
              <span style={{ color: '#C8F53E' }}>{progress}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full mb-4 overflow-hidden">
              <motion.div 
                className="h-full rounded-full" 
                style={{ backgroundColor: '#C8F53E' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 1 }}
              />
            </div>
            <div className="flex justify-between gap-1">
              {[1,2,3,4,5,6,7,8].map(d => {
                const completed = state.completedDays.includes(d);
                return (
                  <button
                    key={d}
                    data-testid={`btn-day-dot-${d}`}
                    onClick={() => setActiveDay(d)}
                    className={`flex-1 h-8 rounded text-xs font-mono font-medium transition-colors border
                      ${state.activeDay === d ? 'border-primary/50' : 'border-transparent'}
                      ${completed ? 'bg-primary/20 text-primary' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                  >
                    {d}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'schedule', label: 'Schedule' },
              { id: 'meals', label: 'Meals' },
              { id: 'technique', label: 'Technique' },
              { id: 'peak', label: 'Day 8 Peak' }
            ].map(t => (
              <button
                key={t.id}
                data-testid={`tab-${t.id}`}
                onClick={() => setActiveTab(t.id as Tab)}
                className={`px-4 py-2 rounded-lg text-sm font-sans font-medium whitespace-nowrap transition-colors
                  ${activeTab === t.id 
                    ? 'bg-white text-black' 
                    : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                {DAYS.map((day, i) => {
                  const color = getColorForType(day.type);
                  const isCompleted = state.completedDays.includes(day.num);
                  
                  return (
                    <motion.div 
                      key={day.num}
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={`bg-card rounded-2xl border ${isCompleted ? 'border-primary/30 opacity-75' : 'border-white/10'} overflow-hidden`}
                    >
                      <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-mono text-xl font-medium" style={{ color }}>{String(day.num).padStart(2, '0')}</span>
                              <span 
                                className="px-2 py-0.5 rounded text-xs font-mono uppercase font-semibold"
                                style={{ backgroundColor: `${color}20`, color }}
                              >
                                {day.type}
                              </span>
                              <span className="font-mono text-xs text-muted-foreground ml-auto">{day.date}</span>
                            </div>
                            <h2 className="font-sans text-xl font-bold">{day.title}</h2>
                            <p className="text-sm text-muted-foreground mt-1">{day.sub}</p>
                          </div>
                        </div>

                        <div className="space-y-6 mt-6">
                          {day.sessions.map((session, sIdx) => (
                            <div key={sIdx}>
                              <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-white/5">
                                {session.label}
                              </h3>
                              <div className="space-y-2">
                                {session.exercises.map((ex, eIdx) => {
                                  const exKey = `d${day.num}_${sIdx}_${eIdx}`;
                                  const isChecked = state.exercises[exKey];
                                  
                                  return (
                                    <button
                                      key={eIdx}
                                      data-testid={`ex-${exKey}`}
                                      onClick={() => toggleExercise(exKey)}
                                      className={`w-full flex items-center gap-4 p-3 rounded-xl text-left transition-all
                                        ${isChecked ? 'bg-white/5 opacity-50' : 'hover:bg-white/5'}`}
                                    >
                                      <div className={`w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center flex-shrink-0 transition-transform
                                        ${isChecked ? 'bg-primary border-primary scale-100' : 'border-white/20 active:scale-95'}`}
                                      >
                                        {isChecked && (
                                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 3L4.5 8.5L2 6" stroke="#0C0C0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          </svg>
                                        )}
                                      </div>
                                      <div className={`flex-1 font-sans text-sm sm:text-base ${isChecked ? 'line-through' : ''}`}>
                                        {ex.name}
                                      </div>
                                      <div className="font-mono text-xs text-muted-foreground text-right w-24">
                                        {ex.sets}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div 
                          className="mt-6 p-4 rounded-xl bg-black/40 text-sm border-l-4"
                          style={{ borderLeftColor: color }}
                        >
                          <span className="text-muted-foreground block mb-1 font-mono text-xs uppercase">Tip</span>
                          {day.tip}
                        </div>

                        <button
                          onClick={() => handleCompleteDay(day.num)}
                          className={`mt-6 w-full py-4 rounded-xl font-sans font-bold text-sm uppercase tracking-wider transition-colors border
                            ${isCompleted 
                              ? 'bg-primary border-primary text-black' 
                              : 'bg-transparent border-white/10 hover:bg-white/5 text-foreground'}`}
                        >
                          {isCompleted ? 'Completed' : 'Mark day complete'}
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {activeTab === 'meals' && (
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-sans font-bold text-xl">Daily Nutrition</h2>
                    <select 
                      value={state.activeDay}
                      onChange={(e) => setActiveDay(Number(e.target.value))}
                      className="bg-card border border-white/10 rounded-lg px-3 py-1.5 font-mono text-sm text-primary outline-none"
                    >
                      {[1,2,3,4,5,6,7,8].map(d => (
                        <option key={d} value={d}>Day {d}</option>
                      ))}
                    </select>
                  </div>
                  
                  {MEALS.map((meal, idx) => {
                    const mealKey = `meal_${state.activeDay}_${idx}`;
                    const isChecked = state.meals[mealKey];

                    return (
                      <button
                        key={idx}
                        onClick={() => toggleMeal(mealKey)}
                        className={`w-full flex items-start gap-4 p-4 rounded-xl text-left border transition-all
                          ${isChecked ? 'bg-white/5 border-transparent opacity-60' : 'bg-card border-white/5 hover:border-white/10'}`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-transform
                          ${isChecked ? 'bg-accent border-accent' : 'border-white/20'}`}
                        >
                          {isChecked && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="#0C0C0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div className="w-20 pt-0.5 font-mono text-xs text-muted-foreground">{meal.time}</div>
                        <div className="flex-1">
                          <div className={`font-sans font-bold text-base ${isChecked ? 'line-through' : ''}`}>{meal.name}</div>
                          <div className="font-sans text-sm text-muted-foreground mt-1">{meal.detail}</div>
                        </div>
                        {meal.kcal && (
                          <div className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-mono font-medium whitespace-nowrap">
                            {meal.kcal}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>

                <div className="w-full lg:w-80">
                  <div className="sticky top-8 bg-card border border-white/10 rounded-2xl p-6">
                    <h3 className="font-mono text-xs uppercase text-muted-foreground tracking-wider mb-6">Macro Targets</h3>
                    
                    <div className="space-y-5">
                      {[
                        { label: 'Protein', value: '150g', pct: 92, color: '#C8F53E' },
                        { label: 'Carbs', value: '165g', pct: 55, color: '#7DF5C8' },
                        { label: 'Fats', value: '28g', pct: 20, color: '#F5A623' },
                        { label: 'Calories', value: '1700', pct: 72, color: '#F55C7A' },
                      ].map(m => (
                        <div key={m.label}>
                          <div className="flex justify-between text-sm font-mono mb-2">
                            <span>{m.label}</span>
                            <span className="text-muted-foreground">{m.value}</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full"
                              style={{ width: `${m.pct}%`, backgroundColor: m.color }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-accent/5 border border-accent/20 rounded-xl">
                      <div className="font-mono text-xs text-accent uppercase mb-2">Need more cals?</div>
                      <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4 font-sans marker:text-accent/50">
                        <li>Add 1 tbsp peanut butter</li>
                        <li>Drink 1 glass of milk</li>
                        <li>Add 1 extra roti to dinner</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'technique' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TECHNIQUE.map((item, idx) => (
                  <div key={idx} className="bg-card border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="absolute -top-4 -right-4 font-mono text-[80px] font-bold text-white/5 leading-none pointer-events-none select-none">
                      {item.num}
                    </div>
                    <div className="relative">
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-mono font-medium rounded mb-4">
                        {item.tag}
                      </span>
                      <h3 className="font-sans font-bold text-lg mb-2 text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'peak' && (
              <div className="space-y-8">
                <div className="relative bg-card border border-accent/20 rounded-3xl p-8 overflow-hidden">
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(245,166,35,0.1) 0%, rgba(200,245,62,0.05) 100%)' }} />
                  <div className="absolute -right-10 -bottom-20 font-sans font-extrabold text-[200px] text-accent/5 leading-none pointer-events-none select-none">
                    8
                  </div>
                  
                  <div className="relative">
                    <h2 className="font-sans font-bold text-3xl text-accent mb-4">Day 8 — Peak protocol</h2>
                    <p className="text-foreground/80 max-w-2xl text-lg leading-relaxed">
                      This is it. The final day. The goal today is not to break down muscle, but to gorge it with blood and glycogen for maximum temporary size. Follow these steps exactly.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {PEAK_STEPS.map((step, idx) => (
                    <div key={idx} className="flex gap-6 bg-card border border-white/5 rounded-2xl p-6">
                      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 text-accent flex items-center justify-center font-mono font-bold text-lg shrink-0">
                        {step.num}
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-xl mb-2">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 rounded-2xl p-1 divide-y divide-white/5 border border-white/10">
                  <div className="p-6 flex flex-col items-center text-center">
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">Starting Size</span>
                    <span className="font-sans font-bold text-2xl">12.0 inches</span>
                  </div>
                  <div className="p-6 flex flex-col items-center text-center">
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">Expected Day 9 (Unflexed)</span>
                    <span className="font-sans font-bold text-2xl text-primary">12.5 - 12.8 inches</span>
                  </div>
                  <div className="p-6 flex flex-col items-center text-center">
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2">After Pump (Flexed)</span>
                    <span className="font-sans font-bold text-3xl text-accent">13.0 - 13.5 inches</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}