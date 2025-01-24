"use client";
import React, { useState, useRef } from "react";
import Input from "../../components/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { Button, ButtonType } from "@/components/button";
import ButtonLoader from "@/components/laoders/btnloader";
import Axios from "../lib/axiosInstance";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email: string; password: string; fullName:String,ConfirmPassword: string }>({
    email: "",
    password: "",
    ConfirmPassword: "",
    fullName: "",
  });
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePassword = () => {
    setPasswordShow(!passwordShow);
  };

  const validateForm = () => {
    const errors: any = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateField = (field: string, value: string) => {
    const updatedErrors = { ...errors };
    switch (field) {
      case "Email":
        if (!value) {
          updatedErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          updatedErrors.email = "Email is invalid";
        } else {
          updatedErrors.email = "";
        }
        break;

      case "Password":
        if (!value) {
          updatedErrors.password = "Password is required";
        } else if (value.length < 6) {
          updatedErrors.password = "Password must be at least 6 characters";
        } else {
          updatedErrors.password = "";
        }
        break;

      case "ConfirmPassword":
        if (value !== password) {
          updatedErrors.ConfirmPassword = "Passwords do not match";
        } else {
          updatedErrors.ConfirmPassword = "";
        }
        break;

      default:
        break;
    }

    setErrors(updatedErrors);
    const hasErrors = Object.values(updatedErrors).some((error) => error);
    setShowErrors(hasErrors);
  };

  const changeValue = (type: string, value: string) => {
    switch (type) {
      case "email":
        setEmail(value);
        break;
      case "fullName":
        setFullName(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }

    validateField(type, value);
  };

  const createAccount = async () => {
    validateForm();
    setLoading(true);
    const model = {
      email,
      password,
      fullName,

    };
    try {
   
      const loginResponse = await Axios.post("/register", model);
      if (loginResponse.status == 500) {
        toast.error("Register failed !!");
        setLoading(false);
      }

      if (loginResponse.status == 201) {        
        toast.success("Register Successfully !!");
        router.push("/login");
      } else {
        toast.error("egister failed !!");
      }
    } catch (error: any) {
      setLoading(false);

      console.error(error.response.data.message);
      toast.error(
        `Register failed! ${error.response.data.message ?? "Please check your credentials or try again later"} `
      );
    } finally {
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      <ToastContainer />
      <div className="w-full md:w-1/2 p16 bg-white flex flex-col pt-[72px] md:pt-0 md:justify-center items-center">
        <div className="w-full md:max-w-[360px] mb-8">
          <Link href="/">
            <Image
              alt="img"
              width={50}
              height={50}
              className="mb-6 md:mb-16 w-[50px] h-[50px]"
              src="/main-logo.png"
            />
          </Link>
          <div className="flex flex-col gap-3">
            <p className="login-title">Sign Up</p>
            <p className="login-subText">Welcome! Please create your account.</p>
          </div>
        </div>

        <div className="w-full md:max-w-[360px]">
          <div className="flex flex-col gap-5">
            <div>
              <Input
                value={fullName}
                labelLeftClassName="input-label"
                fControlWrapClassName="rounded-lg focus-within:border-[#63c121]"
                fGroupClassName="mb-0"
                fControlClassName="rounded-lg login-input"
                placeholder="Enter your email"
                onKeyDown={(ev:any) => {
                  if (ev.key === "Enter") {
                    emailInputRef.current?.focus();
                  }
                }}
                onChange={(ev:any) => changeValue("fullName", ev.target.value)}
                label="Name"
                type="text"
              />
              {showErrors && errors.email && <p className="text-red-500 absolute text-sm">{errors.fullName}</p>}
            </div>
            <div>
              <Input
                value={email}
                inputRef={emailInputRef}

                labelLeftClassName="input-label"
                fControlWrapClassName="rounded-lg focus-within:border-[#63c121]"
                fGroupClassName="mb-0"
                fControlClassName="rounded-lg login-input"
                placeholder="Enter your email"
                onKeyDown={(ev:any) => {
                  if (ev.key === "Enter") {
                    passwordInputRef.current?.focus();
                  }
                }}
                onChange={(ev:any) => changeValue("email", ev.target.value)}
                label="Email"
                type="email"
              />
              {showErrors && errors.email && <p className="text-red-500 absolute text-sm">{errors.email}</p>}
            </div>
            <div>
              <Input
                inputRef={passwordInputRef}
                value={password}
                onChange={(ev:any) => changeValue("password", ev.target.value)}
                labelLeftClassName="input-label"
                fControlWrapClassName="rounded-lg focus-within:border-[#63c121]"
                fControlClassName="rounded-lg login-input"
                fGroupClassName="mb-0"
                placeholder="Enter your password"
                label="Password"
                type={passwordShow ? "text" : "password"}
                onClickIconRight={handlePassword}
                onKeyDown={(ev:any) => {
                  if (ev.key === "Enter") {
                    createAccount();
                  }
                }}
                iconRight={
                  <Image
                    width={24}
                    height={24}
                    alt="img"
                    className="w-[24px] h-[24px]"
                    src={passwordShow ? "/eye-gray.png" : "/eye-lock.png"}
                  />
                }
              />
              {showErrors && errors.password && <p className="text-red-500 absolute text-sm">{errors.password}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-6 mx-8 md:mx-0">
                <Button
                  onClick={createAccount}
                  className={`login-signup w-full`}
                  // disabled={showErrors}
                  type={ButtonType.primary}
                >
                  {loading ? <ButtonLoader /> : "Sign Up"}
                </Button>
                </div>
        </div>

        <p className="dont-acc mt-6 md:mt-[37px]">
          Already have an account? <Link href="/login">Log In</Link>
        </p>
        <p className="login-bottom-txt hidden md:block">© All Right Reserved 2025</p>
      </div>

      <div className="hidden md:flex flex-1" style={{ background: "linear-gradient(204.16deg, #97FBFE 63.84%, #FFFFFF 107.88%)" }}>
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
};

export default SignupPage;
