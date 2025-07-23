import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background-primary text-primary font-sans">
      <SignIn />
    </main>
  );
}
