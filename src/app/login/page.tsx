"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonType } from "../../components/button";
import Input from "../../components/input";
import { useRouter } from "next/navigation";
import ButtonLoader from "../../components/laoders/btnloader";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../lib/axiosInstance";
import Cookies from "js-cookie";

function LoginPage() {
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showErrors, setShowErrors] = useState(false);

  //  console.log('return url', searchParams.get('returnUrl'));
  const router = useRouter();
  const handlePassword = () => {
    setPasswordShow(!passwordShow);
  };
  const validateForm = () => {
    let hasError = false;
    const newErrors: any = {};
    if (!email) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "Password is required";
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      hasError = true;
    }
    setErrors(newErrors);
    return !hasError;
  };

  const loginNow = async () => {
    setShowErrors(true);
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    const modal: any = {
      email: email,
      password: password,
    };
    try {
      const loginResponse = await Axios.post("/login", modal);
      if (loginResponse.status == 500) {
        toast.error("Login failed !!");
        setLoading(false);
      }

      if (loginResponse.data && loginResponse.data.accessToken) {
        localStorage.setItem("accessToken", loginResponse.data.accessToken);
        Cookies.set("accessToken", loginResponse.data.accessToken, {
          expires: 7, // Token will expire in 7 days
          secure: true, // Ensure secure cookies in production
          sameSite: "strict", // Prevent CSRF attacks
        });
        toast.success("Login Successfully !!");

        router.push("/");
      } else {
        toast.error("Login failed !!");

        // alert("Login failed: Access token not received.");
      }
    } catch (error: any) {
      setLoading(false);

      console.error(error.response.data.message);
      toast.error(
        `Login failed! ${error.response.data.message ?? "Please check your credentials or try again later"} `
      );
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (type: string, value: string) => {
    if (type === "email") {
      setEmail(value);
    } else if (type === "password") {
      setPassword(value);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [type]: "",
    }));
  };

  return (
    <div className="flex h-screen">
      <ToastContainer />
      <title>{`Login`}</title>

      <div className="w-full md:w-1/2  bg-white flex flex-col pt-[72px] md:pt-0 md:justify-center items-center ">
        <>
          <div className="w-full px-4 md:px-0 md:max-w-[360px] mb-8">
            <Link href="/">
              <Image
                width={50}
                height={50}
                alt="img"
                className="mb-6 md:mb-16 w-[50px] h-[50px]"
                src="/main-logo.png"
              />
            </Link>
            <div className="flex flex-col  gap-3">
              <p className="login-title">Log In</p>
              <p className="login-subText">
                Welcome back! Please enter your details.
              </p>
            </div>
          </div>

          <div className="w-full px-4 md:px-0 md:max-w-[360px]">
            <div className="flex flex-col gap-5">
              <div className="">
                <Input
                  value={email}
                  labelLeftClassName={"input-label"}
                  fControlWrapClassName={"rounded-lg"}
                  fGroupClassName={"mb-0"}
                  fControlClassName={"rounded-lg login-input "}
                  placeholder={"Enter your email"}
                  onChange={(ev: any) =>
                    handleInputChange("email", ev.target.value)
                  }
                  onKeyDown={(ev: any) => {
                    if (ev.key === "Enter") {
                      passwordInputRef.current?.focus();
                    }
                  }}
                  label="Email"
                  type="email"
                />
                {showErrors && errors.email && (
                  <p className="text-red-500 absolute text-sm">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="">
                <Input
                  value={password}
                  onChange={(ev: any) =>
                    handleInputChange("password", ev.target.value)
                  }
                  labelLeftClassName={"input-label"}
                  fControlWrapClassName={
                    "rounded-lg focus-within:border focus-within:border-[#63c121]"
                  }
                  inputRef={passwordInputRef}
                  fControlClassName={"rounded-lg login-input"}
                  fGroupClassName={"mb-0"}
                  placeholder={"Enter your Password"}
                  label="Password"
                  type={passwordShow ? "text" : "password"}
                  onClickIconRight={handlePassword}
                  onKeyDown={(ev: any) => {
                    if (ev.key === "Enter") {
                      loginNow();
                    }
                  }}
                  iconRight={
                    <Image
                      width={24}
                      height={24}
                      alt="img"
                      className=" w-[24px] h-[24px]"
                      src={passwordShow ? "/eye-gray.png" : "/eye-lock.png"}
                    />
                  }
                />
                {showErrors && errors.password && (
                  <p className="text-red-500 absolute text-sm">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 mx-8 mt-6 md:mx-0">
              {/* {<Button onClick={loginNow}
                                    className='w-full font-bold text-lg leading-6 mt-1'
                                    type={ButtonType.primary}>{loading ? <ButtonLoader /> : 'Log In'}</Button>} */}
              <Button
                onClick={loginNow}
                className="login-signup  hover:bg-[#12382d] w-full"
                type={ButtonType.primary}
              >
                {loading ? <ButtonLoader /> : "Sign In"}
              </Button>
            </div>
          </div>

          <p className="dont-acc mt-6 md:mt-[37px]">
            Don’t have an account?
            <Link href="/signup">Sign up</Link>
          </p>
          <p className="login-bottom-txt hidden md:block">
            © All Right Reserved 2024
          </p>
        </>
      </div>

      <div
        className="hidden md:flex flex-1"
        style={{
          background:
            "linear-gradient(204.16deg, #97FBFE 63.84%, #FFFFFF 107.88%)",
        }}
      >
        <Image
          src="/login-section1.png"
          alt="Phone with app screenshot"
          layout="responsive"
          width={100}
          height={100}
          priority
          objectFit="cover"
          className="max-w-full h-screen"
        />
      </div>
    </div>
  );
}

export default LoginPage as any;
