"use client";

import Navbar from "../navbar/page";
import "./projects.css";
import openedFolder from "../../../public/opened-folder.png";
import gitHubYellowIcon from "../../../public/github-yellow.png";
import externalLinkIcon from "../../../public/external-link.png";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: 1,
    title: "React Native Clone",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus in voluptatem perspiciatis dolore commodi quam porro, fugit velit excepturi, aperiam, iusto eos similique. Ea, veritatis!",
    githubLink: "https://github.com/",
    externalLink: "https://github.com/",
    techstack: ["HTML", "CSS"],
  },
  {
    id: 2,
    title: "Tic-Tac-Toe Game",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus in voluptatem perspiciatis dolore commodi quam porro, fugit velit excepturi, aperiam, iusto eos similique. Ea, veritatis!",
    githubLink: "https://github.com/",
    externalLink: "https://github.com/",
    techstack: ["HTML", "CSS", "Javascript"],
  },
  {
    id: 3,
    title: "Todo",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus in voluptatem perspiciatis dolore commodi quam porro, fugit velit excepturi, aperiam, iusto eos similique. Ea, veritatis!",
    githubLink: "https://github.com/",
    externalLink: "https://github.com/",
    techstack: ["HTML", "CSS", "Javascript", "React"],
  },
  {
    id: 4,
    title: "TMDB Clone",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus in voluptatem perspiciatis dolore commodi quam porro, fugit velit excepturi, aperiam, iusto eos similique. Ea, veritatis!",
    githubLink: "https://github.com/",
    externalLink: "https://github.com/",
    techstack: ["HTML", "CSS", "Javascript", "React"],
  },
  {
    id: 5,
    title: "Inventory Managment System",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus in voluptatem perspiciatis dolore commodi quam porro, fugit velit excepturi, aperiam, iusto eos similique. Ea, veritatis!",
    githubLink: "https://github.com/",
    externalLink: "https://github.com/",
    techstack: [
      "HTML",
      "Tailwind CSS",
      "Javascript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
  {
    id: 6,
    title: "Accountill",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus in voluptatem perspiciatis dolore commodi quam porro, fugit velit excepturi, aperiam, iusto eos similique. Ea, veritatis!",
    githubLink: "https://github.com/",
    externalLink: "https://github.com/",
    techstack: [
      "HTML",
      "Tailwind CSS",
      "Javascript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
  },
];

export default function Projects() {
  return (
    <div className="projects wrapper">
      <Navbar />
      <h2 className="title fadeDown">Projects</h2>
      <section className="projects_content">
        <ul className="projects_list">
          {projects.map((project) => (
            <li className="project_wrapper fadeDown" key={project.id}>
              <div className="project_header">
                <Image
                  src={openedFolder}
                  alt="opened-folder"
                  width={40}
                  height={40}
                />
                <div className="link_icon_wrapper">
                  <Link href={project.githubLink} className="link_icon">
                    <Image
                      src={gitHubYellowIcon}
                      alt="github"
                      width={25}
                      height={25}
                    />
                  </Link>

                  <Link href={project.externalLink} className="link_icon">
                    {" "}
                    <Image
                      src={externalLinkIcon}
                      alt="external-link"
                      width={25}
                      height={25}
                    />
                  </Link>
                </div>
              </div>
              <div className="project_content">
                <h3 className="project_title">{project.title}</h3>
                <p className="project_description">{project.description}</p>
                <ul className="technology_list">
                  {project.techstack.map((technology) => (
                    <li className="technology" key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
