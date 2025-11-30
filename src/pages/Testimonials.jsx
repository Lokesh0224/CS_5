import { Box, Text, VStack, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { testimonialService } from '@/services/testimonialService'
import { useThemeColors } from '@/hooks/useThemeColors'
import TestimonialCard from '@/components/common/TestimonialCard'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const { bgSecondary, textPrimary, textSecondary } = useThemeColors()

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialService.getAll()
        setTestimonials(response.data)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <Box py={16} px={4} bg={bgSecondary} transition="all 0.3s">
      <VStack maxW="1200px" mx="auto" gap={10}>
        <VStack textAlign="center" gap={4}>
          <Text fontSize="4xl" fontWeight="bold" color={textPrimary}>What Our Students Say</Text>
          <Text color={textSecondary} maxW="600px">
            Hear from our successful students who have transformed their careers with EduQuest
          </Text>
        </VStack>

        {loading ? (
          <Text color={textPrimary}>Loading testimonials...</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} w="100%">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  )
}

export default Testimonials
