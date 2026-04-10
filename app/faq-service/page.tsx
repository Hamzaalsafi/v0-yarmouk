import Link from "next/link"
import { ArrowLeft, ExternalLink, HelpCircle, MessageSquareText, Search, ShieldQuestion } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const faqTopics = [
  {
    category: "القبول والتسجيل",
    items: ["آلية التسجيل والسحب والإضافة", "استعادة الرقم الجامعي", "تأجيل الفصل الدراسي"],
  },
  {
    category: "الخدمات الإلكترونية",
    items: ["مشاكل تسجيل الدخول إلى SIS", "تفعيل البريد الجامعي", "الوصول إلى منصة التعلم الإلكتروني"],
  },
  {
    category: "الشؤون المالية",
    items: ["طرق الدفع الإلكتروني", "الاعتراض على الرسوم", "طلب تقسيط الرسوم"],
  },
]

export default function FaqServicePage() {
  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card className="border-border/60 bg-linear-to-b from-accent/10 via-background to-background">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">FAQ</Badge>
              <Badge className="bg-accent text-accent-foreground">الأسئلة الأكثر شيوعاً</Badge>
            </div>
            <CardTitle className="text-3xl">مركز الأسئلة والإجابات</CardTitle>
            <p className="text-muted-foreground leading-7 max-w-3xl">
              إذا كان لديك استفسار حول الدراسة، الأنظمة الإلكترونية، أو المعاملات الإدارية،
              فابدأ من هذه الصفحة للوصول السريع إلى أكثر الأسئلة تكراراً.
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="https://www.yu.edu.jo/index.php/faq-ar" target="_blank" rel="noopener noreferrer">
              <Button>
                <ExternalLink className="h-4 w-4 ml-2" />
                فتح صفحة FAQ الرسمية
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
              <Search className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">+120</p>
              <p className="text-sm text-muted-foreground">إجابة منشورة</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-2">
              <MessageSquareText className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">محاور رئيسية للاستفسارات</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-2">
              <ShieldQuestion className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">موثّق</p>
              <p className="text-sm text-muted-foreground">محتوى رسمي محدث من الجامعة</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {faqTopics.map((topic) => (
            <Card key={topic.category} className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  {topic.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {topic.items.map((item) => (
                  <div key={item} className="rounded-lg border border-border bg-muted/30 p-3">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </main>
  )
}
