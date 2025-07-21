// src/app/form/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { UserButton } from "@clerk/nextjs";
import { BrainCircuit, Code, Server, BarChart, Github, XCircle, Loader2, ArrowRight, PlusCircle, Trash2, TestTube2, Bot, Palette, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

// --- Form Schema for Validation ---
const projectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  url: z.string().url("Please enter a valid project URL."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(200, "Description cannot exceed 200 characters."),
});

const formSchema = z.object({
  githubUrl: z.string().url({ message: "Please enter a valid GitHub URL." }),
  role: z.string().min(2, { message: "Please select or enter a job role." }),
  skills: z.array(z.string()).min(1, { message: "Please add at least one skill." }),
  projects: z.array(projectSchema).max(3, "You can add a maximum of 3 projects.").optional(),
});

// --- Job Role Configuration ---
const jobRoles = ['Frontend Developer', 'Backend Developer', 'AI Engineer', 'Data Scientist', 'DevOps Engineer', 'QA Engineer', 'UI/UX Designer', 'Mobile Developer'];
const roleIcons = {
    'Frontend Developer': <Code className="h-6 w-6 text-sky-400" />,
    'Backend Developer': <Server className="h-6 w-6 text-green-400" />,
    'AI Engineer': <BrainCircuit className="h-6 w-6 text-purple-400" />,
    'Data Scientist': <BarChart className="h-6 w-6 text-yellow-400" />,
    'DevOps Engineer': <Bot className="h-6 w-6 text-orange-400" />,
    'QA Engineer': <TestTube2 className="h-6 w-6 text-red-400" />,
    'UI/UX Designer': <Palette className="h-6 w-6 text-pink-400" />,
    'Mobile Developer': <Smartphone className="h-6 w-6 text-blue-400" />,
};

export default function FormPage() {
  const router = useRouter();
  const [customSkill, setCustomSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubUrl: "",
      role: "",
      skills: [],
      projects: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const currentSkills = form.watch("skills");

  const handleAddCustomSkill = () => {
    if (customSkill && !currentSkills.includes(customSkill)) {
      form.setValue("skills", [...currentSkills, customSkill]);
      setCustomSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    form.setValue("skills", currentSkills.filter(skill => skill !== skillToRemove));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    toast.info("Starting analysis... Our AI is on the case!");

    try {
      const response = await axios.post('/api/analyze', values);
      const { analysisId } = response.data;
      
      toast.success("Analysis complete! Redirecting to your dashboard.");
      router.push(`/dashboard/${analysisId}`);

    } catch (error) {
      console.error("Analysis submission error", error);
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-8">
       <header className="w-full max-w-7xl mx-auto flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
             <BrainCircuit className="h-8 w-8 text-sky-400" />
             <h1 className="text-2xl font-bold">ProfilePilot AI</h1>
          </div>
          <UserButton afterSignOutUrl="/" />
       </header>
       
       <main className="w-full max-w-7xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
              {/* --- Step 1: Profile & Role --- */}
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3"><span className="text-sky-400 font-black text-3xl">1</span> Your Profile & Target Role</h2>
                <div className="grid md:grid-cols-2 gap-8 mt-4">
                  <FormField control={form.control} name="githubUrl" render={({ field }) => ( <FormItem> <FormLabel>GitHub Profile URL</FormLabel> <div className="relative"> <Github className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" /> <FormControl><Input placeholder="https://github.com/your-username" {...field} className="pl-10"/></FormControl> </div> <FormMessage /> </FormItem> )}/>
                  <FormField control={form.control} name="role" render={({ field }) => ( 
                    <FormItem> 
                      <FormLabel>Target Role</FormLabel> 
                      <FormControl> 
                        <div>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3"> 
                            {jobRoles.map((role) => ( 
                              <button type="button" key={role} onClick={() => field.onChange(role)} className={`p-3 rounded-lg border-2 text-center transition-all duration-200 flex flex-col items-center justify-center gap-2 h-28 ${field.value === role ? 'bg-sky-900/50 border-sky-500 shadow-lg' : 'bg-gray-800 border-gray-700 hover:border-gray-500'}`}> 
                                {roleIcons[role as keyof typeof roleIcons]} 
                                <span className="font-semibold text-sm">{role}</span> 
                              </button> 
                            ))} 
                          </div>
                          <div className="relative my-4 flex items-center">
                            <div className="flex-grow border-t border-gray-600"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-xs">OR</span>
                            <div className="flex-grow border-t border-gray-600"></div>
                          </div>
                          <Input 
                            placeholder="Enter a custom role..." 
                            onChange={(e) => field.onChange(e.target.value)}
                            // Clear this input if a button is clicked
                            value={jobRoles.includes(field.value) ? "" : field.value}
                            className="text-center"
                          />
                        </div>
                      </FormControl> 
                      <FormMessage /> 
                    </FormItem> 
                  )}/>
                </div>
              </div>

              {/* --- Step 2: Skills & Projects --- */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold flex items-center gap-3"><span className="text-sky-400 font-black text-3xl">2</span> Showcase Your Work</h2>
                {/* Skills Section */}
                <FormField control={form.control} name="skills" render={() => ( <FormItem> <FormLabel className="text-lg">Your Skills</FormLabel> <Card className="bg-gray-800 border-gray-700"> <CardContent className="p-4"> <div className="flex flex-wrap gap-2 min-h-[4rem]"> {currentSkills.length > 0 ? ( currentSkills.map((skill) => ( <Badge key={skill} variant="secondary" className="text-base px-3 py-1"> {skill} <button type="button" onClick={() => handleRemoveSkill(skill)} className="ml-2 text-gray-400 hover:text-white"> <XCircle className="h-4 w-4" /> </button> </Badge> )) ) : ( <p className="text-sm text-gray-500 p-3">Add skills using the input below.</p> )} </div> <div className="flex gap-2 mt-4"> <Input placeholder="e.g., React, Python, SQL" value={customSkill} onChange={(e) => setCustomSkill(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomSkill(); }}}/> <Button type="button" variant="outline" onClick={handleAddCustomSkill}>Add Skill</Button> </div> </CardContent> </Card> <FormMessage /> </FormItem> )}/>
                
                {/* Projects Section */}
                <FormField control={form.control} name="projects" render={() => (
                  <FormItem>
                    <FormLabel className="text-lg">Featured Projects (Optional, up to 3)</FormLabel>
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <Card key={field.id} className="bg-gray-800 border-gray-700 relative p-4 pr-12">
                           <div className="grid sm:grid-cols-2 gap-4">
                              <FormField control={form.control} name={`projects.${index}.title`} render={({ field }) => (<FormItem><FormLabel>Project Title</FormLabel><FormControl><Input {...field} placeholder="My Awesome App" /></FormControl><FormMessage /></FormItem>)} />
                              <FormField control={form.control} name={`projects.${index}.url`} render={({ field }) => (<FormItem><FormLabel>Project URL</FormLabel><FormControl><Input {...field} placeholder="https://github.com/user/repo" /></FormControl><FormMessage /></FormItem>)} />
                              <div className="sm:col-span-2">
                                <FormField control={form.control} name={`projects.${index}.description`} render={({ field }) => (<FormItem><FormLabel>Short Description</FormLabel><FormControl><Textarea {...field} placeholder="A short, impactful description of your project..." className="h-24" /></FormControl><FormMessage /></FormItem>)} />
                              </div>
                           </div>
                           <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={() => remove(index)}> <Trash2 className="h-5 w-5" /> </Button>
                        </Card>
                      ))}
                      {fields.length < 3 && (
                        <Button type="button" variant="outline" className="w-full border-dashed" onClick={() => append({ title: "", url: "", description: "" })}> <PlusCircle className="mr-2 h-4 w-4" /> Add Project </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}/>
              </div>

              {/* --- Step 3: Submit --- */}
              <div className="text-center pt-8 border-t border-gray-800">
                  <h2 className="text-2xl font-bold flex items-center gap-3 justify-center"><span className="text-sky-400 font-black text-3xl">3</span> Get Your Analysis</h2>
                  <p className="text-gray-400 mt-1 mb-6">Let's see what our AI career coach has to say.</p>
                  <Button type="submit" disabled={isSubmitting} size="lg" className="text-lg py-7 px-8">
                    {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    Analyze My Profile
                    {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
              </div>
            </form>
          </Form>
       </main>
    </div>
  );
}
