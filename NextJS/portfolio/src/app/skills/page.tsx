"use client";

import Navbar from "../navbar/page";
import "./skills.css";
import Image from "next/image";
import htmlIcon from "../../../public/html.png";
import cssIcon from "../../../public/css.png";
import tailwindCssIcon from "../../../public/tailwind.png";
import sassIcon from "../../../public/sass.png";
import jsIcon from "../../../public/js.png";
import reactIcon from "../../../public/react.png";
import reduxIcon from "../../../public/redux.png";
import nextjsIcon from "../../../public/nextjs.png";
import nodejsIcon from "../../../public/nodejs.png";
import expressjsIcon from "../../../public/expressjs.png";
import gitIcon from "../../../public/git.png";
import gitHubIcon from "../../../public/github.png";
import postmanIcon from "../../../public/postman.png";

const technologies = [
  {
    id: 1,
    name: "HTML",
    iconPath: htmlIcon,
  },
  {
    id: 2,
    name: "CSS",
    iconPath: cssIcon,
  },
  {
    id: 3,
    name: "Tailwind CSS",
    iconPath: tailwindCssIcon,
  },
  {
    id: 4,
    name: "Sass",
    iconPath: sassIcon,
  },
  {
    id: 5,
    name: "Javascript",
    iconPath: jsIcon,
  },
  {
    id: 6,
    name: "React",
    iconPath: reactIcon,
  },
  {
    id: 7,
    name: "Redux",
    iconPath: reduxIcon,
  },
  {
    id: 8,
    name: "Next.js",
    iconPath: nextjsIcon,
  },
  {
    id: 9,
    name: "Node.js",
    iconPath: nodejsIcon,
  },
  {
    id: 10,
    name: "Express.js",
    iconPath: expressjsIcon,
  },
];

const tools = [
  {
    id: 1,
    name: "Git",
    iconPath: gitIcon,
  },
  {
    id: 2,
    name: "GitHub",
    iconPath: gitHubIcon,
  },
  {
    id: 3,
    name: "Postman",
    iconPath: postmanIcon,
  },
];

export default function Skills() {
  return (
    <div className="skills wrapper">
      <Navbar />
      <h2 className="title fadeDown">Skills</h2>
      <section className="skill_content fadeDown">
        <h3>Technology</h3>
        <ul className="icon_list">
          {technologies.map((technology) => (
            <li className="icon_item" key={technology.id}>
              <Image src={technology.iconPath} alt="html" className="icon" />
              <span>{technology.name}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="skill_content fadeDown">
        <h3>Tools</h3>
        <ul className="icon_list">
          {tools.map((tools) => (
            <li className="icon_item" key={tools.id}>
              <Image src={tools.iconPath} alt="html" className="icon" />
              <span>{tools.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
