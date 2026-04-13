// components/AuthRequiredModal/AuthRequiredModal.tsx для layout.tsx, чтобы открывать при добавлении в корзину без авторизации

"use client"

import { useRouter } from "next/navigation"
import { useAuthModalStore } from "@/store/authModalStore"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

export const AuthRequiredModal = () => {
  const router = useRouter()
  const { isOpen, close } = useAuthModalStore()

  const handleLogin = () => {
    close()
    router.push("/login")
  }

  const handleRegister = () => {
    close()
    router.push("/register")
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-sm text-center rounded-[4px]">
        <DialogHeader className="items-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <ShoppingBag size={22} />
          </div>
          <DialogTitle>Sign in to add to cart</DialogTitle>
          <DialogDescription>
            Create an account or sign in to reserve cards and proceed to checkout.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button variant="loadMore" className="w-full" onClick={handleLogin}>
            Sign in
          </Button>
          <Button variant="outline" className="w-full" onClick={handleRegister}>
            Create account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}