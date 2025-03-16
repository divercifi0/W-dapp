import React from "react";
import NavBar from "@/components/ui/NavBar";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <div className="max-w-6xl mx-auto ">{children}</div>
    </>
  );
}
