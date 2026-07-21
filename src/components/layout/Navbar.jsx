import { useState, useEffect } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'

const leftNavItems = [
  { label: 'Home', href: '#home' },
  { label: 'Map', href: '#map-preview' },
  { label: 'Report', href: '#community' },
  { label: 'Community', href: '#community' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div
        className={`pointer-events-auto w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md  shadow-xs py-1'
            : 'bg-transparent py-0'
        }`}
      >
        <div className="mx-auto flex py-4 md:py-3 max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16">

          {/* Brand/Logo */}
          <a
            href="#home"
            onClick={closeMenu}
            className="flex items-center gap-3 font-display text-xl font-medium text-black transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400 focus-visible:outline-offset-4"
          >
            <img
              src="/logo/Logo.png"
              alt="Logo Inkluvy"
              className="h-8 w-auto object-contain"
            />
            <span>INKLUVY</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-10 lg:flex" aria-label="Navigasi utama desktop">
            {leftNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm tracking-wide font-normal text-gray-600 transition-colors duration-200 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400 focus-visible:outline-offset-4"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* Desktop Right Section: Profile */}
          <div className="hidden items-center gap-8 lg:flex">
            <button className="flex items-center gap-5 rounded-full py-2 hover:opacity-85 transition-opacity">
              <span className="text-sm font-medium text-slate-800">Syahla Aulia</span>
              <img
                src="/images/profile-avatar.png"
                alt="Foto profil Syahla Aulia"
                className="size-8 rounded-full object-cover ring-2 ring-slate-100"
              />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-slate-800 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-accent-400"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <LuX className="size-6" /> : <LuMenu className="size-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-full bg-white border-b border-gray-100 px-6 py-6 shadow-lg lg:hidden animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-4 mb-6" aria-label="Navigasi utama mobile">
              {leftNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-base font-normal text-gray-600 py-2 hover:text-black border-b border-slate-50 last:border-0"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* Mobile Profile Area */}
            <div className="pt-5 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/images/profile-avatar.png"
                  alt="Foto profil Syahla Aulia"
                  className="size-10 rounded-full object-cover ring-2 ring-slate-100"
                />
                <span className="text-base font-medium text-slate-800">Syahla Aulia</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
