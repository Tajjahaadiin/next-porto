import Link from 'next/link'
import Image from 'next/image'
const WhatsappdButton = () => {
  return (
    <Link
      href={'https://wa.me/6287861604875'}
      target="_blank"
      className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg transition-colors flex items-center font-medium"
    >
      <Image
        src="/whatsapp.png"
        alt="Whatsapp"
        className="w-4 h-4 mr-2"
        width={500}
        height={500}
      />
      Lets&apos;s Talk
    </Link>
  )
}
export default WhatsappdButton
