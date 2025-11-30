import { Box, Image, Text, HStack, VStack } from '@chakra-ui/react'
import { FiStar } from 'react-icons/fi'

const TestimonialCard = ({ testimonial }) => {
  return (
    <Box bg="white" borderRadius="lg" shadow="md" p={6} _hover={{ shadow: 'lg' }} transition="all 0.2s">
      <HStack mb={4}>
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            fill={i < testimonial.rating ? '#F6AD55' : 'none'}
            color={i < testimonial.rating ? '#F6AD55' : '#CBD5E0'}
          />
        ))}
      </HStack>
      <Text color="gray.600" fontSize="md" mb={4} fontStyle="italic">
        "{testimonial.content}"
      </Text>
      <HStack>
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          w="50px"
          h="50px"
          borderRadius="full"
          objectFit="cover"
        />
        <VStack align="start" gap={0}>
          <Text fontWeight="bold" color="gray.800">{testimonial.name}</Text>
          <Text color="gray.500" fontSize="sm">{testimonial.role}</Text>
        </VStack>
      </HStack>
    </Box>
  )
}

export default TestimonialCard
