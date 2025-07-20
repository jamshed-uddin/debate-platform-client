### Open Debate - Online debate platform

- live demo: [https://opendebate.vercel.app/](https://opendebate.vercel.app/)

### Test user

- email- johndoe@gmail.com
- password - passjohndoe

## Tech stack

- Next js
- Shadcn UI
- Auth js
- Tailwind CSS

## Core features

- Authentication
- Create/edit debate
- Join debates as Support/Oppose
- Post argument for debates
- Vote arguments

## Enhancements

- Next js for fast, file-based routing, SEO friendly web pages.
- Shadcn ui components.
- Tailwind CSS for fast and consistent styling.
- Auth js for authentication and session management.
- Framer motion for animation
- Loading skeleton UI.

## Run Locally

**Clone the repository**

```bash
git clone https://github.com/jamshed-uddin/debate-platform-client.git

```

**Change directory**

```bash
cd debate-platform-client
```

**Install packages**

```bash
npm install
```

**Set environment variables**

```env
AUTH_SECRET= random secret string
NEXT_PUBLIC_SERVER_URL= http://serverurl/api
```

**Start the app**

```bash
npm run dev
```

## Dependencies

```json
"dependencies": {
    "@headlessui/react": "^2.2.4",
    "@heroicons/react": "^2.2.0",
    "@hookform/resolvers": "^5.1.1",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@reduxjs/toolkit": "^2.8.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.525.0",
    "motion": "^12.23.6",
    "next": "15.4.1",
    "next-auth": "^5.0.0-beta.29",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-hook-form": "^7.60.0",
    "react-hot-toast": "^2.5.2",
    "react-redux": "^9.2.0",
    "react-timer-hook": "^4.0.5",
    "tailwind-merge": "^3.3.1",
    "use-debounce": "^10.0.5",
    "zod": "^4.0.5"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.4.1",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.5",
    "typescript": "^5"
  }
```
