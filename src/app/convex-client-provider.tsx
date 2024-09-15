"use client"

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexClient } from "convex/browser";

const client = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({children}: {children: React.ReactNode}) {
    return (
        <ConvexProvider client={client}>{children}</ConvexProvider>
    );
}