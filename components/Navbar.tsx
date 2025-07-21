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
      <nav className="navbar">
        <Link href="/">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <Image src="/images/logo.png" alt="logo" width={46} height={44} />
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <NavItems />
          <SignedOut>
            <SignInButton>
              <button className="btn-signin">Sign In</button>
            </SignInButton>
            <SignUpButton>
                <button className="btn-signup">Sign Up</button>
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
  