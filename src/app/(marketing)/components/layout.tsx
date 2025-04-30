export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <header>{/* Navbar or Hero */}</header>
      <main>{children}</main>
      <footer>{/* Footer */}</footer>
    </div>
  )
}
