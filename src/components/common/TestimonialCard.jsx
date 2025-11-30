import { Box, Image, Text, HStack, VStack } from '@chakra-ui/react'
import { FiStar } from 'react-icons/fi'
import { useThemeColors } from '../../hooks/useThemeColors'

const TestimonialCard = ({ testimonial }) => {
  const { bgCard, textPrimary, textSecondary, accentColor, borderColor } = useThemeColors()

  return (
    <Box bg={bgCard} borderRadius="lg" shadow="md" p={6} _hover={{ shadow: 'lg' }} transition="all 0.2s" borderColor={borderColor} border="1px solid">
      <HStack mb={4}>
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            fill={i < testimonial.rating ? accentColor : 'none'}
            color={i < testimonial.rating ? accentColor : textSecondary}
          />
        ))}
      </HStack>
      <Text color={textSecondary} fontSize="md" mb={4} fontStyle="italic">
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
          <Text fontWeight="bold" color={textPrimary}>{testimonial.name}</Text>
          <Text color={textSecondary} fontSize="sm">{testimonial.role}</Text>
        </VStack>
      </HStack>
    </Box>
  )
}

export default TestimonialCard
