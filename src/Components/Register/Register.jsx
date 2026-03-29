import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const schema = z
    .object({
      name: z
        .string("Full name is required.")
        .min(3, "Full name is required.")
        .max(15, "15 maximum later"),
      email: z
        .email("Email is required.")
        .regex(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Please enter a valid email address.",
        ),

      gender: z.enum(["male", "female"], "Gender is required."),

      dateOfBirth: z.coerce.date("Date of birth is required.").refine(function (
        value,
      ) {
        const currentYear = new Date().getFullYear();
        const userYear = value.getFullYear();
        if (currentYear - userYear >= 18) {
          return true;
        }
        return false;
      }, "Date of birth cannot be in the future."),
      password: z
        .string("Password is required.")
        .regex(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Password must include uppercase, lowercase, number, and special character.",
        ),
      rePassword: z
        .string("Password is required.")
        .regex(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Password must include uppercase, lowercase, number, and special character.",
        ),
    })
    .refine((value) => value.password === value.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"],
    });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      gender: "",
      dateOfBirth: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  async function signup(values) {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "https://route-posts.routemisr.com/users/signup",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(data);

      toast.success(data.message);
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(error.response.data?.message, {
        position: "top-center",
      });
      setIsLoading(false);

      console.log(values);
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] px-4 py-8 sm:py-12 lg:flex lg:items-center">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
        <section className="order-2 w-full max-w-xl text-center lg:order-1 lg:text-left">
          <h1 className="hidden text-5xl font-extrabold tracking-tight text-[#00298d] sm:text-6xl lg:block">
            Route Posts
          </h1>
          <p className="hidden mt-4 text-2xl font-medium leading-snug text-slate-800 lg:block">
            Connect with friends and the world around you on Route Posts.
          </p>

          <div className="mt-6 rounded-2xl border border-[#c9d5ff] bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#00298d]">
              About Route Academy
            </p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              Egypt's Leading IT Training Center Since 2012
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              "Route Academy is the premier IT training center in Egypt,
              established in 2012. We specialize in delivering high-quality
              training courses in programming, web development, and application
              development. We've identified the unique challenges people may
              face when learning new technology and made efforts to provide
              strategies to overcome them."
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">2012</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Founded
                </p>
              </div>

              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">40K+</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Graduates
                </p>
              </div>

              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">50+</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Partner Companies
                </p>
              </div>

              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">5</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Branches
                </p>
              </div>

              <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                <p className="text-base font-extrabold text-[#00298d]">20</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                  Diplomas Available
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="order-1 w-full max-w-[430px] lg:order-2">
          <div className="rounded-2xl bg-white p-4 sm:p-6">
            <div className="mb-4 text-center lg:hidden">
              <h1 className="text-3xl font-extrabold tracking-tight text-[#00298d]">
                Route Posts
              </h1>
              <p className="mt-1 text-base font-medium leading-snug text-slate-700">
                Connect with friends and the world around you on Route Posts.
              </p>
            </div>

            <div className="mb-5 grid grid-cols-2 rounded-xl gap-3 bg-slate-100 p-1">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-center py-2 rounded-lg font-medium ${
                    isActive ? "bg-white shadow text-blue-600" : "text-gray-500"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `text-center py-2 rounded-lg font-medium ${
                    isActive ? "bg-white shadow text-blue-600" : "text-gray-500"
                  }`
                }
              >
                Register
              </NavLink>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Create a new account
            </h2>
            <p className="mt-1 text-sm text-slate-500">It is quick and easy.</p>

            <form onSubmit={handleSubmit(signup)} className="mt-5 space-y-3.5">
              <div>
                <input
                  id="name"
                  {...register("name")}
                  placeholder="Full name"
                  autoComplete="name"
                  className="w-full rounded-xl border bg-slate-50 py-3 pl-6 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                  type="text"
                />
                {errors?.name && (
                  <p className=" text-red-500 text-xs ms-4">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="username"
                  {...register("username")}
                  autoComplete="username"
                  placeholder="Username (optional)"
                  className="w-full rounded-xl border bg-slate-50 py-3 pl-6 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                  type="text"
                />
              </div>
              <div>
                <input
                  id="email"
                  {...register("email")}
                  autoComplete="email"
                  placeholder="Email or username"
                  className="w-full rounded-xl border bg-slate-50 py-3 pl-6 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                  type="text"
                />
                {errors?.email && (
                  <p className=" text-red-500 text-xs ms-4">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <select
                  id="gender"
                  {...register("gender")}
                  className="w-full rounded-xl border bg-slate-50 py-3 pl-6 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors?.gender && (
                  <p className=" text-red-500 text-xs ms-4">
                    {errors.gender.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="dateOfBirth"
                  {...register("dateOfBirth")}
                  placeholder="Date of birth"
                  className="w-full rounded-xl border bg-slate-50 py-3 pl-6 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                  type="date"
                />
                {errors?.dateOfBirth && (
                  <p className=" text-red-500 text-xs ms-4">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  id="password"
                  {...register("password")}
                  autoComplete="password"
                  placeholder="Password"
                  className="w-full rounded-xl border bg-slate-50 py-3 pl-6 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                  type="password"
                />
                {errors?.password && (
                  <p className=" text-red-500 text-xs ms-4">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="rePassword"
                  {...register("rePassword")}
                  placeholder="Confirm password"
                  autoComplete="rePassword"
                  className="w-full rounded-xl border bg-slate-50 py-3 pl-6 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                  type="password"
                />
                {errors?.rePassword && (
                  <p className=" text-red-500 text-xs ms-4">
                    {errors.rePassword.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full rounded-xl py-3 text-base font-extrabold flex items-center justify-center  text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]"
              >
                {isLoading ? <h5>loading...</h5> : "Create New Account"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
