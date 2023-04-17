import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex text-blue-900 justify-between">
        <h2> 
          Hello <b>{session?.user?.name}</b>
        </h2>
        <div className="flex items-center gap-1 bg-gray-300 pr-2 rounded-lg overflow-hidden">
          <img
            src={session?.user?.image || ""}
            alt={session?.user?.name || "user"}
            className="w-8 h-8"
          />
          <span className="text-black">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
