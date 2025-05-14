'use client'
import { SelectWorkModel } from '@/db/schema/experiences'
import { useState } from 'react'
import ExperiencesForm from './_components/create-experiences-form'

export default function CreateExperiences() {
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
