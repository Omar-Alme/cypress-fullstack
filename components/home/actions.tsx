"use client";

import { Button } from "@/components/ui/button";

export function Actions({
    submitting,
    onClearAction,
}: {
    submitting: boolean;
    onClearAction: () => void;
}) {
    return (
        <div className="flex items-center justify-center gap-3">
            <Button type="submit" data-testid="submit" disabled={submitting} className="px-6 cursor-pointer">
                {submitting ? "Saving…" : "Save reflection"}
            </Button>
            <Button type="button" variant="ghost" onClick={onClearAction} className="px-4 cursor-pointer">
                Clear
            </Button>
        </div>
    );
}
