
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCartStore } from "@/store/cartStore";

import Image from "next/image";
import Link from "next/link";

const CartModal = () => {
  const { isOpen, closeModal, lastAdded } = useCartStore();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <DialogContent className="sm:max-w-md">

        <DialogHeader>
          <DialogTitle className="text-xl">
            Added to cart
          </DialogTitle>
        </DialogHeader>

        {lastAdded && (
          <div className="flex flex-col items-center gap-5">

            <Image
              src={lastAdded.image}
              alt={lastAdded.name}
              className="w-36 rounded-md shadow"
              width={144}
              height={144}
            />

            <p className="text-center font-medium">
              {lastAdded.name}
            </p>

            <div className="flex w-full gap-3">

              {/* <Link href="/cart" className="flex-1"> */}
              <Link href="/cart" onClick={closeModal} className="flex-1">
                <button className="w-full bg-black text-white py-2 rounded-md">
                  View cart
                </button>
              </Link>

              <button
                onClick={closeModal}
                className="flex-1 border py-2 rounded-md"
              >
                Continue
              </button>

            </div>

          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CartModal;