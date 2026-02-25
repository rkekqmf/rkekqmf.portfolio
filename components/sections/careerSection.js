import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { careerData } from "../../data/careerData";

const projectKey = (ci, pj) => `${ci}-${pj}`;

const ANIM_DURATION_MS = 400;

const CareerSection = () => {
  const [openedProjects, setOpenedProjects] = useState(new Set());
  const [contentHeights, setContentHeights] = useState({});
  const [borderVisibleKeys, setBorderVisibleKeys] = useState(new Set());
  const detailRefs = useRef({});
  const closeTimeoutsRef = useRef({});

  const toggleProject = (careerIdx, projectIdx) => {
    const key = projectKey(careerIdx, projectIdx);
    setOpenedProjects((prev) => {
      const next = new Set(prev);
      const wasOpen = next.has(key);
      if (wasOpen) {
        next.delete(key);
        if (closeTimeoutsRef.current[key]) clearTimeout(closeTimeoutsRef.current[key]);
        closeTimeoutsRef.current[key] = setTimeout(() => {
          setBorderVisibleKeys((b) => {
            const n = new Set(b);
            n.delete(key);
            return n;
          });
          delete closeTimeoutsRef.current[key];
        }, ANIM_DURATION_MS);
      } else {
        next.add(key);
        if (closeTimeoutsRef.current[key]) clearTimeout(closeTimeoutsRef.current[key]);
        setBorderVisibleKeys((b) => new Set(b).add(key));
      }
      return next;
    });
  };

  useEffect(() => {
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setContentHeights((prev) => {
          let updated = false;
          const next = { ...prev };
          openedProjects.forEach((key) => {
            const el = detailRefs.current[key];
            if (el && next[key] === undefined) {
              next[key] = el.scrollHeight + 8;
              updated = true;
            }
          });
          return updated ? next : prev;
        });
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [openedProjects]);

  return (
    <Container>
      <Title>경력</Title>
      <SubTitle>다양한 분야의 업무를 경험했습니다.</SubTitle>
      <List>
        {careerData.map((career, careerIdx) => (
          <Entry key={`${career.company}-${career.period}`}>
            <EntryInner>
              <Timeline>
                <TimelinePeriod>{career.period}</TimelinePeriod>
                <TimelineDuration>{career.duration}</TimelineDuration>
              </Timeline>
              <Content>
                <Company>{career.company}</Company>
                <Role>
                  {career.contractType} · {career.role}
                </Role>
                {career.tech?.length > 0 && (
                  <TechRow>
                    {career.tech.map((t) => (
                      <SkillButton key={t.name} type="button" title={t.name} aria-label={t.name} $isCss={t.name === "CSS"}>
                        <SkillIcon src={t.icon} alt="" loading="lazy" />
                        <SkillLabel>{t.name}</SkillLabel>
                      </SkillButton>
                    ))}
                  </TechRow>
                )}
                <ProjectList>
                  {career.projects.map((project, projectIdx) => {
                    const key = projectKey(careerIdx, projectIdx);
                    const isOpen = openedProjects.has(key);
                    return (
                      <ProjectBlock key={project.title}>
                        <ProjectRow
                          role="button"
                          tabIndex={0}
                          onClick={() => toggleProject(careerIdx, projectIdx)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              toggleProject(careerIdx, projectIdx);
                            }
                          }}
                          aria-expanded={isOpen}
                          aria-controls={`project-detail-${key}`}
                          aria-label={isOpen ? `${project.title} 접기` : `${project.title} 펼치기`}
                        >
                          <Arrow open={isOpen} />
                          <ProjectTitleButton>{project.title}</ProjectTitleButton>
                        </ProjectRow>
                        <ProjectDetail
                          id={`project-detail-${key}`}
                          role="region"
                          open={isOpen}
                          $contentHeight={contentHeights[key]}
                        >
                          <ProjectDetailInner
                            ref={(el) => { if (el) detailRefs.current[key] = el; }}
                            open={isOpen}
                            $showBorder={borderVisibleKeys.has(key)}
                          >
                            <ProjectDetailContent $showBorder={borderVisibleKeys.has(key)}>
                              {project.overview?.length > 0 && (
                                <Block>
                                  <BlockLabel>프로젝트 개요</BlockLabel>
                                  <ul>
                                    {project.overview.map((line, i) => (
                                      <li key={i}>{line}</li>
                                    ))}
                                  </ul>
                                </Block>
                              )}
                              {project.tasks?.length > 0 && (
                                <Block>
                                  <BlockLabel>담당 업무</BlockLabel>
                                  <ul>
                                    {project.tasks.map((line, i) => (
                                      <li key={i}>{line}</li>
                                    ))}
                                  </ul>
                                </Block>
                              )}
                              {project.tech?.length > 0 && (
                                <Block>
                                  <BlockLabel>사용 기술</BlockLabel>
                                  <TechList>
                                    {project.tech.map((t) => (
                                      <TechTag key={t}>{t}</TechTag>
                                    ))}
                                  </TechList>
                                </Block>
                              )}
                            </ProjectDetailContent>
                          </ProjectDetailInner>
                        </ProjectDetail>
                      </ProjectBlock>
                    );
                  })}
                </ProjectList>
              </Content>
            </EntryInner>
          </Entry>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  width: min(980px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.5rem;
  padding: 3rem 0 4rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  text-align: center;
  color: #3586ff;
  letter-spacing: -0.02em;
  margin: 0;
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.75;
  margin: 0 0 3.5rem 0;
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const Entry = styled.div`
  padding: 3.5rem 0 5rem;
  border-bottom: 1px solid rgba(102, 102, 102, 0.35);

  &:last-child {
    border-bottom: none;
    padding-bottom: 2rem;
  }
`;

const EntryInner = styled.div`
  display: flex;
  gap: 5rem;
  align-items: flex-start;
  text-align: left;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1.25rem;
  }
`;

const Timeline = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  min-width: 11rem;
`;

const TimelinePeriod = styled.span`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.fontColor};
`;

const TimelineDuration = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.7;
  align-self: flex-end;
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Company = styled.span`
  font-size: 1.75rem;
  color: ${({ theme }) => theme.fontColor};
  letter-spacing: -0.01em;
`;

const Role = styled.span`
  font-size: 1.35rem;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.8;
  line-height: 1.5;
  word-break: keep-all;
`;

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
  margin-top: 0.5rem;
`;

const SkillLabel = styled.span`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(0.4rem);
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  font-size: 1.1rem;
  white-space: nowrap;
  background: rgba(24, 24, 24, 0.95);
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;
  z-index: 1;
`;

const SkillButton = styled.button`
  position: relative;
  appearance: none;
  border: 1px solid rgba(102, 102, 102, 0.35);
  border-radius: 50%;
  padding: 0.6rem;
  background: transparent;
  cursor: default;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover ${SkillLabel} {
    opacity: 1;
    visibility: visible;
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

const SkillIcon = styled.img`
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  display: block;
`;

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.75rem;
`;

const ProjectBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  contain: layout;
`;

const ProjectRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid #3586ff;
    outline-offset: 2px;
    border-radius: 6px;
  }
`;

const Arrow = styled.span`
  flex-shrink: 0;
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-right: 2px solid #3586ff;
  border-bottom: 2px solid #3586ff;
  transform: rotate(${({ open }) => (open ? "45deg" : "-45deg")});
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ProjectTitleButton = styled.span`
  font-size: 1.4rem;
  color: #3586ff;
`;

const ProjectDetail = styled.div`
  max-height: ${({ open, $contentHeight }) =>
    open ? `${$contentHeight ?? 0}px` : "0"};
  overflow: hidden;
  overflow-x: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  contain: layout;
  will-change: max-height;
`;

const ProjectDetailInner = styled.div`
  padding: ${({ $showBorder }) => ($showBorder ? "2rem 0 2.75rem 0" : "0")};
  margin-left: 0;
`;

const ProjectDetailContent = styled.div`
  border-left: ${({ $showBorder }) =>
    $showBorder ? "3px solid rgba(53, 134, 255, 0.4)" : "none"};
  padding-left: ${({ $showBorder }) => ($showBorder ? "2.5rem" : "0")};
  margin-left: ${({ $showBorder }) => ($showBorder ? "0.1rem" : "0")};
  min-width: 0;
`;

const Block = styled.div`
  margin-bottom: 2rem;

  ul {
    margin: 0.4rem 0 0 1.4rem;
    padding: 0;
    font-size: 1.35rem;
    line-height: 1.65;
    word-break: keep-all;
    overflow-wrap: break-word;
    color: ${({ theme }) => theme.fontColor};
    opacity: 0.9;
  }

  li {
    margin-bottom: 0.3rem;
  }
`;

const BlockLabel = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.fontColor};
  margin: 0 0 0.2rem 0;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.35rem;
`;

const TechTag = styled.span`
  font-size: 1.2rem;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  background: rgba(102, 102, 102, 0.4);
  color: ${({ theme }) => theme.fontColor};
`;

export default CareerSection;
