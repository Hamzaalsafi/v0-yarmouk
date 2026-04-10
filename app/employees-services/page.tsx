import Link from "next/link"
import { ArrowLeft, ExternalLink, Handshake, Shield, UserCheck, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const employeeChannels = [
  "دليل الموظفين والدوائر الإدارية",
  "إعلانات الموارد البشرية والتعاميم",
  "المسار الوظيفي والتطوير المهني",
  "خدمات التأمين والصحة المهنية",
]

export default function EmployeesServicesPage() {
  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card className="border-border/60 bg-linear-to-b from-primary/10 via-background to-background">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Employees</Badge>
              <Badge className="bg-primary text-primary-foreground">العاملون</Badge>
            </div>
            <CardTitle className="text-3xl">بوابة العاملين</CardTitle>
            <p className="text-muted-foreground leading-7 max-w-3xl">
              صفحة موحدة للوصول إلى المعلومات والخدمات العامة الخاصة بالعاملين،
              وتشمل التحديثات الإدارية والدعم المؤسسي والتواصل الداخلي.
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="https://www.yu.edu.jo/index.php/ar/employeesar" target="_blank" rel="noopener noreferrer">
              <Button>
                <ExternalLink className="h-4 w-4 ml-2" />
                فتح صفحة العاملين
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
              <Users className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">+2,100</p>
              <p className="text-sm text-muted-foreground">موظف ضمن قاعدة البيانات</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-2">
              <Handshake className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-muted-foreground">مسار خدمة إداري</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardContent className="p-6 space-y-2">
              <Shield className="h-6 w-6 text-primary" />
              <p className="text-2xl font-bold">موثوق</p>
              <p className="text-sm text-muted-foreground">وصول رسمي للوثائق والتحديثات</p>
            </CardContent>
          </Card>
        </section>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <UserCheck className="h-5 w-5 text-primary" />
              قنوات الخدمات للعاملين
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {employeeChannels.map((channel) => (
              <div key={channel} className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
                {channel}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
