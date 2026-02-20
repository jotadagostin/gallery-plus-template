import React from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import Button from "../../../components/button";
import Text from "../../../components/text";
import useAlbum from "../hooks/use-album";
import type { Album } from "../models/album";

interface AlbumDeleteDialogProps {
  album: Album;
  trigger: React.ReactNode;
  onSuccess?: () => void;
}

export default function AlbumDeleteDialog({
  album,
  trigger,
  onSuccess,
}: AlbumDeleteDialogProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const { deleteAlbum } = useAlbum();
  const [isDeletingAlbum, setIsDeletingAlbum] = React.useTransition();

  function handleDelete() {
    setIsDeletingAlbum(async () => {
      await deleteAlbum(album.id);
      setModalOpen(false);
      onSuccess?.();
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Delete Album</DialogHeader>
        <DialogBody className="flex flex-col gap-5">
          <Text variant="paragraph-large">
            Are you sure you want to delete the album{" "}
            <span className="font-semibold">"{album.title}"</span>? This action
            cannot be undone.
          </Text>
        </DialogBody>
        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeletingAlbum}
          >
            Delete Album
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
