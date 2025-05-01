import Link from 'next/link'
import ThemeToggler from './theme-toggler'
import Image from 'next/image'
import WhatsappdButton from './button/whatsapp'
import DownloadButton from './button/download'
import Dropdown from './dropdown'
const navLinks = [
  { href: '#techstack', label: 'Tech Stack' },
  { href: '#experiences', label: 'Experiences' },
  { href: '#projects', label: 'Projects' },
]
const Header = () => {
  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-30 bg-[#F8F8FF] dark:bg-gray-900 transition-color duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group">
              <Image
                src="/logo.svg"
                alt="logo"
                className="h-10 shadow-lg shadow-gray-800 rounded-sm w-auto transition-transform duration-300 group-hover:scale-110"
                width={500}
                height={500}
              />
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className=" group text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900  dark:hover:text-white  "
                >
                  <span className="transition delay-50 duration-300 ease-in-out group-hover:-translate-y-1 group-hover:scale-110">
                    {label}
                  </span>
                </Link>
              ))}

              {/* Whatsapp Button */}
              <WhatsappdButton />
              {/* CV Download Button */}
              <DownloadButton />

              <ThemeToggler />
            </div>
            {/* Mobile Menu */}
            <div className="flex items-center space-x-4 md:hidden">
              <ThemeToggler />
              {/* dropdown */}
              <Dropdown />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Header
