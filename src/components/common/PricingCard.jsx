import { Box, Text, VStack, HStack, Button, Badge } from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'
import { useThemeColors } from '../../hooks/useThemeColors'

const PricingCard = ({ plan }) => {
  const { bgPrimary, textOnPrimary, bgCard, textPrimary, textSecondary, accentColor, buttonPalette } = useThemeColors()
  const isPopular = plan.popular

  return (
    <Box
      bg={isPopular ? bgPrimary : bgCard}
      color={isPopular ? textOnPrimary : textPrimary}
      borderRadius="lg"
      shadow="lg"
      p={6}
      position="relative"
      transform={isPopular ? 'scale(1.05)' : 'none'}
      _hover={{ shadow: 'xl' }}
      transition="all 0.2s"
    >
      {isPopular && (
        <Badge colorPalette={buttonPalette} position="absolute" top={-3} right={4} px={3} py={1}>
          Most Popular
        </Badge>
      )}
      <VStack gap={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          {plan.name}
        </Text>
        <HStack justify="center" align="baseline">
          <Text fontSize="4xl" fontWeight="bold">
            Rs.{plan.price}
          </Text>
          <Text fontSize="sm" color={isPopular ? `${bgPrimary === 'black' ? 'gray.400' : 'teal.100'}` : textSecondary}>
            /{plan.period}
          </Text>
        </HStack>
        <VStack align="start" gap={3} py={4}>
          {plan.features.map((feature, index) => (
            <HStack key={index}>
              <FiCheck color={accentColor} />
              <Text fontSize="sm" color={isPopular ? textOnPrimary : textPrimary}>{feature}</Text>
            </HStack>
          ))}
        </VStack>
        <Button
          colorPalette={isPopular ? buttonPalette : buttonPalette}
          variant={isPopular ? 'solid' : 'outline'}
          w="full"
          px={4}
          py={2}
        >
          Get Started
        </Button>
      </VStack>
    </Box>
  )
}

export default PricingCard
