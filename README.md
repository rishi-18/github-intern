🚀 ProfilePilot AI

Your AI-powered career coach for landing your dream tech job.

ProfilePilot AI helps developers and tech professionals get instant, actionable feedback on their professional profiles. By analyzing a user's GitHub, skills, and projects, our application provides a "Job Readiness Score," tailored project suggestions, and a personalized weekly/monthly roadmap for improvement.

✨ Features
Secure Authentication: Easy sign-in and sign-up with providers like Google and GitHub, powered by Clerk.

Dynamic Profile Input: A clean, multi-step form to input GitHub URL, target job role (pre-defined or custom), skills, and featured projects.

AI-Powered Analysis: Leverages the Google Gemini API to provide a deep, contextual analysis of a user's profile.

Comprehensive Dashboard: A personalized dashboard displays:

Job Readiness Score: A metric to benchmark your profile.

Actionable Feedback: Specific strengths and weaknesses.

Tailored Project Suggestions: Creative ideas to fill gaps in your portfolio.

Personalized Roadmap: A weekly and monthly plan to guide your improvement.

Persistent Storage: User analyses are securely stored in a Supabase PostgreSQL database.

🛠️ Tech Stack
Framework: Next.js (App Router)

Language: TypeScript

Authentication: Clerk

Database: Supabase (PostgreSQL)

UI: shadcn/ui & Tailwind CSS

AI: Google Gemini API

Form Management: React Hook Form & Zod

API Requests: Axios

Icons: Lucide React

🏁 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (v18.0 or later recommended)

npm or yarn package manager

A Clerk account

A Supabase account

A Google AI Studio account for a Gemini API key

Installation & Setup
Clone the repository:

git clone https://github.com/your-username/profile-pilot-ai.git
cd profile-pilot-ai

Install dependencies:

npm install

Set up environment variables:
Create a new file named .env.local in the root of your project and add the following keys. You will get these from your Clerk, Supabase, and Google AI Studio dashboards.

# Clerk Keys (https://dashboard.clerk.com/apps/YOUR_APP_ID/api-keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase Keys (Project Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key

# Google Gemini API Key (https://ai.google.dev/)
GEMINI_API_KEY=your-gemini-api-key

Set up the Supabase Database:

Navigate to the SQL Editor in your Supabase project.

Run the following SQL commands to create the analyses table and set up the required Row Level Security (RLS) policies.

-- 1. Create the table
CREATE TABLE analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  job_role TEXT,
  github_url TEXT,
  skills JSONB,
  projects JSONB,
  analysis_data JSONB
);

-- 2. Enable Row Level Security
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- 3. Create policy for reading data
CREATE POLICY "Users can read their own analyses"
ON public.analyses FOR SELECT
USING ( auth.uid()::text = user_id );

-- 4. Create policy for inserting data
CREATE POLICY "Users can create their own analyses"
ON public.analyses FOR INSERT
WITH CHECK ( auth.uid()::text = user_id );

Run the development server:

npm run dev

Open http://localhost:3000 with your browser to see the result.

📂 Project Structure
A brief overview of the key directories in the project:

/src
├── app
│   ├── (auth)          # Clerk authentication routes (sign-in, sign-up)
│   ├── api/analyze     # The backend API endpoint for Gemini analysis
│   ├── dashboard
│   │   └── [analysisId]  # Dynamic dashboard page
│   ├── form            # The main user input form page
│   └── page.tsx        # The public landing page
├── components/ui       # UI components from shadcn/ui
└── lib                 # Library/utility functions (e.g., supabase.ts)

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📜 License
Distributed under the MIT License. See LICENSE for more information.
