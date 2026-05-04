export type DayType = 'heavy' | 'pump' | 'peak';
export interface Exercise { name: string; sets: string; }
export interface Session { label: string; exercises: Exercise[]; }
export interface Day { num: number; date: string; type: DayType; title: string; sub: string; sessions: Session[]; tip: string; }

export const DAYS: Day[] = [
  { num: 1, date: 'May 5', type: 'heavy', title: 'Foundation heavy', sub: 'Establish baseline, focus on form', sessions: [
    { label: 'Morning 9:30 — Biceps focus', exercises: [
      { name: 'Alternating dumbbell curl', sets: '4 x 10, 3sec down' },
      { name: 'Hammer curl', sets: '3 x 12' },
      { name: 'Slow concentration curl', sets: '3 x 8 each arm' },
    ]},
    { label: 'Evening 10:00 — Triceps focus', exercises: [
      { name: 'Overhead tricep extension', sets: '4 x 10, 3sec down' },
      { name: 'Tricep kickback', sets: '3 x 15' },
      { name: 'Close-grip push-ups', sets: '3 x max reps' },
    ]},
  ], tip: 'Squeeze hard at the top of every rep. No swinging.' },

  { num: 2, date: 'May 6', type: 'heavy', title: 'Volume heavy', sub: 'Add sets, push to near-failure', sessions: [
    { label: 'Morning 9:30 — Triceps focus', exercises: [
      { name: 'Overhead tricep extension', sets: '4 x 12, 3sec down' },
      { name: 'Tricep kickback', sets: '4 x 15' },
      { name: 'Diamond push-ups', sets: '3 x max' },
    ]},
    { label: 'Evening 10:00 — Biceps + forearms', exercises: [
      { name: 'Standing dumbbell curl', sets: '4 x 10, slow' },
      { name: 'Hammer curl', sets: '4 x 12' },
      { name: 'Reverse curl (forearms)', sets: '3 x 12' },
    ]},
  ], tip: 'Last set of every exercise: go to failure. Hold mid-position for 10 sec on final set.' },

  { num: 3, date: 'May 7', type: 'pump', title: 'Pump day', sub: 'High reps, short rest, constant tension', sessions: [
    { label: 'Morning 9:30 — Full arms pump', exercises: [
      { name: 'Curl + overhead ext superset', sets: '4 x 20 each, 30sec rest' },
      { name: 'Hammer curl', sets: '3 x 20' },
      { name: 'Push-ups', sets: '3 x max' },
    ]},
    { label: 'Evening 10:00 — Light and squeeze', exercises: [
      { name: 'Concentration curl', sets: '3 x 15, 2sec squeeze at top' },
      { name: 'Tricep kickback', sets: '3 x 20' },
      { name: 'Reverse curl', sets: '3 x 15' },
    ]},
  ], tip: 'Never lock out joints. Keep tension throughout. Rest only 30-40 sec between sets.' },

  { num: 4, date: 'May 8', type: 'heavy', title: 'Intensity heavy', sub: 'Add drop sets and partial reps', sessions: [
    { label: 'Morning 9:30 — Biceps + forearms', exercises: [
      { name: 'Curl (drop set on final set)', sets: '4 x 10 + drop to failure' },
      { name: 'Hammer curl', sets: '4 x 12' },
      { name: 'Partial reps at peak', sets: '2 x 15 (half range)' },
    ]},
    { label: 'Evening 10:00 — Triceps heavy', exercises: [
      { name: 'Overhead ext (drop set final)', sets: '4 x 10 + drop' },
      { name: 'Close-grip push-ups', sets: '4 x max' },
      { name: 'Isometric hold at midpoint', sets: '3 x 20sec hold' },
    ]},
  ], tip: 'Drop sets: 10 reps with 10kg immediately 5kg then failure. No rest between weights.' },

  { num: 5, date: 'May 9', type: 'heavy', title: 'Max effort heavy', sub: 'Push harder than Days 1-4', sessions: [
    { label: 'Morning 9:30 — Triceps priority', exercises: [
      { name: 'Overhead ext', sets: '5 x 10, 3sec down' },
      { name: 'Kickback superset w/ push-ups', sets: '4 x 12 + max pushups' },
      { name: 'Diamond push-ups', sets: '3 x max' },
    ]},
    { label: 'Evening 10:00 — Biceps priority', exercises: [
      { name: 'Alternating curl', sets: '5 x 10, slow' },
      { name: 'Hammer curl', sets: '4 x 12' },
      { name: 'Concentration curl to failure', sets: '3 x failure each arm' },
    ]},
  ], tip: 'Best session of the plan. Push every set hard. Arms should feel very pumped after evening.' },

  { num: 6, date: 'May 10', type: 'pump', title: 'Pump + supersets', sub: 'High volume, minimal rest', sessions: [
    { label: 'Morning 9:30 — Superset circuit', exercises: [
      { name: 'Curl + overhead ext (superset)', sets: '5 rounds x 15 each' },
      { name: 'Hammer + kickback (superset)', sets: '4 rounds x 15 each' },
    ]},
    { label: 'Evening 10:00 — Burnout', exercises: [
      { name: '100 total curls', sets: 'Any rep scheme, 10kg' },
      { name: '100 total tricep reps', sets: 'Mix of exercises' },
    ]},
  ], tip: '30 sec rest max between supersets. Arms should look noticeably bigger by end of evening.' },

  { num: 7, date: 'May 11', type: 'heavy', title: 'Final heavy + carb prep', sub: 'Last heavy session, start carb loading', sessions: [
    { label: 'Morning 9:30 — Full arm heavy', exercises: [
      { name: 'Curl', sets: '4 x 10, 3sec negative' },
      { name: 'Hammer curl', sets: '4 x 12' },
      { name: 'Overhead ext', sets: '4 x 10' },
      { name: 'Close-grip push-ups', sets: '3 x max' },
    ]},
    { label: 'Evening 10:00 — Light pump only', exercises: [
      { name: 'Full arm circuit (light)', sets: '3 x 20, low weight' },
      { name: 'Reverse curl', sets: '3 x 15' },
    ]},
  ], tip: 'Tonight: eat extra rice or roti before bed. Loads glycogen overnight, crucial for Day 8 peak size.' },

  { num: 8, date: 'May 12', type: 'peak', title: 'Peak day', sub: 'Pump protocol before measuring / photos', sessions: [
    { label: 'Morning — Peak protocol', exercises: [
      { name: 'Eat carbs + water on waking', sets: 'Banana + roti' },
      { name: 'Curl + ext superset x 5 rounds', sets: '15 reps each, 20sec rest' },
      { name: 'Hammer curls', sets: '3 x 20' },
      { name: 'Push-ups to failure', sets: '3 sets' },
      { name: 'Measure immediately after', sets: 'Flexed + unflexed' },
    ]},
  ], tip: 'See the Day 8 Peak tab for the full protocol. Measure within 10 minutes of finishing.' },
];
