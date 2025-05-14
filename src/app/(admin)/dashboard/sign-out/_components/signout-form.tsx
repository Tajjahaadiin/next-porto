'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { signOut } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { Power } from 'lucide-react'
import { useState } from 'react'
import { signOutAction } from '../action'
export default function SignOutForm() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={cn('flex justify-center items-center min-h-screen')}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gray-200 aspect-square h-[35vw]">
          <form action={() => signOutAction()}>
            <DialogTitle className="flex justify-center items-center py-5  font-bold text-center text-3xl">
              Sign-Out
            </DialogTitle>
            <div className="flex flex-col justify-center items-center py-10  gap-5">
              <Power className="size-20 text-red-100 bg-red-500 rounded-full shadow-gray-400 shadow-md" />
              <div>
                <h2 className="text-lg text-center font-semibold">
                  Are you sure you want to Sign-Out?
                </h2>
                <p className="text-center">
                  Once you sign out, you’ll need to sign in again.{' '}
                  <span className="font-semibold">Are you okay with that?</span>
                </p>
              </div>
            </div>
            <DialogFooter>
              <div className="flex items-center w-full gap-5">
                <DialogClose asChild className="flex-1/2">
                  <Button type="button" variant="default">
                    Close
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="destructive"
                  className="flex-1/2"
                  onSubmit={() => console.log('submitting...')}
                >
                  Sign Out
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
