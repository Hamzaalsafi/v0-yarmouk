"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  BookOpen,
  Calendar,
  FileText,
  ClipboardList,
  Users,
  Bell,
  HelpCircle,
  ChevronLeft,
  Globe,
  LogIn,
  Menu,
  X,
  Clock,
  Building2,
  Library,
  Bus,
  Scale,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Target,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Quick Access Services Data
const quickServices = [
  {
    icon: ClipboardList,
    title: "نظام معلومات الطالب",
    subtitle: "SIS",
    href: "/dashboard",
    color: "bg-primary"
  },
  {
    icon: BookOpen,
    title: "نظام التعلم الإلكتروني",
    subtitle: "E-Learning",
    href: "https://elearning.yu.edu.jo",
    color: "bg-accent"
  },
  {
    icon: Calendar,
    title: "خدمات العاملين",
    subtitle: "ESS",
    href: "/employee-services",
    color: "bg-primary/90"
  },
  {
    icon: FileText,
    title: "البريد الإلكتروني",
    subtitle: "Outlook",
    href: "/university-email",
    color: "bg-accent"
  },
  {
    icon: Target,
    title: "التقويم الجامعي",
    subtitle: "University Calendar",
    href: "/university-calendar",
    color: "bg-primary"
  },
  {
    icon: Bell,
    title: "الطلبة",
    subtitle: "Students",
    href: "/students-services",
    color: "bg-accent/90"
  },
  {
    icon: Users,
    title: "العاملون",
    subtitle: "Employees",
    href: "/employees-services",
    color: "bg-accent"
  },
  {
    icon: HelpCircle,
    title: "الأسئلة الأكثر شيوعاً",
    subtitle: "FAQ",
    href: "/faq-service",
    color: "bg-accent"
  },
]

// Navigation Categories
const navCategories = [
  { title: "عن الجامعة", href: "https://www.yu.edu.jo/index.php" },
  { title: "الكليات", href: "https://www.yu.edu.jo/index.php/2023-03-19-09-08-18" },
  { title: "القبول والتسجيل", href: "https://admreg.yu.edu.jo/" },
  { title: "البحث العلمي", href: "https://scholar.yu.edu.jo/" },
  { title: "المنصات الإلكترونية", href: "/dashboard" },
  { title: "المكتبة", href: "https://library.yu.edu.jo" },
]

// Important Announcements
const announcements = [
  {
    title: "بدء التسجيل للفصل الدراسي الثاني",
    date: "15 مارس 2026",
    type: "urgent",
    description: "يبدأ التسجيل للفصل الدراسي الثاني 2025/2026 يوم الأحد الموافق 20 مارس"
  },
  {
    title: "موعد امتحانات منتصف الفصل",
    date: "10 مارس 2026",
    type: "important",
    description: "تبدأ امتحانات منتصف الفصل يوم 25 مارس وتستمر حتى 5 أبريل"
  },
  {
    title: "تحديث نظام معلومات الطالب",
    date: "8 مارس 2026",
    type: "info",
    description: "تم تحديث نظام معلومات الطالب بمميزات جديدة لتحسين تجربة المستخدم"
  },
]

// Academic Deadlines
const deadlines = [
  { title: "آخر موعد للسحب والإضافة", date: "25 مارس 2026", daysLeft: 9 },
  { title: "آخر موعد للانسحاب", date: "15 أبريل 2026", daysLeft: 30 },
  { title: "بداية امتحانات النهائي", date: "20 مايو 2026", daysLeft: 65 },
]

// Most Used Services
const popularServices = [
  { icon: ClipboardList, title: "تسجيل المواد", count: "12,450 زيارة", href: "/registration" },
  { icon: Calendar, title: "الجدول الدراسي", count: "8,900 زيارة", href: "/schedule" },
  { icon: FileText, title: "جدول الامتحانات", count: "7,500 زيارة", href: "/exams" },
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Top Alert Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span>فترة التسجيل المبكر متاحة الآن - سجل قبل 20 مارس للحصول على الأولوية</span>
          <Link href="/dashboard" className="underline font-medium hover:no-underline">
            سجّل الآن
          </Link>
        </div>
      </div>

      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
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
                <h1 className="font-bold text-foreground text-lg leading-tight">جامعة اليرموك</h1>
                <p className="text-xs text-muted-foreground">Yarmouk University</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navCategories.map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span>EN</span>
              </Button>
              <Link href="/dashboard">
                <Button size="sm" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">تسجيل الدخول</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navCategories.map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden text-primary-foreground py-16 lg:py-24">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/YU_background_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/45" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-balance">
              مرحباً بك في البوابة الإلكترونية
            </h2>
            <p className="text-lg lg:text-xl opacity-90 mb-8 text-pretty">
              الوصول السريع والسهل لجميع الخدمات الأكاديمية والطلابية في مكان واحد
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث عن الخدمات، المواد، الأساتذة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-4 py-6 text-lg bg-background/95 text-foreground rounded-xl border-0 shadow-lg"
              />
              {searchQuery && (
                <Link href={`https://www.yu.edu.jo/index.php/component/search/?searchword=${encodeURIComponent(searchQuery)}&searchphrase=all&Itemid=541`}>
                  <Button
                    size="sm"
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                  >
                    بحث
                  </Button>
                </Link>
              )}
            </div>

            {/* Quick Search Tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {["تسجيل المواد", "الجدول", "الرسوم"].map((tag) => (
                <Link
                  key={tag}
                  href={`https://www.yu.edu.jo/index.php/component/search/?searchword=${encodeURIComponent(tag)}&searchphrase=all&Itemid=541`}
                  className="text-sm bg-primary-foreground/10 hover:bg-primary-foreground/20 px-3 py-1 rounded-full transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Services */}
      <section className="py-12 lg:py-16 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                target={service.href.startsWith("http") ? "_blank" : undefined}
                rel={service.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-border/50 cursor-pointer group">
                  <CardContent className="p-4 lg:p-6 text-center">
                    <div className={`w-12 h-12 lg:w-14 lg:h-14 ${service.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <service.icon className="h-6 w-6 lg:h-7 lg:w-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm lg:text-base mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{service.subtitle}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Announcements Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">
                  الإعلانات المهمة
                </h2>
                <Link href="https://www.yu.edu.jo/index.php/ann-ar" className="text-sm text-primary hover:underline flex items-center gap-1">
                  عرض الكل
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow border-border/50">
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          announcement.type === 'urgent' ? 'bg-destructive' :
                          announcement.type === 'important' ? 'bg-accent' :
                          'bg-primary/70'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={
                              announcement.type === 'urgent' ? 'destructive' :
                              announcement.type === 'important' ? 'secondary' :
                              'outline'
                            } className="text-xs">
                              {announcement.type === 'urgent' ? 'عاجل' :
                               announcement.type === 'important' ? 'مهم' : 'معلومات'}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{announcement.date}</span>
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">{announcement.title}</h3>
                          <p className="text-sm text-muted-foreground">{announcement.description}</p>
                        </div>
                        <ChevronLeft className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quality Impact Panel */}
              <Card className="bg-accent/10 border-accent/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    تحسينات الجودة في البوابة الجديدة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">وصول أسرع للمعلومات</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">أخطاء أقل في التسجيل</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">رحلة طالب أوضح</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-sm text-foreground">تنبيهات ومواعيد واضحة</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Academic Deadlines */}
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    المواعيد الأكاديمية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {deadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div>
                        <p className="font-medium text-foreground text-sm">{deadline.title}</p>
                        <p className="text-xs text-muted-foreground">{deadline.date}</p>
                      </div>
                      <Badge variant={deadline.daysLeft <= 10 ? "destructive" : "secondary"} className="text-xs">
                        {deadline.daysLeft} يوم
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Most Used */}
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    الأكثر استخداماً
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {popularServices.map((service, index) => (
                    <Link key={index} href={service.href}>
                      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <service.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{service.title}</p>
                          <p className="text-xs text-muted-foreground">{service.count}</p>
                        </div>
                        <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="bg-primary text-primary-foreground border-0">
                <CardContent className="p-6 text-center">
                  <HelpCircle className="h-10 w-10 mx-auto mb-3 opacity-90" />
                  <h3 className="font-semibold mb-2">تحتاج مساعدة؟</h3>
                  <p className="text-sm opacity-90 mb-4">
                    فريق الدعم متاح للإجابة على استفساراتك
                  </p>
                  <Link href="https://www.yu.edu.jo/index.php/faq-ar">
                    <Button variant="secondary" size="sm" className="w-full">
                      مركز المساعدة
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Directory Preview */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              دليل الخدمات
            </h2>
            <p className="text-muted-foreground">
              جميع الخدمات الطلابية في مكان واحد
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { icon: Mail, title: "بريد الأساتذة", href: "https://outlook.com/yu.edu.jo" },
                { icon: Briefcase, title: "وظائف", href: "https://hr.yu.edu.jo/job/userpage/AdvertisementPage.aspx" },
                { icon: Scale, title: "الأنظمة والقوانين", href: "https://law.yu.edu.jo/" },
                { icon: Shield, title: "دليل الطالب", href: "https://www.yu.edu.jo/studentguide/" },
                { icon: Bus, title: "خارطة الجامعة", href: "https://www.google.com/maps/d/viewer?ll=32.535473255313704%2C35.86087269933459&z=16&mid=1H_HAua3JvdJO6rZBNM4hf-FdQVHnWbk" },
                { icon: Library, title: "المكتبة", href: "https://library.yu.edu.jo" },
              ].map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="h-full hover:shadow-md transition-all duration-200 hover:-translate-y-1 border-border/50 cursor-pointer text-center">
                  <CardContent className="p-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">{service.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="https://www.yu.edu.jo/index.php">
              <Button variant="outline" size="lg">
                عرض جميع الخدمات
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
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
                  <h3 className="font-bold text-foreground">جامعة اليرموك</h3>
                  <p className="text-xs text-muted-foreground">Yarmouk University</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                جامعة حكومية أردنية تأسست عام 1976، تقدم برامج أكاديمية متميزة في مختلف التخصصات.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground">نظام معلومات الطالب</Link></li>
                <li><Link href="https://admreg.yu.edu.jo/" className="text-muted-foreground hover:text-foreground">القبول والتسجيل</Link></li>
                <li><Link href="https://www.yu.edu.jo/index.php/RegTime/" className="text-muted-foreground hover:text-foreground">الجدول الدراسي</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">الخدمات</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="https://www.yu.edu.jo/index.php" className="text-muted-foreground hover:text-foreground">دليل الخدمات</Link></li>
                <li><Link href="https://fmd.yu.edu.jo/" className="text-muted-foreground hover:text-foreground">أعضاء هيئة التدريس</Link></li>
                <li><Link href="https://library.yu.edu.jo" className="text-muted-foreground hover:text-foreground">المكتبة</Link></li>
                <li><Link href="https://www.yu.edu.jo/index.php/faq-ar" className="text-muted-foreground hover:text-foreground">مركز المساعدة</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">تواصل معنا</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>إربد، الأردن</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span dir="ltr">+962 2 721 1111</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>info@yu.edu.jo</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 جامعة اليرموك. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="https://www.yu.edu.jo/index.php" className="text-muted-foreground hover:text-foreground">سياسة الخصوصية</Link>
              <Link href="https://law.yu.edu.jo/" className="text-muted-foreground hover:text-foreground">الشروط والأحكام</Link>
              <Link href="https://www.yu.edu.jo/index.php/faq-ar" className="text-muted-foreground hover:text-foreground">إمكانية الوصول</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
