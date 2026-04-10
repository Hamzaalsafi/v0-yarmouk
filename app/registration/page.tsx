"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  GraduationCap,
  Search,
  Filter,
  Clock,
  Users,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  X,
  Home,
  ClipboardList,
  Calendar,
  FileText,
  Target,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  Globe,
  Menu,
  User,
  Info,
  Zap,
  BookOpen,
  Eye,
  Mail,
  Trash2,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { SidebarUserMenu } from "@/components/sidebar-user-menu"

// Available Courses (updated from latest department list)
const courseCatalog = [
  { code: "IE 100", section: "1", name: "تأهيل وظيفي (1)", credits: 0, days: "", start: "", end: "", instructor: "احمد عبدالحفيظ المومني", room: "مكتب" },
  { code: "IE 200", section: "1", name: "تأهيل وظيفي (2)", credits: 0, days: "", start: "", end: "", instructor: "احمد عبدالحفيظ المومني", room: "مكتب" },
  { code: "IE 205", section: "1", name: "المشاغل الهندسية", credits: 2, days: "حد ثل", start: "14:30", end: "17:30", instructor: "سنان عبيدات", room: "مشاغل" },
  { code: "IE 205", section: "2", name: "المشاغل الهندسية", credits: 2, days: "حد ثل", start: "11:30", end: "14:30", instructor: "محمد يونس علي الدراغمة", room: "مشاغل" },
  { code: "IE 205", section: "3", name: "المشاغل الهندسية", credits: 2, days: "ثن ربع", start: "14:30", end: "17:30", instructor: "احمد عبدالحفيظ المومني", room: "مشاغل" },
  { code: "IE 211", section: "1", name: "القياسات", credits: 2, days: "ثن ربع", start: "19:30", end: "20:30", instructor: "محمد يونس علي الدراغمة", room: "Oline" },
  { code: "IE 213", section: "1", name: "مختبرالقياسات", credits: 1, days: "حد", start: "14:30", end: "17:30", instructor: "عبدالله الخضر", room: "مختبر" },
  { code: "IE 213", section: "2", name: "مختبرالقياسات", credits: 1, days: "خمس", start: "14:30", end: "17:30", instructor: "سنان عبيدات", room: "مختبر" },
  { code: "IE 251", section: "1", name: "اساسيات الاحتمالات والاحصاء للمهندسين", credits: 3, days: "حد ثل خمس", start: "11:30", end: "12:30", instructor: "عبدالله الخضر", room: "ه 403" },
  { code: "IE 262", section: "1", name: "علوم المواد الهندسية", credits: 3, days: "حد ثل خمس", start: "10:30", end: "11:30", instructor: "محمد يونس علي الدراغمة", room: "ه 403" },
  { code: "IE 263", section: "1", name: "مختبر المواد الهندسية", credits: 1, days: "حد", start: "14:30", end: "17:30", instructor: "عمار احمد الروسان", room: "مختبر" },
  { code: "IE 300", section: "1", name: "تأهيل وظيفي (3)", credits: 0, days: "", start: "", end: "", instructor: "احمد عبدالحفيظ المومني", room: "مكتب" },
  { code: "IE 318", section: "1", name: "قياس وتحليل العمل", credits: 3, days: "حد ثل خمس", start: "11:30", end: "12:30", instructor: "احمد عبدالحفيظ المومني", room: "هج 215" },
  { code: "IE 354", section: "1", name: "الإحصاء الهندسي التطبيقي", credits: 3, days: "حد ثل خمس", start: "12:30", end: "13:30", instructor: "اسيل فايز خنفر", room: "ه 403" },
  { code: "IE 354", section: "2", name: "الإحصاء الهندسي التطبيقي", credits: 3, days: "حد ثل خمس", start: "09:30", end: "10:30", instructor: "اسيل فايز خنفر", room: "هج 215" },
  { code: "IE 358", section: "1", name: "بحوث عمليات (1)", credits: 3, days: "حد ثل خمس", start: "10:30", end: "11:30", instructor: "سنان عبيدات", room: "هج 322" },
  { code: "IE 358", section: "2", name: "بحوث عمليات (1)", credits: 3, days: "حد ثل خمس", start: "13:30", end: "14:30", instructor: "عبدالله الخضر", room: "هج 401" },
  { code: "IE 361", section: "1", name: "إدارة المشاريع الهندسية", credits: 3, days: "سبت ثن ربع", start: "19:30", end: "20:30", instructor: "الاء طويق", room: "Oline" },
  { code: "IE 364", section: "1", name: "تصميم أجزاء الاَلات", credits: 3, days: "حد ثل خمس", start: "11:30", end: "12:30", instructor: "عمار احمد الروسان", room: "هج 321" },
  { code: "IE 366", section: "1", name: "عمليات التصنيع (1)", credits: 3, days: "حد ثل خمس", start: "13:30", end: "14:30", instructor: "ايمن محمد زيوت", room: "هج 210" },
  { code: "IE 367", section: "1", name: "مختبرعمليات التصنيع", credits: 1, days: "ثل", start: "14:30", end: "17:30", instructor: "عمار احمد الروسان", room: "مختبر" },
  { code: "IE 422", section: "1", name: "هندسة العوامل البشرية", credits: 3, days: "حد ثل خمس", start: "12:30", end: "13:30", instructor: "الاء طويق", room: "هج 322" },
  { code: "IE 423", section: "1", name: "مختبر هندسة العوامل البشرية", credits: 1, days: "ثل", start: "14:30", end: "17:30", instructor: "عبدالله الخضر", room: "مختبر" },
  { code: "IE 432", section: "1", name: "اقتصاد هندسي", credits: 3, days: "حد ثل خمس", start: "10:30", end: "11:30", instructor: "اسيل فايز خنفر", room: "هج 321" },
  { code: "IE 432", section: "2", name: "اقتصاد هندسي", credits: 3, days: "حد ثل خمس", start: "11:30", end: "12:30", instructor: "الاء طويق", room: "ه 209" },
  { code: "IE 432", section: "3", name: "اقتصاد هندسي", credits: 3, days: "حد ثل خمس", start: "09:30", end: "10:30", instructor: "الاء طويق", room: "ه 403" },
  { code: "IE 432", section: "4", name: "اقتصاد هندسي", credits: 3, days: "ثن ربع", start: "12:30", end: "14:00", instructor: "محمد يونس علي الدراغمة", room: "هج 321" },
  { code: "IE 454", section: "1", name: "ضبط الجودة الإحصائي", credits: 3, days: "حد ثل خمس", start: "10:30", end: "11:30", instructor: "احمد عبدالحفيظ المومني", room: "L 203" },
  { code: "IE 458", section: "1", name: "نظم المحاكاة", credits: 3, days: "", start: "", end: "", instructor: "احمد عبدالحفيظ المومني", room: "مكتب" },
  { code: "IE 466", section: "1", name: "عمليات التصنيع (2)", credits: 3, days: "حد ثل خمس", start: "12:30", end: "13:30", instructor: "ايمن محمد زيوت", room: "ه 502" },
  { code: "IE 478", section: "1", name: "الوثوقية وادامة الصيانة", credits: 3, days: "حد ثل خمس", start: "09:30", end: "10:30", instructor: "سنان عبيدات", room: "هج 322" },
  { code: "IE 498", section: "1", name: "مشروع تخرج (1)", credits: 1, days: "", start: "", end: "", instructor: "ايمن محمد زيوت", room: "ميدان" },
  { code: "IE 498", section: "2", name: "مشروع تخرج (1)", credits: 1, days: "", start: "", end: "", instructor: "اسيل فايز خنفر", room: "ميدان" },
  { code: "IE 498", section: "3", name: "مشروع تخرج (1)", credits: 1, days: "", start: "", end: "", instructor: "غازي مقابله", room: "ميدان" },
  { code: "IE 498", section: "4", name: "مشروع تخرج (1)", credits: 1, days: "", start: "", end: "", instructor: "سنان عبيدات", room: "ميدان" },
  { code: "IE 500", section: "3", name: "التدريب الميداني", credits: 3, days: "حد ثل خمس", start: "08:30", end: "17:30", instructor: "محمد يونس علي الدراغمة", room: "ميدان" },
  { code: "IE 500", section: "4", name: "التدريب الميداني", credits: 3, days: "سبت ثن ربع", start: "08:30", end: "17:30", instructor: "محمد يونس علي الدراغمة", room: "ميدان" },
  { code: "IE 525", section: "1", name: "هندسة السلامة المهنية", credits: 3, days: "حد ثل خمس", start: "13:30", end: "14:30", instructor: "الاء طويق", room: "هج 322" },
  { code: "IE 534", section: "1", name: "مبادئ تحليل القرارات", credits: 3, days: "حد ثل خمس", start: "09:30", end: "10:30", instructor: "غازي مقابله", room: "م.ق 205" },
  { code: "IE 546", section: "1", name: "تخطيط المنشآت", credits: 3, days: "حد ثل خمس", start: "10:30", end: "11:30", instructor: "عبدالله الخضر", room: "B 101" },
  { code: "IE 563", section: "1", name: "التصميم والتصنيع باستخدام الحاسوب", credits: 2, days: "حد", start: "11:30", end: "12:30", instructor: "ايمن محمد زيوت", room: "هج 208" },
  { code: "IE 563L", section: "1", name: "مختبر التصميم والتصنيع باستخدام الحاسوب", credits: 0, days: "ثل خمس", start: "11:30", end: "12:30", instructor: "ايمن محمد زيوت", room: "هج 208" },
  { code: "IE 568", section: "1", name: "تصميم المنتج", credits: 3, days: "حد ثل خمس", start: "08:30", end: "09:30", instructor: "غازي مقابله", room: "قاعه" },
  { code: "IE 572", section: "1", name: "تكنولوجيا الطاقة", credits: 3, days: "حد ثل خمس", start: "13:30", end: "14:30", instructor: "امجد عبدالرحمن السكارنة", room: "هج 321" },
  { code: "IE 598", section: "1", name: "مشروع تخرج (2)", credits: 3, days: "", start: "", end: "", instructor: "غازي مقابله", room: "ميدان" },
  { code: "IE 598", section: "2", name: "مشروع تخرج (2)", credits: 3, days: "", start: "", end: "", instructor: "سنان عبيدات", room: "ميدان" },
  { code: "IE 598", section: "3", name: "مشروع تخرج (2)", credits: 3, days: "", start: "", end: "", instructor: "ايمن محمد زيوت", room: "ميدان" },
  { code: "IE 598", section: "4", name: "مشروع تخرج (2)", credits: 3, days: "", start: "", end: "", instructor: "اسيل فايز خنفر", room: "ميدان" },
  { code: "IE 599", section: "1", name: "موضوعات خاصة في الهندسة الصناعية", credits: 3, days: "حد ثل خمس", start: "12:30", end: "13:30", instructor: "عمار احمد الروسان", room: "هج 321" },
  { code: "IEM 651", section: "1", name: "البحث والتحليل الاحصائي", credits: 3, days: "خمس", start: "14:30", end: "17:30", instructor: "ايمن محمد زيوت", room: "مختبر" },
]

const getLevelFromCode = (code: string) => {
  if (code.startsWith("IEM")) return "5"
  const numeric = Number(code.replace(/[^0-9]/g, "").slice(0, 3))
  if (numeric >= 500) return "5"
  if (numeric >= 400) return "4"
  if (numeric >= 300) return "3"
  if (numeric >= 200) return "2"
  return "1"
}

const availableCourses = courseCatalog.map((course, index) => ({
  id: `${course.code.replace(/\s/g, "")}-${course.section}`,
  code: course.code,
  name: course.name,
  section: course.section,
  instructor: course.instructor,
  time: course.days ? `${course.days} ${course.start} - ${course.end}` : "يحدد لاحقاً",
  room: course.room,
  credits: course.credits,
  capacity: course.credits <= 1 ? 25 : 40,
  enrolled: course.credits <= 1 ? 10 + (index % 10) : 18 + (index % 20),
  prerequisites: [],
  prerequisitesMet: true,
  department: "الهندسة الصناعية",
  level: getLevelFromCode(course.code),
}))

// Sidebar Navigation
const sidebarNav = [
  { icon: Home, title: "الرئيسية", href: "/dashboard", active: false },
  { icon: ClipboardList, title: "المعلومات الأساسية", href: "/basic-info", active: false },
  { icon: Calendar, title: "أوقات التسجيل", href: "/basic-info?tab=registration-times", active: false },
  { icon: ClipboardList, title: "تسجيل المواد", href: "/registration", active: true },
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

export default function RegistrationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedCourses, setSelectedCourses] = useState<typeof availableCourses>([])
  const [step, setStep] = useState(1) // 1: Search, 2: Review, 3: Confirm
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)

  const maxCredits = 18
  const currentCredits = selectedCourses.reduce((sum, c) => sum + c.credits, 0)

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.name.includes(searchQuery) ||
                          course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.includes(searchQuery)
    const matchesDepartment = selectedDepartment === "all" || course.department === selectedDepartment
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    return matchesSearch && matchesDepartment && matchesLevel
  })

  const addCourse = (course: typeof availableCourses[0]) => {
    if (!course.prerequisitesMet) return
    if (course.enrolled >= course.capacity) return
    if (selectedCourses.find(c => c.id === course.id)) return

    // Check for time conflicts
    const hasConflict = selectedCourses.some(c => c.time === course.time)
    if (hasConflict) return

    if (currentCredits + course.credits <= maxCredits) {
      setSelectedCourses([...selectedCourses, course])
    }
  }

  const removeCourse = (courseId: string) => {
    setSelectedCourses(selectedCourses.filter(c => c.id !== courseId))
  }

  const handleConfirmRegistration = () => {
    setShowConfirmDialog(false)
    setRegistrationComplete(true)
    setStep(3)
  }

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
        <main className="flex-1 p-4 lg:p-6">
          {/* Registration Period Alert */}
          <Alert className="mb-6 border-accent/30 bg-accent/5">
            <Zap className="h-4 w-4 text-accent" />
            <AlertTitle className="text-accent">فترة التسجيل المبكر</AlertTitle>
            <AlertDescription>
              يمكنك تسجيل المواد حتى 25 مارس 2026. الأولوية للطلاب المتقدمين بناءً على الساعات المكتملة.
            </AlertDescription>
          </Alert>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[
                { num: 1, title: "البحث والاختيار" },
                { num: 2, title: "المراجعة" },
                { num: 3, title: "التأكيد" },
              ].map((s, index) => (
                <div key={s.num} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s.num
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                    </div>
                    <span className={`text-xs mt-1 ${step >= s.num ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {s.title}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className={`w-16 lg:w-32 h-0.5 mx-2 ${step > s.num ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Registration Complete */}
          {registrationComplete ? (
            <Card className="max-w-2xl mx-auto border-accent bg-accent/5">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-10 w-10 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">تم التسجيل بنجاح!</h2>
                <p className="text-muted-foreground mb-6">
                  تم تسجيل {selectedCourses.length} مواد بإجمالي {currentCredits} ساعة معتمدة
                </p>
                <div className="space-y-2 mb-6">
                  {selectedCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-3 bg-card rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.code} - شعبة {course.section}</p>
                      </div>
                      <Badge variant="secondary">{course.credits} س.م</Badge>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 justify-center">
                  <Link href="/schedule">
                    <Button>
                      <Calendar className="h-4 w-4 ml-2" />
                      عرض الجدول
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline">
                      العودة للرئيسية
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Course Search & List */}
              <div className="lg:col-span-2 space-y-4">
                {/* Search & Filters */}
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="ابحث بالاسم أو الرمز أو اسم المدرس..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pr-10"
                        />
                      </div>
                      <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger className="w-full lg:w-48">
                          <SelectValue placeholder="القسم" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">جميع الأقسام</SelectItem>
                          <SelectItem value="الهندسة الصناعية">الهندسة الصناعية</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                        <SelectTrigger className="w-full lg:w-32">
                          <SelectValue placeholder="المستوى" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">الكل</SelectItem>
                          <SelectItem value="1">السنة 1</SelectItem>
                          <SelectItem value="2">السنة 2</SelectItem>
                          <SelectItem value="3">السنة 3</SelectItem>
                          <SelectItem value="4">السنة 4</SelectItem>
                          <SelectItem value="5">السنة 5 / دراسات عليا</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Fast Registration Mode */}
                <Alert className="border-primary/20 bg-primary/5">
                  <Zap className="h-4 w-4 text-primary" />
                  <AlertTitle>وضع التسجيل السريع</AlertTitle>
                  <AlertDescription>
                    بناءً على خطتك الدراسية، نقترح عليك المواد التالية: قياس وتحليل العمل، الإحصاء الهندسي التطبيقي، بحوث عمليات (1)
                  </AlertDescription>
                </Alert>

                {/* Course List */}
                <div className="space-y-3">
                  {filteredCourses.map((course) => {
                    const isSelected = selectedCourses.find(c => c.id === course.id)
                    const isFull = course.enrolled >= course.capacity
                    const hasConflict = !isSelected && selectedCourses.some(c => c.time === course.time)

                    return (
                      <Card
                        key={course.id}
                        className={`border-border/50 transition-all ${
                          isSelected ? 'border-primary bg-primary/5' :
                          !course.prerequisitesMet ? 'opacity-60' :
                          isFull ? 'opacity-75' :
                          hasConflict ? 'border-destructive/30' : ''
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground">{course.name}</h3>
                                <Badge variant="outline" className="text-xs">{course.code}</Badge>
                                <Badge variant="secondary" className="text-xs">شعبة {course.section}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>

                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {course.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" />
                                  {course.room}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {course.enrolled}/{course.capacity}
                                </span>
                              </div>

                              {/* Warnings */}
                              {!course.prerequisitesMet && (
                                <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
                                  <AlertCircle className="h-3 w-3" />
                                  <span>لم تجتز المتطلبات السابقة: {course.prerequisites.join(", ")}</span>
                                </div>
                              )}
                              {isFull && (
                                <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
                                  <AlertCircle className="h-3 w-3" />
                                  <span>الشعبة ممتلئة</span>
                                </div>
                              )}
                              {hasConflict && (
                                <div className="flex items-center gap-1 mt-2 text-xs text-destructive">
                                  <AlertTriangle className="h-3 w-3" />
                                  <span>تعارض في الوقت مع مادة مختارة</span>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col items-end gap-2">
                              <Badge className="bg-primary/10 text-primary border-0">
                                {course.credits} س.م
                              </Badge>
                              {isSelected ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeCourse(course.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Minus className="h-4 w-4 ml-1" />
                                  إزالة
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  onClick={() => addCourse(course)}
                                  disabled={!course.prerequisitesMet || isFull || hasConflict || currentCredits + course.credits > maxCredits}
                                >
                                  <Plus className="h-4 w-4 ml-1" />
                                  إضافة
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Selected Courses Sidebar */}
              <div className="space-y-4">
                <Card className="border-border/50 sticky top-24">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>المواد المختارة</span>
                      <Badge variant="secondary">{selectedCourses.length} مادة</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Credit Hours Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">الساعات المسجلة</span>
                        <span className={`font-medium ${currentCredits > maxCredits - 3 ? 'text-destructive' : 'text-foreground'}`}>
                          {currentCredits} / {maxCredits}
                        </span>
                      </div>
                      <Progress value={(currentCredits / maxCredits) * 100} className="h-2" />
                      {currentCredits > maxCredits - 3 && currentCredits <= maxCredits && (
                        <p className="text-xs text-muted-foreground mt-1">اقتربت من الحد الأقصى</p>
                      )}
                    </div>

                    {/* Selected Courses List */}
                    {selectedCourses.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                          <ClipboardList className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">لم تقم باختيار أي مواد بعد</p>
                        <p className="text-xs text-muted-foreground mt-1">ابحث عن المواد وأضفها لقائمتك</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {selectedCourses.map((course) => (
                          <div key={course.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{course.name}</p>
                              <p className="text-xs text-muted-foreground">{course.code} - {course.credits} س.م</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeCourse(course.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex-col gap-2">
                    <Button
                      className="w-full"
                      disabled={selectedCourses.length === 0}
                      onClick={() => setShowConfirmDialog(true)}
                    >
                      <CheckCircle2 className="h-4 w-4 ml-2" />
                      تأكيد التسجيل
                    </Button>
                    {selectedCourses.length > 0 && (
                      <Button
                        variant="outline"
                        className="w-full text-destructive hover:text-destructive"
                        onClick={() => setSelectedCourses([])}
                      >
                        مسح الكل
                      </Button>
                    )}
                  </CardFooter>
                </Card>

                {/* Quality Impact */}
                <Card className="bg-accent/10 border-accent/20">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-accent" />
                      تحسينات التسجيل
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>تحقق تلقائي من المتطلبات</span>
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>كشف التعارضات فوراً</span>
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>عرض المقاعد المتاحة</span>
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>تسجيل بخطوات أقل</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تأكيد التسجيل</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من تسجيل المواد التالية؟
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 my-4">
            {selectedCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{course.name}</p>
                  <p className="text-xs text-muted-foreground">{course.code} - شعبة {course.section}</p>
                </div>
                <Badge variant="secondary">{course.credits} س.م</Badge>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">إجمالي الساعات:</span>
                <span className="font-semibold text-foreground">{currentCredits} ساعة معتمدة</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleConfirmRegistration}>
              <CheckCircle2 className="h-4 w-4 ml-2" />
              تأكيد التسجيل
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
