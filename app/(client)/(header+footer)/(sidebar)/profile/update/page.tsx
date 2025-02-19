'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

const ProfileUpdate = () => {
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const { toast } = useToast()

  // Profile update mutation
  const profileMutation = useMutation({
    mutationFn: ({ fullName, phoneNumber }: { fullName: string; phoneNumber: string }) => {
      return axiosInstance.patch('/user/update-profile', { fullname: fullName, phNumber: phoneNumber })
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      })
      setFullName('')
      setPhoneNumber('')
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
    mutationFn: ({ oldPassword, newPassword, confirmPassword }: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
      return axiosInstance.patch('/user/change-password', { currentPassword: oldPassword, password: newPassword, confirmPassword })
    },
    onSuccess: () => {
      toast({
        title: "Password Changed!",
        description: "Your password has been successfully updated.",
      })
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while updating your password.",
        variant: "destructive",
      })
    },
  })

  // Handle profile form submission
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

  // Handle password update form submission
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

  return (
    <div className='flex flex-col w-full'>
      {/* Profile Update Form */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Profile Update</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
              />
            </div>
            <Button type="submit" className="w-full" disabled={profileMutation.isPending}>
              {profileMutation.isPending ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password Update Form */}
      <Card className="w-full max-w-2xl mx-auto mt-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Password Update</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Old Password</Label>
              <Input
                id="oldPassword"
                type="password"
                placeholder="Enter your old password"
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
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={passwordMutation.isPending}>
              {passwordMutation.isPending ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  )
}

export default ProfileUpdate
