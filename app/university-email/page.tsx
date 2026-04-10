import Link from "next/link"
import { ArrowLeft, BellRing, ExternalLink, Mail, ShieldCheck, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const inboxStats = [
  { label: "حسابات فعالة", value: "+35K" },
  { label: "إشعارات يومية", value: "+12K" },
  { label: "توافر الخدمة", value: "99.9%" },
]

const emailFeatures = [
  "مراسلات رسمية بين الطلبة والكادر الأكاديمي",
  "إشعارات التسجيل والنتائج والرسوم",
  "تفعيل المصادقة المتعددة للحساب",
  "تخزين سحابي ودمج مع أدوات Office",
]

export default function UniversityEmailPage() {
  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card className="border-border/60 bg-linear-to-b from-accent/15 via-accent/5 to-background">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Outlook</Badge>
              <Badge className="bg-accent text-accent-foreground">البريد الإلكتروني</Badge>
            </div>
            <CardTitle className="text-3xl">البريد الجامعي الرسمي</CardTitle>
            <p className="text-muted-foreground leading-7 max-w-3xl">
              منصة البريد الجامعي هي القناة الأساسية للتواصل الرسمي داخل الجامعة. احرص على متابعة
              الرسائل بشكل يومي لضمان عدم فقدان أي إشعار أكاديمي أو إداري مهم.
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="https://outlook.com/yu.edu.jo" target="_blank" rel="noopener noreferrer">
              <Button>
                <ExternalLink className="h-4 w-4 ml-2" />
                فتح Outlook
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
          {inboxStats.map((item) => (
            <Card key={item.label} className="border-border/60">
              <CardContent className="p-6 text-center space-y-1">
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Mail className="h-5 w-5 text-primary" />
                ماذا يمكنك تنفيذها من البريد؟
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emailFeatures.map((feature) => (
                <div key={feature} className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
                  {feature}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BellRing className="h-5 w-5 text-primary" />
                توصيات مهمة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p><Sparkles className="h-4 w-4 inline ml-1 text-accent" /> فعّل الردود التلقائية أثناء فترات الامتحانات أو الإجازات.</p>
              <p><ShieldCheck className="h-4 w-4 inline ml-1 text-primary" /> لا تشارك كلمة المرور مع أي طرف، حتى لو ادعى الدعم الفني.</p>
              <p><Mail className="h-4 w-4 inline ml-1 text-primary" /> استخدم البريد الجامعي فقط للمعاملات الرسمية والطلبات الأكاديمية.</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
