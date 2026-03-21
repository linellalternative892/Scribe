import { redirect } from "next/navigation";

// The root URL redirects to /docs by default.
// Change this to your preferred landing page or remove the redirect
// if you want a separate marketing homepage.
export default function RootPage() {
  redirect("/docs");
}
