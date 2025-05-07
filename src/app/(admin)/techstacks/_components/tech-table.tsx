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
  data: Pick<
    SelectTechstackModel,
    'id' | 'techName' | 'techUrl' | 'updatedAt'
  >[]
}
export default function TechTable({ data }: Props) {
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

            <TechForm
              defaultValues={{ mode: 'create', techName: '', techUrl: '' }}
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
                <TableCell>{tech.techUrl}</TableCell>
                <TableCell className="text-right">
                  {getRelativeTime(tech.updatedAt.toISOString())}
                </TableCell>
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

                      <TechForm
                        defaultValues={{ mode: 'edit', ...tech }}
                        onCloseModal={handleCloseModal}
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

                      <TechForm
                        defaultValues={{ mode: 'delete', id: tech.id }}
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
