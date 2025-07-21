import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, BarChart, Goal, Lightbulb, CheckCircle } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

// New Feature Item Component
const FeatureListItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3">
    <CheckCircle className="h-5 w-5 text-sky-400 flex-shrink-0" />
    <span className="text-gray-300">{text}</span>
  </li>
);

export default async function LandingPage() {
  const user = await currentUser();

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Header */}
      <header className="p-4 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2">
          <BrainCircuit className="h-7 w-7 text-sky-400" />
          <h1 className="text-2xl font-bold">ProfilePilot AI</h1>
        </Link>
        <nav>
          {user ? (
            <Link href="/form">
              <Button>
                Go to Form <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 sm:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
              Your AI Career Coach for <span className="text-sky-400">Tech Roles.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto md:mx-0 mb-8">
              Get instant, AI-powered feedback on your developer profile and a personalized roadmap to success. Stop guessing, start preparing.
            </p>
            <Link href={user ? "/form" : "/sign-up"}>
              <Button size="lg" className="text-lg py-7 px-8">
                Get Your Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-center">Unlock Your Potential</h3>
            <ul className="space-y-4 text-lg">
              <FeatureListItem text="Benchmark against your target role." />
              <FeatureListItem text="Identify hidden skill gaps." />
              <FeatureListItem text="Receive tailored project ideas." />
              <FeatureListItem text="Build a profile that gets noticed." />
            </ul>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold">A Smarter Way to Job Hunt</h3>
            <p className="text-lg text-gray-400 mt-2">Everything you need to get job-ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-sky-900/50 p-3 rounded-full"><BarChart className="h-6 w-6 text-sky-400" /></div>
                <h4 className="text-xl font-bold">Instant Profile Analysis</h4>
              </div>
              <p className="text-gray-400">Our AI provides a 'Job Readiness Score' to benchmark your profile against your target role.</p>
            </div>
             <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-sky-900/50 p-3 rounded-full"><Lightbulb className="h-6 w-6 text-sky-400" /></div>
                <h4 className="text-xl font-bold">Actionable AI Feedback</h4>
              </div>
              <p className="text-gray-400">Receive concrete suggestions for projects, skills to learn, and ways to improve your GitHub presence.</p>
            </div>
             <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-sky-900/50 p-3 rounded-full"><Goal className="h-6 w-6 text-sky-400" /></div>
                <h4 className="text-xl font-bold">Personalized Roadmap</h4>
              </div>
              <p className="text-gray-400">Get a custom weekly and monthly plan to fill your skill gaps and build a portfolio that stands out.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 border-t border-gray-800 mt-16">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} ProfilePilot AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
