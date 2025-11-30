import { Box, Flex, Text, Button, SimpleGrid, VStack, HStack, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { courseService } from '@/services/courseService'
import { testimonialService } from '@/services/testimonialService'
import CourseCard from '@/components/common/CourseCard'
import { FiUsers, FiBookOpen, FiAward, FiGlobe } from 'react-icons/fi'

const stats = [
  { icon: FiUsers, value: '50,000+', label: 'Students' },
  { icon: FiBookOpen, value: '200+', label: 'Courses' },
  { icon: FiAward, value: '100+', label: 'Instructors' },
  { icon: FiGlobe, value: '50+', label: 'Countries' },
]

const Home = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await courseService.getAll()
        setCourses(coursesRes.data.slice(0, 3))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <Box>
      <Box bg="teal.600" color="white" py={20} px={4}>
        <Flex maxW="1200px" mx="auto" align="center" direction={{ base: 'column', md: 'row' }} gap={10}>
          <VStack align={{ base: 'center', md: 'start' }} flex={1} gap={6} textAlign={{ base: 'center', md: 'left' }}>
            <Text fontSize={{ base: '3xl', md: '5xl' }} fontWeight="bold" lineHeight="shorter">
              Explore, Learn, and Thrive
            </Text>
            <Text fontSize="lg" color="teal.100" maxW="500px">
              Unlock your potential with our comprehensive online courses. Learn from industry experts and advance your career.
            </Text>
            <HStack gap={4}>
              <Link to="/courses">
                <Button size="lg" colorPalette="orange" px={6} py={3}>
                  Browse Courses
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" borderColor="white" color="white" bg="transparent" _hover={{ bg: 'teal.700' }} px={6} py={3}>
                  Learn More
                </Button>
              </Link>
            </HStack>
          </VStack>
          <Box flex={1} display={{ base: 'none', md: 'block' }}>
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
              alt="Students learning"
              borderRadius="lg"
              shadow="xl"
            />
          </Box>
        </Flex>
      </Box>

      <Box py={16} px={4} bg="gray.50">
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={8} maxW="1000px" mx="auto">
          {stats.map((stat, index) => (
            <VStack key={index} p={6} bg="white" borderRadius="lg" shadow="md">
              <stat.icon size={32} color="#319795" />
              <Text fontSize="2xl" fontWeight="bold" color="teal.600">{stat.value}</Text>
              <Text color="gray.600">{stat.label}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>

      <Box py={16} px={4}>
        <VStack maxW="1200px" mx="auto" gap={10}>
          <VStack textAlign="center">
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">Featured Courses</Text>
            <Text color="gray.600" maxW="600px">
              Start your learning journey with our most popular courses
            </Text>
          </VStack>
          {loading ? (
            <Text>Loading courses...</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="100%">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </SimpleGrid>
          )}
          <Link to="/courses">
            <Button colorPalette="teal" size="lg" px={6} py={3}>
              View All Courses
            </Button>
          </Link>
        </VStack>
      </Box>

      <Box py={16} px={4} bg="teal.600" color="white">
        <VStack maxW="800px" mx="auto" textAlign="center" gap={6}>
          <Text fontSize="3xl" fontWeight="bold">Ready to Start Learning?</Text>
          <Text fontSize="lg" color="teal.100">
            Join thousands of students already learning on EduQuest
          </Text>
          <Link to="/pricing">
            <Button size="lg" colorPalette="orange" px={6} py={3}>
              Get Started Today
            </Button>
          </Link>
        </VStack>
      </Box>
    </Box>
  )
}

export default Home
