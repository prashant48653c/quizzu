"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/axiosInstance"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Pencil, Save, X, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface User {
  fullname: string
  email: string
  phNumber: number
  avatar: string
}

const ProfileUpdate = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { toast } = useToast()

  // Fetch user data
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get("user/me")
      return response.data.data.user as User
    },
  })

  useEffect(() => {
    if (userData) {
      setFullName(userData.fullname)
      setPhoneNumber(userData.phNumber.toString())
    }
  }, [userData])

  // Profile update mutation
  const profileMutation = useMutation({
    mutationFn: ({ fullName, phoneNumber }: { fullName: string; phoneNumber: string }) => {
      return axiosInstance.patch("/user/update-profile", { fullname: fullName, phNumber: phoneNumber })
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      })
      setIsEditing(false)
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    },
  })

  // Password update mutation
  const passwordMutation = useMutation({
    mutationFn: ({
      oldPassword,
      newPassword,
      confirmPassword,
    }: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
      return axiosInstance.patch("/user/change-password", {
        currentPassword: oldPassword,
        password: newPassword,
        confirmPassword,
      })
    },
    onSuccess: () => {
      toast({
        title: "Password Changed!",
        description: "Your password has been successfully updated.",
      })
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while updating your password.",
        variant: "destructive",
      })
    },
  })

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName && !phoneNumber) {
      toast({
        title: "Error",
        description: "Please fill at least one field to update.",
        variant: "destructive",
      })
      return
    }
    profileMutation.mutate({ fullName, phoneNumber })
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      })
      return
    }
    passwordMutation.mutate({ oldPassword, newPassword, confirmPassword })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    if (userData) {
      setFullName(userData.fullname)
      setPhoneNumber(userData.phNumber.toString())
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-8">
        {/* Profile Information */}
        <Card className="w-full">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
              {!isEditing ? (
                <Button variant="outline" onClick={() => setIsEditing(true)} size="sm">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" form="profile-form">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex flex-col items-center space-y-3">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={userData?.avatar} alt={userData?.fullname} />
                  <AvatarFallback>{userData?.fullname.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground">{userData?.email}</p>
              </div>

              <form id="profile-form" onSubmit={handleProfileSubmit} className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tel">Phone Number</Label>
                  <Input
                    id="tel"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Password Update Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Security Settings</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Current Password</Label>
                  <Input
                    id="oldPassword"
                    type="password"
                    placeholder="Enter your current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full md:w-auto bg-slate-200" disabled={passwordMutation.isPending}>
                {passwordMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Toaster />
    </div>
  )
}

export default ProfileUpdate

