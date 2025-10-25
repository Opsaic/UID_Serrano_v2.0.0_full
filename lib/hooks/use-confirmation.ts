"use client"

import * as React from "react"

export function useConfirmation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [config, setConfig] = React.useState<{
    title: string
    description: string
    onConfirm: () => void | Promise<void>
    variant?: "default" | "destructive"
  } | null>(null)

  const confirm = React.useCallback(
    (options: {
      title: string
      description: string
      onConfirm: () => void | Promise<void>
      variant?: "default" | "destructive"
    }) => {
      setConfig(options)
      setIsOpen(true)
    },
    [],
  )

  const handleConfirm = async () => {
    if (config?.onConfirm) {
      await config.onConfirm()
    }
    setIsOpen(false)
  }

  return {
    isOpen,
    setIsOpen,
    config,
    confirm,
    handleConfirm,
  }
}
