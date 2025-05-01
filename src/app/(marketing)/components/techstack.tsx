'use client'
import { cn } from '@/lib/utils'
import { Marquee } from './marquee'
import Image from 'next/image'
import { useGetTech } from '@/hooks/use-techstack'
import Spinner from '@/components/spinner'

// const reviews = [
//   {
//     name: 'React',
//     img: '/techstack/react.png',
//   },
//   {
//     name: 'typescript',
//     img: '/techstack/typescript.png',
//   },
//   {
//     name: 'tailwind',
//     img: '/techstack/tailwind.png',
//   },
//   {
//     name: 'nextjs',
//     img: '/techstack/next.png',
//   },
// ]

// const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({
  techName,
  imageUrl,
}: {
  imageUrl: string
  techName: string
}) => {
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
          alt={techName}
          src={imageUrl}
          draggable="false"
          height={500}
          width={500}
        />
      </div>
    </figure>
  )
}

export function MarqueeDemo() {
  const { techstacks, error, isLoading, isError } = useGetTech()
  console.table(techstacks)
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        <p>Error loading content: {String(error)}</p>
      </div>
    )
  }

  if (!techstacks) {
    return null
  }
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden mt-20 gap-20 ">
      <h2 className="text-4xl font-medium text-left ">
        Tech Stack - Tools I Use Everyday
      </h2>
      <Marquee pauseOnHover className="[--duration:20s] ">
        {techstacks.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  )
}
