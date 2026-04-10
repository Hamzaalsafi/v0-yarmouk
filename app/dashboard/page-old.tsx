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
  Target,
  BarChart3,
  User,
  Settings,
  Home,
  Mail,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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

// Student Data
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

// Summary Cards Data
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

// Quick Actions
const quickActions = [
  { icon: ClipboardList, title: "تسجيل المواد", href: "/registration", primary: true },
  { icon: Calendar, title: "الجدول الدراسي", href: "/schedule", primary: false },
  { icon: GraduationCap, title: "العلامات", href: "/grades", primary: false },
  { icon: Target, title: "الخطة الدراسية", href: "https://fmd.yu.edu.jo/Plans.aspx", primary: false },
  { icon: CreditCard, title: "دفع الرسوم", href: "/fees", primary: false },
  { icon: Mail, title: "مراسلة الأساتذة", href: "https://outlook.com/yu.edu.jo", primary: false },
]

// Upcoming Exams
const upcomingExams = [
  { course: "بحوث عمليات (1)", code: "IE 358", date: "25 مارس 2026", time: "09:00 ص", room: "قاعة H201", daysLeft: 9 },
  { course: "اقتصاد هندسي", code: "IE 432", date: "28 مارس 2026", time: "11:00 ص", room: "قاعة H105", daysLeft: 12 },
  { course: "هندسة العوامل البشرية", code: "IE 422", date: "1 أبريل 2026", time: "09:00 ص", room: "قاعة H301", daysLeft: 16 },
]

// Recent Announcements
const announcements = [
  { title: "تغيير موعد محاضرة بحوث العمليات", date: "منذ ساعتين", type: "course", isNew: true },
  { title: "نتائج الامتحان النصفي متاحة", date: "منذ يوم", type: "grade", isNew: true },
  { title: "تذكير بموعد دفع الرسوم", date: "منذ 3 أيام", type: "finance", isNew: false },
]

// Academic Timeline
const academicTimeline = [
  { title: "بداية فترة التسجيل", date: "20 مارس", status: "upcoming", daysLeft: 4 },
  { title: "آخر موعد للسحب والإضافة", date: "25 مارس", status: "upcoming", daysLeft: 9 },
  { title: "امتحانات منتصف الفصل", date: "25 مارس - 5 أبريل", status: "upcoming", daysLeft: 9 },
  { title: "آخر موعد للانسحاب", date: "15 أبريل", status: "upcoming", daysLeft: 30 },
  { title: "امتحانات نهاية الفصل", date: "20 مايو - 5 يونيو", status: "future", daysLeft: 65 },
]

// Sidebar Navigation
const sidebarNav = [
  { icon: Home, title: "الرئيسية", href: "/dashboard", active: true },
  { icon: ClipboardList, title: "المعلومات الأساسية", href: "/basic-info", active: false },
  { icon: Calendar, title: "أوقات التسجيل", href: "/basic-info?tab=registration-times", active: false },
  { icon: ClipboardList, title: "تسجيل المواد", href: "/registration", active: false },
  { icon: Calendar, title: "الجدول الدراسي", href: "/schedule", active: false },
  { icon: GraduationCap, title: "العلامات", href: "/grades", active: false },
  { icon: Eye, title: "الغياب", href: "/attendance", active: false },
  { icon: FileText, title: "الامتحانات", href: "/exams", active: false },
  { icon: Target, title: "الخطة الدراسية", href: "https://fmd.yu.edu.jo/Plans.aspx", active: false },
  { icon: Users, title: "الأساتذة", href: "https://fmd.yu.edu.jo/", active: false },
  { icon: CreditCard, title: "الرسوم", href: "/fees", active: false },
  { icon: Bell, title: "الإعلانات", href: "https://www.yu.edu.jo/index.php/ann-ar", active: false },
  { icon: HelpCircle, title: "المساعدة", href: "https://www.yu.edu.jo/index.php/faq-ar", active: false },
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [feesDialogOpen, setFeesDialogOpen] = useState(false)

  useEffect(() => {
    const popupSeen = sessionStorage.getItem("fees-popup-seen")
    if (!popupSeen) {
      setFeesDialogOpen(true)
      sessionStorage.setItem("fees-popup-seen", "true")
    }
  }, [])

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-card border-l border-border">
        {/* Logo */}
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

        {/* Navigation */}
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

        {/* User Section */}
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

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
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
                <div className="flex flex-wrap gap-3">
                  <Link href="/registration">
                    <Button variant="secondary" size="sm">
                      <ClipboardList className="h-4 w-4 ml-2" />
                      تسجيل المواد
                    </Button>
                  </Link>
                  <Link href="/schedule">
                    <Button variant="secondary" size="sm" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-0">
                      <Calendar className="h-4 w-4 ml-2" />
                      الجدول
                    </Button>
                  </Link>
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

          {/* Quick Actions */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <div className={`flex flex-col items-center p-3 rounded-xl transition-all hover:shadow-md cursor-pointer ${
                      action.primary
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}>
                      <action.icon className="h-6 w-6 mb-2" />
                      <span className="text-xs font-medium text-center">{action.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
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

              {/* Upcoming Exams */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      الامتحانات القادمة
                    </CardTitle>
                    <Link href="/exams" className="text-sm text-primary hover:underline">
                      عرض الكل
                    </Link>
                  </div>
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
                        لديك 4 غيابات في مادة <span className="font-medium text-foreground">بحوث عمليات (1) (IE 358)</span> من أصل 5 مسموحة.
                      </p>
                      <Link href="/attendance">
                        <Button variant="outline" size="sm" className="mt-3">
                          عرض سجل الغياب
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Announcements */}
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bell className="h-5 w-5 text-primary" />
                      الإعلانات
                    </CardTitle>
                    <Link href="https://www.yu.edu.jo/index.php/ann-ar" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                      الكل
                    </Link>
                  </div>
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

              {/* Academic Timeline */}
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
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
