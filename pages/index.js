import HomeSection from "../components/sections/homeSection";
import TechSection from "../components/sections/techSection";
import CareerSection from "../components/sections/careerSection";
import ProjectSection from "../components/sections/projectSection";
import ProfileIntroSection from "../components/sections/profileIntroSection";
import Footer from "../components/layout/footer";
import { OnePageContainer, Section } from "../styles/onePageStyle";

const Home = () => {
  return (
    <OnePageContainer>
      <Section id="home" $isHome>
        <HomeSection />
      </Section>
      <Section id="tech">
        <TechSection />
      </Section>
      <Section id="career">
        <CareerSection />
      </Section>
      <Section id="project">
        <ProjectSection />
      </Section>
      <Section id="profile-intro">
        <ProfileIntroSection />
      </Section>
      <Footer />
    </OnePageContainer>
  );
};

export default Home;

// export const getServerSideProps = async () => {
//   const res = await fetch(
//     "https://jsonplaceholder.typicode.com/posts?_start=0&_end=10"
//   );
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// };

// export const getStaticProps = async () => {
//   try {
//     const options = {
//       method: "POST",
//       url: `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
//       headers: {
//         Accept: "application/json",
//         "Notion-Version": "2022-02-22",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${TOKEN}`,
//       },
//       data: { page_size: 100 },
//     };

//     const response = await axios.request(options);

//     return {
//       props: {
//         projects: response.data,
//       },
//     };
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const getStaticProps = async () => {
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/posts?_start=0&_end=10"
//     );
//     return {
//       props: {
//         posts: response.data,
//       },
//     };
//   } catch (err) {
//     console.log(err);
//   }
// };
