import { Sidebar } from "./Sidebar"
import { Header } from "./Header"

interface DashboardLayoutProps {
    children: React.ReactNode;
    user?: {
        name?: string;
        email: string;
        role: string;
    };
}

export default function DashboardLayout({
    children,
    user,
}: DashboardLayoutProps) {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 lg:block">
                <Sidebar />
            </div>
            <div className="flex flex-col">
                <Header user={user} />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/10">
                    {children}
                </main>
            </div>
        </div>
    )
}
