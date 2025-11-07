// app/(main)/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <div className="w-full h-full">{children}</div>;
}
