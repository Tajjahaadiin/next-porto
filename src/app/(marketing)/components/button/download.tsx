import Link from 'next/link'
import { FileDown } from 'lucide-react'
const DownloadButton = () => {
  return (
    <Link
      href="#"
      target="_blank"
      className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors flex items-center font-medium"
    >
      <FileDown className="mr-2 size-3" />
      Download CV
    </Link>
  )
}
export default DownloadButton
