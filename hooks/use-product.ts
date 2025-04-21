import { useQuery } from "@tanstack/react-query"
import type { Product } from "@/types/product"

export function useProduct(id: string | null) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null

      const response = await fetch(`/api/products/${id}`)
      if (!response.ok) {
        throw new Error("Failed to fetch product")
      }
      return response.json() as Promise<Product>
    },
    enabled: !!id, // id가 있을 때만 쿼리 실행
  })
}
