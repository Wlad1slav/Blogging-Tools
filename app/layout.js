import {Header} from "@/app/components/header/Header";

import metaData from "@/app/metaData";


export const metadata = {
  title: metaData.title,
  description: metaData.description,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}