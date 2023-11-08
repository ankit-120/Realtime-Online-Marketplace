import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { login, register } from "@/apis";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../facilities/userSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //collect register data
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  //collect login data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  //check if user want to login or register
  const [isClicked, setIsClicked] = useState(false);

  //handle register button
  const handleSignup = async () => {
    try {
      setLoading(true);
      const values = Object.values(signupData);
      for (let i = 0; i < values.length; i++) {
        if (values[i] === "") {
          toast.error("Please fill all the fields");
          setLoading(false);
          return;
        }
      }
      const { data } = await axios.post(register(), signupData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setLoading(false);
      toast.success("Registered successfully");
      dispatch(setUserInfo(data.user));
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //handle login button
  const handleLogin = async () => {
    try {
      console.log(loginData);
      setLoading(true);
      const values = Object.values(loginData);
      for (let i = 0; i < values.length; i++) {
        if (values[i] === "") {
          toast.error("Please fill all the fields");
          setLoading(false);
          return;
        }
      }
      const { data } = await axios.post(login(), loginData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setLoading(false);
      toast.success("Loggedin successfully");
      dispatch(setUserInfo(data.user));
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //handle isClicked
  const handleIsClicked = () => {
    setIsClicked(!isClicked);
    if (loading) {
      setLoading(false);
    }
  };

  return (
    <div className="mt-32 flex justify-center">
      {isClicked ? (
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter following details to login</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <div>
              <Button
                onClick={handleLogin}
                variant="outline"
                disabled={loading}
              >
                {loading ? "Please wait" : "Login"}
                <span className="mx-2 flex items-center">
                  <ClipLoader loading={loading} size={20} />
                </span>
              </Button>
              <p>
                New User?{" "}
                <span
                  className="cursor-pointer text-blue-500"
                  onClick={handleIsClicked}
                >
                  Register
                </span>
              </p>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-80">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Enter following details to register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter name"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <div>
              <Button
                onClick={handleSignup}
                variant="outline"
                disabled={loading}
              >
                {loading ? "Please wait" : "Register"}
                <span className="mx-2 flex items-center">
                  <ClipLoader loading={loading} size={20} />
                </span>
              </Button>
              <p>
                Already registed?{" "}
                <span
                  className="cursor-pointer text-blue-500"
                  onClick={handleIsClicked}
                >
                  Login
                </span>
              </p>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Register;
