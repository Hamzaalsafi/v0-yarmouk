import Link from "next/link"
import { ExternalLink, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type ServiceLandingProps = {
  title: string
  subtitle: string
  description: string
  highlights?: Array<{ label: string; value: string }>
  tools?: string[]
  updates?: string[]
  externalUrl?: string
  ctaLabel?: string
}

export function ServiceLanding({
  title,
  subtitle,
  description,
  highlights = [],
  tools = [],
  updates = [],
  externalUrl,
  ctaLabel = "فتح الخدمة",
}: ServiceLandingProps) {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-5xl space-y-6">
        <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-background">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-2xl text-foreground">{title}</CardTitle>
              <Badge variant="secondary">{subtitle}</Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-7">{description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {externalUrl && (
                <Link href={externalUrl} target="_blank" rel="noopener noreferrer">
                  <Button>
                    <ExternalLink className="h-4 w-4 ml-2" />
                    {ctaLabel}
                  </Button>
                </Link>
              )}
              <Link href="/dashboard">
                <Button variant="secondary">
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  الذهاب إلى لوحة الطالب
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          {highlights.map((item) => (
            <Card key={item.label} className="border-border/50">
              <CardContent className="p-4 text-center space-y-1">
                <p className="text-2xl font-bold text-foreground">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">أدوات الخدمة</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {tools.map((tool) => (
                <div key={tool} className="rounded-lg border border-border bg-muted/30 p-3 text-sm text-foreground">
                  {tool}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">آخر التحديثات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {updates.map((update) => (
                <div key={update} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5" />
                  <p>{update}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
