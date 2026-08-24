import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "CI/CD Learning Project",
  description: "A minimal full-stack monorepo for learning CI/CD"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
