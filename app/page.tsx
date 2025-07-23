'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, BrainCircuit, BarChart, Goal, Lightbulb, CheckCircle } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // <-- Import at the top

// Animation variants
const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1, // smoother, slower
      ease: "easeInOut", // use a supported string value
    },
  },
};

const scrollFadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1, // smoother, slower
      ease: "easeInOut", // use a supported string value
    },
  },
};

// Feature Item
const FeatureListItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-3">
    <CheckCircle className="h-5 w-5 text-accent-secondary flex-shrink-0" />
    <span className="text-secondary">{text}</span>
  </li>
);

export default function LandingPage() {
  const { user } = useUser(); // <-- Use directly here

  return (
    <div className="min-h-screen bg-background-primary text-primary overflow-x-hidden font-sans relative">
      {/* Parallax Background Motif */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #8A2BE2 0%, transparent 80%)",
          opacity: 0.13,
        }}
        initial={{ y: 0 }}
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <header className="p-4 flex justify-between items-center max-w-7xl mx-auto w-full relative z-10">
        <Link href="/" className="flex items-center gap-2">
          <BrainCircuit className="h-7 w-7 text-accent-secondary" />
          <h1 className="h1 font-bold">ProfilePilot AI</h1>
        </Link>
        <nav>
          {user ? (
            <Link href="/form">
              <motion.button
                whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.98 }}
                className="transition-all duration-150 ease-out px-6 py-3 rounded-lg bg-accent-primary/10 text-white font-semibold flex items-center gap-2"
              >
                Go to Form <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <motion.button
                whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.98 }}
                className="transition-all duration-150 ease-out px-6 py-3 rounded-lg border border-accent-secondary/40 text-white font-semibold"
              >
                Sign In
              </motion.button>
            </Link>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.section
          className="py-20 sm:py-32 grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scrollFadeUp}
        >
          <div className="text-center md:text-left">
            <motion.h2
              className="h1 font-extrabold tracking-tight mb-4"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              Your AI Career Coach for <span className="text-accent-secondary">Tech Roles.</span>
            </motion.h2>
            <motion.p
              className="text-lg text-secondary max-w-2xl mx-auto md:mx-0 mb-8"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
            >
              Get instant, AI-powered feedback on your developer profile and a personalized roadmap to success. Stop guessing, start preparing.
            </motion.p>
            <Link href={user ? "/form" : "/sign-up"}>
              <motion.button
                whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.98 }}
                className="text-lg py-7 px-8 rounded-lg bg-accent-primary/20 text-white font-semibold flex items-center gap-2 transition-all duration-150 ease-out"
              >
                Get Your Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </Link>
          </div>
          <motion.div
            className="card-glass p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 8px 32px 0 rgba(199,125,255,0.25)",
              borderColor: "rgba(199,125,255,0.25)",
            }}
          >
            <h3 className="h2 font-bold mb-4 text-center">Unlock Your Potential</h3>
            <ul className="space-y-4 text-lg">
              <FeatureListItem text="Benchmark against your target role." />
              <FeatureListItem text="Identify hidden skill gaps." />
              <FeatureListItem text="Receive tailored project ideas." />
              <FeatureListItem text="Build a profile that gets noticed." />
            </ul>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="py-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <motion.h3
              className="h2 font-bold"
              variants={fadeUp}
            >
              A Smarter Way to Job Hunt
            </motion.h3>
            <motion.p
              className="text-lg text-secondary mt-2"
              variants={fadeUp}
              transition={{ delay: 0.1 }}
            >
              Everything you need to get job-ready.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              icon: <BarChart className="h-6 w-6 text-accent-primary" />,
              title: "Instant Profile Analysis",
              desc: "Our AI provides a 'Job Readiness Score' to benchmark your profile against your target role."
            }, {
              icon: <Lightbulb className="h-6 w-6 text-accent-primary" />,
              title: "Actionable AI Feedback",
              desc: "Receive concrete suggestions for projects, skills to learn, and ways to improve your GitHub presence."
            }, {
              icon: <Goal className="h-6 w-6 text-accent-primary" />,
              title: "Personalized Roadmap",
              desc: "Get a custom weekly and monthly plan to fill your skill gaps and build a portfolio that stands out."
            }].map((card, i) => (
              <motion.div
                key={card.title}
                className="card-glass p-6 rounded-lg shadow-lg border border-[rgba(255,255,255,0.08)] transition-all"
                variants={fadeUp}
                whileHover={{
                  y: -5,
                  boxShadow: "0 8px 32px 0 rgba(199,125,255,0.25)",
                  borderColor: "rgba(199,125,255,0.25)",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-accent-primary/20 p-3 rounded-full">{card.icon}</div>
                  <h4 className="h2 font-bold">{card.title}</h4>
                </div>
                <p className="text-secondary">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 border-t border-[rgba(255,255,255,0.08)] mt-16 relative z-10">
        <p className="text-secondary">&copy; {new Date().getFullYear()} ProfilePilot AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
