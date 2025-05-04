import ContactSection from './components/contact'
import FooterSection from './components/footer'
import Header from './components/header'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-w-full">
      <Header />
      <main>{children}</main>
      <ContactSection />
      <footer>
        <FooterSection />
      </footer>
    </div>
  )
}
