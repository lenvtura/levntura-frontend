import Link from 'next/link';
import { MenuIcon } from 'lucide-react';

import { LevunturaFullLogo } from '@/atoms/logo';
import { NavLinks } from '@/atoms/nav-links';
import { StartNowBtn } from '@/atoms/start-now-btn';

import { HEADER_HEIGHT } from '@/constants/header-height';
import { Routes } from '@/constants/routes';

export function Header() {
  return (
    <div
      style={{ height: HEADER_HEIGHT }}
      className='container bg-transparent mix-blend-difference z-[900] fixed left-1/2 -translate-x-1/2 top-0 flex justify-between items-center'
    >
      <Link href={Routes.home} className='text-white max-w-[160px] shrink-0'>
        <LevunturaFullLogo />
      </Link>

      <div className='max-xl:hidden-with-animate block-with-animate transition-all duration-1000 flex justify-center items-center gap-12'>
        <NavLinks />
      </div>

      <div className='max-xl:hidden-with-animate  block-with-animate transition-all duration-1000'>
        <StartNowBtn className='border-white text-white' />
      </div>

      <MenuIcon className='xl:hidden-with-animate text-white block-with-animate transition-all duration-1000 shrink-0' />
    </div>
  );
}
