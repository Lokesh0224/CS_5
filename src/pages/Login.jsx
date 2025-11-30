import { Box, Text, VStack, Input, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Toaster, toaster } from '@/components/ui/toaster'
import { useThemeColors } from '@/hooks/useThemeColors'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { bgSecondary, bgCard, textPrimary, textSecondary, buttonPalette, borderColor, accentColor } = useThemeColors()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await login(email, password)
      toaster.create({
        title: 'Login successful!',
        description: `Welcome back, ${user.name}!`,
        type: 'success',
      })
      if (user.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    } catch (error) {
      toaster.create({
        title: 'Login failed',
        description: 'Invalid email or password',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box py={16} px={4} minH="60vh" bg={bgSecondary} transition="all 0.3s">
      <Toaster />
      <Box maxW="400px" mx="auto" bg={bgCard} p={8} borderRadius="lg" shadow="md" borderColor={borderColor} border="1px solid">
        <VStack gap={6}>
          <VStack textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color={textPrimary}>Welcome Back</Text>
            <Text color={textSecondary}>Login to access your account</Text>
          </VStack>

          <Box as="form" onSubmit={handleSubmit} w="100%">
            <VStack gap={4}>
              <Input
                type="email"
                placeholder="  Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                bg={bgCard}
                color={textPrimary}
                _placeholder={{ color: textSecondary }}
                borderColor={borderColor}
              />
              <Input
                type="password"
                placeholder="  Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                bg={bgCard}
                color={textPrimary}
                _placeholder={{ color: textSecondary }}
                borderColor={borderColor}
              />
              <Button type="submit" colorPalette={buttonPalette} w="full" loading={loading} px={4} py={2}>
                Login
              </Button>
            </VStack>
          </Box>

          <Box bg={accentColor} p={4} borderRadius="md" w="100%">
            <Text fontSize="sm" color={textPrimary} textAlign="center">
              <strong>Demo Credentials:</strong><br />
              Admin: admin@eduquest.com / admin123<br />
              User: john@example.com / user123
            </Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}

export default Login
