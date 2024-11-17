import Products from "../components/Products"
import { useState, useEffect } from 'react'
import { Box, Center, Spinner, Text } from '@chakra-ui/react'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/products')
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const newProducts = await response.json()
      setProducts(newProducts)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">Error loading products: {error}</Text>
      </Center>
    )
  }

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <Box maxW="1200px" mx="auto" px={4}>
      <Products data={products} />
    </Box>
  )
}
