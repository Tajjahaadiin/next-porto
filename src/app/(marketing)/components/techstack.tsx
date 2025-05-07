'use server'
import { cn } from '@/lib/utils'
import { Marquee } from './marquee'
import Image from 'next/image'
import Spinner from '@/components/spinner'
import { SelectTechstackModel } from '@/db/schema/techstack'
import { getTechstacks } from '@/app/queries'

const ReviewCard = (value: SelectTechstackModel) => {
  return (
    <figure
      className={cn(
        'relative aspect-square shadow-[6px_6px_12px_#c5c5c5,-2px_-2px_12px_#ffffff] dark:shadow-[5px_5px_12px_#1a253d] max-h-20  cursor-pointer overflow-hidden rounded-md border p-3 mx-5',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
      )}
    >
      <div className="">
        <Image
          className="aspect-square object-contain"
          alt={value.techName || ''}
          src={value.techUrl || ''}
          draggable="false"
          height={500}
          width={500}
        />
      </div>
    </figure>
  )
}

export async function MarqueeDemo() {
  const techstacks: SelectTechstackModel[] = await getTechstacks()
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-20 gap-20 ">
      <h2 className="text-4xl font-medium text-left ">
        Tech Stack - Tools I Use Everyday
      </h2>
      <Marquee pauseOnHover className="[--duration:20s] ">
        <>
          {techstacks.map((value) => (
            <ReviewCard {...value} key={value.id} />
          ))}
        </>
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  )
}
