// components/form-controllers/image-upload.tsx
'use client'
import { ChangeEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { XCircle } from 'lucide-react'

interface ImageUploadProps {
  initialUrl?: string
  onFileSelect: (file: File | null) => void
}

export function ImageUpload({
  initialUrl = '',
  onFileSelect,
}: ImageUploadProps) {
  const [preview, setPreview] = useState(initialUrl || '')
  const inputFileRef = useRef<HTMLInputElement | null>(null)

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    onFileSelect(file)
  }

  function handleResetPreview() {
    setPreview(initialUrl)
    onFileSelect(null)
    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col  gap-2">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border border-gray-500"
        ref={(e) => {
          inputFileRef.current = e
        }}
      />

      {preview && (
        <div className="relative mt-2 w-52 h-52 rounded-md overflow-hidden shadow-md border">
          <Image src={preview} alt=" preview" fill className="object-contain" />
          <button
            type="button"
            onClick={handleResetPreview}
            className="absolute top-1 right-1 text-red-600 hover:text-red-800 bg-gray-100 rounded-full shadow-md"
          >
            <XCircle size={24} />
          </button>
        </div>
      )}
    </div>
  )
}
