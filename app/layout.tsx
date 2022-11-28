import 'tailwindcss/tailwind.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="text-black bg-white">{children}</body>
    </html>
  )
}
