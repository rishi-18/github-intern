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
    <nav className='flex items-center gap-4'>
        {navItems.map(({label,href})=>(
            <Link href={href} key={label} className={cn(pathname===href && 'text-primary font-semibold')}>{label}</Link>
        ))}
    </nav>
  )
}

export default NavItems
