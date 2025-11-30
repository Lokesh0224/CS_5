import { Box, Flex, Text, HStack, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={10} px={4}>
      <Flex maxW="1200px" mx="auto" direction={{ base: 'column', md: 'row' }} gap={8} justify="space-between">
        <VStack align="start" gap={3}>
          <Text fontSize="xl" fontWeight="bold">
            EduQuest
          </Text>
          <Text color="gray.400" maxW="300px">
            Explore, Learn, and Thrive with our comprehensive online courses designed for your success.
          </Text>
          <HStack gap={4} pt={2}>
            <FaFacebook cursor="pointer" />
            <FaTwitter cursor="pointer" />
            <FaLinkedin cursor="pointer" />
            <FaInstagram cursor="pointer" />
          </HStack>
        </VStack>

        <VStack align="start" gap={2}>
          <Text fontWeight="bold" mb={2}>Quick Links</Text>
          <Link to="/about"><Text color="gray.400" _hover={{ color: 'white' }}>About Us</Text></Link>
          <Link to="/courses"><Text color="gray.400" _hover={{ color: 'white' }}>Courses</Text></Link>
          <Link to="/pricing"><Text color="gray.400" _hover={{ color: 'white' }}>Pricing</Text></Link>
          <Link to="/contact"><Text color="gray.400" _hover={{ color: 'white' }}>Contact</Text></Link>
        </VStack>

        <VStack align="start" gap={2}>
          <Text fontWeight="bold" mb={2}>Resources</Text>
          <Link to="/blog"><Text color="gray.400" _hover={{ color: 'white' }}>Blog</Text></Link>
          <Link to="/testimonials"><Text color="gray.400" _hover={{ color: 'white' }}>Testimonials</Text></Link>
          <Link to="/team"><Text color="gray.400" _hover={{ color: 'white' }}>Our Team</Text></Link>
        </VStack>

        <VStack align="start" gap={2}>
          <Text fontWeight="bold" mb={2}>Contact Info</Text>
          <HStack color="gray.400">
            <FiMail />
            <Text>info@eduquest.com</Text>
          </HStack>
          <HStack color="gray.400">
            <FiPhone />
            <Text>+91 9344 567 890</Text>
          </HStack>
          <HStack color="gray.400">
            <FiMapPin />
            <Text>123 Learning St, Education City</Text>
          </HStack>
        </VStack>
      </Flex>

      <Box borderTop="1px" borderColor="gray.700" mt={8} pt={6}>
        <Text textAlign="center" color="gray.500">
          © 2024 EduQuest. All rights reserved.
        </Text>
      </Box>
    </Box>
  )
}

export default Footer
