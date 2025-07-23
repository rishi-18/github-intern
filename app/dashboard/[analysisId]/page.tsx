// src/app/dashboard/[analysisId]/page.tsx
import { supabase } from '../../lib/supabase';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import { notFound } from 'next/navigation';
import { Lightbulb, Star, TrendingUp, Clock, BrainCircuit } from 'lucide-react';
import Link from "next/link";

// --- Re-usable Display Components ---
const JobReadinessScore = ({ score }: { score: number }) => (
    <div className="card-glass p-6 rounded-2xl text-center">
        <h3 className="h2 font-semibold mb-2">Job Readiness Score</h3>
        <p className="text-5xl font-bold text-accent-secondary">{score}</p>
    </div>
);

// --- Main Page Component ---
export default async function DashboardPage({ params }: { params: { analysisId: string } }) {
    const { userId } = await auth();
    if (!userId) return notFound();
    const { data, error } = await supabase
        .from('analyses')
        .select('analysis_data, job_role')
        .eq('id', params.analysisId)
        .eq('user_id', userId)
        .single();
    if (error) return notFound();
    if (!data || !data.analysis_data) return notFound();
    const analysis = data.analysis_data as any;
    const weekly = analysis.roadmap?.weekly || [];
    const improvementPoints = analysis.improvementPoints || [];
    const feedback = analysis.feedback || { positive: [], negative: [] };
    const projectSuggestions = analysis.projectSuggestions || [];
    // Build table rows: one for each day, then extra rows for remaining weekly suggestions
    const maxRows = Math.max(weekly.length, improvementPoints.length);
    const tableRows = Array.from({ length: maxRows }).map((_, i) => ({
      day: weekly[i]?.day || '',
      daily: weekly[i]?.task || '',
      weekly: improvementPoints[i] || ''
    }));
    return (
        <div className="min-h-screen bg-gradient-to-br from-background-primary via-[#181825] to-[#232336] text-primary p-4 sm:p-8 font-sans">
            <header className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
                <div className="flex items-center gap-6">
                  <Link href="/" aria-label="Go to homepage" className="flex items-center gap-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary/70 rounded-md">
                    <BrainCircuit className="h-8 w-8 text-accent-secondary" />
                    <span className="h1 font-bold text-primary select-none">ProfilePilot AI</span>
                  </Link>
                  <div>
                    <h1 className="h1 font-bold">Your Analysis Dashboard</h1>
                    <p className="text-secondary">Results for your application as a {data.job_role}</p>
                  </div>
                </div>
                <UserButton afterSignOutUrl="/" />
            </header>
            <main className="max-w-7xl mx-auto animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 space-y-8">
                    <JobReadinessScore score={analysis.score} />
                </div>
                <div className="lg:col-span-2 space-y-10">
                    <div className="card-glass p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-lg">
                      <h3 className="h2 font-semibold mb-4 flex items-center gap-2"><Lightbulb className="mr-2 text-accent-secondary" />AI Feedback</h3>
                      <h4 className="font-semibold text-green-400">Positive:</h4>
                      <ul className="list-disc list-inside pl-4 mb-4">{feedback.positive.map((item: string, i: number) => <li key={i}>{item}</li>)}</ul>
                      <h4 className="font-semibold text-red-400 mt-4">To Improve:</h4>
                      <ul className="list-disc list-inside pl-4">{feedback.negative.map((item: string, i: number) => <li key={i}>{item}</li>)}</ul>
                    </div>
                    <div className="w-full flex items-center justify-center my-4">
                      <div className="h-1 w-2/3 bg-gradient-to-r from-accent-primary/0 via-accent-secondary/40 to-accent-primary/0 rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {projectSuggestions.map((proj: any, i: number) => (
                        <div key={i} className="card-glass p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] shadow-md transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
                          <h4 className="font-bold text-accent-secondary mb-2">{proj.title}</h4>
                          <p className="text-secondary text-sm">{proj.description}</p>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
              {/* Actionable Improvements Table at the bottom */}
              <div className="card-glass p-6 rounded-2xl mt-16 max-w-7xl mx-auto border border-[rgba(255,255,255,0.08)] shadow-lg">
                <h3 className="h2 font-semibold mb-4 flex items-center gap-2"><TrendingUp className="mr-2 text-accent-primary" />Actionable Improvements</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left border-separate border-spacing-y-2">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-accent-secondary font-semibold">Day</th>
                        <th className="px-3 py-2 text-accent-secondary font-semibold">Daily Suggestion</th>
                        <th className="px-3 py-2 text-accent-secondary font-semibold">Weekly Suggestion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row, i) => (
                        <tr key={i} className="bg-background-card/80 hover:bg-background-card/100 transition rounded-lg">
                          <td className="px-3 py-2 font-semibold text-primary">{row.day}</td>
                          <td className="px-3 py-2 text-secondary">{row.daily}</td>
                          <td className="px-3 py-2 text-secondary">{row.weekly}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
        </div>
    );
}
