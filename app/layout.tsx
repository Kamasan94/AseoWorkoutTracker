import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { ToasterProvider } from '@/providers/toast-providers';
import { ModalProvider } from '@/providers/modal-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}
        <ToasterProvider/>
        <ModalProvider/>
      </body>
    </html>
  )
}
