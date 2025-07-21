import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '../../lib/supabase';

// --- Gemini API Call Logic ---

// Define the structured schema we expect from the Gemini API
const geminiSchema = {
    type: "OBJECT",
    properties: {
        score: { 
            type: "INTEGER",
            description: "A job readiness score from 0 to 100."
        },
        feedback: {
            type: "OBJECT",
            properties: {
                positive: { 
                    type: "ARRAY", 
                    items: { type: "STRING" },
                    description: "3 positive feedback points about the user's profile."
                },
                negative: { 
                    type: "ARRAY", 
                    items: { type: "STRING" },
                    description: "3 constructive, actionable areas for improvement."
                }
            }
        },
        projectSuggestions: {
            type: "ARRAY",
            description: "3 creative and relevant project ideas.",
            items: {
                type: "OBJECT",
                properties: {
                    title: { type: "STRING" },
                    description: { type: "STRING" }
                }
            }
        },
        improvementPoints: {
            type: "ARRAY",
            description: "4 actionable steps to improve their overall profile (e.g., READMEs, contributing to OS).",
            items: { type: "STRING" }
        },
        roadmap: {
            type: "OBJECT",
            properties: {
                weekly: {
                    type: "ARRAY",
                    description: "A 7-day plan with a task for each day (Mon-Sun).",
                    items: {
                        type: "OBJECT",
                        properties: {
                            day: { type: "STRING" },
                            task: { type: "STRING" }
                        }
                    }
                },
                monthly: { 
                    type: "ARRAY",
                    description: "4 high-level goals for the user to achieve within a month.",
                    items: { type: "STRING" } 
                }
            }
        }
    }
};


async function callGeminiApi(role: string, skills: string[]) {
    const skillsString = skills.join(', ');
    const prompt = `
      Act as an expert career coach and tech hiring manager.
      A candidate is applying for a '${role}' position. Their self-reported skills are: ${skillsString}.
      Based on this information and assuming you have reviewed their GitHub profile (which shows moderate activity but could be improved), provide a comprehensive analysis.
      Generate the analysis strictly following the provided JSON schema.
    `;
    
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
        throw new Error("GEMINI_API_KEY is not set.");
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: geminiSchema,
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Gemini API Error:", errorBody);
        throw new Error(`Gemini API call failed with status: ${response.status}`);
    }
    
    const result = await response.json();
    
    try {
        const parsedData = JSON.parse(result.candidates[0].content.parts[0].text);
        return parsedData;
    } catch (e) {
        console.error("Failed to parse Gemini response:", e);
        throw new Error("Invalid JSON response from Gemini API.");
    }
}

// --- API POST Handler ---

export async function POST(request: Request) {
    const { userId } = await auth();
    if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { githubUrl, role, skills } = body;

    if (!githubUrl || !role || !skills || skills.length === 0) {
        return new NextResponse("Missing required fields", { status: 400 });
    }

    try {
        const analysisResult = await callGeminiApi(role, skills);

        const { data, error } = await supabase
            .from('analyses')
            .insert([{
                user_id: userId,
                github_url: githubUrl,
                job_role: role,
                skills: skills,
                analysis_data: analysisResult, // analysis_data is a JSONB column
            }])
            .select('id')
            .single();

        if (error) {
            console.error("Supabase Insert Error:", error);
            throw error; // Let the outer catch block handle it
        }

        return NextResponse.json({ analysisId: data.id });

    } catch (error) {
        console.error("Full Analysis Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
