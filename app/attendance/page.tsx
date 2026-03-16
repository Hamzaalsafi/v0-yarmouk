"use client"

import { useState } from "react"
import Link from "next/link"
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
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

// Attendance Data
const attendanceData = [
  {
    code: "IE 401",
    name: "بحوث العمليات",
    instructor: "د. أحمد الخطيب",
    totalClasses: 24,
    attended: 20,
    absences: 4,
    maxAbsences: 5,
    status: "warning" as const,
    schedule: "أحد، ثلاثاء 09:00 - 10:30"
  },
  {
    code: "IE 403",
    name: "إدارة الجودة",
    instructor: "د. محمد النجار",
    totalClasses: 24,
    attended: 22,
    absences: 2,
    maxAbsences: 5,
    status: "good" as const,
    schedule: "أحد، ثلاثاء 11:00 - 12:30"
  },
  {
    code: "IE 405",
    name: "هندسة العوامل البشرية",
    instructor: "د. ليلى حسن",
    totalClasses: 24,
    attended: 23,
    absences: 1,
    maxAbsences: 5,
    status: "excellent" as const,
    schedule: "اثنين، أربعاء 09:00 - 10:30"
  },
  {
    code: "MATH 301",
    name: "الإحصاء الهندسي",
    instructor: "د. عمر الزعبي",
    totalClasses: 24,
    attended: 21,
    absences: 3,
    maxAbsences: 5,
    status: "good" as const,
    schedule: "اثنين، أربعاء 14:00 - 15:30"
  },
  {
    code: "IE 402",
    name: "مشروع التخرج 1",
    instructor: "د. خالد المصري",
    totalClasses: 12,
    attended: 12,
    absences: 0,
    maxAbsences: 3,
    status: "excellent" as const,
    schedule: "خميس 10:00 - 13:00"
  },
]

// Sidebar Navigation
const sidebarNav = [
  { icon: Home, title: "الرئيسية", href: "/dashboard", active: false },
  { icon: ClipboardList, title: "تسجيل المواد", href: "/registration", active: false },
  { icon: Calendar, title: "الجدول الدراسي", href: "/schedule", active: false },
  { icon: GraduationCap, title: "العلامات", href: "/grades", active: false },
  { icon: Eye, title: "الغياب", href: "/attendance", active: true },
  { icon: FileText, title: "الامتحانات", href: "/exams", active: false },
  { icon: Target, title: "الخطة الدراسية", href: "/study-plan", active: false },
  { icon: Users, title: "الأساتذة", href: "/faculty", active: false },
  { icon: CreditCard, title: "الرسوم", href: "/fees", active: false },
  { icon: Bell, title: "الإعلانات", href: "/announcements", active: false },
  { icon: HelpCircle, title: "المساعدة", href: "/help", active: false },
]

function getStatusColor(status: "excellent" | "good" | "warning" | "danger") {
  switch (status) {
    case "excellent": return "text-accent"
    case "good": return "text-primary"
    case "warning": return "text-[oklch(0.75_0.15_70)]"
    case "danger": return "text-destructive"
  }
}

function getStatusBadge(status: "excellent" | "good" | "warning" | "danger") {
  switch (status) {
    case "excellent": return <Badge className="bg-accent/10 text-accent border-0">ممتاز</Badge>
    case "good": return <Badge className="bg-primary/10 text-primary border-0">جيد</Badge>
    case "warning": return <Badge className="bg-[oklch(0.75_0.15_70)]/10 text-[oklch(0.55_0.15_70)] border-0">تحذير</Badge>
    case "danger": return <Badge variant="destructive">خطر</Badge>
  }
}

function getProgressColor(absences: number, maxAbsences: number) {
  const ratio = absences / maxAbsences
  if (ratio >= 0.8) return "bg-destructive"
  if (ratio >= 0.6) return "bg-[oklch(0.75_0.15_70)]"
  if (ratio >= 0.4) return "bg-primary"
  return "bg-accent"
}

export default function AttendancePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const totalAbsences = attendanceData.reduce((sum, c) => sum + c.absences, 0)
  const coursesAtRisk = attendanceData.filter(c => c.status === "warning" || c.status === "danger").length

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-l border-border">
        <div className="p-4 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
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
          <aside className="fixed right-0 top-0 bottom-0 w-72 bg-card border-l border-border shadow-xl">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">جامعة اليرموك</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-1">
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
                <h1 className="font-semibold text-foreground">سجل الغياب</h1>
                <p className="text-xs text-muted-foreground">الفصل الثاني 2025/2026</p>
              </div>
            </div>

            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 ml-1" />
                <span className="hidden sm:inline">الرئيسية</span>
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Alert for courses at risk */}
          {coursesAtRisk > 0 && (
            <Alert className="border-destructive/30 bg-destructive/5">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertTitle className="text-destructive">تنبيه غياب</AlertTitle>
              <AlertDescription>
                لديك {coursesAtRisk} مادة/مواد تحتاج انتباهك بسبب ارتفاع عدد الغيابات. الحد الأقصى للغياب هو 15% من المحاضرات.
              </AlertDescription>
            </Alert>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Eye className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{attendanceData.length}</p>
                    <p className="text-xs text-muted-foreground">مواد مسجلة</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalAbsences}</p>
                    <p className="text-xs text-muted-foreground">إجمالي الغيابات</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[oklch(0.75_0.15_70)]/10 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-[oklch(0.55_0.15_70)]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{coursesAtRisk}</p>
                    <p className="text-xs text-muted-foreground">مواد بحاجة انتباه</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {attendanceData.filter(c => c.status === "excellent").length}
                    </p>
                    <p className="text-xs text-muted-foreground">مواد ممتازة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Cards */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">تفاصيل الغياب لكل مادة</h2>
            
            <div className="grid gap-4">
              {attendanceData.map((course, index) => (
                <Card 
                  key={index} 
                  className={`border-border/50 ${
                    course.status === "warning" ? "border-[oklch(0.75_0.15_70)]/30 bg-[oklch(0.75_0.15_70)]/5" :
                    course.status === "danger" ? "border-destructive/30 bg-destructive/5" : ""
                  }`}
                >
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Course Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{course.name}</h3>
                          <Badge variant="outline" className="text-xs">{course.code}</Badge>
                          {getStatusBadge(course.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{course.instructor}</p>
                        <p className="text-xs text-muted-foreground mt-1">{course.schedule}</p>
                      </div>

                      {/* Attendance Stats */}
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{course.attended}</p>
                          <p className="text-xs text-muted-foreground">حضور</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-2xl font-bold ${getStatusColor(course.status)}`}>{course.absences}</p>
                          <p className="text-xs text-muted-foreground">غياب</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{course.totalClasses}</p>
                          <p className="text-xs text-muted-foreground">إجمالي</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="lg:w-48">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">الغيابات المستخدمة</span>
                          <span className={`font-medium ${getStatusColor(course.status)}`}>
                            {course.absences} / {course.maxAbsences}
                          </span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all ${getProgressColor(course.absences, course.maxAbsences)}`}
                            style={{ width: `${(course.absences / course.maxAbsences) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          متبقي {course.maxAbsences - course.absences} غياب/غيابات
                        </p>
                      </div>
                    </div>

                    {/* Warning Message */}
                    {course.status === "warning" && (
                      <div className="mt-4 p-3 bg-[oklch(0.75_0.15_70)]/10 rounded-lg flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-[oklch(0.55_0.15_70)] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[oklch(0.40_0.10_70)]">
                          تحذير: اقتربت من الحد الأقصى للغياب. غياب واحد إضافي قد يؤدي للحرمان من المادة.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Info Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">قواعد الغياب</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>الحد الأقصى للغياب هو 15% من إجمالي المحاضرات</li>
                    <li>تجاوز الحد الأقصى يؤدي للحرمان من دخول الامتحان النهائي</li>
                    <li>الغياب بعذر طبي موثق لا يحتسب ضمن الغيابات</li>
                    <li>يرجى مراجعة القسم في حال وجود أي استفسار</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
