import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../Components/OAuth";
import {
  SigninStart,
  SigninSuccess,
  SigninFailure,
} from "../Redux/user/UserSlice";

export default function SignIn() {
  const navigate = useNavigate();
  const { loading, error: errMessage } = useSelector((state) => state.user);
  //console.log(ErrorMessage);
  //const [Loading, setLoading] = useState(false);
  const [formData, setformData] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(SigninStart());
      const response = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(SigninFailure(data.message));
      }
      dispatch(SigninSuccess(data));

      //onsole.log(data);
      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      dispatch(SigninFailure(err.message));
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
            This is demo project.You can sign in with your Email and Password of
            with Google...
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-7 " onSubmit={handleSubmit}>
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
              {loading ? (
                <>
                  <Spinner />
                  <span className="pl-5 text-sm">Loading ...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-3 mt-5 text-lg font-semibold">
            <p>Have an Account ? </p>
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
          {errMessage && (
            <Alert className="mt-5" color="failure">
              {errMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
