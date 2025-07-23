import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from "@clerk/nextjs";
  import Link from "next/link";
  import Image from "next/image";
  import NavItems from "./NavItems";
  
  const Navbar = () => {
    return (
      <nav className="card-glass flex items-center justify-between px-8 py-4 mb-8 sticky top-0 z-30 backdrop-blur-lg border border-[rgba(255,255,255,0.08)] shadow-lg">
        <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary/70 rounded-md">
          <Image src="/images/logo.png" alt="logo" width={46} height={44} className="drop-shadow-[0_0_8px_var(--accent-secondary)]" />
          <span className="h1 font-bold text-primary select-none">ProfilePilot AI</span>
        </Link>
        <div className="flex items-center gap-8">
          <NavItems />
          <SignedOut>
            <SignInButton>
              <button className="button-glass text-accent-secondary font-semibold">Sign In</button>
            </SignInButton>
            <SignUpButton>
                <button className="button-glass glow-accent ml-2 font-semibold">Sign Up</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  