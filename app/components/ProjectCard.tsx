
import { useEffect, useRef } from "react";
import { Card, Image, Text, LinkOverlay, LinkBox } from "@chakra-ui/react";

export function ProjectCard({
  alt,
  title,
  description,
  image,
  year,
  href,
  onInView,
}: {
    alt?: string;
    title: string;
    description: string;
    image: string;
    year: string;
    href: string;
    onInView: () => void;
  }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onInView();
      },
      {
        threshold: 0.6,
        rootMargin: "-30% 0px -30% 0px",
      }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onInView]);

  return (
    <LinkBox>
      <Card.Root ref={ref} maxW="4xl" size="lg" rounded="md">
        <Image
          src={image}
          alt={alt ?? description}
        />
        <LinkOverlay href={href} target="_blank" />
        <Card.Body gap="2">
          <Card.Title>
              {title}
          </Card.Title>
          <Card.Description>
            {description}
          </Card.Description>
          <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
            {year}
          </Text>
        </Card.Body>
      </Card.Root>
    </LinkBox>
  );
}

