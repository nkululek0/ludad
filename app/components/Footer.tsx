import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

import Instagram from '/icons/instagram.svg';
import Facebook from '/icons/facebook.svg';
import X from '/icons/x.svg';
import { Mail, MapIcon, Phone } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="bg-brand-main text-white">
            {/* Newsletter Signup */}
            {/* <NewsletterForm /> */}

            {/* Social links */}
            <div className="border-b flex space-x-4 justify-center items-center py-4">
              <p
                className='font-source text-l'
                style={{
                  textShadow: '2px 1px #C3A343'
                }}
              >
                Follow Us
              </p>
              <div className="flex space-x-2">
                <a
                  href="#"
                  className="text-white-80 hover:text-brand-gold transition-colors duration-300"
                >
                  <img
                    src={ Instagram }
                    className='w-5 h-5'
                  />
                </a>
                <a
                  href="#"
                  className="text-white-80 hover:text-brand-gold transition-colors duration-300"
                >
                  <img
                    src={ Facebook }
                    className='w-5 h-5'
                  />
                </a>
                <a
                  href="#"
                  className="text-white-80 hover:text-brand-gold transition-colors duration-300"
                >
                  <img
                    src={ X }
                    className='w-5 h-5'
                  />
                </a>
              </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Brand Column */}
                <div className="space-y-3">
                  <h3
                    className="font-playFair text-2xl"
                    style={{
                      textShadow: '2px 1px #C3A343'
                    }}
                  >
                    LUDAD
                  </h3>
                  <p className="font-source text-sm leading-relaxed">
                    Crafted with precision, designed for distinction.
                  </p>
                </div>

                {/* Place Holder Column */}
                <div className='hidden lg:block'>
                </div>

                {/* Contact Column */}
                <div className="space-y-3">
                  <h4
                    className="font-playFair text-2xl"
                    style={{
                      textShadow: '2px 1px #C3A343'
                    }}
                  >
                    SUPPORT
                  </h4>
                  <ul className="space-y-4 font-source text-sm md:flex md:space-x-12 md:space-y-0">
                    {/* <li className="flex items-start space-x-3">
                      <MapIcon className='w-5 h-5 text-black flex-shrink-0' />
                      <span>123 Example Ave<br /> Forgettable Lane, Some place 2000</span>
                    </li> */}
                    <li className="flex items-start space-x-3">
                      <Phone className='w-5 h-5 text-black flex-shrink-0' />
                      <span>+27 123 456 7890</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <Mail className='w-5 h-5 text-black flex-shrink-0' />
                      <span>email@example.com</span>
                    </li>
                  </ul>
                </div>

                {/* Quick Links Column */}
                {/* <div className="space-y-6">
                  <h4
                    className="font-playFair text-lg"
                    style={{
                      textShadow: '2px 1px #C3A343'
                    }}
                  >
                    Quick Links
                  </h4>
                  <ul className="space-y-3 font-source text-sm">
                    <li>
                      <NavLink
                        to='/collections/all'
                        className='text-white hover:text-gray-300 transition-colors duration-300'
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/pages/our-craft'
                        className='text-white hover:text-gray-300 transition-colors duration-300'
                      >
                        Our Craft
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/pages/care-guide'
                        className='text-white hover:text-gray-300 transition-colors duration-300'
                      >
                        Care Guide
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/pages/about-us'
                        className='text-white hover:text-gray-300 transition-colors duration-300'
                      >
                        About Us
                      </NavLink>
                    </li>
                  </ul>
                </div> */}

                {/* Policies Column */}
                {/* <div className="space-y-6">
                  <h4
                    className="font-playFair text-lg"
                    style={{
                      textShadow: '2px 1px #C3A343'
                    }}
                  >
                    Polices
                  </h4>
                  <FooterMenu
                    menu={ footer?.menu }
                    primaryDomainUrl={ header.shop.primaryDomain.url }
                    publicStoreDomain={ publicStoreDomain }
                  />
                </div> */}
              </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-white">
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-4 md:space-y-0">
                  <p className="font-source text-md text-center text-white">
                    &copy; { new Date().getFullYear() } LUDAD. All rights reserved
                  </p>
                </div>
              </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  return (
    <nav className="space-y-3 font-source text-sm" role="navigation">
      {
        menu?.items.map((item) => {
          if (!item.url) return null;

          const url = item.url.includes("myshopify.com") ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;

          return (
            <NavLink
              key={ item.id }
              className={({isActive}) => `black text-white hover:text-gray-300 transition-colors duration-300 ${ isActive ? 'text-brand-gold' : '' }`}
              end
              prefetch='intent'
              to={ url }
            >
              { item.title }
            </NavLink>
          )
        })
      }
    </nav>
  );
}