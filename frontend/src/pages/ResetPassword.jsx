import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import { Eye, EyeOff } from "@hugeicons/core-free-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("resetEmail");

    if (!email) {
      toast.error("Session expired. Please try again.");
      navigate("/forgot-password");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:10000/api/v1/user/change-password/${email}`,
        {
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.removeItem("resetEmail");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  required
                />
                {showPassword ? (
                  <HugeiconsIcon
                    icon={EyeOff}
                    onClick={() => setShowPassword(false)}
                    className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 cursor-pointer"
                  />
                ) : (
                  <HugeiconsIcon
                    icon={Eye}
                    onClick={() => setShowPassword(true)}
                    className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  required
                />
                {showConfirmPassword ? (
                  <HugeiconsIcon
                    icon={EyeOff}
                    onClick={() => setShowConfirmPassword(false)}
                    className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 cursor-pointer"
                  />
                ) : (
                  <HugeiconsIcon
                    icon={Eye}
                    onClick={() => setShowConfirmPassword(true)}
                    className="w-5 h-5 text-gray-700 absolute right-5 bottom-2 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500"
            onClick={submitHandler}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Resetting Password...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
          <p className="text-gray-700 text-sm">
            <Link
              to={"/login"}
              className="hover:underline cursor-pointer text-pink-800"
            >
              Back to Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ResetPassword;
