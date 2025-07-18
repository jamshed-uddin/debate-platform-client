import { auth } from "@/auth";
import Hero from "@/components/Hero";

export default async function Home() {
  const session = await auth();
  console.log(session?.user);

  return (
    <div>
      <Hero />
    </div>
  );
}
