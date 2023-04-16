import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center ">
        <ToastContainer />
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 rounded-lg px-4"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-900 min-h-screen flex">
      <ToastContainer />
      <Nav />
      <div className="bg-white flex-grow m-2 ml-0 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
}
