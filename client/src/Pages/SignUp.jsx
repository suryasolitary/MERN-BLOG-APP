import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { errHandlers } from "../../../Api/utils/Error";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setformData] = useState({});
  const [ErrorMessage, setErrorMessage] = useState(null);
  //console.log(ErrorMessage);
  const [Loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setErrorMessage(data.errMessage);
        setLoading(false);
      }
      setLoading(false);

      //onsole.log(data);
      if (response.ok) {
        navigate("/signin");
      }
    } catch (err) {
      setErrorMessage(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 p-4 ">
      <div className="flex max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-4 ">
        <div className="flex flex-col gap-7 flex-1 mb-4">
          <Link to="/" className="font-bold text-4xl ">
            <span className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg p-2 ">
              Surya's
            </span>
            Blog
          </Link>
          <p>
            This is demo project.You can sign up with your email and password of
            with google...
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-7 " onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username" value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email" value="Your Email" />
              <TextInput
                type="text"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password" value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button type="submit" gradientDuoTone="purpleToPink">
              {Loading ? (
                <>
                  <Spinner />
                  <span className="pl-5 text-sm">Loading ...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="flex gap-3 mt-5 text-lg font-semibold">
            <p>Have an Account ? </p>
            <Link to="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>
          {ErrorMessage && (
            <Alert className="mt-5" color="failure">
              {ErrorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
