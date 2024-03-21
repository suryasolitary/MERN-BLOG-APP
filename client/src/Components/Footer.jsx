import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsTwitter, BsYoutube } from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className=" w-full max-w-7xl mx-auto">
        <div className="w-full grid justify-between sm:flex md:grid-cols-1 ">
          <div className="mt-5">
            <Link
              to="/"
              className="text-lg self-center whitespace-nowrap sm:text-2xl dark:text-white
             font-bold  "
            >
              <span className=" py-2 px-1 bg-gradient-to-r from-indigo-500 via-purple-500 text-white to-pink-500 rounded-lg p-2 ">
                Surya's
              </span>
              Blog
            </Link>
          </div>
          <div className=" grid grid-cols-2 gap-8 sm:grid-cols-3 mt-5 ">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/project"
                  rel="noopener noreferrer"
                  target="_blank"
                  className=""
                >
                  Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  className=""
                  rel="noopener noreferrer"
                >
                  Surya'S Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/suryasolitary"
                  rel="noopener noreferrer"
                  target="_blank"
                  className=""
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="LEGAL" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/suryasolitary"
                  rel="noopener noreferrer"
                  target="_blank"
                  className=""
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Surya's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-5 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsYoutube} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
