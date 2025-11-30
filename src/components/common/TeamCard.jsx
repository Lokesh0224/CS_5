import { Box, Image, Text, VStack } from '@chakra-ui/react'

const TeamCard = ({ member }) => {
  return (
    <Box bg="white" borderRadius="lg" overflow="hidden" shadow="md" textAlign="center" p={6} _hover={{ shadow: 'lg' }} transition="all 0.2s">
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
        <Text fontWeight="bold" fontSize="lg" color="gray.800">
          {member.name}
        </Text>
        <Text color="blue.600" fontSize="sm" fontWeight="medium">
          {member.role}
        </Text>
        <Text color="gray.600" fontSize="sm" mt={2}>
          {member.bio}
        </Text>
      </VStack>
    </Box>
  )
}

export default TeamCard
