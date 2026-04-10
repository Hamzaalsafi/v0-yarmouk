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
  Clock,
  MapPin,
  Download,
  Printer,
  AlertCircle,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

// Midterm Exams Data
const midtermExams = [
  {
    code: "IE 401",
    name: "بحوث العمليات",
    date: "25 مارس 2026",
    day: "الأربعاء",
    time: "09:00 - 11:00",
    room: "قاعة H201",
    building: "مبنى الهندسة",
    instructor: "د. أحمد الخطيب",
    daysLeft: 9,
    status: "upcoming"
  },
  {
    code: "IE 403",
    name: "إدارة الجودة",
    date: "28 مارس 2026",
    day: "السبت",
    time: "11:00 - 13:00",
    room: "قاعة H105",
    building: "مبنى الهندسة",
    instructor: "د. محمد النجار",
    daysLeft: 12,
    status: "upcoming"
  },
  {
    code: "IE 405",
    name: "هندسة العوامل البشرية",
    date: "1 أبريل 2026",
    day: "الأربعاء",
    time: "09:00 - 11:00",
    room: "قاعة H301",
    building: "مبنى الهندسة",
    instructor: "د. ليلى حسن",
    daysLeft: 16,
    status: "upcoming"
  },
  {
    code: "MATH 301",
    name: "الإحصاء الهندسي",
    date: "4 أبريل 2026",
    day: "السبت",
    time: "14:00 - 16:00",
    room: "قاعة S101",
    building: "مبنى العلوم",
    instructor: "د. عمر الزعبي",
    daysLeft: 19,
    status: "upcoming"
  },
]

// Final Exams Data
const finalExams = [
  {
    code: "IE 401",
    name: "بحوث العمليات",
    date: "20 مايو 2026",
    day: "الأربعاء",
    time: "09:00 - 12:00",
    room: "قاعة الامتحانات الكبرى",
    building: "مبنى المكتبة",
    instructor: "د. أحمد الخطيب",
    daysLeft: 65,
    status: "scheduled"
  },
  {
    code: "IE 403",
    name: "إدارة الجودة",
    date: "24 مايو 2026",
    day: "الأحد",
    time: "09:00 - 12:00",
    room: "قاعة الامتحانات الكبرى",
    building: "مبنى المكتبة",
    instructor: "د. محمد النجار",
    daysLeft: 69,
    status: "scheduled"
  },
  {
    code: "IE 405",
    name: "هندسة العوامل البشرية",
    date: "28 مايو 2026",
    day: "الخميس",
    time: "14:00 - 17:00",
    room: "قاعة H301",
    building: "مبنى الهندسة",
    instructor: "د. ليلى حسن",
    daysLeft: 73,
    status: "scheduled"
  },
  {
    code: "MATH 301",
    name: "الإحصاء الهندسي",
    date: "1 يونيو 2026",
    day: "الاثنين",
    time: "09:00 - 12:00",
    room: "قاعة S201",
    building: "مبنى العلوم",
    instructor: "د. عمر الزعبي",
    daysLeft: 77,
    status: "scheduled"
  },
]

// Sidebar Navigation
const sidebarNav = [
  { icon: Home, title: "الرئيسية", href: "/dashboard", active: false },
  { icon: ClipboardList, title: "المعلومات الأساسية", href: "/basic-info", active: false },
  { icon: Calendar, title: "أوقات التسجيل", href: "/basic-info?tab=registration-times", active: false },
  { icon: ClipboardList, title: "تسجيل المواد", href: "/registration", active: false },
  { icon: Calendar, title: "الجدول الدراسي", href: "/schedule", active: false },
  { icon: GraduationCap, title: "العلامات", href: "/grades", active: false },
  { icon: Eye, title: "الغياب", href: "/attendance", active: false },
  { icon: FileText, title: "الامتحانات", href: "/exams", active: true },
  { icon: Target, title: "الخطة الدراسية", href: "/study-plan", active: false },
  { icon: Users, title: "الأساتذة", href: "/faculty", active: false },
  { icon: CreditCard, title: "الرسوم", href: "/fees", active: false },
  { icon: Bell, title: "الإعلانات", href: "/announcements", active: false },
  { icon: HelpCircle, title: "المساعدة", href: "/help", active: false },
]

export default function ExamsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("midterm")

  const upcomingExam = midtermExams.find(e => e.daysLeft <= 10)

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
                <h1 className="font-semibold text-foreground">جدول الامتحانات</h1>
                <p className="text-xs text-muted-foreground">الفصل الثاني 2025/2026</p>
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
              <Link href="/schedule">
                <Button variant="secondary" size="sm">
                  <Calendar className="h-4 w-4 ml-1" />
                  <span className="hidden sm:inline">جدول المحاضرات</span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 space-y-6">
          {/* Upcoming Exam Alert */}
          {upcomingExam && (
            <Alert className="border-destructive/30 bg-destructive/5">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertTitle className="text-destructive">امتحان قريب!</AlertTitle>
              <AlertDescription>
                لديك امتحان {upcomingExam.name} ({upcomingExam.code}) يوم {upcomingExam.day} الموافق {upcomingExam.date} الساعة {upcomingExam.time}
              </AlertDescription>
            </Alert>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{midtermExams.length}</p>
                    <p className="text-xs text-muted-foreground">امتحانات نصفية</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{finalExams.length}</p>
                    <p className="text-xs text-muted-foreground">امتحانات نهائية</p>
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
                    <p className="text-2xl font-bold text-foreground">
                      {midtermExams.filter(e => e.daysLeft <= 14).length}
                    </p>
                    <p className="text-xs text-muted-foreground">خلال أسبوعين</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {Math.min(...midtermExams.map(e => e.daysLeft))}
                    </p>
                    <p className="text-xs text-muted-foreground">يوم للامتحان القادم</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exams Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="midterm">امتحانات النصفي</TabsTrigger>
              <TabsTrigger value="final">امتحانات النهائي</TabsTrigger>
            </TabsList>

            <TabsContent value="midterm" className="mt-6">
              <div className="space-y-4">
                {midtermExams.map((exam, index) => (
                  <Card 
                    key={index} 
                    className={`border-border/50 ${
                      exam.daysLeft <= 10 ? 'border-destructive/30 bg-destructive/5' : ''
                    }`}
                  >
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Exam Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground text-lg">{exam.name}</h3>
                            <Badge variant="outline" className="text-xs">{exam.code}</Badge>
                            {exam.daysLeft <= 10 && (
                              <Badge variant="destructive" className="text-xs">قريب!</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{exam.instructor}</p>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{exam.date}</p>
                                <p className="text-xs text-muted-foreground">{exam.day}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{exam.time}</p>
                                <p className="text-xs text-muted-foreground">ساعتان</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{exam.room}</p>
                                <p className="text-xs text-muted-foreground">{exam.building}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Days Left */}
                        <div className="lg:text-center">
                          <div className={`w-20 h-20 rounded-full flex flex-col items-center justify-center mx-auto ${
                            exam.daysLeft <= 7 ? 'bg-destructive text-destructive-foreground' :
                            exam.daysLeft <= 14 ? 'bg-accent/15 text-accent' :
                            'bg-primary/10 text-primary'
                          }`}>
                            <span className="text-2xl font-bold">{exam.daysLeft}</span>
                            <span className="text-xs">يوم</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="final" className="mt-6">
              <div className="space-y-4">
                {finalExams.map((exam, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        {/* Exam Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground text-lg">{exam.name}</h3>
                            <Badge variant="outline" className="text-xs">{exam.code}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{exam.instructor}</p>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{exam.date}</p>
                                <p className="text-xs text-muted-foreground">{exam.day}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{exam.time}</p>
                                <p className="text-xs text-muted-foreground">3 ساعات</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium text-foreground">{exam.room}</p>
                                <p className="text-xs text-muted-foreground">{exam.building}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Days Left */}
                        <div className="lg:text-center">
                          <div className="w-20 h-20 rounded-full bg-muted flex flex-col items-center justify-center mx-auto">
                            <span className="text-2xl font-bold text-foreground">{exam.daysLeft}</span>
                            <span className="text-xs text-muted-foreground">يوم</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Exam Rules */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">تعليمات الامتحانات</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>يجب الحضور قبل موعد الامتحان بـ 15 دقيقة على الأقل</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>إحضار البطاقة الجامعية وبطاقة الهوية الشخصية</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>يمنع استخدام الهواتف المحمولة داخل قاعة الامتحان</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>الالتزام بالوقت المحدد للامتحان</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
