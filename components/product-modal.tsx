"use client"

import Image from "next/image"
import type { Product } from "@/types/product"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Calendar, Tag, Users, CalendarDays } from "lucide-react"

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  isLoading?: boolean
}

export default function ProductModal({ product, isOpen, onClose, isLoading = false }: ProductModalProps) {
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
    if (ratio >= 10) return "text-red-600"
    if (ratio >= 7) return "text-orange-600"
    if (ratio >= 5) return "text-amber-600"
    if (ratio >= 3) return "text-yellow-600"
    return "text-primary"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2">상품 정보를 불러오는 중...</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">{product.title}</DialogTitle>
            </DialogHeader>

            <div className="relative h-64 w-full my-4 bg-secondary/30 rounded-md">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain rounded-md"
                sizes="(max-width: 768px) 100vw, 600px"
                priority
                unoptimized={product.image.includes("encrypted-tbn0.gstatic.com")}
              />
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">상품 설명</h4>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className={`${getCategoryColor(product.category)}`}>
                  {product.category === "laptop" ? "노트북" : product.category === "monitor" ? "모니터" : "의자"}
                </Badge>
                {product.features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Users className="h-4 w-4 mr-1" /> 경쟁률
                </h4>
                <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">신청자</div>
                    <div className="font-bold">{product.applicants.toLocaleString()}명</div>
                  </div>
                  <div className={`font-bold text-xl px-3 ${getCompetitionColor()}`}>{calculateCompetitionRatio()}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">모집인원</div>
                    <div className="font-bold">{product.maxApplicants.toLocaleString()}명</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-start">
                  <CalendarDays className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground block">등록일</span>
                    <p className="font-medium">{new Date(product.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground block">추첨 마감일</span>
                    <p className="font-medium">{new Date(product.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Tag className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground block">정가</span>
                    <p className="font-medium line-through">{product.originalPrice.toLocaleString()}원</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Tag className="h-4 w-4 mr-1 mt-0.5 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground block">추첨가</span>
                    <p className="font-medium text-primary text-lg">{product.lotteryPrice.toLocaleString()}원</p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button className="w-full" onClick={() => alert("신청되었습니다!")}>
                추첨 신청하기
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
