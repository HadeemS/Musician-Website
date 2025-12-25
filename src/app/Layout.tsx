import { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import EnterGate from '../components/EnterGate'
import RolloutBanner from '../components/RolloutBanner'
import { StructuredData } from './seo'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <StructuredData />
      <EnterGate />
      <div className="min-h-screen flex flex-col">
        <RolloutBanner />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  )
}

