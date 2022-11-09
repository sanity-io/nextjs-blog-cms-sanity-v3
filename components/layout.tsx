import Alert from './alert'
import Meta from './meta'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {preview && <Alert />}
        <main>{children}</main>
      </div>
    </>
  )
}
