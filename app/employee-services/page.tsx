import Link from "next/link"
import { ArrowLeft, Briefcase, CheckCircle2, Clock3, ExternalLink, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const essHighlights = [
  { label: "طلبات تم إنجازها", value: "1,240" },
  { label: "متوسط زمن الموافقة", value: "48 ساعة" },
  { label: "خدمات متاحة", value: "14" },
]

const essTools = [
  "طلب إجازة سنوية أو مرضية",
  "متابعة الرصيد والإجازات المتبقية",
  "تحميل قسيمة الراتب الشهرية",
  "إصدار كتاب تعريف للراتب",
  "تحديث البيانات الوظيفية",
  "طلبات السلف والمستحقات",
]

const essUpdates = [
  "تم تفعيل إشعارات البريد عند اعتماد الطلبات.",
  "إضافة سجل زمني يوضح مراحل كل معاملة.",
  "تحسين سرعة عرض كشوفات الرواتب على الهواتف.",
]

export default function EmployeeServicesPage() {
  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card className="border-border/60 bg-linear-to-b from-primary/10 via-primary/5 to-background">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">ESS</Badge>
              <Badge className="bg-primary text-primary-foreground">خدمات العاملين</Badge>
            </div>
            <CardTitle className="text-3xl">مركز خدمات العاملين</CardTitle>
            <p className="text-muted-foreground leading-7 max-w-3xl">
              وصول سريع وآمن إلى جميع الخدمات الإدارية والموارد البشرية للعاملين في جامعة اليرموك،
              مع متابعة فورية لحالة الطلبات من الإرسال حتى الاعتماد.
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="https://ess.yu.edu.jo" target="_blank" rel="noopener noreferrer">
              <Button>
                <ExternalLink className="h-4 w-4 ml-2" />
                فتح نظام ESS
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
          {essHighlights.map((item) => (
            <Card key={item.label} className="border-border/60">
              <CardContent className="p-6 space-y-1 text-center">
                <p className="text-3xl font-bold text-foreground">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Briefcase className="h-5 w-5 text-primary" />
                أبرز الخدمات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {essTools.map((tool) => (
                <div key={tool} className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
                  {tool}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Clock3 className="h-5 w-5 text-primary" />
                التحديثات الأخيرة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {essUpdates.map((update) => (
                <div key={update} className="flex items-start gap-2 text-sm leading-6">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-1" />
                  <span>{update}</span>
                </div>
              ))}
              <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 inline ml-1 text-primary" />
                يتم تسجيل الدخول عبر بيانات الجامعة الرسمية وبروتوكولات اتصال مشفّرة.
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
