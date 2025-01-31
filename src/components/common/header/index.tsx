import React, { memo, useCallback, useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { DarkLogo, DarkLogoTitle, Logo, LogoTitle } from 'data/logo';
import navLinks from 'data/nav-links';
import siteMetadata from 'data/site-metadata.mjs';

import { useScrollDirection } from '@/hooks/use-scroll-direction';

import SvgSwitcher from '@/components/image/svg-switcher';

import MobileNav from './mobile-nav';
import MobileNavButton from './mobile-nav-button';
import ThemeSwitch from './theme-switch';

const REDUCED_NAV_LINKS = ['Blog', 'Tags', 'Series', 'Projects'];

const NavItems = () => {
  const path = usePathname().split('/')[1];
  const isSamePath = (title: string) => path === title.toLowerCase();

  return (
    <nav className="hidden sm:block">
      <ul className="flex">
        {navLinks.map(({ href, title }, idx) => (
          <li
            key={idx}
            className={`transition-transform hover:scale-110 ${
              !REDUCED_NAV_LINKS.includes(title) ? 'hidden xl:block' : ''
            }`}
          >
            <NextLink
              href={href}
              className={`duration-default mx-1 rounded p-1 font-semibold sm:px-4 sm:py-2 ${
                isSamePath(title)
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-800 dark:text-primary-200'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              {title}
            </NextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const HeaderBody = memo(function HeadBody({
  onToggleNav,
}: {
  onToggleNav: () => void;
}) {
  return (
    <>
      <NextLink
        href="/"
        aria-label={siteMetadata.headerTitle}
        className="flex cursor-pointer items-center justify-between"
      >
        <SvgSwitcher
          className="mr-3 h-8 w-8"
          svgkey="header_logo"
          LightModeSvg={Logo}
          DarkModeSvg={DarkLogo}
        />
        <SvgSwitcher
          className="hidden h-6 w-52 md:block"
          svgkey="header_title"
          LightModeSvg={LogoTitle}
          DarkModeSvg={DarkLogoTitle}
        />
      </NextLink>
      <div className="flex items-center py-1 leading-5 sm:py-0">
        <NavItems />
        <ThemeSwitch />
        <MobileNavButton onToggleNav={onToggleNav} />
      </div>
    </>
  );
});

const Header = () => {
  const scrollDirection = useScrollDirection();
  const [navShow, setNavShow] = useState(false);

  const onToggleNav = useCallback(() => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto';
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
      }
      return !status;
    });
  }, []);

  return (
    <>
      <header
        className={`w-section transition-header fixed left-0 right-0 z-20 flex items-center justify-between border-b-2 bg-white py-2 dark:bg-gray-900 ${
          scrollDirection === 'down'
            ? '-translate-y-[70px] sm:-translate-y-16'
            : 'translate-y-0'
        }`}
      >
        <HeaderBody onToggleNav={onToggleNav} />
      </header>
      <MobileNav onToggleNav={onToggleNav} navShow={navShow} />
    </>
  );
};

export default Header;
