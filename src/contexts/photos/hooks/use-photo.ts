//
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api, fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photo";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import usePhotoAlbums from "./use-photo-albums";
import type { PhotoNewFormSchema } from "../schemas";

interface PhotoDetailResponse extends Photo {
  nextPhotoId?: string;
  previousPhotoId?: string;
}

export default function usePhoto(id?: string) {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<PhotoDetailResponse>({
    queryKey: ["photo", id],
    queryFn: () => fetcher(`/photos/${id}`),
    enabled: !!id,
  });
  const queryClient = useQueryClient();
  const { managePhotoOnAlbum } = usePhotoAlbums();

  async function createPhoto(payload: PhotoNewFormSchema) {
    try {
      const { data: photo } = await api.post<Photo>("/photos", {
        title: payload.title,
      });

      await api.post(
        `/photos/${photo.id}/image`,
        {
          file: payload.file[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (payload.albumIds && payload.albumIds.length > 0) {
        await managePhotoOnAlbum(photo.id, payload.albumIds);
      }

      queryClient.invalidateQueries({ queryKey: ["photos"] });

      toast.success("Photo created with sucesss");
    } catch (error) {
      toast.success("Error photo created");
      throw error;
    }
  }

  async function deletePhoto(photoId: string) {
    try {
      await api.delete(`/photos/${photoId}`);

      toast.success("Photo deleted with success");

      navigate("/");
    } catch (error) {
      toast.error("Error trying to delete photos");
      throw error;
    }
  }

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto,
    deletePhoto,
  };
}
