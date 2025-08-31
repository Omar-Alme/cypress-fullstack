import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
    return (
        <header className={cn(
            "sticky top-0 z-40 w-full",
            "border-b bg-background/80 backdrop-blur",
            "supports-[backdrop-filter]:bg-background/60"
        )}>
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="font-semibold tracking-tight text-foreground"
                        aria-label="Go to home"
                    >
                        ReflectAI
                    </Link>
                </div>

                {/* Right actions */}
                <nav className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/history" data-testid="nav-history" aria-label="Open history">
                            History
                        </Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
}
