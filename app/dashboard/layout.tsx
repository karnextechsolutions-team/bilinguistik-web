import Link from "next/link"
import { Home, FileText, Settings, LogOut } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Bilinguistik</h1>
          <p className="text-sm text-muted-foreground mt-1">Customer Portal</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary text-foreground hover:text-primary transition-colors">
            <Home className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/dashboard/translations" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary text-foreground hover:text-primary transition-colors">
            <FileText className="w-5 h-5" />
            My Translations
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-secondary text-foreground hover:text-primary transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>
        
        <div className="p-4 mt-auto">
          <button className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md hover:bg-secondary text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
