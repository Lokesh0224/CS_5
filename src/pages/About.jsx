import { Box, Text, VStack, SimpleGrid, Image, HStack } from '@chakra-ui/react'
import { FiTarget, FiHeart, FiTrendingUp } from 'react-icons/fi'

const values = [
  {
    icon: FiTarget,
    title: 'Our Mission',
    description: 'To democratize education and make quality learning accessible to everyone, everywhere.',
  },
  {
    icon: FiHeart,
    title: 'Our Values',
    description: 'We believe in integrity, innovation, and the transformative power of education.',
  },
  {
    icon: FiTrendingUp,
    title: 'Our Vision',
    description: 'To become the leading platform for skill development and lifelong learning globally.',
  },
]

const About = () => {
  return (
    <Box>
      <Box bg="teal.600" color="white" py={16} px={4}>
        <VStack maxW="800px" mx="auto" textAlign="center" gap={4}>
          <Text fontSize="4xl" fontWeight="bold">About EduQuest</Text>
          <Text fontSize="lg" color="teal.100">
            Empowering learners worldwide since 2020
          </Text>
        </VStack>
      </Box>

      <Box py={16} px={4}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={12} maxW="1200px" mx="auto" alignItems="center">
          <Image
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600"
            alt="Our team"
            borderRadius="lg"
            shadow="lg"
          />
          <VStack align="start" gap={4}>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">Who We Are</Text>
            <Text color="gray.600" lineHeight="tall">
              EduQuest is a premier online learning platform dedicated to providing high-quality education to learners worldwide. Founded in 2020, we have grown to serve over 50,000 students across 50+ countries.
            </Text>
            <Text color="gray.600" lineHeight="tall">
              Our team consists of experienced educators, industry professionals, and technology experts who are passionate about making education accessible and engaging. We offer courses in web development, data science, design, marketing, and more.
            </Text>
            <Text color="gray.600" lineHeight="tall">
              Whether you're looking to start a new career, upgrade your skills, or explore a new hobby, EduQuest has the resources and community to support your learning journey.
            </Text>
          </VStack>
        </SimpleGrid>
      </Box>

      <Box py={16} px={4} bg="gray.50">
        <VStack maxW="1200px" mx="auto" gap={10}>
          <Text fontSize="3xl" fontWeight="bold" textAlign="center" color="gray.800">Our Core Values</Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} w="100%">
            {values.map((value, index) => (
              <VStack key={index} bg="white" p={8} borderRadius="lg" shadow="md" gap={4}>
                <Box p={4} bg="teal.100" borderRadius="full">
                  <value.icon size={32} color="#319795" />
                </Box>
                <Text fontSize="xl" fontWeight="bold" color="gray.800">{value.title}</Text>
                <Text color="gray.600" textAlign="center">{value.description}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>

      <Box py={16} px={4}>
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={8} maxW="1000px" mx="auto" textAlign="center">
          <VStack>
            <Text fontSize="4xl" fontWeight="bold" color="teal.600">50K+</Text>
            <Text color="gray.600">Active Students</Text>
          </VStack>
          <VStack>
            <Text fontSize="4xl" fontWeight="bold" color="teal.600">200+</Text>
            <Text color="gray.600">Courses Available</Text>
          </VStack>
          <VStack>
            <Text fontSize="4xl" fontWeight="bold" color="teal.600">100+</Text>
            <Text color="gray.600">Expert Instructors</Text>
          </VStack>
          <VStack>
            <Text fontSize="4xl" fontWeight="bold" color="teal.600">4.8</Text>
            <Text color="gray.600">Average Rating</Text>
          </VStack>
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default About
