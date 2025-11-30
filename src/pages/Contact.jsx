import { Box, Text, VStack, Input, Textarea, Button, SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'
import { contactService } from '@/services/contactService'
import { Toaster, toaster } from '@/components/ui/toaster'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

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
    <Box py={16} px={4}>
      <Toaster />
      <VStack maxW="1200px" mx="auto" gap={10}>
        <VStack textAlign="center" gap={4}>
          <Text fontSize="4xl" fontWeight="bold" color="gray.800">Contact Us</Text>
          <Text color="gray.600" maxW="600px">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} w="100%">
          <VStack align="start" gap={6}>
            <Text fontSize="2xl" fontWeight="bold">Get in Touch</Text>
            <VStack align="start" gap={4}>
              <Box display="flex" alignItems="center" gap={3}>
                <Box p={3} bg="teal.100" borderRadius="full">
                  <FiMail color="#319795" />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontWeight="medium">Email</Text>
                  <Text color="gray.600">info@eduquest.com</Text>
                </VStack>
              </Box>
              <Box display="flex" alignItems="center" gap={3}>
                <Box p={3} bg="teal.100" borderRadius="full">
                  <FiPhone color="#319795" />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontWeight="medium">Phone</Text>
                  <Text color="gray.600">+1 234 567 890</Text>
                </VStack>
              </Box>
              <Box display="flex" alignItems="center" gap={3}>
                <Box p={3} bg="teal.100" borderRadius="full">
                  <FiMapPin color="#319795" />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontWeight="medium">Address</Text>
                  <Text color="gray.600">123 Learning St, Education City, EC 12345</Text>
                </VStack>
              </Box>
            </VStack>
          </VStack>

          <Box as="form" onSubmit={handleSubmit} bg="white" p={8} borderRadius="lg" shadow="md">
            <VStack gap={4}>
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                px={4}
                py={3}
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
              />
              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                px={4}
                py={3}
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
              />
              <Button type="submit" colorPalette="teal" w="full" loading={loading} px={4} py={2}>
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
