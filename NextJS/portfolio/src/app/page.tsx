"use client";

import Navbar from "./navbar/page";
import "./page.css";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

export default function Home() {
  return (
    <div className="about wrapper">
      <Navbar />
      <h2 className="title fadeDown">About Me</h2>
      <section className="about_me fadeDown">
        <p>
          Hello! I'm Rohan, a Skilled Software Developer with experience in
          front-end and back-end technologies. I specialize in developing
          end-to-end applications that provide an optimal user experience
        </p>

        <p>
          My job is to build your website so that it is functional and
          user-friendly but at the same time attractive. Moreover, With a
          passion for full-stack development, I am a proficient developer
          capable of designing and developing complex applications with
          expertise in React and Node.js.
        </p>

        <p>
          Hire me to elevate your web presence and create a visually stunning
          and high-performance online experience for your users.
        </p>
      </section>
      <section className="experience fadeDown">
        <div className="title_wrapper">
          <div className="icon_box">
            <ImportContactsIcon
              style={{ color: "rgb(255 219 112)", width: "22px" }}
            />
          </div>
          <h3>Experience</h3>
        </div>
        <div className="timeline_list">
          <div className="timeline_item">
            <h4 className="timeline_item_title">Junior Software Engineer</h4>
            <span className="duration">Aug, 2023 - Present</span>
            <p className="timeline_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsa accusamus saepe numquam hic odit, non explicabo itaque! Quae alias cumque atque id? Voluptate minus perspiciatis ab fugit commodi dolore vitae expedita, obcaecati asperiores facere aliquam in dolores, cumque repellat illum ipsum ea quibusdam magni porro maiores eaque consequuntur dicta!</p>
          </div>
          <div className="timeline_item">
            <h4 className="timeline_item_title">Junior Software Engineer</h4>
            <span className="duration">Aug, 2023 - Present</span>
            <p className="timeline_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsa accusamus saepe numquam hic odit, non explicabo itaque! Quae alias cumque atque id? Voluptate minus perspiciatis ab fugit commodi dolore vitae expedita, obcaecati asperiores facere aliquam in dolores, cumque repellat illum ipsum ea quibusdam magni porro maiores eaque consequuntur dicta!</p>
          </div>
          <div className="timeline_item">
            <h4 className="timeline_item_title">Junior Software Engineer</h4>
            <span className="duration">Aug, 2023 - Present</span>
            <p className="timeline_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsa accusamus saepe numquam hic odit, non explicabo itaque! Quae alias cumque atque id? Voluptate minus perspiciatis ab fugit commodi dolore vitae expedita, obcaecati asperiores facere aliquam in dolores, cumque repellat illum ipsum ea quibusdam magni porro maiores eaque consequuntur dicta!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
