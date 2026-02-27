import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MENU_ITEMS = [
  { href: "#home", id: "home", label: "↑" },
  { href: "#tech", id: "tech", label: "기술" },
  { href: "#career", id: "career", label: "경력" },
  { href: "#project", id: "project", label: "프로젝트" },
  { href: "#profile-intro", id: "profile-intro", label: "프로필" },
];

const FloatingMenu = ({ embedded = false }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isPinned, setIsPinned] = useState(!embedded);
  const anchorRef = useRef(null);
  const pinStartYRef = useRef(Number.POSITIVE_INFINITY);

  useEffect(() => {
    const sectionIds = MENU_ITEMS.map((item) => item.id);
    const topOffset = 16;

    const handleScroll = () => {
      if (!embedded) {
        setIsPinned(true);
      } else if (anchorRef.current) {
        const rect = anchorRef.current.getBoundingClientRect();
        const measuredPinY = rect.top + window.scrollY - topOffset;

        setIsPinned((prev) => {
          if (!prev) {
            // Keep recalculating threshold while not pinned to avoid early pin on reload.
            pinStartYRef.current = measuredPinY;
          }
          if (!Number.isFinite(pinStartYRef.current)) return prev;
          const pinY = pinStartYRef.current;
          if (!prev && window.scrollY >= pinY) return true;
          if (prev && window.scrollY <= pinY - 32) return false;
          return prev;
        });
      }

      const triggerLine = window.innerHeight * 0.22;
      const sections = sectionIds
        .map((id) => {
          const element = document.getElementById(id);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          return { id, rect };
        })
        .filter(Boolean);

      const current = sections.find(({ rect }) => rect.top <= triggerLine && rect.bottom > triggerLine);
      if (current) {
        setActiveSection(current.id);
        return;
      }

      if (sections.length > 0) {
        const nearest = sections.reduce((prev, curr) =>
          Math.abs(curr.rect.top) < Math.abs(prev.rect.top) ? curr : prev
        );
        setActiveSection(nearest.id);
      }
    };

    requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [embedded]);

  const handleMove = (event, href) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };

  return (
    <Anchor ref={anchorRef}>
      <Container $isPinned={isPinned}>
        <ul>
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(event) => handleMove(event, item.href)}
                className={activeSection === item.id ? "active" : ""}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Anchor>
  );
};

const Anchor = styled.div`
  width: 100%;
  min-height: 5.4rem;
  display: flex;
  justify-content: center;
`;

const Container = styled.nav`
  position: ${({ $isPinned }) => ($isPinned ? "fixed" : "static")};
  top: ${({ $isPinned }) => ($isPinned ? "1.2rem" : "auto")};
  left: ${({ $isPinned }) => ($isPinned ? "50%" : "auto")};
  transform: ${({ $isPinned }) => ($isPinned ? "translateX(-50%)" : "none")};
  display: inline-flex;
  width: fit-content;
  max-width: calc(100vw - 2rem);
  height: 4.4rem;
  box-sizing: border-box;
  z-index: 20;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  background: rgba(180, 180, 180, 0.3);
  backdrop-filter: blur(12px);

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    gap: 0.7em;
    height: 100%;
    min-width: 0;
  }

  li {
    height: 3rem;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    padding: 0 1rem;
    border-radius: 999px;
    font-size: 1.15rem;
    line-height: 1;
    color: #fff;
    opacity: 0.9;
    white-space: nowrap;

    &:hover {
      opacity: 1;
    }

    &.active {
      background: #3586ff;
      color: #fff;
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    padding: 0.5rem 0.6rem;
    height: 3.8rem;
    max-width: calc(100vw - 1.5rem);

    ul {
      gap: 0.4em;
      overflow-x: auto;
      overflow-y: hidden;
      justify-content: flex-start;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    ul::-webkit-scrollbar {
      display: none;
    }

    a {
      font-size: 1rem;
      height: 2.6rem;
      padding: 0 0.6rem;
    }

    li {
      height: 2.6rem;
    }
  }

  ${({ theme }) => theme.sm`
    height: 4.6rem;

    a {
      font-size: 1.2rem;
      height: 3.2rem;
      padding: 0 1.05rem;
    }

    li {
      height: 3.2rem;
    }
  `}
`;

export default FloatingMenu;
