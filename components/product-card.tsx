"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/types/product"
import { Badge } from "@/components/ui/badge"
import { CalendarDays } from "lucide-react"
import CountdownTimer from "./countdown-timer"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  // 카테고리별 배지 색상 설정
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "laptop":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "monitor":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "chair":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      default:
        return ""
    }
  }

  // 경쟁률 계산 (지원자 수 : 추첨 수량 비율)
  const calculateCompetitionRatio = () => {
    const ratio = product.applicants / product.maxApplicants

    // 정수인 경우 (예: 2.0 -> 2:1)
    if (Number.isInteger(ratio)) {
      return `${ratio}:1`
    }

    // 소수점 한 자리까지 표시 (예: 2.5 -> 2.5:1)
    return `${ratio.toFixed(1)}:1`
  }

  // 경쟁률에 따른 색상 설정
  const getCompetitionColor = () => {
    const ratio = product.applicants / product.maxApplicants
    if (ratio >= 10) return "bg-red-100 text-red-800"
    if (ratio >= 7) return "bg-orange-100 text-orange-800"
    if (ratio >= 5) return "bg-amber-100 text-amber-800"
    if (ratio >= 3) return "bg-yellow-100 text-yellow-800"
    return "bg-primary/10 text-primary"
  }

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-lg border-2 border-transparent hover:border-primary/20"
      onClick={onClick}
    >
      <div className="relative h-48 w-full bg-secondary/30">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          unoptimized={product.image.includes("encrypted-tbn0.gstatic.com")}
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${getCategoryColor(product.category)}`}>
            {product.category === "laptop" ? "노트북" : product.category === "monitor" ? "모니터" : "의자"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

        <div className="mt-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">경쟁률</span>
            <div className="flex items-center gap-1">
              <span className={`font-medium text-sm px-2 py-0.5 rounded ${getCompetitionColor()}`}>
                {calculateCompetitionRatio()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <CalendarDays className="h-3 w-3" />
            <span>{new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
          <span className="text-primary font-bold">{product.lotteryPrice.toLocaleString()}원</span>
        </div>
        <div className="w-full border-t pt-2 flex justify-between items-center">
          <CountdownTimer endDate={product.endDate} compact />
          <span className="text-xs text-muted-foreground">마감</span>
        </div>
      </CardFooter>
    </Card>
  )
}
