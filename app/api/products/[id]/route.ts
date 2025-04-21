import { products } from "@/data/products"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const product = products.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  // 인위적인 지연 추가 (실제 API 호출 시뮬레이션)
  await new Promise((resolve) => setTimeout(resolve, 300))

  return NextResponse.json(product)
}
