"use client"

import { useState } from "react"
import Link from "next/link"
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

// Semesters
const semesters = [
  { value: "2025-2", label: "الفصل الثاني 2025/2026", current: true },
  { value: "2025-1", label: "الفصل الأول 2025/2026", current: false },
  { value: "2024-summer", label: "الفصل الصيفي 2024", current: false },
  { value: "2024-2", label: "الفصل الثاني 2024/2025", current: false },
  { value: "2024-1", label: "الفصل الأول 2024/2025", current: false },
]

// Grades Data
const gradesData: Record<string, typeof currentSemesterGrades> = {
  "2025-2": [
    { code: "IE 401", name: "بحوث العمليات", credits: 3, midterm: 42, coursework: 18, final: null, total: null, grade: null, status: "in-progress" },
    { code: "IE 403", name: "إدارة الجودة", credits: 3, midterm: 38, coursework: 17, final: null, total: null, grade: null, status: "in-progress" },
    { code: "IE 405", name: "هندسة العوامل البشرية", credits: 3, midterm: 45, coursework: 19, final: null, total: null, grade: null, status: "in-progress" },
    { code: "MATH 301", name: "الإحصاء الهندسي", credits: 3, midterm: 35, coursework: 16, final: null, total: null, grade: null, status: "in-progress" },
    { code: "IE 402", name: "مشروع التخرج 1", credits: 3, midterm: null, coursework: 85, final: null, total: null, grade: null, status: "in-progress" },
  ],
  "2025-1": [
    { code: "IE 301", name: "تصميم النظم الصناعية", credits: 3, midterm: 44, coursework: 18, final: 38, total: 92, grade: "A", status: "complete" },
    { code: "IE 303", name: "هندسة الصيانة", credits: 3, midterm: 40, coursework: 17, final: 35, total: 85, grade: "B+", status: "complete" },
    { code: "IE 305", name: "إدارة العمليات", credits: 3, midterm: 38, coursework: 16, final: 32, total: 78, grade: "B", status: "complete" },
    { code: "MATH 203", name: "المعادلات التفاضلية", credits: 3, midterm: 42, coursework: 19, final: 36, total: 88, grade: "A-", status: "complete" },
    { code: "IE 307", name: "السلامة الصناعية", credits: 3, midterm: 35, coursework: 15, final: 28, total: 70, grade: "C+", status: "complete" },
  ],
}

const currentSemesterGrades = gradesData["2025-2"]

// GPA Data
const gpaData = {
  currentSemester: null, // In progress
  cumulative: 3.45,
  previousSemester: 3.52,
  trend: "down" as "up" | "down" | "stable",
  standing: "جيد جداً"
}

// Sidebar Navigation
const sidebarNav = [
  { icon: Home, title: "الرئيسية", href: "/dashboard", active: false },
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

// Grade Color Helper
function getGradeColor(grade: string | null) {
  if (!grade) return "bg-muted text-muted-foreground"
  if (grade.startsWith("A")) return "bg-accent text-accent-foreground"
  if (grade.startsWith("B")) return "bg-primary text-primary-foreground"
  if (grade.startsWith("C")) return "bg-[oklch(0.65_0.12_45)] text-white"
  if (grade.startsWith("D")) return "bg-[oklch(0.75_0.15_70)] text-[oklch(0.20_0.02_70)]"
  return "bg-destructive text-destructive-foreground"
}

export default function GradesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState("2025-2")

  const grades = gradesData[selectedSemester] || currentSemesterGrades
  const isCurrentSemester = selectedSemester === "2025-2"

  // Calculate semester GPA for completed semesters
  const calculateSemesterGPA = () => {
    if (isCurrentSemester) return null
    const gradePoints: Record<string, number> = {
      "A+": 4.0, "A": 4.0, "A-": 3.7,
      "B+": 3.3, "B": 3.0, "B-": 2.7,
      "C+": 2.3, "C": 2.0, "C-": 1.7,
      "D+": 1.3, "D": 1.0, "F": 0
    }
    let totalPoints = 0
    let totalCredits = 0
    grades.forEach(g => {
      if (g.grade && gradePoints[g.grade] !== undefined) {
        totalPoints += gradePoints[g.grade] * g.credits
        totalCredits += g.credits
      }
    })
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : null
  }

  const semesterGPA = calculateSemesterGPA()

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
                <h1 className="font-semibold text-foreground">العلامات</h1>
                <p className="text-xs text-muted-foreground">عرض العلامات والمعدل التراكمي</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Download className="h-4 w-4 ml-1" />
                تحميل
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Printer className="h-4 w-4 ml-1" />
                طباعة
              </Button>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 ml-1" />
                  <span className="hidden sm:inline">الرئيسية</span>
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
                  <span className="text-sm text-muted-foreground">معدل الفصل</span>
                  {!isCurrentSemester && semesterGPA && (
                    <Badge variant="secondary" className="text-xs">
                      {Number(semesterGPA) >= 3.5 ? "ممتاز" : Number(semesterGPA) >= 3.0 ? "جيد جداً" : "جيد"}
                    </Badge>
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {isCurrentSemester ? "---" : semesterGPA}
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
                <p className="text-xs text-muted-foreground mt-1">من 4.00</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <span className="text-sm text-muted-foreground">التقدير العام</span>
                <p className="text-2xl font-bold text-foreground mt-2">{gpaData.standing}</p>
                <p className="text-xs text-muted-foreground mt-1">Based on GPA</p>
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
                      <TableHead className="text-center">التقدير</TableHead>
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
                          {course.grade ? (
                            <Badge className={getGradeColor(course.grade)}>
                              {course.grade}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">---</span>
                          )}
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

          {/* Grade Scale Reference */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">مقياس التقديرات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {[
                  { grade: "A / A+", range: "90-100", points: "4.0" },
                  { grade: "A-", range: "85-89", points: "3.7" },
                  { grade: "B+", range: "80-84", points: "3.3" },
                  { grade: "B", range: "75-79", points: "3.0" },
                  { grade: "B-", range: "70-74", points: "2.7" },
                  { grade: "C+", range: "65-69", points: "2.3" },
                  { grade: "C", range: "60-64", points: "2.0" },
                  { grade: "C-", range: "55-59", points: "1.7" },
                  { grade: "D+", range: "50-54", points: "1.3" },
                  { grade: "D", range: "45-49", points: "1.0" },
                  { grade: "F", range: "0-44", points: "0.0" },
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg text-center">
                    <Badge className={getGradeColor(item.grade.split(" ")[0])} >
                      {item.grade}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-2">{item.range}</p>
                    <p className="text-xs font-medium text-foreground">{item.points} نقطة</p>
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
