import { Box, Text, VStack, Input, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Toaster, toaster } from '@/components/ui/toaster'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

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
    <Box py={16} px={4} minH="60vh">
      <Toaster />
      <Box maxW="400px" mx="auto" bg="white" p={8} borderRadius="lg" shadow="md">
        <VStack gap={6}>
          <VStack textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">Welcome Back</Text>
            <Text color="gray.600">Login to access your account</Text>
          </VStack>

          <Box as="form" onSubmit={handleSubmit} w="100%">
            <VStack gap={4}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" colorPalette="teal" w="full" loading={loading} px={4} py={2}>
                Login
              </Button>
            </VStack>
          </Box>

          <Box bg="gray.100" p={4} borderRadius="md" w="100%">
            <Text fontSize="sm" color="gray.600" textAlign="center">
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
