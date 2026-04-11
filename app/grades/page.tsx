"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  GraduationCap,
  ChevronDown,
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
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Printer,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SidebarUserMenu } from "@/components/sidebar-user-menu"

// Semesters
const semesters = [
  { value: "2025-2", label: "الفصل الثاني 2025/2026", current: true },
  { value: "2025-1", label: "الفصل الأول 2025/2026", current: false },
  { value: "2024-summer", label: "الفصل الصيفي 2024", current: false },
  { value: "2024-2", label: "الفصل الثاني 2024/2025", current: false },
  { value: "2024-1", label: "الفصل الأول 2024/2025", current: false },
]

type CourseGrade = {
  code: string
  name: string
  credits: number
  midterm: number | null
  coursework: number | null
  final: number | null
  total: number | null
  grade: number | null
  status: "in-progress" | "complete"
}

// Grades Data
const gradesData: Record<string, CourseGrade[]> = {
  "2025-2": [
    { code: "IE 318", name: "قياس وتحليل العمل", credits: 3, midterm: 42, coursework: 18, final: null, total: null, grade: null, status: "in-progress" },
    { code: "IE 358", name: "بحوث عمليات (1)", credits: 3, midterm: 38, coursework: 17, final: null, total: null, grade: null, status: "in-progress" },
    { code: "IE 432", name: "اقتصاد هندسي", credits: 3, midterm: 45, coursework: 19, final: null, total: null, grade: null, status: "in-progress" },
    { code: "IE 205", name: "المشاغل الهندسية", credits: 2, midterm: 35, coursework: 16, final: null, total: null, grade: null, status: "in-progress" },
    { code: "IE 423", name: "مختبر هندسة العوامل البشرية", credits: 1, midterm: null, coursework: 85, final: null, total: null, grade: null, status: "in-progress" },
  ],
  "2025-1": [
    { code: "IE 318", name: "قياس وتحليل العمل", credits: 3, midterm: 44, coursework: 18, final: 38, total: 92, grade: 92, status: "complete" },
    { code: "IE 354", name: "الإحصاء الهندسي التطبيقي", credits: 3, midterm: 40, coursework: 17, final: 35, total: 85, grade: 85, status: "complete" },
    { code: "IE 358", name: "بحوث عمليات (1)", credits: 3, midterm: 38, coursework: 16, final: 32, total: 78, grade: 78, status: "complete" },
    { code: "IE 432", name: "اقتصاد هندسي", credits: 3, midterm: 42, coursework: 19, final: 36, total: 88, grade: 88, status: "complete" },
    { code: "IE 422", name: "هندسة العوامل البشرية", credits: 3, midterm: 35, coursework: 15, final: 28, total: 70, grade: 70, status: "complete" },
  ],
}

const currentSemesterGrades: CourseGrade[] = gradesData["2025-2"]

// GPA Data
const gpaData = {
  currentSemester: null, // In progress
  cumulative: 86.25,
  previousSemester: 88.0,
  trend: "down" as "up" | "down" | "stable",
  standing: "جيد جداً"
}

// Sidebar Navigation
const sidebarNav = [
  { icon: Home, title: "الرئيسية", href: "/dashboard", active: false },
  { icon: ClipboardList, title: "المعلومات الأساسية", href: "/basic-info", active: false },
  { icon: Calendar, title: "أوقات التسجيل", href: "/basic-info?tab=registration-times", active: false },
  { icon: ClipboardList, title: "تسجيل المواد", href: "/registration", active: false },
  { icon: Calendar, title: "الجدول الدراسي", href: "/schedule", active: false },
  { icon: GraduationCap, title: "العلامات", href: "/grades", active: true },
  { icon: Eye, title: "الغياب", href: "/attendance", active: false },
  { icon: FileText, title: "الامتحانات", href: "/exams", active: false },
  { icon: Target, title: "الخطة الدراسية", href: "/study-plan", active: false },
  { icon: Users, title: "الأساتذة", href: "/faculty", active: false },
  { icon: CreditCard, title: "الرسوم", href: "/fees", active: false },
  { icon: Bell, title: "الإعلانات", href: "/announcements", active: false },
  { icon: HelpCircle, title: "المساعدة", href: "/help", active: false },
]

export default function GradesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState("2025-2")

  const grades = gradesData[selectedSemester] || currentSemesterGrades
  const isCurrentSemester = selectedSemester === "2025-2"

  // Calculate semester average out of 100 for completed semesters
  const calculateSemesterAverage = () => {
    if (isCurrentSemester) return null
    let weightedSum = 0
    let totalCredits = 0
    grades.forEach(g => {
      if (g.total !== null) {
        weightedSum += g.total * g.credits
        totalCredits += g.credits
      }
    })
    return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : null
  }

  const semesterAverage = calculateSemesterAverage()

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
          {/* Semester Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">سجل العلامات</h2>
              <p className="text-sm text-muted-foreground">عرض العلامات حسب الفصل الدراسي</p>
            </div>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((sem) => (
                  <SelectItem key={sem.value} value={sem.value}>
                    {sem.label}
                    {sem.current && <Badge variant="secondary" className="mr-2 text-xs">الحالي</Badge>}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* GPA Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">متوسط الفصل</span>
                  {!isCurrentSemester && semesterAverage && (
                    <Badge variant="secondary" className="text-xs">
                      {Number(semesterAverage) >= 85 ? "ممتاز" : Number(semesterAverage) >= 75 ? "جيد جداً" : "جيد"}
                    </Badge>
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {isCurrentSemester ? "---" : `${semesterAverage} / 100`}
                </p>
                {isCurrentSemester && (
                  <p className="text-xs text-muted-foreground mt-1">الفصل جاري</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">المعدل التراكمي</span>
                  {gpaData.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-accent" />
                  ) : gpaData.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  ) : (
                    <Minus className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">{gpaData.cumulative}</p>
                <p className="text-xs text-muted-foreground mt-1">من 100</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <span className="text-sm text-muted-foreground">التقدير العام</span>
                <p className="text-2xl font-bold text-foreground mt-2">{gpaData.standing}</p>
                <p className="text-xs text-muted-foreground mt-1">بناءً على المتوسط من 100</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <span className="text-sm text-muted-foreground">ساعات الفصل</span>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {grades.reduce((sum, g) => sum + g.credits, 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">ساعة معتمدة</p>
              </CardContent>
            </Card>
          </div>

          {/* Grades Table */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {semesters.find(s => s.value === selectedSemester)?.label}
                </CardTitle>
                {isCurrentSemester && (
                  <Badge variant="secondary">الفصل الحالي</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">رمز المادة</TableHead>
                      <TableHead className="text-right">اسم المادة</TableHead>
                      <TableHead className="text-center">الساعات</TableHead>
                      <TableHead className="text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center gap-1 mx-auto">
                              النصفي
                              <Info className="h-3 w-3" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>من 50 درجة</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableHead>
                      <TableHead className="text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center gap-1 mx-auto">
                              الأعمال
                              <Info className="h-3 w-3" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>من 20 درجة</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableHead>
                      <TableHead className="text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="flex items-center gap-1 mx-auto">
                              النهائي
                              <Info className="h-3 w-3" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>من 50 درجة</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableHead>
                      <TableHead className="text-center">المجموع</TableHead>
                      <TableHead className="text-center">العلامة من 100</TableHead>
                      <TableHead className="text-center">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grades.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{course.code}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell className="text-center">{course.credits}</TableCell>
                        <TableCell className="text-center">
                          {course.midterm !== null ? course.midterm : "---"}
                        </TableCell>
                        <TableCell className="text-center">
                          {course.coursework !== null ? course.coursework : "---"}
                        </TableCell>
                        <TableCell className="text-center">
                          {course.final !== null ? course.final : "---"}
                        </TableCell>
                        <TableCell className="text-center font-semibold">
                          {course.total !== null ? course.total : "---"}
                        </TableCell>
                        <TableCell className="text-center">
                          {course.total !== null ? (
                            <span className="font-semibold">{course.total}</span>
                          ) : <span className="text-muted-foreground">---</span>}
                        </TableCell>
                        <TableCell className="text-center">
                          {course.status === "complete" ? (
                            <Badge variant="secondary" className="bg-accent/10 text-accent">
                              مكتمل
                            </Badge>
                          ) : (
                            <Badge variant="outline">جاري</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Numeric Grade Reference */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">مقياس العلامات من 100</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "ممتاز", range: "90 - 100" },
                  { label: "جيد جداً", range: "80 - 89" },
                  { label: "جيد", range: "70 - 79" },
                  { label: "مقبول", range: "60 - 69" },
                  { label: "راسب", range: "أقل من 60" },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-2">{item.range}</p>
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
