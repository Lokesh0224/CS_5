import { Box, Text, VStack, Input, Textarea, Button, SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'
import { contactService } from '@/services/contactService'
import { Toaster, toaster } from '@/components/ui/toaster'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { useThemeColors } from '@/hooks/useThemeColors'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const { bgSecondary, bgCard, textPrimary, textSecondary, accentColor, buttonPalette, borderColor } = useThemeColors()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await contactService.create({
        ...formData,
        date: new Date().toISOString().split('T')[0],
      })
      toaster.create({
        title: 'Message sent!',
        description: 'We will get back to you soon.',
        type: 'success',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box py={16} px={4} bg={bgSecondary} transition="all 0.3s">
      <Toaster />
      <VStack maxW="1200px" mx="auto" gap={10}>
        <VStack textAlign="center" gap={4}>
          <Text fontSize="4xl" fontWeight="bold" color={textPrimary}>Contact Us</Text>
          <Text color={textSecondary} maxW="600px">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} w="100%">
          <VStack align="start" gap={6}>
            <Text fontSize="2xl" fontWeight="bold" color={textPrimary}>Get in Touch</Text>
            <VStack align="start" gap={4}>
              <Box display="flex" alignItems="center" gap={3}>
                <Box p={3} bg={accentColor} borderRadius="full">
                  <FiMail color="#000" />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontWeight="medium" color={textPrimary}>Email</Text>
                  <Text color={textSecondary}>info@eduquest.com</Text>
                </VStack>
              </Box>
              <Box display="flex" alignItems="center" gap={3}>
                <Box p={3} bg={accentColor} borderRadius="full">
                  <FiPhone color="#000" />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontWeight="medium" color={textPrimary}>Phone</Text>
                  <Text color={textSecondary}>+1 234 567 890</Text>
                </VStack>
              </Box>
              <Box display="flex" alignItems="center" gap={3}>
                <Box p={3} bg={accentColor} borderRadius="full">
                  <FiMapPin color="#000" />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontWeight="medium" color={textPrimary}>Address</Text>
                  <Text color={textSecondary}>123 Learning St, Education City, EC 12345</Text>
                </VStack>
              </Box>
            </VStack>
          </VStack>

          <Box as="form" onSubmit={handleSubmit} bg={bgCard} p={8} borderRadius="lg" shadow="md" borderColor={borderColor} border="1px solid">
            <VStack gap={4}>
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                px={4}
                py={3}
                bg={bgCard}
                color={textPrimary}
                _placeholder={{ color: textSecondary }}
                borderColor={borderColor}
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                px={4}
                py={3}
                bg={bgCard}
                color={textPrimary}
                _placeholder={{ color: textSecondary }}
                borderColor={borderColor}
              />
              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                px={4}
                py={3}
                bg={bgCard}
                color={textPrimary}
                _placeholder={{ color: textSecondary }}
                borderColor={borderColor}
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                px={4}
                py={3}
                bg={bgCard}
                color={textPrimary}
                _placeholder={{ color: textSecondary }}
                borderColor={borderColor}
              />
              <Button type="submit" colorPalette={buttonPalette} w="full" loading={loading} px={4} py={2}>
                Send Message
              </Button>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  )
}

export default Contact
