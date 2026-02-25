import styled from "styled-components";
import { techData } from "../../data/techData";

const techIconMap = {};
techData.forEach(({ items }) => items.forEach(({ name, icon }) => { techIconMap[name] = icon; }));
Object.assign(techIconMap, {
  HTML: "https://cdn.simpleicons.org/html5/E34F26",
  CSS: "https://cdn.jsdelivr.net/npm/simple-icons@9.21.0/icons/css3.svg",
  Sass: "https://cdn.simpleicons.org/sass/CC6699",
  Axios: "https://cdn.simpleicons.org/axios/5A29E4",
  SvelteKit: "https://cdn.simpleicons.org/svelte/FF3E00",
  Javascript: "https://cdn.simpleicons.org/javascript/F7DF1E",
});

const ProjectsItem = ({ project, onClick, shakingCardId }) => {
  const { title, category, period, duration, description, tech, status, live } = project;
  const isDev = status === "개발중";
  const isSideOnly = category === "사이드 프로젝트" && !isDev;
  const isShaking = isDev && shakingCardId === project.id;

  return (
    <Card
      $isDev={isDev}
      $isSideOnly={isSideOnly}
      $shaking={isShaking}
      role={isDev ? null : "button"}
      tabIndex={isDev ? null : 0}
      onClick={() => onClick?.(project)}
      onKeyDown={
        isDev
          ? undefined
          : (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.(project);
              }
            }
      }
    >
      {live && (
        <LiveBadge title="실제 서비스 중">
          <LiveIcon aria-hidden="true" />
          <span>실제 서비스</span>
        </LiveBadge>
      )}
      {isDev && (
        <ServicePlannedBadge title="실제 서비스 예정">
          <ServicePlannedDot aria-hidden="true" />
          <span>실제 서비스예정</span>
        </ServicePlannedBadge>
      )}
      <Category>{category}</Category>
      <Title>{title}</Title>
      <Period>{duration ?? period}</Period>
      {description && <Description $isDev={isDev}>{description}</Description>}
      {tech?.length > 0 && (
        <TechList>
          {tech.flatMap((t) => (t.includes(" / ") ? t.split(" / ").map((p) => p.trim()) : [t])).map((name) => {
            const iconUrl = techIconMap[name];
            return iconUrl ? (
              <TechIcon key={name} title={name} $isCss={name === "CSS"}>
                <img src={iconUrl} alt="" loading="lazy" />
              </TechIcon>
            ) : (
              <TechTag key={name}>{name}</TechTag>
            );
          })}
        </TechList>
      )}
    </Card>
  );
};

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.75rem 1.5rem;
  border-radius: 10px;
  border: 1px solid rgba(102, 102, 102, 0.25);
  background: ${({ theme }) => theme.bgColor};
  cursor: ${({ $isDev }) => ($isDev ? "default" : "pointer")};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  ${({ $isDev, $isSideOnly }) =>
    $isDev
      ? `
  &:hover {
    border-color: rgba(200, 70, 70, 0.85);
  }
  &:hover ${Title} {
    color: rgba(200, 70, 70, 0.95);
  }
  `
      : $isSideOnly
        ? `
  &:hover {
    border-color: rgba(102, 102, 102, 0.25);
  }
  &:focus-visible {
    outline: 2px solid rgba(102, 102, 102, 0.4);
    outline-offset: 2px;
  }
  `
        : `
  &:hover {
    border-color: rgba(53, 134, 255, 0.35);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  }
  &:hover ${Title} {
    color: #3586ff;
  }
  &:focus-visible {
    outline: 2px solid #3586ff;
    outline-offset: 2px;
  }
  `}

  ${({ $shaking }) =>
    $shaking &&
    `
  animation: shake 0.45s ease-in-out;
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    15% { transform: translateX(-6px); }
    30% { transform: translateX(6px); }
    45% { transform: translateX(-4px); }
    60% { transform: translateX(4px); }
    75% { transform: translateX(-2px); }
    90% { transform: translateX(2px); }
  }
  `}
`;

const LiveBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.1rem;
  line-height: 1;
  color: #3586ff;
  opacity: 0.95;
`;

const LiveIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #3586ff;
  flex-shrink: 0;
`;

const ServicePlannedBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1.1rem;
  line-height: 1;
  color: #c84646;
  opacity: 0.95;
`;

const ServicePlannedDot = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #c84646;
  flex-shrink: 0;
`;

const Category = styled.span`
  display: inline-block;
  font-size: 1.15rem;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.75;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.fontColor};
  margin: 0 0 0.35rem 0;
  line-height: 1.35;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
`;

const Period = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.7;
  margin-bottom: 0.85rem;
`;

const Description = styled.p`
  font-size: 1.3rem;
  line-height: 1.55;
  color: ${({ theme, $isDev }) => ($isDev ? "rgba(200, 70, 70, 0.95)" : theme.fontColor)};
  opacity: 0.9;
  margin: 0 0 1rem 0;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const TechIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 6px;
  background: rgba(102, 102, 102, 0.25);

  img {
    width: 1.25rem;
    height: 1.25rem;
    object-fit: contain;
    display: block;
  }

  /* CSS 아이콘 색상 (jsdelivr SVG 검정 → #1572B6) */
  ${({ $isCss }) =>
    $isCss &&
    `
    img {
      filter: brightness(0) saturate(100%) invert(32%) sepia(98%) saturate(500%) hue-rotate(195deg);
    }
  `}
`;

const TechTag = styled.span`
  font-size: 1.1rem;
  padding: 0.25rem 0.55rem;
  border-radius: 6px;
  background: rgba(102, 102, 102, 0.25);
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.9;
`;

export default ProjectsItem;
