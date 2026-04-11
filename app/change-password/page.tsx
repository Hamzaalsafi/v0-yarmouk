"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, KeyRound, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("يرجى تعبئة جميع الحقول")
      return
    }

    if (newPassword.length < 8) {
      setError("كلمة السر الجديدة يجب أن تكون 8 أحرف على الأقل")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("تأكيد كلمة السر غير مطابق")
      return
    }

    // Demo-only behavior for UI preview.
    setSuccess(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-xl mx-auto space-y-4">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowRight className="h-4 w-4" />
          العودة إلى الرئيسية
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-primary" />
              تغيير كلمة السر
            </CardTitle>
            <CardDescription>
              أدخل كلمة السر الحالية ثم كلمة السر الجديدة.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">كلمة السر الحالية</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">كلمة السر الجديدة</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">تأكيد كلمة السر الجديدة</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertTitle>تعذر الحفظ</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <ShieldCheck className="h-4 w-4" />
                  <AlertTitle>تم التحديث</AlertTitle>
                  <AlertDescription>تم تغيير كلمة السر بنجاح.</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full">حفظ كلمة السر الجديدة</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
