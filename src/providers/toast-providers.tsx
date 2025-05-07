'use client'

import { Toaster } from 'sonner'
import { toast as rawToast } from 'sonner'
import React from 'react'
const ClientToaster = () => {
  return <Toaster />
}

export default ClientToaster

export function toast(response: unknown) {
  if (
    typeof response === 'object' &&
    response !== null &&
    response !== undefined
  ) {
    const res = response as { message?: unknown; success?: unknown }

    if (typeof res.message === 'string' && typeof res.success === 'boolean') {
      switch (res.success) {
        case true:
          rawToast.success(res.message)
          break
        case false:
          rawToast.error(res.message)
      }

      return
    }
  }
  if (!!response) {
    rawToast.error('invalid response')
  }
}
