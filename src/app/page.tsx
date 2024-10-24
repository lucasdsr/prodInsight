import RootLayout from './layout'
import '@testing-library/jest-dom'

import { Home } from './home/page'

export default function App() {
  return (
    <RootLayout>
      <Home />
    </RootLayout>
  )
}
