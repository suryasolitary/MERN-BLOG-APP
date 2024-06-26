import { Navbar, TextInput, Button, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toogleTheme } from "../Redux/theme/theme";

export default function Header() {
  const dispatch = useDispatch();
  const { currentuser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <p className="text-lg whitespace-nowrap sm:text-2xl font-bold dark:text-white ">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
          Surya's
        </span>
        Blog
      </p>
      <form>
        <TextInput
          placeholder="Search..."
          type="text"
          className="hidden lg:inline text-2xl "
          rightIcon={AiOutlineSearch}
        ></TextInput>
      </form>
      <Button className="h-10 w-15  lg:hidden " color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2">
        <Button
          className="h-12 w-15"
          color="gray"
          pill
          onClick={() => dispatch(toogleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentuser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentuser.profilePic} rounded />}
          >
            <Dropdown.Header>
              <span>@{currentuser.username}</span>
              <span className="block font-semibold text-sm">
                {currentuser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tap=profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button
              gradientDuoTone="purpleToBlue"
              className="font-semibold text-4xl "
              pill
            >
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/project"} as={"div"}>
          <Link to="/project">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
