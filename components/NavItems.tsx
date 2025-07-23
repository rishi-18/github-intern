'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link'
import React from 'react'
import {usePathname} from "next/navigation";

const navItems = [{label:"Home",href:'/'},
                  {label:'Features',href:'/features'},
                  {label:'About',href:'/about'}
                 ]

const NavItems = () => {
    const pathname = usePathname();

  return (
    <nav className='flex items-center gap-6'>
        {navItems.map(({label,href})=>(
            <Link
              href={href}
              key={label}
              className={cn(
                'transition-colors px-3 py-1 rounded-md',
                pathname===href
                  ? 'text-accent-secondary font-semibold shadow-[0_0_8px_0_var(--accent-secondary)]'
                  : 'text-secondary hover:text-accent-secondary hover:shadow-[0_0_8px_0_var(--accent-secondary)]'
              )}
            >
              {label}
            </Link>
        ))}
    </nav>
  )
}

export default NavItems
