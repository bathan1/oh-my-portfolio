import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { ThumbnailList } from "./ThumbnailList";

export default function ProjectShowcase({ projects }: { projects: {
  title: string;
  description: string;
  year: string;
  image: string;
  href: string;
  alt?: string;
}[] }) {
  const [activeId, setActiveId] = useState<number | null>(null);
  return (
      <Container maxW="7xl" my="16">
        <Flex
          direction="row"
          align="start"
          justify="center"
          gap={16}
        >
          <Box minW="560px" w="100%">
            <Stack spaceY="12" minHeight="200vh">
              {projects.map((project, i) => (
                <ProjectCard key={i} onInView={() => setActiveId(i)} {...project} year={project.year} href={project.href}/>
              ))}
            </Stack>
          </Box>

          <Box
            w={{ base: "full", md: "300px" }}
            position="sticky"
            top="16rem"
            pl="40"
          >
            <ThumbnailList
              activeId={activeId}
              thumbnails={projects.map(card => ({ src: card.image }))}
            />
          </Box>
        </Flex>
      </Container>
  );
}
