import { Box, Image, Text, Badge, Button, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useThemeColors } from '../../hooks/useThemeColors'

const BlogCard = ({ blog }) => {
  const { bgCard, textPrimary, textSecondary, buttonPalette, borderColor } = useThemeColors()

  return (
    <Box bg={bgCard} borderRadius="lg" overflow="hidden" shadow="md" _hover={{ shadow: 'lg' }} transition="all 0.2s" borderColor={borderColor} border="1px solid" display="flex" flexDirection="column" h="100%">
      <Image src={blog.image} alt={blog.title} h="180px" w="100%" objectFit="cover" />
      <VStack p={6} gap={3} flex={1} align="stretch">
        <Badge colorPalette={buttonPalette} mb={2} w="fit-content">{blog.category}</Badge>
        <Text fontWeight="bold" fontSize="lg" mb={2} noOfLines={2} color={textPrimary}>
          {blog.title}
        </Text>
        <Text color={textSecondary} fontSize="sm" mb={2} noOfLines={3} flex={1}>
          {blog.content}
        </Text>
        <Text color={textSecondary} fontSize="xs" mb={2}>
          By {blog.author} • {new Date(blog.date).toLocaleDateString()}
        </Text>
        <Link to={`/blog/${blog.id}`} style={{ width: '100%', marginTop: 'auto' }}>
          <Button size="sm" colorPalette={buttonPalette} variant="outline" w="full" px={4} py={2}>
            Read More
          </Button>
        </Link>
      </VStack>
    </Box>
  )
}

export default BlogCard
