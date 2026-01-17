import Container from "../components/container";
import PhotoWidget from "../contexts/photos/models/components/photos-widget";
import type { Photo } from "../contexts/photos/models/photo";

export default function PageHome() {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-9">
        <PhotoWidget
          photo={{
            id: "123",
            title: "Hello world!",
            imageId: "portrait-tower.png",
            albums: [
              { id: "3421", title: "Album 1" },
              { id: "123", title: "Album 2" },
              { id: "456", title: "Album 3" },
            ],
          }}
        />
        <PhotoWidget
          photo={{
            id: "123",
            title: "Hello world!",
            imageId: "portrait-tower.png",
            albums: [
              { id: "3421", title: "Album 1" },
              { id: "123", title: "Album 2" },
              { id: "456", title: "Album 3" },
            ],
          }}
        />
        <PhotoWidget
          photo={{
            id: "123",
            title: "Hello world!",
            imageId: "portrait-tower.png",
            albums: [
              { id: "3421", title: "Album 1" },
              { id: "123", title: "Album 2" },
              { id: "456", title: "Album 3" },
            ],
          }}
        />
        <PhotoWidget photo={{} as Photo} loading />
      </div>
    </Container>
  );
}
