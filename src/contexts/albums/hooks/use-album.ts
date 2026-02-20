import { toast } from "sonner";
import type { albumNewFormSchema } from "../schema";
import type { Album } from "../models/album";
import { api } from "../../../helpers/api";
import { useQueryClient } from "@tanstack/react-query";
import usePhotos from "../../photos/hooks/use-photos";
import usePhotoAlbums from "../../photos/hooks/use-photo-albums";

export default function useAlbum() {
  const queryClient = useQueryClient();
  const { photos } = usePhotos();
  const { managePhotoOnAlbum } = usePhotoAlbums();

  async function createAlbum(payload: albumNewFormSchema) {
    try {
      const { data: album } = await api.post<Album>("/albums", {
        title: payload.title,
      });

      if (payload.photoIds && payload.photoIds.length > 0) {
        await Promise.all(
          payload.photoIds.map((photoId) => {
            const photoAlbumsIds =
              photos
                .find((photo) => photo.id === photoId)
                ?.albums?.map((album) => album.id) || [];
            return managePhotoOnAlbum(photoId, [...photoAlbumsIds, album.id]);
          }),
        );
      }

      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["photos"] });

      toast.success("Album created with sucess!");
    } catch (error) {
      toast.error("Error when tryng to create Album");
      throw error;
    }
  }

  async function deleteAlbum(albumId: string) {
    try {
      await api.delete(`/albums/${albumId}`);

      queryClient.invalidateQueries({ queryKey: ["albums"] });
      queryClient.invalidateQueries({ queryKey: ["photos"] });

      toast.success("Album deleted successfully!");
    } catch (error) {
      toast.error("Error when trying to delete Album");
      throw error;
    }
  }

  return {
    createAlbum,
    deleteAlbum,
  };
}
