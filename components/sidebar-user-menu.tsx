"use client"

import Link from "next/link"
import { ChevronDown, LogOut, Settings, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type SidebarUserMenuProps = {
  onNavigate?: () => void
}

const sidebarStudent = {
  name: "محمد",
  level: "السنة الرابعة",
  id: "2021105432",
}

export function SidebarUserMenu({ onNavigate }: SidebarUserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
          <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 text-right">
            <p className="text-sm font-medium text-foreground truncate">{sidebarStudent.name}</p>
            <p className="text-xs text-primary">{sidebarStudent.level}</p>
            <p className="text-xs text-muted-foreground">{sidebarStudent.id}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/basic-info" onClick={onNavigate}>
            <User className="h-4 w-4 ml-2" />
            الملف الشخصي
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/basic-info" onClick={onNavigate}>
            <Settings className="h-4 w-4 ml-2" />
            الإعدادات
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" asChild>
          <Link href="/" onClick={onNavigate}>
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
