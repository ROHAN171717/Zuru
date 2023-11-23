"use client";

import { usePathname } from "next/navigation";
import "./navbar.css";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="navbar">
      <ul className="navbar_items">
        <li className="navbar_item fadeDown">
          <Link
            href="/"
            className={`navbar_link ${pathname === "/" ? "active" : ""}`}
          >
            About
          </Link>
        </li>
        <li className="navbar_item fadeDown">
          <Link
            href="/skills"
            className={`navbar_link ${pathname === "/skills" ? "active" : ""}`}
          >
            Skills
          </Link>
        </li>
        <li className="navbar_item fadeDown">
          <Link
            href="/projects"
            className={`navbar_link ${
              pathname === "/projects" ? "active" : ""
            }`}
          >
            Portfolio
          </Link>
        </li>
      </ul>
    </div>
  );
}
