import Image from "next/image";
import Link from "next/link";
// import { Image } from "next/image";
import Upload from "./component/Upload/Upload";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Navbar */}
        <nav className=" bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 pt-1">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-3xl font-extrabold text-yellow-200">
              PennyWiseai
            </h1>
            <div className="space-x-4">
              <Link href="/Signup">
                <button className="underline text-black py-2  rounded-lg font-bold hover:bg-yellow-400 transition-all">
                  Sign Up
                </button>
              </Link>
              <Link href="/Login">
                <button className="bg-yellow-500 rounded-2xl text-black py-3 px-7 font-bold hover:bg-yellow-400 transition-all">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500 p-8 pt-20">
          <h1 className="text-6xl font-extrabold text-yellow-300 mb-4 text-center">
            Boogie Your Way to a Perfect Credit Score!
          </h1>
          <p className="text-2xl text-center mb-8 max-w-2xl">
            Improve your credit score with personalized steps, financial tools,
            and expert guidance. Get started today!
          </p>
          <div className="flex space-x-4">
            <Link href="/Signup">
              <button className="bg-yellow-500 text-black py-3 px-8 rounded-lg font-bold hover:bg-yellow-400 transition-all">
                Sign Up
              </button>
            </Link>
            <Link href="/Login">
              <button className="bg-yellow-500 text-black py-3 px-8 rounded-lg font-bold hover:bg-yellow-400 transition-all">
                Login
              </button>
            </Link>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 bg-gray-900">
          <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">
            How We Help You Improve Your Credit Score
          </h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                Step 1: Upload Your Credit Report
              </h3>
              <p>
                Start by uploading your credit report so we can analyze your
                financial data.
              </p>
              {/* Upload Component */}
              <Upload />
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                Step 2: Get Personalized Steps
              </h3>
              <p>
                Receive actionable steps based on your credit report to improve
                your score.
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                Step 3: Track Your Progress
              </h3>
              <p>
                Monitor your credit score over time and see the improvements
                with our tools.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-gray-800">
          <div className="text-center text-yellow-400">
            <p>© 2024 Credit Fixer. All rights reserved.</p>
            <p>
              Follow us on:
              <a href="#" className="ml-2 text-yellow-300 hover:underline">
                Instagram
              </a>{" "}
              |
              <a href="#" className="ml-2 text-yellow-300 hover:underline">
                Facebook
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
