"use client";

export function FormError({ message }: { message: string | null }) {
    if (!message) return null;
    return (
        <div role="alert" className="text-sm font-medium text-destructive">
            {message}
        </div>
    );
}
