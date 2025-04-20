import { FeatureSqlShell } from "~/components/FeatureSqlShell";
import type { Route } from "./+types/home";
import {
    Box,
    Center,
  Stack,
} from "@chakra-ui/react";
import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import ProjectShowcase from "~/components/ProjectShowcase";
import { Footer } from "~/components/Footer";

const PROJECTS = [
  {
    title: "Medfetch.js",
    description: "A sql-on-fhir implementation with dedicated database runners.",
    year: "2023-2025",
    image: "/medfetch.png",
    href: "https://medfetchjs.pages.dev"
  },
  {
    title: "PDS v2",
    description: "Cryptocurrency Testnet Faucet on NextJS",
    year: "2024",
    image: "/pdsv2.png",
    href: "https://pds-dase-portal-v2.fly.dev/"
  },
  {
    title: "Pics",
    description: "A simple photo-gallery website built as a present for my parents.",
    year: "2023",
    image: "/present.png",
    href: "https://bathan1.github.io/dad-and-jane/"
  },
];

export function meta({}: Route.MetaArgs) {
  return [
    { title: "oh-my-portfolio!" },
    { name: "description", content: "Welcome to my portfolio website." },
  ];
}

export default function Home() {
  return (
    <Stack gap="4" bg="bg">
      <Navbar />
      <Hero />
      <ProjectShowcase projects={PROJECTS} />
      <Box mb="64">
        <FeatureSqlShell />
      </Box>
      <Footer />
    </Stack>
  );
}

