import { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import ProjectsItem from "../projects/projectsItem";
import { projectData } from "../../data/projectData";

// 프로젝트 설명에서 기술스택·참여인원 등 하단 메타와 중복되는 줄 제외
function isMetaOverviewLine(line) {
  if (!line || typeof line !== "string") return true;
  const t = line.trim();
  if (/\d명/.test(t) && /Front|Back|FE|BE/i.test(t)) return true;
  if (/^[A-Za-z\s\/\-\.]+$/.test(t) && (t.includes(" / ") || t.length < 50)) return true;
  return false;
}

const INITIAL_COUNT = 4;

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [shakingCardId, setShakingCardId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [expandHeight, setExpandHeight] = useState(0);
  const expandContentRef = useRef(null);
  const initialProjects = projectData.slice(0, INITIAL_COUNT);
  const restProjects = projectData.slice(INITIAL_COUNT);
  const hasMore = projectData.length > INITIAL_COUNT;

  useEffect(() => {
    if (!showAll || !hasMore) return;
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = expandContentRef.current;
        if (el) setExpandHeight(el.scrollHeight + 8);
      });
    });
    return () => cancelAnimationFrame(raf1);
  }, [showAll, hasMore]);

  const handleCardClick = useCallback((project) => {
    if (project.status === "개발중") {
      setShakingCardId(project.id);
      setTimeout(() => setShakingCardId(null), 450);
      return;
    }
    setSelectedProject(project);
  }, []);
  const closeModal = useCallback(() => setSelectedProject(null), []);

  useEffect(() => {
    if (!selectedProject) return;
    const onEscape = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [selectedProject, closeModal]);

  return (
    <Container>
      <Title>프로젝트</Title>
      <SubTitle>직접 참여한 프로젝트 목록입니다.</SubTitle>
      <Grid>
        {initialProjects.map((project) => (
          <ProjectsItem
            key={project.id}
            project={project}
            onClick={handleCardClick}
            shakingCardId={shakingCardId}
          />
        ))}
        {hasMore && (
          <ExpandableCell>
            <ExpandableInner $open={showAll} $contentHeight={expandHeight}>
              <ExpandableContent ref={expandContentRef}>
                <InnerGrid>
                  {restProjects.map((project) => (
                    <ProjectsItem
                      key={project.id}
                      project={project}
                      onClick={handleCardClick}
                      shakingCardId={shakingCardId}
                    />
                  ))}
                </InnerGrid>
              </ExpandableContent>
            </ExpandableInner>
            <MoreButton type="button" onClick={() => setShowAll((v) => !v)}>
              {showAll ? "접기" : "더보기"}
            </MoreButton>
          </ExpandableCell>
        )}
      </Grid>

      {selectedProject && (
        <ModalBackdrop onClick={closeModal} aria-hidden="true">
          <ModalBox onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <ModalClose type="button" onClick={closeModal} aria-label="닫기">
              ×
            </ModalClose>
            <ModalTitle id="modal-title">{selectedProject.title}</ModalTitle>

            <Section>
              <SectionLabel>프로젝트 설명</SectionLabel>
              {(() => {
                const desc = selectedProject.description || selectedProject.overview?.[0] || "";
                const rest = (selectedProject.overview || []).slice(1).filter((line) => !isMetaOverviewLine(line));
                return (
                  <>
                    {desc && <SectionText>{desc}</SectionText>}
                    {rest.map((line, i) => (
                      <SectionText key={i}>{line}</SectionText>
                    ))}
                    {!desc && rest.length === 0 && <SectionText>-</SectionText>}
                  </>
                );
              })()}
            </Section>

            {selectedProject.tech?.length > 0 && (
              <Section>
                <SectionLabel>기술 스택</SectionLabel>
                <TechWrap>
                  {selectedProject.tech.map((t) => (
                    <TechTag key={t}>{t}</TechTag>
                  ))}
                </TechWrap>
              </Section>
            )}

            <MetaRow>
              <MetaItem>
                <MetaLabel>기간</MetaLabel>
                <MetaValue>{selectedProject.duration ?? selectedProject.period}</MetaValue>
              </MetaItem>
              <MetaItem>
                <MetaLabel>관련 링크</MetaLabel>
                <MetaLinks>
                  {selectedProject.demoUrl ? (
                    <MetaLink href={selectedProject.demoUrl} target="_blank" rel="noreferrer">
                      사이트
                    </MetaLink>
                  ) : null}
                  {selectedProject.githubUrl ? (
                    <MetaLink href={selectedProject.githubUrl} target="_blank" rel="noreferrer">
                      Github
                    </MetaLink>
                  ) : null}
                  {!selectedProject.demoUrl && !selectedProject.githubUrl ? "-" : null}
                </MetaLinks>
              </MetaItem>
            </MetaRow>

            {(() => {
              const overviewLines = (selectedProject.overview || []).filter((line) => !isMetaOverviewLine(line));
              const hasOverview = overviewLines.length > 0;
              const hasTasks = selectedProject.tasks?.length > 0;
              return (hasOverview || hasTasks) && (
                <DetailSection>
                  <DetailLabel>상세 내용</DetailLabel>
                  <DetailList>
                    {hasOverview && (
                      <DetailBlock>
                        <DetailBlockTitle>1. 프로젝트 개요</DetailBlockTitle>
                        <ul>
                          {overviewLines.map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      </DetailBlock>
                    )}
                    {hasTasks && (
                      <DetailBlock>
                        <DetailBlockTitle>
                          {hasOverview ? "2. 담당 업무" : "1. 담당 업무"}
                        </DetailBlockTitle>
                      <ul>
                        {selectedProject.tasks.map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                      </ul>
                    </DetailBlock>
                    )}
                  </DetailList>
                </DetailSection>
              );
            })()}
          </ModalBox>
        </ModalBackdrop>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(980px, 100%);
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;

  @media (min-width: 641px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const ExpandableCell = styled.div`
  grid-column: 1 / -1;
  min-height: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExpandableInner = styled.div`
  align-self: stretch;
  max-height: ${({ $open, $contentHeight }) =>
    $open ? `${$contentHeight ?? 0}px` : "0"};
  overflow: hidden;
  overflow-x: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  contain: layout;
  will-change: max-height;
`;

const ExpandableContent = styled.div``;

const InnerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;

  @media (min-width: 641px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MoreButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  font-size: 1.4rem;
  color: #3586ff;
  background: transparent;
  border: 1px solid #3586ff;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #3586ff;
    color: #fff;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
  overflow-y: auto;
`;

const ModalBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: calc(100vh - 3rem);
  overflow-y: auto;
  background: ${({ theme }) => theme.bgColor};
  border-radius: 12px;
  border: 1px solid rgba(102, 102, 102, 0.3);
  padding: 2.5rem 2rem;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  font-size: 1.8rem;
  line-height: 1;
  color: ${({ theme }) => theme.fontColor};
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: #3586ff;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.85rem;
  color: ${({ theme }) => theme.fontColor};
  margin: 0 2rem 2.5rem 0;
  line-height: 1.35;
  letter-spacing: -0.02em;
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionLabel = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.75;
  margin: 0 0 1rem 0;
`;

const SectionText = styled.p`
  font-size: 1.35rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.95;
  margin: 0 0 0.75rem 0;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const TechWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  font-size: 1.15rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  background: rgba(102, 102, 102, 0.3);
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.95;
`;

const MetaRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid rgba(102, 102, 102, 0.25);
  border-bottom: 1px solid rgba(102, 102, 102, 0.25);
`;

const MetaItem = styled.div``;

const MetaLabel = styled.p`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.fontColor};
  opacity: 0.75;
  margin: 0 0 0.3rem 0;
`;

const MetaValue = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.fontColor};
`;

const MetaLinks = styled.span`
  font-size: 1.3rem;
`;

const MetaLink = styled.a`
  color: #3586ff;
  text-decoration: underline;
  margin-right: 0.75rem;

  &:hover {
    opacity: 0.9;
  }
`;

const DetailSection = styled.div`
  margin-top: 2.5rem;
`;

const DetailLabel = styled.h4`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.fontColor};
  margin: 0 0 2rem 0;
  padding-top: 0.75rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(53, 134, 255, 0.4);
`;

const DetailList = styled.div``;

const DetailBlock = styled.div`
  margin-bottom: 1.75rem;

  ul {
    margin: 0.75rem 0 0 1.4rem;
    padding: 0;
    font-size: 1.3rem;
    line-height: 1.65;
    color: ${({ theme }) => theme.fontColor};
    opacity: 0.9;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const DetailBlockTitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.fontColor};
  margin: 0 0 0.45rem 0;
`;

export default ProjectSection;
