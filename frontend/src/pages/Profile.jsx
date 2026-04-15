import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { store } from "@/redux/store";
import userLogo from "../assets/profile.avif";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import MyOrder from "./MyOrder";

function Profile() {
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.userId;
  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNo: user?.phoneNo || "",
    address: user?.address || "",
    city: user?.city || "",
    pinCode: user?.pinCode || "",
    profilePic: user?.profilePic || "",
    role: user?.role || "",
  });
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectedFile), // preview only
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    try {
      //use form data for text + file
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("pinCode", updateUser.pinCode);
      formData.append("role", updateUser.role);

      if (file) {
        formData.append("file", file);
      }

      const response = await axios.put(
        `${import.meta.env.VITE_URL}/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.user));
        setUpdateUser({
          ...response.data.user,
          profilePic: response.data.user.profilePic, // This ensures the new URL is used
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail to update profile");
    }
  };
  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div>
            <div className="flex flex-col justify-center items-center bg-gray-100">
              <h1 className="font-bold mb-7 text-2xl text-gray-800">
                Update Profile
              </h1>
              <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
                {/* profile picture */}
                <div className="flex flex-col items-center">
                  <img
                    src={updateUser.profilePic || userLogo}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-800"
                  ></img>
                  <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                    Change Picture
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                  {/* profile form */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4 shadow-lg p-5 rounded-lg bg-white"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="block text-sm font-medium">
                          First Name
                        </Label>
                        <Input
                          type="text"
                          name="firstName"
                          placeholder="John"
                          value={updateUser.firstName}
                          onChange={handleChange}
                          className="w-full rounded-lg px-3 py-2 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="block text-sm font-medium">
                          Last Name
                        </Label>
                        <Input
                          type="text"
                          name="lastName"
                          placeholder="Doe"
                          value={updateUser.lastName}
                          onChange={handleChange}
                          className="w-full rounded-lg px-3 py-2 mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="block text-sm font-medium">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        disabled
                        value={updateUser.email}
                        onChange={handleChange}
                        className="w-full rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium">
                        Phone Number
                      </Label>
                      <Input
                        type="text"
                        name="phoneNo"
                        value={updateUser.phoneNo}
                        onChange={handleChange}
                        placeholder="Enter your Contact No"
                        className="w-full rounded-lg px-3 py-2 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium">
                        Address
                      </Label>
                      <Input
                        type="text"
                        name="address"
                        value={updateUser.address}
                        onChange={handleChange}
                        placeholder="Enter your Address"
                        className="w-full rounded-lg px-3 py-2 mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="block text-sm font-medium">
                          City
                        </Label>
                        <Input
                          type="text"
                          name="city"
                          value={updateUser.city}
                          onChange={handleChange}
                          placeholder="Enter your City"
                          className="w-full rounded-lg px-3 py-2 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="block text-sm font-medium">
                          Pincode
                        </Label>
                        <Input
                          type="text"
                          name="pinCode"
                          value={updateUser.pinCode}
                          onChange={handleChange}
                          placeholder="Enter your Pincode"
                          className="w-full rounded-lg px-3 py-2 mt-1"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg"
                    >
                      Update Profile
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="orders">
          <MyOrder />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Profile;
