import { Box, Image } from "@chakra-ui/react";
import { useMemo } from "react";

export function ThumbnailList({
  thumbnails,
  activeId,
}: {
  thumbnails: { src: string }[];
  activeId: number | null;
}) {
  return (
    <Box display="flex" flexDir="column" gap="1.5">
      {thumbnails.map((t, i) => (
        <Thumbnail
          key={i}
          src={t.src}
          isActive={activeId === i}
          id={i}
        />
      ))}
    </Box>
  );
}

function Thumbnail({
  src,
  isActive,
  id,
}: {
  src: string;
  isActive: boolean;
  id: number;
}) {
  const offsetX = useMemo(() => {
    const values = [-12, -8, -4, 0, 4, 8, 12];
    return values[Math.floor(Math.random() * values.length)];
  }, []);

  return (
    <Box
      rounded="md"
      data-id={id}
      borderWidth="1px"
      borderColor="white"
      opacity={isActive ? 1 : 0.25}
      transform={`translateX(${offsetX}px) scale(${isActive ? 1.3 : 1})`}
      zIndex={isActive ? 10 : 0}
      transition="all 0.3s ease"
      w="100px"
      h="100px"
      overflow="hidden"
    >
      <Image src={src} w="full" h="full" objectFit="cover" />
    </Box>
  );
}

