'use client'
import { SelectUserModel } from '@/db/schema/user'
import useInteractiveImage from '@/hooks/use-animate-image'
import { Circle, MapPin } from 'lucide-react'
import Image from 'next/image'
import DownloadButton from './button/download'
import WhatsappdButton from './button/whatsapp'

const TextContent = (content: SelectUserModel) => {
  const { containerRef, handleMouseLeave, handleMouseMove, transform } =
    useInteractiveImage()

  return (
    <div className="flex flex-col md:flex-row justify-center gap-x-20">
      <div
        className="group md:shrink-0 items-center  "
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="relative flex justify-center md:relative left-50 md:left-0"
          style={{ width: '20rem', height: '22rem', top: 0, transform }}
        >
          <Image
            src={content.avatarUrl || '/profiles'}
            alt={content.nickname}
            objectFit="cover"
            layout="fill"
            className={` !md:max-h-8 rounded-md shadow-gray-800 dark:shadow-sky-950  shadow-2xl transition-transform duration-300 group-hover:scale-110   `}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <h1
          className={`text-center font-bold text-2xl md:text-7xl md:text-left bg-gradient-to-br from-green-600 dark:from-green-200  via-green-400 dark:via-green-600 to-gray-900 dark:to-white bg-clip-text text-transparent md:min-h-20 `}
        >
          {`Hi There, I'm ${content.nickname}` || ''}
        </h1>
        <h2
          className={`text-center font-semibold text-1xl  md:text-left md:text-lg  `}
        >
          {content.shortDescription || ''}
        </h2>
        <div className="">
          <p className={`text-center md:text-left md:text-md md:max-w-xl `}>
            {content.description || ''}
          </p>
        </div>
        <div className="flex space-y-1 flex-col  lg:flex-col ">
          <div className="flex gap-1 justify-center md:justify-start  ">
            <MapPin className="size-4" />
            <span className="text-1xl md:text-sm ">
              {content.location || ''}
            </span>
          </div>
          <div className="flex items-center justify-center  lg:justify-start gap-2">
            <Circle className="font-extrabold size-2  justify-center ml-1 text-green-400 rounded-full bg-green-400" />
            <span className="right-7 text-center text-1xl md:text-sm ">
              {content.isAvailable
                ? 'available for new project'
                : 'already hired. for further information feel free to contact me'}
            </span>
          </div>
        </div>
        <div className="flex gap-5">
          <WhatsappdButton />
          <DownloadButton />
        </div>
      </div>
    </div>
  )
}
export default TextContent
