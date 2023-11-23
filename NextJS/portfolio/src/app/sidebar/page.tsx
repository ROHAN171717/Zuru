"use client";

import React from "react";
import "./sidebar.css";
import Image from "next/image";
import profilePic from "../../../public/my-avatar.png";
import downArrow from "../../../public/down-arrow.png";
import documentIcon from "../../../public/document.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";

export default function Sidebar() {
  const [isContactOpen, setIsContactOpen] = React.useState(false);
  function handleDownload() {
    window.open("/resume.pdf");
  }
  return (
    <div className={`sidebar ${isContactOpen === true ? "active" : ""}`}>
      <button
        className="contact_btn"
        onClick={() => setIsContactOpen(!isContactOpen)}
      >
        <span className="fadeDown">Show Contacts</span>
        <Image src={downArrow} alt="down-arrow" className="down_arrow fadeDown"/>
      </button>
      <div className="sidebar_info fadeDown">
        <Image src={profilePic} alt="Rohan Lakhani" className="profilePic" />
        <div className="info_content">
          <h1 className="name">Rohan Lakhani</h1>
          <p className="title">Web developer</p>
          <div className="resume_btn" onClick={handleDownload}>
            <Image src={documentIcon} alt="document" width={20} height={20} className="document_icon" />
            Resume
          </div>
        </div>
      </div>
      <div className="sidebar_info_more fadeDown">
        <div className="separator"></div>
        <ul className="contacts_list">
          <li className="contact_item">
            <div className="icon_box">
              <MailOutlineIcon
                style={{ color: "rgb(255 219 112)", width: "22px" }}
              />
            </div>
            <div className="contact_info">
              <p className="contact_title">Email</p>
              <Link
                className="contact_link"
                href="mailto:rohanlakhani2003@gmail.com"
              >
                rohanlakhani2003@gmail.com
              </Link>
            </div>
          </li>
          <li className="contact_item">
            <div className="icon_box">
              <LocationOnIcon
                style={{ color: "rgb(255 219 112)", width: "22px" }}
              />
            </div>
            <div className="contact_info">
              <p className="contact_title">Location</p>
              <address>Ahmedabad, Gujarat, India</address>
            </div>
          </li>
        </ul>
        <div className="separator"></div>
        <ul className="social_list">
          <li className="social_item">
            <Link href="#" className="social_link">
              <GitHubIcon
                style={{ color: "rgb(214 214 214 / 70%)", width: "22px" }}
              />
            </Link>
          </li>
          <li className="social_item">
            <Link href="#" className="social_link">
              <LinkedInIcon
                style={{ color: "rgb(214 214 214 / 70%)", width: "22px" }}
              />
            </Link>
          </li>
          <li className="social_item">
            <Link href="#" className="social_link">
              <InstagramIcon
                style={{ color: "rgb(214 214 214 / 70%)", width: "22px" }}
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
