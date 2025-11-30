import { Box, Table, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { contactService } from '@/services/contactService'
import { Toaster, toaster } from '@/components/ui/toaster'

const ContactsTable = ({ contacts, onRefresh }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await contactService.delete(id)
        toaster.create({ title: 'Message deleted successfully!', type: 'success' })
        onRefresh()
      } catch (error) {
        toaster.create({ title: 'Error deleting message', type: 'error' })
      }
    }
  }

  return (
    <VStack align="stretch" gap={4}>
      <Toaster />
      <Text fontSize="xl" fontWeight="bold">Contact Messages</Text>

      <Box bg="white" borderRadius="lg" shadow="sm" overflow="hidden">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader px={4} py={3}>Name</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3}>Email</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3}>Subject</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3}>Message</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3}>Date</Table.ColumnHeader>
              <Table.ColumnHeader px={4} py={3}>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {contacts.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={6} textAlign="center" px={4} py={3}>No messages yet</Table.Cell>
              </Table.Row>
            ) : (
              contacts.map((contact) => (
                <Table.Row key={contact.id}>
                  <Table.Cell px={4} py={3}>{contact.name}</Table.Cell>
                  <Table.Cell px={4} py={3}>{contact.email}</Table.Cell>
                  <Table.Cell px={4} py={3}>{contact.subject}</Table.Cell>
                  <Table.Cell px={4} py={3} maxW="200px" truncate>{contact.message}</Table.Cell>
                  <Table.Cell px={4} py={3}>{new Date(contact.date).toLocaleDateString()}</Table.Cell>
                  <Table.Cell px={4} py={3}>
                    <Button size="sm" colorPalette="red" onClick={() => handleDelete(contact.id)} px={3} py={1}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Box>
    </VStack>
  )
}

export default ContactsTable
