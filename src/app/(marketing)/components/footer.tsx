import { Github, Linkedin } from 'lucide-react'
const iconLinkClass =
  'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'

const FooterSection = () => {
  return (
    <footer className="py-8 text-center text-gray-600 dark:text-gray-400 text-sm border-t border-gray-300 dark:border-gray-700">
      <p>© 2025 Build with ❤️ and sweat by Tajjuddiin</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a
          aria-label="GitHub Profile"
          href="https://github.com/tajjahaadiin"
          target="_blank"
          className={iconLinkClass}
          rel="noopener noreferrer"
        >
          <Github />
        </a>
        <a
          aria-label="linkedin Profile"
          href="https://www.linkedin.com/in/tajjahaadiin"
          target="_blank"
          className={iconLinkClass}
          rel="noopener noreferrer"
        >
          <Linkedin />
        </a>
      </div>
    </footer>
  )
}

export default FooterSection
