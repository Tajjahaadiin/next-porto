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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SelectTechstackModel, TechStackSchema } from '@/db/schema/techstack'
import { getRelativeTime } from '@/lib/time-utils'
import { Edit, SquarePlus, SquareX } from 'lucide-react'
import Image from 'next/image'
import TechForm from './techs-form'
import { useState } from 'react'
type Props = {
  data: SelectTechstackModel[]
}
export default function TechTable({ data }: Props) {
  const [selectedTech, setSelectedTech] = useState<SelectTechstackModel | null>(
    null
  )
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  function handleCloseModal() {
    setIsCreateOpen(false)
    setIsDeleteOpen(false)
    setIsEditOpen(false)
  }
  return (
    <div className="mb-10 w-4xl">
      <div className="flex flex-col gap-5 ">
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

            <TechForm
              defaultValues={{
                mode: 'create',
                techName: '',
                techUrl: '',
                publicId: '',
              }}
              onCloseModal={handleCloseModal}
            />
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead className="w-[100px]">Tech Name</TableHead>
              <TableHead className="w-[100px]">Tech Image Url</TableHead>
              <TableHead className="text-left w-[100px]">Updated At</TableHead>
              <TableHead className="w-[100px]">Edit</TableHead>
              <TableHead className="w-[100px]">delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((tech) => (
              <TableRow key={tech.id}>
                <TableCell className="font-medium">
                  <Image
                    src={tech.techUrl || ''}
                    width={500}
                    height={500}
                    alt={tech.techName || ''}
                    className="aspect-square object-contain size-10"
                  />
                </TableCell>
                <TableCell>{tech.techName}</TableCell>
                <TableCell className="break-all max-w-[50px] h-20">
                  <p className="text-wrap">{tech.techUrl}</p>
                </TableCell>
                <TableCell className="text-left">
                  {getRelativeTime(tech.updatedAt.toISOString())}
                </TableCell>
                <TableCell>
                  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedTech(tech)
                          setIsEditOpen(true)
                        }}
                      >
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

                      <TechForm
                        defaultValues={{
                          mode: 'edit',
                          id: selectedTech?.id || '',
                          publicId: selectedTech?.publicId,
                          techName: selectedTech?.techName || '',
                          techUrl: selectedTech?.techUrl,
                        }}
                        onCloseModal={handleCloseModal}
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedTech(tech)
                          setIsDeleteOpen(true)
                        }}
                      >
                        <SquareX className="text-red-500" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Delete TechStack</DialogTitle>
                      </DialogHeader>

                      <TechForm
                        defaultValues={{
                          mode: 'delete',
                          id: selectedTech?.id ?? '',
                          publicId: selectedTech?.publicId,
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
