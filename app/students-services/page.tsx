import Link from "next/link"
import { ArrowLeft, BookOpenCheck, ExternalLink, GraduationCap, LifeBuoy, NotebookTabs } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const studentServices = [
  "المنح والمساعدات المالية",
  "الإرشاد الأكاديمي وخطط التخرج",
  "الخدمات الصحية والتأمين",
  "الأنشطة الطلابية والنوادي",
  "خدمات التدريب والتشغيل",
  "خدمات السكن والمواصلات",
]

export default function StudentsServicesPage() {
  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card className="border-border/60 bg-linear-to-b from-accent/10 via-background to-background">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Students</Badge>
              <Badge className="bg-accent text-accent-foreground">الطلبة</Badge>
            </div>
            <CardTitle className="text-3xl">مركز خدمات الطلبة</CardTitle>
            <p className="text-muted-foreground leading-7 max-w-3xl">
              بوابتك للوصول إلى جميع الخدمات التي تدعم رحلتك الجامعية أكاديمياً وإدارياً واجتماعياً.
              يمكنك البدء من هنا ثم الانتقال مباشرة إلى الصفحة الرسمية للطلبة.
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="https://www.yu.edu.jo/index.php/ar/studentar" target="_blank" rel="noopener noreferrer">
              <Button>
                <ExternalLink className="h-4 w-4 ml-2" />
                فتح صفحة الطلبة
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 ml-2" />
                العودة إلى لوحة التحكم
              </Button>
            </Link>
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">+18</p>
              <p className="text-sm text-muted-foreground">خدمة مخصصة للطلبة</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-2">
              <BookOpenCheck className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-sm text-muted-foreground">إتاحة رقمية للخدمات الأساسية</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-2">
              <LifeBuoy className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">دعم مباشر</p>
              <p className="text-sm text-muted-foreground">للأسئلة الأكاديمية والإدارية</p>
            </CardContent>
          </Card>
        </section>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <NotebookTabs className="h-5 w-5 text-primary" />
              أهم المسارات الخدمية
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {studentServices.map((service) => (
              <div key={service} className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
                {service}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
