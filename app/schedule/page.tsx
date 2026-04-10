"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  GraduationCap,
  Home,
  ClipboardList,
  Calendar,
  FileText,
  Target,
  CreditCard,
  Bell,
  HelpCircle,
  Menu,
  X,
  Users,
  Eye,
  Globe,
  LogOut,
  Clock,
  MapPin,
  Download,
  Printer,
  ChevronRight,
  ChevronLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarUserMenu } from "@/components/sidebar-user-menu"

// Schedule Data
const scheduleData = [
  {
    day: "الأحد",
    dayEn: "Sunday",
    courses: [
      { code: "IE 318", name: "قياس وتحليل العمل", time: "11:30 - 12:30", room: "هج 215", instructor: "احمد عبدالحفيظ المومني", color: "bg-primary" },
      { code: "IE 358", name: "بحوث عمليات (1)", time: "10:30 - 11:30", room: "هج 322", instructor: "سنان عبيدات", color: "bg-accent" },
      { code: "IE 432", name: "اقتصاد هندسي", time: "10:30 - 11:30", room: "هج 321", instructor: "اسيل فايز خنفر", color: "bg-primary/85" },
    ]
  },
  {
    day: "الاثنين",
    dayEn: "Monday",
    courses: [
      { code: "IE 205", name: "المشاغل الهندسية", time: "14:30 - 17:30", room: "مشاغل", instructor: "احمد عبدالحفيظ المومني", color: "bg-primary/85" },
      { code: "IE 432", name: "اقتصاد هندسي", time: "12:30 - 14:00", room: "هج 321", instructor: "محمد يونس علي الدراغمة", color: "bg-accent/85" },
    ]
  },
  {
    day: "الثلاثاء",
    dayEn: "Tuesday",
    courses: [
      { code: "IE 318", name: "قياس وتحليل العمل", time: "11:30 - 12:30", room: "هج 215", instructor: "احمد عبدالحفيظ المومني", color: "bg-primary" },
      { code: "IE 423", name: "مختبر هندسة العوامل البشرية", time: "14:30 - 17:30", room: "مختبر", instructor: "عبدالله الخضر", color: "bg-accent" },
    ]
  },
  {
    day: "الأربعاء",
    dayEn: "Wednesday",
    courses: [
      { code: "IE 205", name: "المشاغل الهندسية", time: "14:30 - 17:30", room: "مشاغل", instructor: "احمد عبدالحفيظ المومني", color: "bg-primary/85" },
      { code: "IE 432", name: "اقتصاد هندسي", time: "12:30 - 14:00", room: "هج 321", instructor: "محمد يونس علي الدراغمة", color: "bg-accent/85" },
    ]
  },
  {
    day: "الخميس",
    dayEn: "Thursday",
    courses: [
      { code: "IE 213", name: "مختبرالقياسات", time: "14:30 - 17:30", room: "مختبر", instructor: "سنان عبيدات", color: "bg-destructive" },
      { code: "IE 422", name: "هندسة العوامل البشرية", time: "12:30 - 13:30", room: "هج 322", instructor: "الاء طويق", color: "bg-primary/85" },
    ]
  },
]

// Time slots for grid view
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"
]

const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"]

// Sidebar Navigation
const sidebarNav = [
  { icon: Home, title: "الرئيسية", href: "/dashboard", active: false },
  { icon: ClipboardList, title: "المعلومات الأساسية", href: "/basic-info", active: false },
  { icon: Calendar, title: "أوقات التسجيل", href: "/basic-info?tab=registration-times", active: false },
  { icon: ClipboardList, title: "تسجيل المواد", href: "/registration", active: false },
  { icon: Calendar, title: "الجدول الدراسي", href: "/schedule", active: true },
  { icon: GraduationCap, title: "العلامات", href: "/grades", active: false },
  { icon: Eye, title: "الغياب", href: "/attendance", active: false },
  { icon: FileText, title: "الامتحانات", href: "/exams", active: false },
  { icon: Target, title: "الخطة الدراسية", href: "/study-plan", active: false },
  { icon: Users, title: "الأساتذة", href: "/faculty", active: false },
  { icon: CreditCard, title: "الرسوم", href: "/fees", active: false },
  { icon: Bell, title: "الإعلانات", href: "/announcements", active: false },
  { icon: HelpCircle, title: "المساعدة", href: "/help", active: false },
]

export default function SchedulePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  // Get today's day name
  const today = new Date().toLocaleDateString('ar-SA', { weekday: 'long' })

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-l border-border">
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white p-1">
              <Image
                src="/Yarmouk_University_logo.png"
                alt="Yarmouk University logo"
                fill
                sizes="40px"
                className="object-contain"
              />
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
                item.active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>


      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed right-0 top-0 bottom-0 w-72 bg-card border-l border-border shadow-xl flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-white p-1">
                  <Image
                    src="/Yarmouk_University_logo.png"
                    alt="Yarmouk University logo"
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
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
                    item.active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
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

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* View Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">جدول المحاضرات الأسبوعي</h2>
              <p className="text-sm text-muted-foreground">عرض جدول المحاضرات لهذا الفصل</p>
            </div>
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "list" | "grid")}>
              <TabsList>
                <TabsTrigger value="list">عرض القائمة</TabsTrigger>
                <TabsTrigger value="grid">عرض الشبكة</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* List View */}
          {viewMode === "list" && (
            <div className="space-y-4">
              {scheduleData.map((dayData, dayIndex) => (
                <Card key={dayIndex} className={`border-border/50 ${dayData.day === today ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {dayData.day}
                        {dayData.day === today && (
                          <Badge className="bg-primary text-primary-foreground">اليوم</Badge>
                        )}
                      </CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {dayData.courses.length} محاضرة/محاضرات
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {dayData.courses.length === 0 ? (
                      <p className="text-muted-foreground text-center py-4">لا توجد محاضرات</p>
                    ) : (
                      <div className="space-y-3">
                        {dayData.courses.map((course, courseIndex) => (
                          <div
                            key={courseIndex}
                            className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg"
                          >
                            <div className={`w-1 h-14 rounded-full ${course.color}`} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-foreground">{course.name}</h4>
                                <Badge variant="outline" className="text-xs">{course.code}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{course.instructor}</p>
                            </div>
                            <div className="text-left space-y-1">
                              <div className="flex items-center gap-1 text-sm text-foreground">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                {course.time}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                {course.room}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Grid View */}
          {viewMode === "grid" && (
            <Card className="border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-3 text-right text-sm font-semibold text-foreground border-b border-border w-20">
                          الوقت
                        </th>
                        {days.map((day) => (
                          <th
                            key={day}
                            className={`p-3 text-center text-sm font-semibold border-b border-border ${
                              day === today ? 'bg-primary/10 text-primary' : 'text-foreground'
                            }`}
                          >
                            {day}
                            {day === today && (
                              <Badge className="mr-2 bg-primary text-primary-foreground text-xs">اليوم</Badge>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map((time, timeIndex) => (
                        <tr key={time} className="border-b border-border last:border-0">
                          <td className="p-3 text-sm text-muted-foreground border-l border-border bg-muted/30">
                            {time}
                          </td>
                          {days.map((day) => {
                            const dayData = scheduleData.find(d => d.day === day)
                            const course = dayData?.courses.find(c => {
                              const [start] = c.time.split(' - ')
                              return start === time
                            })

                            return (
                              <td
                                key={day}
                                className={`p-2 border-l border-border ${day === today ? 'bg-primary/5' : ''}`}
                              >
                                {course && (
                                  <div className={`p-2 rounded-lg ${course.color} text-white text-xs`}>
                                    <p className="font-semibold truncate">{course.name}</p>
                                    <p className="opacity-90">{course.code}</p>
                                    <p className="opacity-80 mt-1">{course.room}</p>
                                  </div>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Legend */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">المواد المسجلة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "قياس وتحليل العمل", code: "IE 318", color: "bg-primary" },
                  { name: "بحوث عمليات (1)", code: "IE 358", color: "bg-accent" },
                  { name: "اقتصاد هندسي", code: "IE 432", color: "bg-primary/85" },
                  { name: "المشاغل الهندسية", code: "IE 205", color: "bg-accent/85" },
                  { name: "مختبرالقياسات", code: "IE 213", color: "bg-destructive" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded ${item.color}`} />
                    <span className="text-sm text-foreground">{item.name}</span>
                    <span className="text-xs text-muted-foreground">({item.code})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
