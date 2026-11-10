import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
`

// Layout de la tienda pública
function MainLayout() {
  return (
    <Page>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Page>
  )
}

export default MainLayout
