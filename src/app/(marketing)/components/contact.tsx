import { Mail } from 'lucide-react'

const ContactSection = () => {
  return (
    <div id="contact">
      <div className="mb-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Let&apos;s build something together
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">
          Feel free to reach out if you&apos;re looking for a developer, have a
          question, or just want to connect.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <a
            href="mailto:tajjuddiinauliya@gmail.com"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <Mail />
            <span className="text-sm">tajjuddiinauliya@gmail.com</span>
          </a>
          <span className="hidden md:inline text-gray-300 dark:text-gray-600">
            |
          </span>
          <div className="flex items-center space-x-2">
            <img src="whatsapp.png" alt="WhatsApp" className="w-5 h-5 mr-2" />
            <span className="text-sm">+62 878-616-04875</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ContactSection
