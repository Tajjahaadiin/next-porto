'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import ExperiencesForm from './projects-form'
type Props = {
  data: SelectWorkModel[]
}
export default function ExperiencesTable({ data }: Props) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  function handleCloseModal() {
    setIsCreateOpen(false)
    setIsDeleteOpen(false)
    setIsEditOpen(false)
  }
  return (
    <div className="mb-10">
      <div className="flex flex-col gap-5">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="w-[50px] m-auto shadow-sm shadow-gray-400"
            >
              <SquarePlus />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create TechStack</DialogTitle>
              <DialogDescription className="text-wrap max-w-[375px]">
                Insert techology name and url to generate new techstack here.
                Click submit when you're done.
              </DialogDescription>
            </DialogHeader>

            <ExperiencesForm
              defaultValues={{
                mode: 'create',
                imageUrl: '',
                workPosition: '',
                workPlace: '',
                workDescription: [],
                workTech: [],
                startDate: '',
                endDate: '',
              }}
              descData={['']}
              techData={['']}
              onCloseModal={handleCloseModal}
            />
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Tech Name</TableHead>
              <TableHead>Tech Image Url</TableHead>
              <TableHead className="text-right">Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((work) => (
              <TableRow key={work.id}>
                <TableCell className="font-medium">
                  <Image
                    src={work.imageUrl || ''}
                    width={500}
                    height={500}
                    alt={work.workPlace || ''}
                    className="aspect-square object-contain size-10"
                  />
                </TableCell>
                <TableCell>{work.workPosition}</TableCell>
                <TableCell>{work.workPlace}</TableCell>

                <TableCell>
                  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Edit className="text-blue-600" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit TechStack</DialogTitle>
                        <DialogDescription className="text-wrap max-w-[375px]">
                          Make changes to your techstack here. Click submit when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>

                      <ExperiencesForm
                        defaultValues={{ mode: 'edit', ...work }}
                        onCloseModal={handleCloseModal}
                        descData={work.workDescription}
                        techData={work.workTech}
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <SquareX className="text-red-500" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Delete TechStack</DialogTitle>
                      </DialogHeader>

                      <ExperiencesForm
                        defaultValues={{ mode: 'delete', id: work.id }}
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
