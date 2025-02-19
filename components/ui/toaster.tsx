"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
 
  ToastProvider,
 
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    
      <ToastProvider  duration={2000} >
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="bg-red-100 text-black border border-gray-200 shadow-lg" style={{ zIndex: 9999 }}>
            <div className="grid gap-1">
              {title && <div className="font-semibold">{title}</div>}
              {description && <div className="text-sm opacity-90">{description}</div>}
            </div>
            {action}
          </Toast>
        )
      })}
      <ToastViewport />
     
    </ToastProvider>
  )
}
