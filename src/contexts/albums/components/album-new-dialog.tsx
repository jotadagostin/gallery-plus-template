import type React from "react";
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
import type { Photo } from "../../photos/models/photo";
import Skeleton from "../../../components/skeleton";
import PhotoImageSelectable from "../../photos/models/components/photo-image-selectable";

interface AlbumNewDialogProps {
  trigger: React.ReactNode;
}

export default function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const photos: Photo[] = [
    {
      id: "123",
      title: "Hello world!",
      imageId: "portrait-tower.png",
      albums: [
        { id: "3421", title: "Album 1" },
        { id: "123", title: "Album 2" },
        { id: "456", title: "Album 3" },
      ],
    },
    {
      id: "432",
      title: "Hello world!",
      imageId: "portrait-tower.png",
      albums: [
        { id: "3421", title: "Album 1" },
        { id: "123", title: "Album 2" },
        { id: "456", title: "Album 3" },
      ],
    },
  ];
  const isLoadingPhotos = false;

  function handleTogglePhoto(selected: boolean, photoId: string) {
    console.log(selected, photoId);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Create Album</DialogHeader>
        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="add a title" />
          <div className="space-y-3">
            <Text as="div" variant="label-small">
              Registered photos
            </Text>

            {!isLoadingPhotos && photos.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {photos.map((photo) => (
                  <PhotoImageSelectable
                    key={photo.id}
                    src={`/images/${photo.imageId}`}
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
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
