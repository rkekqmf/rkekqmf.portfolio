import HeadInfo from "../components/layout/headInfo";

const Layout = ({ children }) => {
  return (
    <>
      <HeadInfo />
      {children}
    </>
  );
};
export default Layout;
