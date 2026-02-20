import Button from "../../../components/button";
import ButtonIcon from "../../../components/button-icon";
import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import cx from "classnames";
import type { Album } from "../models/album";
import usePhotos from "../../photos/hooks/use-photos";
import AlbumDeleteDialog from "./album-delete-dialog";
import XIcon from "../../../assets/icons/x.svg?react";

interface AlbumsFilterProps extends React.ComponentProps<"div"> {
  albums: Album[];
  loading?: boolean;
}

export default function AlbumsFilter({
  albums,
  loading,
  className,
  ...props
}: AlbumsFilterProps) {
  const { filters } = usePhotos();

  return (
    <div
      className={cx("flex items-center gap-3.5 overflow-x-auto", className)}
      {...props}
    >
      <Text variant="heading-small">Álbuns</Text>
      <div className="flex gap-3">
        {!loading ? (
          <>
            <Button
              size="sm"
              className="cursor-pointer"
              variant={filters.albumId === null ? "primary" : "ghost"}
              onClick={() => filters.setAlbumId(null)}
            >
              Todos
            </Button>
            {albums.map((album) => (
              <div key={album.id} className="flex items-center">
                <Button
                  size="sm"
                  className="cursor-pointer"
                  variant={filters.albumId === album.id ? "primary" : "ghost"}
                  onClick={() => filters.setAlbumId(album.id)}
                >
                  {album.title}
                </Button>
                <AlbumDeleteDialog
                  album={album}
                  trigger={
                    <ButtonIcon
                      className="h-6 w-6 ml-1"
                      variant="ghost"
                      icon={XIcon}
                    />
                  }
                />
              </div>
            ))}
          </>
        ) : (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton className="w-28 h-7" key={`album-loading-${index}`} />
          ))
        )}
      </div>
    </div>
  );
}
