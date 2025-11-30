import { Box, Image, Text, Badge, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  return (
    <Box bg="white" borderRadius="lg" overflow="hidden" shadow="md" _hover={{ shadow: 'lg' }} transition="all 0.2s">
      <Image src={blog.image} alt={blog.title} h="180px" w="100%" objectFit="cover" />
      <Box p={4}>
        <Badge colorPalette="purple" mb={2}>{blog.category}</Badge>
        <Text fontWeight="bold" fontSize="lg" mb={2} noOfLines={2} color="gray.800">
          {blog.title}
        </Text>
        <Text color="gray.600" fontSize="sm" mb={3} noOfLines={3}>
          {blog.content}
        </Text>
        <Text color="gray.500" fontSize="xs" mb={3}>
          By {blog.author} • {new Date(blog.date).toLocaleDateString()}
        </Text>
        <Link to={`/blog/${blog.id}`}>
          <Button size="sm" colorPalette="purple" variant="outline" w="full" px={4} py={2}>
            Read More
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default BlogCard
