export interface Meal { time: string; name: string; detail: string; kcal: string; }
export const MEALS: Meal[] = [
  { time: '7:30 AM', name: 'Wake up', detail: '1 banana + 500ml water + pinch of salt', kcal: '~90 kcal' },
  { time: '11:15 AM', name: 'Post-workout', detail: '1 whey scoop (30g protein) + 1 banana', kcal: '~270 kcal · 30g P' },
  { time: '1:30 PM', name: 'Lunch', detail: '3 roti + dal / sabzi / eggs', kcal: '~450 kcal · 20g P' },
  { time: '4:30 PM', name: 'Evening snack', detail: 'High protein milk (30g protein) + muesli', kcal: '~370 kcal · 34g P' },
  { time: '8:45 PM', name: 'Dinner', detail: '2-3 roti + protein source (dal / eggs / paneer) + vegetables', kcal: '~480 kcal · 25g P' },
  { time: '11:30 PM', name: 'Post-workout 2', detail: '1 whey scoop (30g protein) + banana or milk (optional)', kcal: '~150 kcal · 30g P' },
];
