import { careerData } from "./careerData";

function parsePeriodStart(periodStr) {
  const match = periodStr.match(/^(\d{4})\.(\d{2})/);
  if (!match) return "1900-01";
  return `${match[1]}-${match[2]}`;
}

const careerCards = careerData.flatMap((career) =>
  career.projects.map((p) => ({
    id: `career-${career.company}-${p.title}`.replace(/\s/g, "-"),
    title: p.title,
    category: career.company,
    period: career.period,
    sortKey: parsePeriodStart(career.period),
    duration: p.duration ?? null,
    description: p.overview?.[0] ?? "",
    overview: p.overview || [],
    tasks: p.tasks || [],
    tech: p.tech || [],
    githubUrl: p.githubUrl ?? null,
    demoUrl: p.demoUrl ?? null,
    live: p.live ?? false,
  }))
);

// 아톰릭스랩(2022.11) 취업 전 학습 프로젝트 — 최신순: Intern → 2nd → 1st
const studyCards = [
  {
    id: "study-3",
    title: "아르테위드",
    category: "사이드 프로젝트",
    period: "22.05.23 ~ 22.06.16",
    sortKey: "2022-06-16",
    description: "아르테위드 기업 랜딩 페이지 구현",
    overview: ["reference 페이지 구현 프로젝트"],
    tasks: [
      "Practice-House Page 구현",
      "Infinite Scroll, Carousel, Multiple Filters 기능 구현",
      "공용, 재사용 컴포넌트에 초점을 맞춰 작업",
      "axios와 async await 비동기 처리 작업",
    ],
    tech: ["HTML", "Styled Components", "JavaScript", "React", "Axios"],
    duration: "약 3주",
    githubUrl: null,
    demoUrl: null,
    live: false,
  },
  {
    id: "study-2",
    title: "마이리얼트립 클론",
    category: "사이드 프로젝트",
    period: "22.05.09 ~ 22.05.20",
    sortKey: "2022-05-20",
    description: "마이 리얼 트립을 벤치마킹하여 진행한 팀 프로젝트",
    overview: ["온라인 숙박 예약 사이트 구현 프로젝트"],
    tasks: [
      "ProductList Page, Map 구현",
      "Kakao Map API, Infinite Scroll 기능 구현",
      "Animation 효과로 동적인 페이지 구현",
    ],
    tech: ["HTML", "Styled Components", "JavaScript", "React"],
    duration: "2주",
    githubUrl: null,
    demoUrl: null,
    live: false,
  },
  {
    id: "study-1",
    title: "라인프렌즈 클론",
    category: "사이드 프로젝트",
    period: "22.04.25 ~ 22.05.06",
    sortKey: "2022-05-06",
    description: "라인프렌즈 네이버 스토어를 벤치마킹하여 진행한 팀 프로젝트",
    overview: ["온라인 커머스 스토어 구현 프로젝트"],
    tasks: [
      "Main Page, Footer 구현",
      "Search, Pagination, Carousel, Modal, Outlet 기능 구현",
      "Animation 효과로 동적인 페이지 구현",
    ],
    tech: ["HTML", "Sass", "JavaScript", "React"],
    duration: "2주",
    githubUrl: null,
    demoUrl: null,
    live: false,
  },
];

const devCard = [
  {
    id: "dev-1",
    title: "로스트아크 정보 사이트",
    category: "사이드 프로젝트",
    period: "2026.01 ~",
    sortKey: "2099-12",
    duration: "진행 중",
    description: "현재 개발 중인 프로젝트",
    overview: [],
    tasks: [],
    tech: ["TypeScript", "React", "Node.js", "Cloudflare"],
    status: "개발중",
    githubUrl: null,
    demoUrl: null,
    live: false,
  },
];

const all = [...careerCards, ...studyCards, ...devCard];
all.sort((a, b) => {
  if (a.status === "개발중") return -1;
  if (b.status === "개발중") return 1;
  return b.sortKey.localeCompare(a.sortKey);
});

export const projectData = all;
