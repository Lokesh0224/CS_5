import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'

const MainLayout = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="white">
      <Navbar />
      <Box as="main" flex="1" bg="gray.50">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default MainLayout
