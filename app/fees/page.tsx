import Link from "next/link"
import {
  AlertTriangle,
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  FileText,
  Wallet,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const feesSummary = {
  total: 960,
  paid: 475,
  due: 485,
  dueDate: "30 أبريل 2026",
}

const feeBreakdown = [
  { item: "رسوم الساعات المعتمدة", amount: 720, status: "partially-paid" },
  { item: "رسوم المختبرات", amount: 110, status: "due" },
  { item: "رسوم الخدمات الطلابية", amount: 80, status: "paid" },
  { item: "رسوم التأمين الصحي", amount: 50, status: "paid" },
]

const paymentMethods = [
  "الدفع الإلكتروني عبر بوابة الجامعة",
  "تسديد عبر تطبيقات البنوك الأردنية",
  "الدفع المباشر في صندوق الجامعة",
  "التحويل البنكي مع رفع إشعار الدفع",
]

export default function FeesPage() {
  const paidRatio = (feesSummary.paid / feesSummary.total) * 100

  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card className="border-border/60 bg-linear-to-b from-destructive/10 via-background to-background">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="destructive">رسوم مستحقة</Badge>
              <Badge variant="secondary">Finance</Badge>
            </div>
            <CardTitle className="text-3xl">صفحة الرسوم الجامعية</CardTitle>
            <p className="text-muted-foreground leading-7 max-w-3xl">
              متابعة حالة الرسوم للفصل الحالي، والاطلاع على تفاصيل المبالغ المستحقة، ثم الانتقال
              مباشرة إلى بوابة الدفع الرسمية.
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="https://srgs.yu.edu.jo/images/graduate-studies/tuition/TUIT-AR.pdf" target="_blank" rel="noopener noreferrer">
              <Button>
                <ExternalLink className="h-4 w-4 ml-2" />
                فتح بوابة/دليل الرسوم
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
              <Wallet className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">{feesSummary.total} د.أ</p>
              <p className="text-sm text-muted-foreground">إجمالي رسوم الفصل</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-2">
              <CheckCircle2 className="h-6 w-6 text-accent" />
              <p className="text-2xl font-bold">{feesSummary.paid} د.أ</p>
              <p className="text-sm text-muted-foreground">تم دفعه حتى الآن</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <p className="text-2xl font-bold text-destructive">{feesSummary.due} د.أ</p>
              <p className="text-sm text-muted-foreground">المبلغ المستحق</p>
            </CardContent>
          </Card>
        </section>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CreditCard className="h-5 w-5 text-primary" />
              حالة التسديد
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">نسبة التسديد</span>
              <span className="font-semibold text-foreground">{Math.round(paidRatio)}%</span>
            </div>
            <Progress value={paidRatio} className="h-3" />
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm">
              <CalendarClock className="h-4 w-4 inline ml-1 text-destructive" />
              آخر موعد للدفع بدون غرامات: <span className="font-semibold">{feesSummary.dueDate}</span>
            </div>
          </CardContent>
        </Card>

        <section className="grid gap-4 lg:grid-cols-2">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="h-5 w-5 text-primary" />
                تفصيل الرسوم
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {feeBreakdown.map((fee) => (
                <div key={fee.item} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{fee.item}</p>
                    <p className="text-xs text-muted-foreground">
                      {fee.status === "paid" ? "مدفوع" : fee.status === "partially-paid" ? "مدفوع جزئياً" : "مستحق"}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{fee.amount} د.أ</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-xl">طرق الدفع المتاحة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method} className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
                  {method}
                </div>
              ))}
              <Link href="https://srgs.yu.edu.jo/images/graduate-studies/tuition/TUIT-AR.pdf" target="_blank" rel="noopener noreferrer">
                <Button className="w-full mt-2">
                  <ExternalLink className="h-4 w-4 ml-2" />
                  الانتقال إلى الدفع الآن
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
