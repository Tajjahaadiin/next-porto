'use client'
import { SelectWorkModel } from '@/db/schema/experiences'
import { useState } from 'react'
import ExperiencesForm from './_components/create-experiences-form'
type Props = {
  data: SelectWorkModel[]
}
export default function CreateExperiences({ data }: Props) {
  return (
    <div className="mb-10">
      <div className="flex flex-col gap-5">
        <ExperiencesForm
          defaultValues={{
            mode: 'create',
            imageUrl: '',
            publicId: '',
            workPosition: '',
            workPlace: '',
            workDescription: [],
            workTech: [],
            startDate: '',
            endDate: '',
          }}
        />
      </div>
    </div>
  )
}
