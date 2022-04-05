import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="grid place-items-center bg-slate-600 h-screen">
      <div className="shadow-lg p-5 bg-blue-600 rounded-lg">
        <Image
          src={"https://links.papareact.com/5me"}
          height={400}
          width={400}
          objectFit="contain"
        />
        <h1
          onClick={signIn}
          className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer"
        >
          Login with Facebook
        </h1>
      </div>
    </div>
  );
}
export default Login;
