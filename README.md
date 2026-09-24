# FitLog

FitLog is a dark, focused workout companion for browsing exercises, building a daily plan, and tracking saved workouts.

## Description

FitLog connects to the FitLog workout API and presents a responsive exercise library with detailed workout instructions. Users can add up to five exercises to todays plan, save exercises for later, mark planned workouts as complete, and keep their plan between sessions with local storage.

## Technologies Used

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS
- React Toastify notifications
- FitLog REST API (`https://api.abcz.workers.dev/api/fitlog`)

## Key Features

1. Responsive workout library with search by exercise name, equipment, or muscle group.
2. Detailed workout pages with exercise stats, instructions, and action buttons.
3. Daily plan capped at five exercises, with mark-as-done and remove actions.
4. Separate saved-workout list with sorting by duration, calories, or rating.
5. Persistent plan and saved counts in the navbar using local storage, with toast feedback for user actions.

