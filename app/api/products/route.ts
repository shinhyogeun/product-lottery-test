import { products } from "@/data/products"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // URL에서 쿼리 파라미터 추출
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const sortBy = searchParams.get("sortBy")

  // 카테고리 필터링
  let filteredProducts =
    category && category !== "all" ? products.filter((product) => product.category === category) : products

  // 정렬
  if (sortBy) {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortBy === "competition-high") {
        return b.applicants / b.maxApplicants - a.applicants / a.maxApplicants
      } else if (sortBy === "competition-low") {
        return a.applicants / a.maxApplicants - b.applicants / b.maxApplicants
      }
      return 0
    })
  }

  // 인위적인 지연 추가 (실제 API 호출 시뮬레이션)
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(filteredProducts)
}
