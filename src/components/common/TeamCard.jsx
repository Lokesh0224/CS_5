import { Box, Image, Text, VStack } from '@chakra-ui/react'
import { useThemeColors } from '../../hooks/useThemeColors'

const TeamCard = ({ member }) => {
  const { bgCard, textPrimary, textSecondary, accentColorDark, borderColor } = useThemeColors()

  return (
    <Box bg={bgCard} borderRadius="lg" overflow="hidden" shadow="md" textAlign="center" p={6} _hover={{ shadow: 'lg' }} transition="all 0.2s" borderColor={borderColor} border="1px solid">
      <Image
        src={member.image}
        alt={member.name}
        w="120px"
        h="120px"
        borderRadius="full"
        mx="auto"
        objectFit="cover"
        mb={4}
      />
      <VStack gap={1}>
        <Text fontWeight="bold" fontSize="lg" color={textPrimary}>
          {member.name}
        </Text>
        <Text color={accentColorDark} fontSize="sm" fontWeight="medium">
          {member.role}
        </Text>
        <Text color={textSecondary} fontSize="sm" mt={2}>
          {member.bio}
        </Text>
      </VStack>
    </Box>
  )
}

export default TeamCard
