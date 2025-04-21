import { useQuery } from "@tanstack/react-query"

export function useProducts(category = "all", sortBy = "newest") {
  return useQuery({
    queryKey: ["products", category, sortBy],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (category !== "all") {
        params.append("category", category)
      }
      if (sortBy) {
        params.append("sortBy", sortBy)
      }

      const response = await fetch(`/api/products?${params.toString()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch products")
      }
      return response.json()
    },
  })
}
