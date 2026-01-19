import Container from "../components/container";
import Skeleton from "../components/skeleton";
import Text from "../components/text";
import PhotosNavigator from "../contexts/photos/models/components/photos-navigator";
import type { Photo } from "../contexts/photos/models/photo";

export default function PagePhotoDetails() {
  const isLoadingPhoto = false;
  const photo = {
    id: "123",
    title: "Hello world!",
    imageId: "portrait-tower.png",
    albums: [
      { id: "3421", title: "Album 1" },
      { id: "123", title: "Album 2" },
      { id: "456", title: "Album 3" },
    ],
  } as Photo;
  return (
    <Container>
      <header className="flex items-center justify-between gap-8 mb-8">
        {!isLoadingPhoto ? (
          <Text variant="heading-large">{photo?.title}</Text>
        ) : (
          <Skeleton className="w-48 h-8" />
        )}

        <PhotosNavigator loading={isLoadingPhoto} />
      </header>
    </Container>
  );
}
