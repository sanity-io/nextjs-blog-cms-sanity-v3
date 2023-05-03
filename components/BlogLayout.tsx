import AlertBanner from 'components/AlertBanner'

export default function BlogLayout({
  preview,
  children,
}: {
  preview: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen">
        <AlertBanner preview={preview} />
        <main>{children}</main>
      </div>
    </>
  )
}
