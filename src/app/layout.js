import './globals.css'

export const metadata = {
  title: 'NFT Gallery'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
