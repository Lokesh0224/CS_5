import { Box, Image, Text, HStack, Badge, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiClock, FiUsers, FiStar } from 'react-icons/fi'
import { useThemeColors } from '../../hooks/useThemeColors'

const CourseCard = ({ course }) => {
  const { bgCard, textPrimary, textSecondary, accentColor, buttonPalette, borderColor, isDark } = useThemeColors()

  return (
    <Box bg={bgCard} borderRadius="lg" overflow="hidden" shadow="md" _hover={{ shadow: 'lg' }} transition="all 0.2s" borderColor={borderColor} border="1px solid">
      <Image src={course.image} alt={course.title} h="180px" w="100%" objectFit="cover" />
      <Box p={6}>
        <Badge colorPalette={buttonPalette} mb={2}>{course.category}</Badge>
        <Text fontWeight="bold" fontSize="lg" mb={2} noOfLines={2} color={textPrimary}>
          {course.title}
        </Text>
        <Text color={textSecondary} fontSize="sm" mb={3} noOfLines={2}>
          {course.description}
        </Text>
        <HStack gap={4} mb={3} color={textSecondary} fontSize="sm">
          <HStack>
            <FiClock />
            <Text>{course.duration}</Text>
          </HStack>
          <HStack>
            <FiUsers />
            <Text>{course.enrolled}</Text>
          </HStack>
          <HStack>
            <FiStar />
            <Text>{course.rating}</Text>
          </HStack>
        </HStack>
        <HStack justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="xl" color={accentColor}>
            Rs.{course.price}
          </Text>
          <Link to={`/courses/${course.id}`}>
            <Button size="sm" colorPalette={buttonPalette} px={4} py={2}>
              View Details
            </Button>
          </Link>
        </HStack>
      </Box>
    </Box>
  )
}

export default CourseCard
