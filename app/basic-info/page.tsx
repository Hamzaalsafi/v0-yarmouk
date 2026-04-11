"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Home,
  ClipboardList,
  Calendar,
  GraduationCap,
  Eye,
  FileText,
  Target,
  Users,
  CreditCard,
  Bell,
  HelpCircle,
  Menu,
  X,
  LogOut,
  Globe,
  User,
  MapPin,
  Clock,
  Save,
  Pencil,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarUserMenu } from "@/components/sidebar-user-menu"

const studentData = {
  name: "محمد",
  id: "20210000",
  college: "كلية الهندسة",
  major: "الهندسة الصناعية",
  level: "السنة الخامسة",
  currentSemester: "الفصل الثاني 2025/2026",
  totalCredits: 98,
  remainingCredits: 42,
  registeredCredits: 15,
}

const initialProfile = {
  nationalId: "9876543210",
  birthDate: "2003-04-29",
  mobile: "0791234567",
  email: "student@yu.edu.jo",
  guardianMobile: "0797654321",
  country: "الأردن",
  governorate: "إربد",
  city: "إربد",
  district: "حي الجامعة",
  street: "شارع الجامعة",
  building: "عمارة 12",
  postalCode: "21110",
}

const registrationTimes = [
  {
    phase: "التسجيل المبكر",
    from: "20 مارس 2026 - 09:00 صباحاً",
    to: "22 مارس 2026 - 08:00 مساءً",
    eligibility: "لمن أنهى 90 ساعة فأكثر",
    status: "متاح",
  },
  {
    phase: "التسجيل العام",
    from: "23 مارس 2026 - 09:00 صباحاً",
    to: "25 مارس 2026 - 08:00 مساءً",
    eligibility: "جميع الطلبة",
    status: "قريب",
  },
  {
    phase: "السحب والإضافة",
    from: "26 مارس 2026 - 09:00 صباحاً",
    to: "30 مارس 2026 - 02:00 مساءً",
    eligibility: "جميع الطلبة",
    status: "لاحقاً",
  },
]

export default function BasicInfoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [profile, setProfile] = useState(initialProfile)
  const [activeTab, setActiveTab] = useState("basic-info")

  useEffect(() => {
    const search = new URLSearchParams(window.location.search)
    setActiveTab(search.get("tab") === "registration-times" ? "registration-times" : "basic-info")
  }, [])

  const sidebarNav = [
    { icon: Home, title: "الرئيسية", href: "/dashboard", active: false },
    { icon: ClipboardList, title: "المعلومات الأساسية", href: "/basic-info", active: activeTab === "basic-info" },
    { icon: Calendar, title: "أوقات التسجيل", href: "/basic-info?tab=registration-times", active: activeTab === "registration-times" },
    { icon: ClipboardList, title: "تسجيل المواد", href: "/registration", active: false },
    { icon: Calendar, title: "الجدول الدراسي", href: "/schedule", active: false },
    { icon: GraduationCap, title: "العلامات", href: "/grades", active: false },
    { icon: Eye, title: "الغياب", href: "/attendance", active: false },
    { icon: FileText, title: "الامتحانات", href: "/exams", active: false },
    { icon: Target, title: "الخطة الدراسية", href: "/study-plan", active: false },
    { icon: Users, title: "الأساتذة", href: "/faculty", active: false },
    { icon: CreditCard, title: "الرسوم", href: "/fees", active: false },
    { icon: Bell, title: "الإعلانات", href: "/announcements", active: false },
    { icon: HelpCircle, title: "المساعدة", href: "/help", active: false },
  ]

  const updateField = (field: keyof typeof initialProfile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex flex-col w-64 bg-card border-l border-border">
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white p-1">
              <Image src="/Yarmouk_University_logo.png" alt="Yarmouk University logo" fill sizes="40px" className="object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-sm leading-tight">جامعة اليرموك</h1>
              <p className="text-xs text-muted-foreground">البوابة الإلكترونية</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarNav.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>


      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed right-0 top-0 bottom-0 w-72 bg-card border-l border-border shadow-xl flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white p-1">
                  <Image src="/Yarmouk_University_logo.png" alt="Yarmouk University logo" fill sizes="40px" className="object-contain" />
                </div>
                <span className="font-bold text-foreground">جامعة اليرموك</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {sidebarNav.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    item.active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>


          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <SidebarUserMenu />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>EN</span>
              </Button>
              <Link href="/change-password">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  تغيير كلمة السر
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4 ml-1" />
                  <span className="hidden sm:inline">خروج</span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 space-y-6">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <Badge variant="secondary" className="mb-2">الطالب</Badge>
                  <h2 className="text-xl lg:text-2xl font-bold">{studentData.name}</h2>
                  <p className="text-sm opacity-90 mt-1">{studentData.college} - {studentData.major}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-primary-foreground/10 rounded-lg p-3">
                    <p className="text-xl font-bold">{studentData.registeredCredits}</p>
                    <p className="text-xs opacity-90">ساعات مسجلة</p>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-lg p-3">
                    <p className="text-xl font-bold">{studentData.remainingCredits}</p>
                    <p className="text-xs opacity-90">ساعات متبقية</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="basic-info">المعلومات الأساسية</TabsTrigger>
              <TabsTrigger value="registration-times">أوقات التسجيل</TabsTrigger>
            </TabsList>

            <TabsContent value="basic-info" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    بيانات الطالب
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>الاسم الكامل</Label>
                    <Input value={studentData.name} readOnly className="mt-1" />
                  </div>
                  <div>
                    <Label>الرقم الجامعي</Label>
                    <Input value={studentData.id} readOnly className="mt-1" />
                  </div>
                  <div>
                    <Label>الرقم الوطني</Label>
                    <Input value={profile.nationalId} readOnly={!editMode} className="mt-1" onChange={(e) => updateField("nationalId", e.target.value)} />
                  </div>
                  <div>
                    <Label>تاريخ الميلاد</Label>
                    <Input type="date" value={profile.birthDate} readOnly={!editMode} className="mt-1" onChange={(e) => updateField("birthDate", e.target.value)} />
                  </div>
                  <div>
                    <Label>الكلية</Label>
                    <Input value={studentData.college} readOnly className="mt-1" />
                  </div>
                  <div>
                    <Label>التخصص / السنة</Label>
                    <Input value={`${studentData.major} - ${studentData.level}`} readOnly className="mt-1" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    العنوان ووسائل التواصل
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>الهاتف الخلوي</Label>
                    <Input value={profile.mobile} readOnly={!editMode} className="mt-1" onChange={(e) => updateField("mobile", e.target.value)} />
                  </div>
                  <div>
                    <Label>بريد الطالب</Label>
                    <Input value={profile.email} readOnly={!editMode} className="mt-1" onChange={(e) => updateField("email", e.target.value)} />
                  </div>
                  <div>
                    <Label>هاتف ولي الأمر</Label>
                    <Input value={profile.guardianMobile} readOnly={!editMode} className="mt-1" onChange={(e) => updateField("guardianMobile", e.target.value)} />
                  </div>
                  <div>
                    <Label>الدولة</Label>
                    <Input value={profile.country} readOnly={!editMode} className="mt-1" onChange={(e) => updateField("country", e.target.value)} />
                  </div>
                  <div>
                    <Label>المحافظة / المدينة</Label>
                    <Input value={`${profile.governorate} - ${profile.city}`} readOnly={!editMode} className="mt-1" onChange={(e) => updateField("city", e.target.value)} />
                  </div>
                  <div>
                    <Label>المنطقة</Label>
                    <Input value={profile.district} readOnly={!editMode} className="mt-1" onChange={(e) => updateField("district", e.target.value)} />
                  </div>
                  <div>
                    <Label>الشارع / العمارة</Label>
                    <Input value={`${profile.street} - ${profile.building}`} readOnly={!editMode} className="mt-1" onChange={(e) => updateField("street", e.target.value)} />
                  </div>
                  <div>
                    <Label>الرمز البريدي</Label>
                    <Input value={profile.postalCode} readOnly={!editMode} className="mt-1" onChange={(e) => updateField("postalCode", e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-wrap items-center justify-end gap-2">
                {editMode && (
                  <>
                    <Button variant="outline" onClick={() => { setProfile(initialProfile); setEditMode(false) }}>
                      إلغاء
                    </Button>
                    <Button onClick={() => setEditMode(false)}>
                      <Save className="h-4 w-4 ml-2" />
                      حفظ التعديلات
                    </Button>
                  </>
                )}
                {!editMode && (
                  <Button onClick={() => setEditMode(true)}>
                    <Pencil className="h-4 w-4 ml-2" />
                    تعديل
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="registration-times" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    أوقات التسجيل للفصل الحالي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {registrationTimes.map((slot, index) => (
                    <div key={index} className="rounded-xl border border-border p-4 bg-muted/40">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                        <h3 className="font-semibold text-foreground">{slot.phase}</h3>
                        <Badge variant={slot.status === "متاح" ? "default" : slot.status === "قريب" ? "secondary" : "outline"}>
                          {slot.status}
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground space-y-1">
                        <p>من: {slot.from}</p>
                        <p>إلى: {slot.to}</p>
                        <p>الفئة: {slot.eligibility}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
