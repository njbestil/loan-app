export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-300">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-500">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 text-sm font-medium text-white bg-zinc-950 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
