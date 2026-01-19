import Skeleton from "../../../../components/skeleton";
import Text from "../../../../components/text";
import type { Photo } from "../photo";
import PhotoWidget from "./photos-widget";

interface PhotosListProps {
  photos: Photo[];
  loading?: boolean;
}

export default function PhotosList({ photos, loading }: PhotosListProps) {
  return (
    <div className="space-y-6">
      <Text
        as="div"
        variant="paragraph-large"
        className="flex items-center justify-end text-accent-spans gap-1"
      >
        Total: {""}
        {!loading ? (
          <div>{photos.length}</div>
        ) : (
          <Skeleton className="w-6 h-6" />
        )}
      </Text>
      {!loading && length > 0 && (
        <div className="grid grid-cols-5 gap-4">
          {photos.map((photo) => (
            <PhotoWidget photo={photo} key={photo.id} />
          ))}
        </div>
      )}
      {loading && (
        <div className="grid grid-cols-5 gap-9">
          {Array.from({ length: 10 }).map((_, index) => (
            <PhotoWidget
              key={`photo-loading-${index}`}
              photo={{} as Photo}
              loading
            />
          ))}
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <Text variant="paragraph-large">Any photo founded</Text>
        </div>
      )}
    </div>
  );
}
