import { Menu } from 'lucide-react'
import Link from 'next/link'
const menuLinks = [
  { href: '#techstack', label: 'Tech Stack' },
  { href: '#experiences', label: 'Experiences' },
  { href: '#projects', label: 'Projects' },
]
const Dropdown = () => {
  return (
    <div className=" relative inline-block text-left dropdown">
      <button
        className=" px-1 py-1   text-gray-700 dark:text-white transition duration-150 ease-in-out bg-white dark:bg-gray-900 border border-gray-300 rounded-sm focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
        type="button"
      >
        <Menu className="size-4" />
      </button>

      <div className="hidden dropdown-menu">
        <div
          className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-gray-900 border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
          aria-labelledby="menu-button-1"
          id="menu-items-117"
          role="menu"
        >
          <div className="px-4 py-3">
            <p className="text-sm leading-5">Menu</p>
          </div>
          <div className="py-1">
            {menuLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 dark:text-white flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                role="menuitem"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dropdown
