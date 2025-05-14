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
import { SelectProjectModel } from '@/db/schema/project'
import ProjectForm from './projects-form'
import { cn } from '@/lib/utils'
type Props = {
  data: SelectProjectModel[]
}
export default function ExperiencesTable({ data }: Props) {
  const [selected, setSelectedProject] = useState<SelectProjectModel | null>(
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
    <div className="mb-10">
      <div className="flex flex-col gap-5 px-20">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="w-[50px] transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer m-auto shadow-sm shadow-gray-400"
            >
              <SquarePlus />
            </Button>
          </DialogTrigger>
          <DialogContent
            className={cn(' h-[90vh] min-w-[90vw]', 'max-h-full', 'p-0')}
          >
            <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle className="font-extrabold">
                Create Project
              </DialogTitle>
              <DialogDescription className="text-wrap max-w-[375px]">
                Insert new project.fill the project form thenClick submit when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="p-10 pb-5  overflow-y-scroll  overflow-x-hidden">
              <ProjectForm
                defaultValues={{
                  mode: 'create',
                  techList: [],
                  publicId: '',
                  projectName: '',
                  description: '',
                  imageUrl: '',
                  demoUrl: '',
                  repoUrl: '',
                }}
                onCloseModal={handleCloseModal}
              />
            </div>
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <Image
                    src={project.imageUrl || ''}
                    width={500}
                    height={500}
                    alt={project.imageUrl || ''}
                    className="aspect-square object-contain size-10"
                  />
                </TableCell>
                <TableCell>{project.projectName}</TableCell>
                <TableCell>
                  <p className="text-wrap">{project.description}</p>
                </TableCell>
                <TableCell>
                  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedProject(project)
                          setIsEditOpen(true)
                        }}
                        className="w-[50px] transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer m-auto shadow-sm shadow-gray-400"
                      >
                        <Edit className="text-blue-600" />
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
                        <DialogTitle className="font-bold">
                          Edit Project
                        </DialogTitle>
                        <DialogDescription className="text-wrap max-w-[375px]">
                          Make changes to your Project here. Click submit when
                          you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="p-10 pb-5 overflow-y-auto  overflow-x-hidden">
                        <ProjectForm
                          defaultValues={{
                            mode: 'edit',
                            description: selected?.description || '',
                            id: selected?.id || '',
                            demoUrl: selected?.demoUrl || '',
                            projectName: selected?.projectName || '',
                            imageUrl: selected?.imageUrl || '',
                            publicId: selected?.publicId || '',
                            techList:
                              selected?.techList?.map((tech) => ({
                                value: tech,
                              })) || [],
                          }}
                          onCloseModal={handleCloseModal}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedProject(project)
                          setIsDeleteOpen(true)
                        }}
                        className="w-[50px] transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95 cursor-pointer m-auto shadow-sm shadow-gray-400"
                      >
                        <SquareX className="text-red-500 " />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Delete Project</DialogTitle>
                      </DialogHeader>
                      <ProjectForm
                        defaultValues={{
                          mode: 'delete',
                          id: selected?.id || '',
                          publicId: selected?.publicId,
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
