import { Box, Text, VStack, HStack, Image, Badge, Button, SimpleGrid } from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { courseService } from '@/services/courseService'
import { useAuth } from '@/context/AuthContext'
import { useThemeColors } from '@/hooks/useThemeColors'
import { FiClock, FiUsers, FiStar, FiUser } from 'react-icons/fi'
import CourseForm from '@/components/forms/CourseForm'

const CourseDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const { isAdmin } = useAuth()
  const { bgSecondary, textPrimary, textSecondary, buttonPalette, accentColorDark } = useThemeColors()

  useEffect(() => {
    fetchCourse()
  }, [id])

  const fetchCourse = async () => {
    try {
      const response = await courseService.getById(id)
      setCourse(response.data)
    } catch (error) {
      console.error('Error fetching course:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await courseService.delete(id)
        navigate('/courses')
      } catch (error) {
        console.error('Error deleting course:', error)
      }
    }
  }

  const handleUpdate = () => {
    setIsEditing(false)
    fetchCourse()
  }

  if (loading) {
    return (
      <Box py={16} px={4} textAlign="center" bg={bgSecondary} transition="all 0.3s">
        <Text color={textPrimary}>Loading course...</Text>
      </Box>
    )
  }

  if (!course) {
    return (
      <Box py={16} px={4} textAlign="center" bg={bgSecondary} transition="all 0.3s">
        <Text color={textPrimary}>Course not found</Text>
      </Box>
    )
  }

  return (
    <Box py={16} px={4} bg={bgSecondary} transition="all 0.3s">
      <Box maxW="1200px" mx="auto">
        {isEditing ? (
          <VStack gap={4}>
            <Text fontSize="2xl" fontWeight="bold" color={textPrimary}>Edit Course</Text>
            <CourseForm course={course} onSuccess={handleUpdate} />
            <Button onClick={() => setIsEditing(false)} px={4} py={2}>Cancel</Button>
          </VStack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
            <Image
              src={course.image}
              alt={course.title}
              borderRadius="lg"
              w="100%"
              h="400px"
              objectFit="cover"
            />
            <VStack align="start" gap={4}>
              <Badge colorPalette={buttonPalette} fontSize="sm">{course.category}</Badge>
              <Text fontSize="3xl" fontWeight="bold" color={textPrimary}>{course.title}</Text>
              <HStack gap={6} color={textSecondary}>
                <HStack>
                  <FiUser />
                  <Text>{course.instructor}</Text>
                </HStack>
                <HStack>
                  <FiClock />
                  <Text>{course.duration}</Text>
                </HStack>
              </HStack>
              <HStack gap={6} color={textSecondary}>
                <HStack>
                  <FiUsers />
                  <Text>{course.enrolled} enrolled</Text>
                </HStack>
                <HStack>
                  <FiStar color={accentColorDark} />
                  <Text>{course.rating} rating</Text>
                </HStack>
              </HStack>
              <Text color={textSecondary} lineHeight="tall" fontSize="lg">
                {course.description}
              </Text>
              <Text fontSize="3xl" fontWeight="bold" color={accentColorDark}>
                ${course.price}
              </Text>
              <HStack gap={4}>
                <Button colorPalette={buttonPalette} size="lg" px={6} py={3}>
                  Enroll Now
                </Button>
                {isAdmin && (
                  <>
                    <Button colorPalette="yellow" onClick={() => setIsEditing(true)} px={4} py={2}>
                      Edit
                    </Button>
                    <Button colorPalette="red" onClick={handleDelete} px={4} py={2}>
                      Delete
                    </Button>
                  </>
                )}
              </HStack>
            </VStack>
          </SimpleGrid>
        )}
      </Box>
    </Box>
  )
}

export default CourseDetail
