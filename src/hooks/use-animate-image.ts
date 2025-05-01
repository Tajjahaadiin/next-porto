'use client'
import { useState, useRef } from 'react'

const useInteractiveImage = () => {
  const [transform, setTransform] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -10 // invert for natural tilt
    const rotateY = ((x - centerX) / centerX) * 10

    setTransform(
      `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    )
  }

  function handleMouseLeave() {
    setTransform('perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)')
  }

  return {
    transform,
    setTransform,
    handleMouseLeave,
    handleMouseMove,
    containerRef,
  }
}
export default useInteractiveImage
