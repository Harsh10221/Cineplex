import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Create an Account
        </h1>

        {/* Form */}
        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
          </div>

          {/* Register Button */}
          <button
            type="button"
            className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition duration-200 shadow-md"
          >
            Register
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-red-500 font-semibold hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}