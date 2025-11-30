import { Box, Flex, HStack, Button, IconButton, Image, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useState } from 'react'
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Courses', path: '/courses' },
  { name: 'Team', path: '/team' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const bgColor = theme === 'teal' ? 'teal.600' : 'black'
  const textColor = 'white'
  const hoverColor = theme === 'teal' ? 'orange.300' : 'gray.300'
  const buttonPalette = theme === 'teal' ? 'orange' : 'gray'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Box bg={bgColor} px={4} py={3} position="sticky" top={0} zIndex={100} transition="all 0.3s">
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        <Link to="/">
          <HStack>
            <Text fontSize="xl" fontWeight="bold" color={textColor}>
              EduQuest
            </Text>
          </HStack>
        </Link>

        <HStack display={{ base: 'none', lg: 'flex' }} gap={4}>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Text color={textColor} fontSize="sm" _hover={{ color: hoverColor }} fontWeight="medium" transition="all 0.2s">
                {link.name}
              </Text>
            </Link>
          ))}
        </HStack>

        <HStack display={{ base: 'none', lg: 'flex' }} gap={3}>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/dashboard">
                  <Button size="sm" colorPalette={buttonPalette} px={4} py={2}>
                    Dashboard
                  </Button>
                </Link>
              )}
              <Text color={textColor} fontSize="sm" fontWeight="medium">
                Hi, {user.name}
              </Text>
              <Button size="sm" colorPalette={buttonPalette} px={4} py={2} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm" colorPalette={buttonPalette} px={4} py={2}>
                Login
              </Button>
            </Link>
          )}
        </HStack>

        <HStack gap={2} display={{ base: 'flex', lg: 'flex' }}>
          <IconButton
            aria-label="Toggle theme"
            onClick={toggleTheme}
            variant="ghost"
            color={textColor}
            _hover={{ bg: 'rgba(255,255,255,0.1)' }}
          >
            {theme === 'teal' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </IconButton>

          <IconButton
            display={{ base: 'flex', lg: 'none' }}
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            color={textColor}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </IconButton>
        </HStack>
      </Flex>

      {isOpen && (
        <Box display={{ base: 'block', lg: 'none' }} pb={4} pt={2}>
          <Flex direction="column" gap={2}>
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}>
                <Text color={textColor} py={2}>
                  {link.name}
                </Text>
              </Link>
            ))}
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button size="sm" colorPalette={buttonPalette} w="full" px={4} py={2}>
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button size="sm" colorPalette={buttonPalette} onClick={handleLogout} w="full" px={4} py={2}>
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button size="sm" colorPalette={buttonPalette} w="full" px={4} py={2}>
                  Login
                </Button>
              </Link>
            )}
          </Flex>
        </Box>
      )}
    </Box>
  )
}

export default Navbar
