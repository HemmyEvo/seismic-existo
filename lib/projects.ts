export interface ProjectDefinition {
  id: string;
  title: string;
  description: string;
  image: string;
  route: string;
}

export const projects: ProjectDefinition[] = [
  // {
  //   id: "banner",
  //   title: "Seismic Banner Generator",
  //   description: "Generate and download your personalized Seismic X/Twitter banner.",
  //   image: "/background.avif",
  //   route: "/projects/banner",
  // },
  // {
  //   id: "card",
  //   title: "Seismic Card Generator",
  //   description: "Create your encrypted citizen card with profile image and magnitude chip.",
  //   image: "/mag1.jpg",
  //   route: "/projects/card",
  // },
  // {
  //   id: "week",
  //   title: "Seismic Week Greeting Generator",
  //   description: "Generate a themed Seismic greeting image for this week.",
  //   image: "/mag8.jpg",
  //   route: "/projects/week",
  // },
];

export const projectById = (id: string) =>
  projects.find((project) => project.id === id.toLowerCase());
