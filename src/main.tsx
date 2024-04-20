import { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import Layout from '@/layout'
import './main.scss'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={null}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Suspense>
  </StrictMode>,
);
