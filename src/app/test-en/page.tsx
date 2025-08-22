export default function TestEnPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">English Test Page</h1>
      <p>If you can see this page, Next.js routing is working correctly.</p>
      <div className="mt-4">
        <a href="/test-ko" className="text-blue-600 underline">Go to Korean page</a>
      </div>
      <div className="mt-2">
        <a href="/en" className="text-blue-600 underline">Go to actual English homepage</a>
      </div>
    </div>
  );
}