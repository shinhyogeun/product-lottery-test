"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  endDate: string
  compact?: boolean
}

export default function CountdownTimer({ endDate, compact = false }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
    isExpired: boolean
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate).getTime() - new Date().getTime()

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      }
    }

    // 초기 계산
    setTimeLeft(calculateTimeLeft())

    // 1초마다 업데이트
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  if (timeLeft.isExpired) {
    return (
      <div className="flex items-center text-destructive text-xs font-medium">
        <Clock className="h-3 w-3 mr-1" />
        마감됨
      </div>
    )
  }

  if (compact) {
    // 간결한 버전 (카드용) - 초 단위 추가
    return (
      <div className="flex items-center text-xs">
        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
        {timeLeft.days > 0 && <span className="font-medium">{timeLeft.days}일 </span>}
        <span className="font-medium">
          {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    )
  }

  // 상세 버전
  return (
    <div className="flex items-center gap-1 text-sm">
      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
      <div className="grid grid-flow-col gap-1 text-center auto-cols-max">
        <div className="flex flex-col">
          <span className="font-mono font-medium">{timeLeft.days}</span>
          <span className="text-xs text-muted-foreground">일</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono font-medium">{String(timeLeft.hours).padStart(2, "0")}</span>
          <span className="text-xs text-muted-foreground">시</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono font-medium">{String(timeLeft.minutes).padStart(2, "0")}</span>
          <span className="text-xs text-muted-foreground">분</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono font-medium">{String(timeLeft.seconds).padStart(2, "0")}</span>
          <span className="text-xs text-muted-foreground">초</span>
        </div>
      </div>
    </div>
  )
}
