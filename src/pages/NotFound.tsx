import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-serif text-3xl font-semibold text-ink-900">Page not found</h1>
      <p className="mt-3 text-ink-800/80">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block text-sm font-semibold text-sky-600 hover:text-sky-700">
        &larr; Back to home
      </Link>
    </div>
  )
}
