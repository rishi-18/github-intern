// src/app/dashboard/[analysisId]/page.tsx
import { supabase } from '../../lib/supabase';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import { notFound } from 'next/navigation';
import { Lightbulb, Star, TrendingUp, Clock } from 'lucide-react';

// --- Re-usable Display Components ---
// To keep this file focused, I'm simplifying the display components.
// You can use the more detailed versions from before.

const JobReadinessScore = ({ score }: { score: number }) => (
    <div className="bg-gray-800 p-6 rounded-2xl text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Job Readiness Score</h3>
        <p className="text-5xl font-bold text-sky-400">{score}</p>
    </div>
);

const InfoCard = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="bg-gray-800 p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">{icon}{title}</h3>
        <div className="space-y-2 text-gray-300">{children}</div>
    </div>
);


// --- Main Page Component ---
export default async function DashboardPage({ params }: { params: { analysisId: string } }) {
    // Call auth() at the top level of the Server Component
    const { userId } = await auth();

    // --- DEBUG LOGGING ---
    console.log("--- Dashboard Page Render ---");
    console.log("Analysis ID from params:", params.analysisId);
    console.log("Clerk User ID from auth():", userId);
    // --- END DEBUG LOGGING ---

    if (!userId) {
        console.error("Authentication error: No user ID found. Redirecting or showing error.");
        // In a real app, you might redirect or show a more specific error component.
        // For now, notFound() is appropriate as the user can't access this resource.
        return notFound();
    }

    // Fetch data directly within the component
    const { data, error } = await supabase
        .from('analyses')
        .select('analysis_data, job_role')
        .eq('id', params.analysisId)
        .eq('user_id', userId) // This line checks ownership
        .single();

    if (error) {
        console.error("Supabase fetch error:", error.message);
        // This can happen if RLS fails or the ID doesn't exist.
        return notFound();
    }
    
    // --- DEBUG LOGGING ---
    console.log("Successfully fetched data from Supabase:", data);
    // --- END DEBUG LOGGING ---

    // This is the condition that triggers the 404 page if data is null
    if (!data || !data.analysis_data) {
        console.log("No data found for this analysis ID and user. Triggering notFound().");
        return notFound();
    }

    const analysis = data.analysis_data as any; 

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
            <header className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
                <div>
                   <h1 className="text-3xl font-bold">Your Analysis Dashboard</h1>
                   <p className="text-gray-400">Results for your application as a {data.job_role}</p>
                </div>
                <UserButton afterSignOutUrl="/" />
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <JobReadinessScore score={analysis.score} />
                    <InfoCard title="Actionable Improvements" icon={<TrendingUp className="mr-2 text-teal-400" />}>
                        <ul className="list-disc list-inside">
                            {analysis.improvementPoints.map((point: string, i: number) => <li key={i}>{point}</li>)}
                        </ul>
                    </InfoCard>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <InfoCard title="AI Feedback" icon={<Lightbulb className="mr-2 text-yellow-400" />}>
                        <h4 className="font-semibold text-green-400">Positive:</h4>
                        <ul className="list-disc list-inside pl-4">{analysis.feedback.positive.map((item: string, i: number) => <li key={i}>{item}</li>)}</ul>
                        <h4 className="font-semibold text-red-400 mt-4">To Improve:</h4>
                        <ul className="list-disc list-inside pl-4">{analysis.feedback.negative.map((item: string, i: number) => <li key={i}>{item}</li>)}</ul>
                    </InfoCard>
                    <InfoCard title="Project Suggestions" icon={<Star className="mr-2 text-indigo-400" />}>
                         {analysis.projectSuggestions.map((proj: any, i: number) => <div key={i}><h4 className="font-bold">{proj.title}</h4><p className="text-sm text-gray-400">{proj.description}</p></div>)}
                    </InfoCard>
                </div>
            </main>
        </div>
    );
}
