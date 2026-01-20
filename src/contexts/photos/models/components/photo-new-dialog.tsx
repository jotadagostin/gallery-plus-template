import type React from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../../components/dialog";
import Button from "../../../../components/button";
import InputText from "../../../../components/input-text";
import Alert from "../../../../components/alert";
import InputSingleFile from "../../../../components/input-single-file";
import ImagePreview from "../../../../components/image-preview";
import Text from "../../../../components/text";
import type { Album } from "../../../albums/models/album";
import Skeleton from "../../../../components/skeleton";
import { useForm } from "react-hook-form";

interface PhotoNewDialogProps {
  trigger: React.ReactNode;
}

export default function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const form = useForm();
  //just for test(mock)
  const isLoadingAlbum = false;
  const albums: Album[] = [
    { id: "3421", title: "Album 1" },
    { id: "123", title: "Album 2" },
    { id: "456", title: "Album 3" },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Add Photo</DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="add a tittle" maxLength={255} />

          <Alert>
            Max sice: 50mb
            <br />
            You can select files in PNG, JPG and JPEG
          </Alert>

          <InputSingleFile
            form={form}
            allowedExtensions={["png", "jpg", "jpeg"]}
            maxFIleSizeInMB={50}
            replaceBy={
              <ImagePreview
                className="w-full h-56"
                imageClassName="w-full h-56"
              />
            }
          />

          <div className="space-y-3">
            <Text variant="label-small">Select Albums</Text>
            <div className="flex flex-wrap gap-3">
              {!isLoadingAlbum &&
                albums.length > 0 &&
                albums.map((album) => (
                  <Button
                    key={album.id}
                    variant="ghost"
                    size="sm"
                    className="truncate"
                  >
                    {album.title}
                  </Button>
                ))}
              {isLoadingAlbum &&
                Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    className="h-7 w-20"
                    key={`album-loading-${index}`}
                  />
                ))}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
