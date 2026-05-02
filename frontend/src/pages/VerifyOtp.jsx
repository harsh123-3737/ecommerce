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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("resetEmail");

    if (!email) {
      toast.error("Session expired. Please try again.");
      navigate("/forgot-password");
      return;
    }

    if (!otp || otp.length !== 6) {
      toast.error("Please enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/user/verify-otp`,
        { email, otp },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/reset-password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      toast.error("Session expired");
      navigate("/forgot-password");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_URL}/user/forgot-password`,
        { email },
      );
      if (res.data.success) {
        toast.success("New OTP sent to your email");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>
          <CardDescription>
            Enter the 6-digit OTP sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <div className="grid gap-2">
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              />
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
                Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
          <button
            onClick={resendOtp}
            className="text-sm text-pink-600 hover:underline"
          >
            Resend OTP
          </button>
          <p className="text-gray-700 text-sm mt-2">
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

export default VerifyOtp;
