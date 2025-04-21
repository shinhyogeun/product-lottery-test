"use client"

import { useState } from "react"
import ProductCard from "@/components/product-card"
import ProductModal from "@/components/product-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, Loader2, Filter, SortDesc } from "lucide-react"
import { useProducts } from "@/hooks/use-products"
import { useProduct } from "@/hooks/use-product"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProductGrid() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [category, setCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")

  // 상품 목록 쿼리
  const { data: products = [], isLoading, isError, error } = useProducts(category, sortBy)

  // 선택된 상품 상세 정보 쿼리
  const { data: selectedProduct, isLoading: isProductLoading } = useProduct(selectedProductId)

  if (isError) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertTitle>오류 발생</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "상품 정보를 불러오는 중 오류가 발생했습니다."}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="laptop">노트북</SelectItem>
            <SelectItem value="monitor">모니터</SelectItem>
            <SelectItem value="chair">의자</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <SortDesc className="h-4 w-4 mr-2" />
              정렬 <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
              <DropdownMenuRadioItem value="newest">최신순</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">오래된순</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="competition-high">경쟁률 높은순</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="competition-low">경쟁률 낮은순</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">상품 정보를 불러오는 중...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onClick={() => setSelectedProductId(product.id)} />
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProductId}
          onClose={() => setSelectedProductId(null)}
          isLoading={isProductLoading}
        />
      )}
    </div>
  )
}
