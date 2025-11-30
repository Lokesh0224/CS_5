import { Box, Flex, Text, Button, SimpleGrid, VStack, HStack, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { courseService } from '@/services/courseService'
import { testimonialService } from '@/services/testimonialService'
import CourseCard from '@/components/common/CourseCard'
import { useThemeColors } from '@/hooks/useThemeColors'
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
  const { bgPrimary, textOnPrimary, bgSecondary, textPrimary, buttonPalette, accentColorDark, borderColor } = useThemeColors()

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
      <Box bg={bgPrimary} color={textOnPrimary} py={20} px={4} transition="all 0.3s">
        <Flex maxW="1200px" mx="auto" align="center" direction={{ base: 'column', md: 'row' }} gap={10}>
          <VStack align={{ base: 'center', md: 'start' }} flex={1} gap={6} textAlign={{ base: 'center', md: 'left' }}>
            <Text fontSize={{ base: '3xl', md: '5xl' }} fontWeight="bold" lineHeight="shorter">
              Explore, Learn, and Thrive
            </Text>
            <Text fontSize="lg" color={`${bgPrimary === 'black' ? 'gray.300' : 'teal.100'}`} maxW="500px">
              Unlock your potential with our comprehensive online courses. Learn from industry experts and advance your career.
            </Text>
            <HStack gap={4}>
              <Link to="/courses">
                <Button size="lg" colorPalette={buttonPalette} px={6} py={3}>
                  Browse Courses
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" borderColor={textOnPrimary} color={textOnPrimary} bg="transparent" _hover={{ bg: 'rgba(255,255,255,0.1)' }} px={6} py={3}>
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

      <Box py={16} px={4} bg={bgSecondary} transition="all 0.3s">
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={8} maxW="1000px" mx="auto">
          {stats.map((stat, index) => (
            <VStack key={index} p={6} bg={`${bgPrimary === 'black' ? 'gray.700' : 'white'}`} borderRadius="lg" shadow="md" transition="all 0.3s">
              <stat.icon size={32} color={accentColorDark} />
              <Text fontSize="2xl" fontWeight="bold" color={buttonPalette === 'orange' ? 'teal.600' : 'gray.300'}>{stat.value}</Text>
              <Text color={textPrimary}>{stat.label}</Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>

      <Box py={16} px={4} bg={`${bgPrimary === 'black' ? 'gray.800' : 'white'}`} transition="all 0.3s">
        <VStack maxW="1200px" mx="auto" gap={10}>
          <VStack textAlign="center">
            <Text fontSize="3xl" fontWeight="bold" color={textPrimary}>Featured Courses</Text>
            <Text color={`${bgPrimary === 'black' ? 'gray.400' : 'gray.600'}`} maxW="600px">
              Start your learning journey with our most popular courses
            </Text>
          </VStack>
          {loading ? (
            <Text color={textPrimary}>Loading courses...</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6} w="100%">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </SimpleGrid>
          )}
          <Link to="/courses">
            <Button colorPalette={buttonPalette} size="lg" px={6} py={3}>
              View All Courses
            </Button>
          </Link>
        </VStack>
      </Box>

      <Box py={16} px={4} bg={bgPrimary} color={textOnPrimary} transition="all 0.3s">
        <VStack maxW="800px" mx="auto" textAlign="center" gap={6}>
          <Text fontSize="3xl" fontWeight="bold">Ready to Start Learning?</Text>
          <Text fontSize="lg" color={`${bgPrimary === 'black' ? 'gray.300' : 'teal.100'}`}>
            Join thousands of students already learning on EduQuest
          </Text>
          <Link to="/pricing">
            <Button size="lg" colorPalette={buttonPalette} px={6} py={3}>
              Get Started Today
            </Button>
          </Link>
        </VStack>
      </Box>
    </Box>
  )
}

export default Home
