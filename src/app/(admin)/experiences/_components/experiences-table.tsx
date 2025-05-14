'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SelectWorkModel } from '@/db/schema/experiences'
import { Edit, SquarePlus, SquareX } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ExperiencesForm from '../create/_components/create-experiences-form'
import Link from 'next/link'
import DeleteWorkForm from './delete-experiences'
import { cn } from '@/lib/utils'
import EditExperiencesForm from './edit-experiences-form'
type SelectExperiences = {
  id: string
  imageUrl: string | null
  publicId: string | null
  workPosition: string | null
  workPlace: string | null
  workDescription: string[]
  workTech: string[]
  startDate: string
  endDate: string
}
type Props = {
  workData: SelectExperiences[]
}
export default function ExperiencesTable({ workData }: Props) {
  const [selectedWork, setSelectedWork] = useState<SelectWorkModel | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  function handleCloseModal() {
    setIsDeleteOpen(false)
    setIsEditOpen(false)
  }
  return (
    <div className="mb-10">
      <div className="flex flex-col gap-5">
        <Link
          href={'/experiences/create'}
          className="group-hover:cursor-pointer flex justify-center items-center w-full h-full transition-all duration-200 ease-in-out"
        >
          <Button
            variant="link"
            className="group w-[50px] m-auto shadow-sm shadow-gray-400 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <SquarePlus className="transition-transform duration-200 ease-in-out group-hover:scale-110 group-active:scale-95" />
          </Button>
        </Link>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Work Place</TableHead>
              <TableHead className="text-right">edit</TableHead>
              <TableHead className="text-right">delete </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workData.map((work) => (
              <TableRow key={work.id}>
                <TableCell className="font-medium">
                  {work.imageUrl && (
                    <>
                      <Image
                        src={work.imageUrl || ''}
                        width={500}
                        height={500}
                        alt={work.workPlace || ''}
                        className="aspect-square object-contain size-10"
                      />
                    </>
                  )}
                </TableCell>
                <TableCell>{work.workPosition}</TableCell>
                <TableCell>{work.workPlace}</TableCell>

                <TableCell>
                  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        onClick={() => {
                          setSelectedWork(work)
                          setIsEditOpen(true)
                        }}
                        className="group w-[50px] m-auto shadow-sm shadow-gray-400 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                      >
                        <Edit className="text-blue-500 transition-transform duration-200 ease-in-out group-hover:scale-110 group-active:scale-95" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className={cn(
                        ' h-[90vh] min-w-[90vw]',
                        'max-h-full',
                        'p-0'
                      )}
                    >
                      <DialogHeader className="p-6 pb-4 border-b">
                        <DialogTitle className="font-extrabold">
                          Edit Experiences
                        </DialogTitle>
                        <DialogDescription>
                          Change Your Experiences Data Here!!!
                        </DialogDescription>
                      </DialogHeader>

                      <div className="p-10 pb-5 overflow-y-auto  overflow-x-hidden">
                        <EditExperiencesForm
                          oncloseModal={handleCloseModal}
                          defaultValues={{
                            mode: 'edit',
                            id: selectedWork?.id || 'test',
                            startDate: selectedWork?.startDate || '',
                            endDate: selectedWork?.endDate || '',
                            workDescription:
                              selectedWork?.workDescription.map((desc) => ({
                                value: desc,
                              })) || [],
                            workTech:
                              selectedWork?.workTech.map((tech) => ({
                                value: tech,
                              })) || [],
                            workPlace: selectedWork?.workPlace || '',
                            workPosition: selectedWork?.workPosition || '',
                            imageUrl: selectedWork?.imageUrl || '',
                          }}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  {/* delete data */}
                  <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedWork(work)
                          setIsDeleteOpen(true)
                        }}
                      >
                        <SquareX className="text-red-500" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-center font-extrabold text-xl">
                          Delete Experiences
                        </DialogTitle>
                      </DialogHeader>
                      <DeleteWorkForm
                        defaultValues={{
                          mode: 'delete',
                          id: selectedWork?.id ?? '',
                          publicId: selectedWork?.publicId,
                        }}
                        onCloseModal={handleCloseModal}
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
