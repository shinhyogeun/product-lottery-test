import type { Product } from "@/types/product"

// 이미지 URL 상수
const IMAGE_URLS = {
  LAPTOP_1: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111932_sp809mbp16touch-space-2019.jpeg",
  LAPTOP_2: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTQwo5T3vf3EGSHgfP1FRf1jCbqj9Gc0N-ilqFsZNdoxEbpYbsBAk5CfvI_WMn3k5hilmz4-mehRmFvQoY5U8wNktPfJKmTorKY5zIewVrK4zx0wQ8u_sELHDBgXtiWH7NcMFtEoA&usqp=CAc",  
  MONITOR_1:
    "https://cdn-optimized.imweb.me/upload/S202107164fd70c6c59bf5/6b8c787e0551f.jpg?w=500",
  MONITOR_2:"https://d21x3meyyr2jva.cloudfront.net/image_temp/1667286843000_%EB%AA%A8%EB%8B%88%ED%84%B0_%EA%B2%8C%EC%9D%B4%EB%B0%8D%EC%9A%A9.png",
  MONITOR_3:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSmHjtckWaX6zX6q-VCBunWgPdTrsnwNTLfs32bBjrkHn89OhKIitWEi2VQSd99wg-QLsKnIu8TEU1Jmn83WAo3OKv6wqMs2xYx_u72qLJPWvuy_SAkikYztgiph7pNTm3hY8AMLg&usqp=CAc",
  CHAIR_1: "https://d2t72fqhhsdts3.cloudfront.net/lomad/img/Product/351/sharelink/H1KEvzTmL8IsPzS6wC2hQVe7rOiWKTQgV5MWA186.png",
  CHAIR_2: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxEt3qYtNr39M00zQmltArZebinjSUOxECM5nlcy_43PVGRSoslg&s&ec=72940544",
}

// 현재 날짜로부터 n일 후의 날짜를 생성하는 함수
const getFutureDate = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

// 현재 날짜로부터 n일 전의 날짜를 생성하는 함수
const getPastDate = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

export const products: Product[] = [
  {
    id: "1",
    title: "삼성 갤럭시북 Pro 360",
    description: "13.3인치 AMOLED 터치스크린, 인텔 i7 프로세서, 16GB RAM, 512GB SSD의 프리미엄 노트북입니다.",
    image: IMAGE_URLS.LAPTOP_1,
    category: "laptop",
    features: ["AMOLED", "터치스크린", "인텔 i7", "16GB RAM"],
    applicants: 1450,
    maxApplicants: 200,
    originalPrice: 1890000,
    lotteryPrice: 990000,
    createdAt: getPastDate(15),
    endDate: getFutureDate(3),
  },
  {
    id: "2",
    title: "LG 울트라기어 게이밍 모니터 27인치",
    description: "144Hz 주사율, 1ms 응답속도, HDR 지원 게이밍 모니터로 몰입감 있는 게임 경험을 제공합니다.",
    image: IMAGE_URLS.MONITOR_2,
    category: "monitor",
    features: ["144Hz", "1ms 응답속도", "HDR", "G-Sync"],
    applicants: 780,
    maxApplicants: 100,
    originalPrice: 450000,
    lotteryPrice: 299000,
    createdAt: getPastDate(12),
    endDate: getFutureDate(5),
  },
  {
    id: "3",
    title: "허먼밀러 에어론 의자",
    description: "인체공학적 디자인으로 장시간 앉아있어도 편안함을 제공하는 프리미엄 사무용 의자입니다.",
    image: IMAGE_URLS.CHAIR_1,
    category: "chair",
    features: ["인체공학", "메쉬 소재", "12년 보증", "포스처핏"],
    applicants: 2100,
    maxApplicants: 250,
    originalPrice: 1950000,
    lotteryPrice: 1200000,
    createdAt: getPastDate(20),
    endDate: getFutureDate(1),
  },
  {
    id: "4",
    title: "애플 맥북 프로 14인치",
    description: "M2 Pro 칩, 16GB RAM, 512GB SSD를 탑재한 강력한 성능의 프로페셔널용 노트북입니다.",
    image: IMAGE_URLS.LAPTOP_1,
    category: "laptop",
    features: ["M2 Pro", "16GB RAM", "512GB SSD", "Liquid Retina XDR"],
    applicants: 1890,
    maxApplicants: 200,
    originalPrice: 2690000,
    lotteryPrice: 1890000,
    createdAt: getPastDate(10),
    endDate: getFutureDate(7),
  },
  {
    id: "5",
    title: "델 S2722DGM 게이밍 모니터",
    description: "27인치 QHD 해상도, 165Hz 주사율, 1ms 응답속도의 커브드 게이밍 모니터입니다.",
    image: IMAGE_URLS.MONITOR_3,
    category: "monitor",
    features: ["QHD", "165Hz", "커브드", "1ms 응답속도"],
    applicants: 560,
    maxApplicants: 150,
    originalPrice: 520000,
    lotteryPrice: 350000,
    createdAt: getPastDate(8),
    endDate: getFutureDate(10),
  },
  {
    id: "6",
    title: "시디즈 T50 사무용 의자",
    description: "인체공학적 설계와 통기성 좋은 메쉬 소재로 제작된 고급 사무용 의자입니다.",
    image: IMAGE_URLS.CHAIR_2,
    category: "chair",
    features: ["인체공학", "메쉬 소재", "5년 보증", "헤드레스트"],
    applicants: 890,
    maxApplicants: 120,
    originalPrice: 450000,
    lotteryPrice: 290000,
    createdAt: getPastDate(13),
    endDate: getFutureDate(2),
  },
  {
    id: "7",
    title: "레노버 씽크패드 X1 카본",
    description: "14인치 FHD 디스플레이, 인텔 i7, 16GB RAM, 1TB SSD의 비즈니스용 노트북입니다.",
    image: IMAGE_URLS.LAPTOP_2,
    category: "laptop",
    features: ["인텔 i7", "16GB RAM", "1TB SSD", "카본 소재"],
    applicants: 1005,
    maxApplicants: 100,
    originalPrice: 2100000,
    lotteryPrice: 1450000,
    createdAt: getPastDate(11),
    endDate: getFutureDate(4),
  },
  {
    id: "8",
    title: "에이수스 ProArt 디스플레이",
    description: "27인치 4K UHD, 100% sRGB, 100% Rec.709, Calman 인증의 전문가용 모니터입니다.",
    image: IMAGE_URLS.MONITOR_1,
    category: "monitor",
    features: ["4K UHD", "100% sRGB", "Calman 인증", "HDR10"],
    applicants: 420,
    maxApplicants: 80,
    originalPrice: 890000,
    lotteryPrice: 650000,
    createdAt: getPastDate(9),
    endDate: getFutureDate(6),
  },
  {
    id: "9",
    title: "스틸케이스 제스처 의자",
    description: "360도 팔걸이 조절과 리클라이닝 기능이 뛰어난 프리미엄 사무용 의자입니다.",
    image: IMAGE_URLS.CHAIR_1,
    category: "chair",
    features: ["360도 팔걸이", "리클라이닝", "12년 보증", "3D 니트"],
    applicants: 1680,
    maxApplicants: 150,
    originalPrice: 1700000,
    lotteryPrice: 1100000,
    createdAt: getPastDate(14),
    endDate: getFutureDate(0), // 오늘 마감
  },
]
