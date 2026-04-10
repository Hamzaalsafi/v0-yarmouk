import Link from "next/link"
import { ArrowLeft, CalendarDays, ExternalLink, Flag, Timer, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const keyDates = [
  { title: "بداية التسجيل المبكر", date: "20 مارس 2026" },
  { title: "آخر موعد للسحب والإضافة", date: "30 مارس 2026" },
  { title: "بداية الامتحانات النهائية", date: "20 مايو 2026" },
  { title: "إعلان النتائج النهائية", date: "15 يونيو 2026" },
]

export default function UniversityCalendarPage() {
  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card className="border-border/60 bg-linear-to-b from-primary/10 via-background to-background">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">University Calendar</Badge>
              <Badge className="bg-primary text-primary-foreground">التقويم الجامعي</Badge>
            </div>
            <CardTitle className="text-3xl">خريطة العام الدراسي</CardTitle>
            <p className="text-muted-foreground leading-7 max-w-3xl">
              التقويم الجامعي يوفر مرجعاً زمنياً موحداً لكل المواعيد الأكاديمية والإدارية خلال الفصل،
              ليساعد الطلبة والموظفين على التخطيط المسبق وتجنب فوات المواعيد المهمة.
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="https://admreg.yu.edu.jo/index.php/unical" target="_blank" rel="noopener noreferrer">
              <Button>
                <ExternalLink className="h-4 w-4 ml-2" />
                فتح التقويم الرسمي
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
              <CalendarDays className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">32</p>
              <p className="text-sm text-muted-foreground">أحداث أكاديمية خلال الفصل</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-2">
              <Timer className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">9 أيام</p>
              <p className="text-sm text-muted-foreground">متبقية لأقرب موعد حرج</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm text-muted-foreground">تغطية للمواعيد الرسمية المعلنة</p>
            </CardContent>
          </Card>
        </section>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Flag className="h-5 w-5 text-primary" />
              المواعيد الأساسية
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {keyDates.map((item) => (
              <div key={item.title} className="rounded-lg border border-border bg-muted/30 p-4">
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
