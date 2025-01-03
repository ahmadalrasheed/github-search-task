import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginActionMutation } from "@/services/auth/authApiSlice";
import { Button, Input, Label } from "@/components";

interface FormData {
  email: string;
  password: string;
}

export function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onChange" });
  const [loginAction, { isLoading, data }]: any = useLoginActionMutation<any>();
  const navigate = useNavigate();
  console.log("isLoading", isLoading, data);

  const onSubmit = async (data: FormData) => {
    await loginAction({
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    });

    // go to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[300px] p-6 bg-white rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        {/* Email Field */}
        <Label htmlFor="email" text="Email" />
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
          errorMessage={errors.email?.message}
        />

        {/* Password Field */}
        <Label htmlFor="password" text="Password" />
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          register={register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
              message:
                "Must be at least 8 chars, with 1 uppercase letter & 1 digit",
            },
          })}
          errorMessage={errors.password?.message}
        />

        <Button
          text={isLoading ? "Loading..." : "Sign In"}
          type="submit"
          disabled={isLoading || Object.values(errors)?.length > 0}
        />
      </form>
    </div>
  );
}
