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
import InputText from "../../../components/input-text";
import Text from "../../../components/text";
import SelectCheckboxIlustration from "../../../assets/images/select-checkbox.svg?react";

import Skeleton from "../../../components/skeleton";
import PhotoImageSelectable from "../../photos/models/components/photo-image-selectable";
import usePhotos from "../../photos/hooks/use-photos";
import { albumNewFormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAlbum from "../hooks/use-album";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const form = useForm<albumNewFormSchema>({
    resolver: zodResolver(albumNewFormSchema),
  });
  const { photos, isLoadingPhotos } = usePhotos();
  const { createAlbum } = useAlbum();
  const [isCreatingAlbum, setIsCreatingAlbum] = React.useTransition();

  React.useEffect(() => {
    if (!modalOpen) {
      form.reset();
    }
  }, [form, modalOpen]);

  function handleTogglePhoto(selected: boolean, photoId: string) {
    const photosIds = form.getValues("photoIds") || [];
    let newValue = [];

    if (selected) {
      newValue = [...photosIds, photoId];
    } else {
      newValue = photosIds.filter((id) => id !== photoId);
    }

    form.setValue("photoIds", newValue);
  }

  function handleSubmit(payload: albumNewFormSchema) {
    setIsCreatingAlbum(async () => {
      await createAlbum(payload);
      setModalOpen(false);
    });
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Create Album</DialogHeader>
          <DialogBody className="flex flex-col gap-5">
            <InputText
              placeholder="add a title"
              error={form.formState.errors.title?.message}
              {...form.register("title")}
            />
            <div className="space-y-3">
              <Text as="div" variant="label-small">
                Registered photos
              </Text>

              {!isLoadingPhotos && photos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photos.map((photo) => (
                    <PhotoImageSelectable
                      key={photo.id}
                      src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                      title={photo.title}
                      className="w-20 h-20 rounded"
                      imageClassName="w-20 h-20 "
                      onSelectImage={(selected) =>
                        handleTogglePhoto(selected, photo.id)
                      }
                    />
                  ))}
                </div>
              )}

              {isLoadingPhotos && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={`photo-loading-${index}`}
                      className="w-20 h-20 rounded-lg"
                    />
                  ))}
                </div>
              )}

              {!isLoadingPhotos && photos.length == 0 && (
                <div className="w-full flex flex-col justify-center items-center gap-3">
                  <SelectCheckboxIlustration />
                  <Text variant="paragraph-medium" className="text-center">
                    Any photo available for selection
                  </Text>
                </div>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" disabled={isCreatingAlbum}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isCreatingAlbum}
              handling={isCreatingAlbum}
            >
              {isCreatingAlbum ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
