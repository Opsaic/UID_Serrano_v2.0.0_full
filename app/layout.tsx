import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  return <>{children}</>;
}
