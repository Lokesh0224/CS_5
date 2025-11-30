import { Box, Text, VStack, SimpleGrid, HStack, Button, Tabs } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { courseService } from '@/services/courseService'
import { blogService } from '@/services/blogService'
import { contactService } from '@/services/contactService'
import { useThemeColors } from '@/hooks/useThemeColors'
import { FiBook, FiFileText, FiMail, FiUsers } from 'react-icons/fi'
import BarChart from '@/components/charts/BarChart'
import PieChart from '@/components/charts/PieChart'
import CoursesTable from '@/components/dashboard/CoursesTable'
import BlogsTable from '@/components/dashboard/BlogsTable'
import ContactsTable from '@/components/dashboard/ContactsTable'

const Dashboard = () => {
  const [courses, setCourses] = useState([])
  const [blogs, setBlogs] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const { bgSecondary, bgCard, textPrimary, textSecondary, buttonPalette, accentColor } = useThemeColors()

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      const [coursesRes, blogsRes, contactsRes] = await Promise.all([
        courseService.getAll(),
        blogService.getAll(),
        contactService.getAll(),
      ])
      setCourses(coursesRes.data)
      setBlogs(blogsRes.data)
      setContacts(contactsRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const enrollmentData = courses.map((course) => ({
    label: course.title.split(' ').slice(0, 2).join(' '),
    value: course.enrolled,
  }))

  const categoryData = courses.reduce((acc, course) => {
    const existing = acc.find((item) => item.label === course.category)
    if (existing) {
      existing.value += 1
    } else {
      acc.push({ label: course.category, value: 1 })
    }
    return acc
  }, [])

  const stats = [
    { icon: FiBook, label: 'Total Courses', value: courses.length, color: 'teal' },
    { icon: FiFileText, label: 'Blog Posts', value: blogs.length, color: 'purple' },
    { icon: FiMail, label: 'Messages', value: contacts.length, color: 'green' },
    { icon: FiUsers, label: 'Total Enrolled', value: courses.reduce((sum, c) => sum + c.enrolled, 0), color: 'orange' },
  ]

  if (loading) {
    return (
      <Box py={16} px={4} textAlign="center" bg={bgSecondary} transition="all 0.3s">
        <Text color={textPrimary}>Loading dashboard...</Text>
      </Box>
    )
  }

  return (
    <Box py={8} px={4} bg={bgSecondary} minH="100vh" transition="all 0.3s">
      <VStack maxW="1200px" mx="auto" gap={8} align="stretch">
        <Text fontSize="3xl" fontWeight="bold" color={textPrimary}>Admin Dashboard</Text>

        <HStack gap={4} flexWrap="wrap">
          <Button
            colorPalette={activeTab === 'overview' ? buttonPalette : 'gray'}
            variant={activeTab === 'overview' ? 'solid' : 'outline'}
            onClick={() => setActiveTab('overview')}
            px={4}
            py={2}
          >
            Overview
          </Button>
          <Button
            colorPalette={activeTab === 'courses' ? buttonPalette : 'gray'}
            variant={activeTab === 'courses' ? 'solid' : 'outline'}
            onClick={() => setActiveTab('courses')}
            px={4}
            py={2}
          >
            Manage Courses
          </Button>
          <Button
            colorPalette={activeTab === 'blogs' ? buttonPalette : 'gray'}
            variant={activeTab === 'blogs' ? 'solid' : 'outline'}
            onClick={() => setActiveTab('blogs')}
            px={4}
            py={2}
          >
            Manage Blogs
          </Button>
          <Button
            colorPalette={activeTab === 'contacts' ? buttonPalette : 'gray'}
            variant={activeTab === 'contacts' ? 'solid' : 'outline'}
            onClick={() => setActiveTab('contacts')}
            px={4}
            py={2}
          >
            Messages
          </Button>
        </HStack>

        {activeTab === 'overview' && (
          <>
            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
              {stats.map((stat, index) => (
                <Box key={index} bg={bgCard} p={6} borderRadius="lg" shadow="sm">
                  <HStack justify="space-between">
                    <VStack align="start" gap={1}>
                      <Text color={textSecondary} fontSize="sm">{stat.label}</Text>
                      <Text fontSize="2xl" fontWeight="bold" color={textPrimary}>{stat.value}</Text>
                    </VStack>
                    <Box p={3} bg={accentColor} borderRadius="full">
                      <stat.icon size={24} color={textPrimary} />
                    </Box>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              <Box bg={bgCard} p={6} borderRadius="lg" shadow="sm">
                <BarChart data={enrollmentData} title="Course Enrollments" />
              </Box>
              <Box bg={bgCard} p={6} borderRadius="lg" shadow="sm">
                <PieChart data={categoryData} title="Courses by Category" />
              </Box>
            </SimpleGrid>
          </>
        )}

        {activeTab === 'courses' && (
          <CoursesTable courses={courses} onRefresh={fetchAllData} />
        )}

        {activeTab === 'blogs' && (
          <BlogsTable blogs={blogs} onRefresh={fetchAllData} />
        )}

        {activeTab === 'contacts' && (
          <ContactsTable contacts={contacts} onRefresh={fetchAllData} />
        )}
      </VStack>
    </Box>
  )
}

export default Dashboard
