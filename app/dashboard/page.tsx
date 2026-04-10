"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  ClipboardList,
  Users,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronDown,
  Globe,
  LogOut,
  Menu,
  X,
  Clock,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Target,
  BarChart3,
  User,
  Settings,
  Home,
  Mail,
  Eye,
  Download,
  Printer,
  Minus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

// ============ Student Data ============
const studentData = {
  name: "بركة محمود البطاينة",
  id: "2021105432",
  college: "كلية الهندسة",
  major: "الهندسة الصناعية",
  level: "السنة الرابعة",
  currentSemester: "الفصل الثاني 2025/2026",
  gpa: 3.45,
  totalCredits: 98,
  remainingCredits: 42,
  registeredCredits: 15,
}

// ============ Summary Cards Data ============
const summaryCards = [
  {
    title: "الساعات المسجلة",
    value: "15",
    subtitle: "ساعة معتمدة",
    icon: BookOpen,
    color: "bg-primary",
    trend: null
  },
  {
    title: "المعدل التراكمي",
    value: "3.45",
    subtitle: "من 4.00",
    icon: TrendingUp,
    color: "bg-accent",
    trend: "+0.12"
  },
  {
    title: "الامتحانات القادمة",
    value: "3",
    subtitle: "خلال أسبوعين",
    icon: FileText,
    color: "bg-primary/85",
    trend: null
  },
  {
    title: "تنبيهات الغياب",
    value: "1",
    subtitle: "مادة بحاجة انتباه",
    icon: AlertTriangle,
    color: "bg-destructive",
    trend: null
  },
]

// ============ Upcoming Exams ============
const upcomingExams = [
  { course: "بحوث العمليات", code: "IE 401", date: "25 مارس 2026", time: "09:00 ص", room: "قاعة H201", daysLeft: 9 },
  { course: "إدارة الجودة", code: "IE 403", date: "28 مارس 2026", time: "11:00 ص", room: "قاعة H105", daysLeft: 12 },
  { course: "هندسة العوامل البشرية", code: "IE 405", date: "1 أبريل 2026", time: "09:00 ص", room: "قاعة H301", daysLeft: 16 },
]

// ============ Grades Data ============
const semesters = [
  { value: "2025-2", label: "الفصل الثاني 2025/2026", current: true },
  { value: "2025-1", label: "الفصل الأول 2025/2026", current: false },
  { value: "2024-summer", label: "الفصل الصيفي 2024", current: false },
  { value: "2024-2", label: "الفصل الثاني 2024/2025", current: false },
]

const gradesData: Record<string, any[]> = {
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
  ],
}

// ============ Attendance Data ============
const attendanceData = [
  { code: "IE 401", name: "بحوث العمليات", instructor: "د. أحمد الخطيب", totalClasses: 24, attended: 20, absences: 4, maxAbsences: 5, status: "warning" as const, schedule: "أحد، ثلاثاء 09:00 - 10:30" },
  { code: "IE 403", name: "إدارة الجودة", instructor: "د. محمد النجار", totalClasses: 24, attended: 22, absences: 2, maxAbsences: 5, status: "good" as const, schedule: "أحد، ثلاثاء 11:00 - 12:30" },
  { code: "IE 405", name: "هندسة العوامل البشرية", instructor: "د. ليلى حسن", totalClasses: 24, attended: 23, absences: 1, maxAbsences: 5, status: "excellent" as const, schedule: "اثنين، أربعاء 09:00 - 10:30" },
  { code: "MATH 301", name: "الإحصاء الهندسي", instructor: "د. عمر الزعبي", totalClasses: 24, attended: 21, absences: 3, maxAbsences: 5, status: "good" as const, schedule: "اثنين، أربعاء 14:00 - 15:30" },
  { code: "IE 402", name: "مشروع التخرج 1", instructor: "د. خالد المصري", totalClasses: 12, attended: 12, absences: 0, maxAbsences: 3, status: "excellent" as const, schedule: "خميس 10:00 - 13:00" },
]

// ============ Schedule Data ============
const scheduleData = [
  {
    day: "الأحد",
    dayEn: "Sunday",
    courses: [
      { code: "IE 318", name: "قياس وتحليل العمل", time: "11:30 - 12:30", room: "هج 215", instructor: "احمد عبدالحفيظ المومني", color: "bg-primary" },
      { code: "IE 358", name: "بحوث عمليات (1)", time: "10:30 - 11:30", room: "هج 322", instructor: "سنان عبيدات", color: "bg-accent" },
    ]
  },
  {
    day: "الاثنين",
    dayEn: "Monday",
    courses: [
      { code: "IE 205", name: "المشاغل الهندسية", time: "14:30 - 17:30", room: "مشاغل", instructor: "احمد عبدالحفيظ المومني", color: "bg-primary/85" },
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

// ============ Recent Announcements ============
const announcements = [
  { title: "تغيير موعد محاضرة بحوث العمليات", date: "منذ ساعتين", type: "course", isNew: true },
  { title: "نتائج الامتحان النصفي متاحة", date: "منذ يوم", type: "grade", isNew: true },
  { title: "تذكير بموعد دفع الرسوم", date: "منذ 3 أيام", type: "finance", isNew: false },
]

// ============ Academic Timeline ============
const academicTimeline = [
  { title: "بداية فترة التسجيل", date: "20 مارس", status: "upcoming", daysLeft: 4 },
  { title: "آخر موعد للسحب والإضافة", date: "25 مارس", status: "upcoming", daysLeft: 9 },
  { title: "امتحانات منتصف الفصل", date: "25 مارس - 5 أبريل", status: "upcoming", daysLeft: 9 },
  { title: "آخر موعد للانسحاب", date: "15 أبريل", status: "upcoming", daysLeft: 30 },
  { title: "امتحانات نهاية الفصل", date: "20 مايو - 5 يونيو", status: "future", daysLeft: 65 },
]

// ============ Sidebar Navigation ============
const sidebarNav = [
  { icon: Home, title: "الرئيسية", href: "/dashboard", active: true },
  { icon: ClipboardList, title: "المعلومات الأساسية", href: "/basic-info", active: false },
  { icon: Calendar, title: "أوقات التسجيل", href: "/basic-info?tab=registration-times", active: false },
  { icon: ClipboardList, title: "تسجيل المواد", href: "/registration", active: false },
  { icon: Target, title: "الخطة الدراسية", href: "https://fmd.yu.edu.jo/Plans.aspx", active: false },
  { icon: Users, title: "الأساتذة", href: "https://fmd.yu.edu.jo/", active: false },
  { icon: CreditCard, title: "الرسوم", href: "/fees", active: false },
  { icon: Bell, title: "الإعلانات", href: "https://www.yu.edu.jo/index.php/ann-ar", active: false },
  { icon: HelpCircle, title: "المساعدة", href: "https://www.yu.edu.jo/index.php/faq-ar", active: false },
]

// ============ Helper Functions ============
function getGradeColor(grade: string | null) {
  if (!grade) return "bg-muted text-muted-foreground"
  if (grade.startsWith("A")) return "bg-accent text-accent-foreground"
  if (grade.startsWith("B")) return "bg-primary text-primary-foreground"
  if (grade.startsWith("C")) return "bg-primary/80 text-primary-foreground"
  if (grade.startsWith("D")) return "bg-secondary text-secondary-foreground"
  return "bg-destructive text-destructive-foreground"
}

function getStatusBadge(status: "excellent" | "good" | "warning" | "danger") {
  switch (status) {
    case "excellent": return <Badge className="bg-accent/10 text-accent border-0">ممتاز</Badge>
    case "good": return <Badge className="bg-primary/10 text-primary border-0">جيد</Badge>
    case "warning": return <Badge className="bg-accent/10 text-accent border-0">تحذير</Badge>
    case "danger": return <Badge variant="destructive">خطر</Badge>
  }
}

function getProgressColor(absences: number, maxAbsences: number) {
  const ratio = absences / maxAbsences
  if (ratio >= 0.8) return "bg-destructive"
  if (ratio >= 0.6) return "bg-accent"
  if (ratio >= 0.4) return "bg-primary"
  return "bg-accent"
}

// ============ Main Component ============
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [feesDialogOpen, setFeesDialogOpen] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState("2025-2")

  useEffect(() => {
    const popupSeen = sessionStorage.getItem("fees-popup-seen")
    if (!popupSeen) {
      setFeesDialogOpen(true)
      sessionStorage.setItem("fees-popup-seen", "true")
    }
  }, [])

  const grades = gradesData[selectedSemester] || gradesData["2025-2"]
  const isCurrentSemester = selectedSemester === "2025-2"

  const calculateSemesterGPA = () => {
    if (isCurrentSemester) return null
    const gradePoints: Record<string, number> = {
      "A+": 4.0, "A": 4.0, "A-": 3.7,
      "B+": 3.3, "B": 3.0, "B-": 2.7,
      "C+": 2.3, "C": 2.0, "C-": 1.7,
      "D+": 1.3, "D": 1.0, "F": 0
    }
    let totalPoints = 0, totalCredits = 0
    grades.forEach(g => {
      if (g.grade && gradePoints[g.grade] !== undefined) {
        totalPoints += gradePoints[g.grade] * g.credits
        totalCredits += g.credits
      }
    })
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : null
  }

  const semesterGPA = calculateSemesterGPA()
  const totalAbsences = attendanceData.reduce((sum, c) => sum + c.absences, 0)
  const coursesAtRisk = attendanceData.filter(c => c.status === "warning").length

  return (
    <div className="min-h-screen max-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden relative min-y-screen max-y-screen lg:flex flex-col w-64 bg-card border-l border-border">
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
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
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

        <div className="p-4 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm font-medium text-foreground truncate">{studentData.name}</p>
                  <p className="text-xs text-primary">{studentData.level}</p>
                  <p className="text-xs text-muted-foreground">{studentData.id}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/basic-info">
                <User className="h-4 w-4 ml-2" />
                الملف الشخصي
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/basic-info">
                <Settings className="h-4 w-4 ml-2" />
                الإعدادات
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" asChild>
                <Link href="/">
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل الخروج
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed right-0 top-0 bottom-0 w-72 bg-card border-l border-border shadow-xl">
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
            <nav className="p-4 space-y-1">
              {sidebarNav.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
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

      {/* Fees Dialog */}
      <Dialog open={feesDialogOpen} onOpenChange={setFeesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              تنبيه رسوم جامعية مستحقة
            </DialogTitle>
            <DialogDescription className="leading-6">
              يوجد على حسابك رسوم مستحقة للفصل الحالي. يرجى الدفع قبل آخر موعد لتجنب الغرامات أو إيقاف بعض الخدمات.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-foreground">
            المبلغ المستحق حالياً: <span className="font-semibold">485 دينار</span>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFeesDialogOpen(false)}>
              لاحقاً
            </Button>
            <Link href="/fees" onClick={() => setFeesDialogOpen(false)}>
              <Button>
                <CreditCard className="h-4 w-4 ml-2" />
                الانتقال إلى صفحة الرسوم
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <div className="flex-1 overflow-x-auto flex flex-col min-h-screen">
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
                <h1 className="font-semibold text-foreground">مرحباً، {studentData.name.split(' ')[0]}</h1>
                <p className="text-xs text-muted-foreground">{studentData.currentSemester}</p>
                <p className="text-xs text-primary">المتبقي للتخرج: {studentData.remainingCredits} ساعة</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="https://www.yu.edu.jo/index.php/en/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>EN</span>
              </Button>
              </Link>
              <Link href="https://www.yu.edu.jo/index.php/ann-ar" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
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

        {/* Page Content - Tabs */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="grades">العلامات</TabsTrigger>
              <TabsTrigger value="attendance">الغياب</TabsTrigger>
              <TabsTrigger value="exams">الامتحانات</TabsTrigger>
              <TabsTrigger value="schedule">الجدول</TabsTrigger>
            </TabsList>

            {/* TAB: Overview */}
            <TabsContent value="overview" className="space-y-6">
              {/* Current Semester Banner */}
              <Card className="bg-primary text-primary-foreground border-0">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">الفصل الحالي</Badge>
                      <h2 className="text-xl lg:text-2xl font-bold">{studentData.currentSemester}</h2>
                      <p className="text-sm opacity-90 mt-1">
                        {studentData.college} - {studentData.major}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((card, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                          <card.icon className="h-5 w-5 text-primary-foreground" />
                        </div>
                        {card.trend && (
                          <Badge variant="secondary" className="text-xs bg-accent/10 text-accent">
                            {card.trend}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-3">
                        <p className="text-2xl font-bold text-foreground">{card.value}</p>
                        <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                      </div>
                      <p className="text-sm font-medium text-foreground mt-1">{card.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Academic Progress */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    التقدم الأكاديمي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">الساعات المكتملة</span>
                      <span className="font-medium text-foreground">{studentData.totalCredits} / {studentData.totalCredits + studentData.remainingCredits} ساعة</span>
                    </div>
                    <Progress value={(studentData.totalCredits / (studentData.totalCredits + studentData.remainingCredits)) * 100} className="h-3" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{studentData.totalCredits}</p>
                      <p className="text-xs text-muted-foreground">ساعات مكتملة</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{studentData.registeredCredits}</p>
                      <p className="text-xs text-muted-foreground">ساعات مسجلة</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{studentData.remainingCredits}</p>
                      <p className="text-xs text-muted-foreground">ساعات متبقية</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Exams Preview */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    الامتحانات القادمة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingExams.map((exam, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            exam.daysLeft <= 10 ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                          }`}>
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{exam.course}</p>
                            <p className="text-xs text-muted-foreground">{exam.code} - {exam.room}</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">{exam.date}</p>
                          <p className="text-xs text-muted-foreground">{exam.time}</p>
                        </div>
                        <Badge variant={exam.daysLeft <= 10 ? "destructive" : "secondary"} className="text-xs">
                          {exam.daysLeft} يوم
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Absence Alert */}
              <Card className="border-destructive/30 bg-destructive/5">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center shrink-0">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">تنبيه غياب</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        لديك 4 غيابات في مادة <span className="font-medium text-foreground">بحوث العمليات (IE 401)</span> من أصل 5 مسموحة.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Announcements */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      الإعلانات
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {announcements.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                          item.isNew ? 'bg-primary' : 'bg-muted-foreground/30'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                        {item.isNew && (
                          <Badge variant="secondary" className="text-xs">جديد</Badge>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      المواعيد الأكاديمية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute right-1.75 top-2 bottom-2 w-0.5 bg-border" />
                      <div className="space-y-4">
                        {academicTimeline.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 relative">
                            <div className={`w-4 h-4 rounded-full border-2 shrink-0 z-10 ${
                              item.status === 'upcoming'
                                ? 'bg-primary border-primary'
                                : 'bg-background border-muted-foreground/30'
                            }`} />
                            <div className="flex-1 -mt-0.5">
                              <p className="text-sm font-medium text-foreground">{item.title}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <p className="text-xs text-muted-foreground">{item.date}</p>
                                {item.daysLeft <= 10 && (
                                  <Badge variant="destructive" className="text-xs py-0">
                                    {item.daysLeft} يوم
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* GPA Card */}
              <Card className="bg-accent text-accent-foreground border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-accent-foreground/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-3xl font-bold">{studentData.gpa}</span>
                  </div>
                  <h3 className="font-semibold mb-1">المعدل التراكمي</h3>
                  <p className="text-sm opacity-90">من 4.00</p>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">تقدير جيد جداً</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: Grades */}
            <TabsContent value="grades" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>العلامات</CardTitle>
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                      <SelectTrigger className="w-64">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {semesters.map(s => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>كود المادة</TableHead>
                        <TableHead>اسم المادة</TableHead>
                        <TableHead className="text-center">نقاط</TableHead>
                        <TableHead className="text-center">نصفي</TableHead>
                        <TableHead className="text-center">أعمال</TableHead>
                        <TableHead className="text-center">نهائي</TableHead>
                        <TableHead className="text-center">التقدير</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grades.map(grade => (
                        <TableRow key={grade.code}>
                          <TableCell className="font-medium">{grade.code}</TableCell>
                          <TableCell>{grade.name}</TableCell>
                          <TableCell className="text-center text-xs">{grade.credits}</TableCell>
                          <TableCell className="text-center">{grade.midterm || '-'}</TableCell>
                          <TableCell className="text-center">{grade.coursework || '-'}</TableCell>
                          <TableCell className="text-center">{grade.final || '-'}</TableCell>
                          <TableCell className="text-center">
                            {grade.grade ? (
                              <Badge className={getGradeColor(grade.grade)}>{grade.grade}</Badge>
                            ) : (
                              <span className="text-xs text-muted-foreground">قيد الإجراء</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {semesterGPA && (
                    <div className="mt-4 p-3 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">معدل الفصل</p>
                      <p className="text-2xl font-bold text-foreground">{semesterGPA}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB: Attendance */}
            <TabsContent value="attendance" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <p className="text-2xl font-bold">{totalAbsences}</p>
                    <p className="text-xs text-muted-foreground">إجمالي الغيابات</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <p className="text-2xl font-bold">{coursesAtRisk}</p>
                    <p className="text-xs text-muted-foreground">مواد تحت المراقبة</p>
                  </CardContent>
                </Card>
                <Card className="border-border/50 bg-accent/5">
                  <CardContent className="p-4">
                    <p className="text-2xl font-bold text-accent">{attendanceData.filter(a => a.status === 'excellent').length}</p>
                    <p className="text-xs text-muted-foreground">حضور ممتاز</p>
                  </CardContent>
                </Card>
              </div>

              {attendanceData.map((course, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{course.code} - {course.instructor}</p>
                      </div>
                      {getStatusBadge(course.status as any)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>الحضور</span>
                        <span className="font-medium">{course.attended} / {course.totalClasses}</span>
                      </div>
                      <Progress value={(course.attended / course.totalClasses) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>الغيابات</span>
                        <span className={`font-medium ${course.absences >= course.maxAbsences ? 'text-destructive' : ''}`}>
                          {course.absences} / {course.maxAbsences}
                        </span>
                      </div>
                      <Progress value={(course.absences / course.maxAbsences) * 100} className="h-2" />
                    </div>
                    <p className="text-xs text-muted-foreground">{course.schedule}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* TAB: Exams */}
            <TabsContent value="exams" className="space-y-4">
              {upcomingExams.map((exam, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{exam.course}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{exam.code}</p>
                      </div>
                      <Badge variant={exam.daysLeft <= 10 ? "destructive" : "secondary"}>
                        {exam.daysLeft} يوم
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">التاريخ</p>
                        <p className="text-sm font-medium">{exam.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">الوقت</p>
                        <p className="text-sm font-medium">{exam.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground">القاعة</p>
                        <p className="text-sm font-medium">{exam.room}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* TAB: Schedule */}
            <TabsContent value="schedule" className="space-y-4">
              {scheduleData.map((day, index) => (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {day.day}
                      <span className="text-sm text-muted-foreground font-normal ml-2">({day.dayEn})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {day.courses.length > 0 ? (
                      <div className="space-y-3">
                        {day.courses.map((course, idx) => (
                          <div key={idx} className={`rounded-lg p-3 text-white ${course.color}`}>
                            <p className="font-semibold">{course.name}</p>
                            <p className="text-sm opacity-90">{course.code}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs">
                              <Clock className="h-3 w-3" />
                              <span>{course.time}</span>
                              <span>•</span>
                              <span>{course.room}</span>
                            </div>
                            <p className="text-xs opacity-75 mt-1">{course.instructor}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">لا توجد محاضرات في هذا اليوم</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
