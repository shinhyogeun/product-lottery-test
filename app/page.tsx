import ProductGrid from "@/components/product-grid"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">상품 추첨</h1>
      <p className="text-center text-muted-foreground mb-8">특별한 가격으로 제품을 만나보세요</p>
      <ProductGrid />
    </main>
  )
}
