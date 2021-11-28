import styled from "styled-components";
import { Navigate } from "react-router";
import { useLocalContext } from "../../Context/context";

const Login = (props) => {
  const { login, loggedInUser } = useLocalContext();

  return (
    <Container>
      {loggedInUser && <Navigate to="/home" />}
      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
        </Hero>
        <Form>
          <Google onClick={() => login("Faculty")}>SignIn as Faculty</Google>
          <Google onClick={() => login("Student")}>SignIn as Student</Google>
        </Form>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px;
  background: rgba(44, 44, 84, 1);
  height: 100vh;
`;

const Nav = styled.nav`
  max-width: 1440px;
  margin: auto;
  padding: 16px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a {
    width: 135px;
    height: 34px;
    @media (max-width: 768px) {
      padding: 0 5px;
    }
    @media (max-width: 640px) {
      padding: 0 5px;
      width: 38%;
    }
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  transition-duration: 367ms;
  color: rgba(0, 0, 0, 0.8);
  margin-right: 12px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0, 0.1);
    text-decoration: none;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 367ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    text-decoration: none;
  }
`;

const Section = styled.section`
  align-content: start;
  display: flex;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1440px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;

const Hero = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #ffdead;
    font-weight: 200;
    line-height: 70px;
    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
      margin-bottom: 0px;
    }
  }
  img {
    /* z-index: -1; */
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    @media (max-width: 768px) {
      top: 130px;
      width: initial;
      height: initial;
      position: initial;
    }
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 407px;
  color: rgba(132, 129, 122, 1);
  display: flex;

  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;

const Google = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 60%),
    inset 0 0 0 2px rgb(0 0 0 /0%) inset 0 0 0 1px rgb(0 0 0/0%);
  vertical-align: middle;
  z-index: 0;
  transition-duration: 167ms;
  font-size: 20px;
  border: none;
  margin: 20px;
  padding: 2px;
  background: rgba(71, 71, 135, 0.5);
  color: rgba(209, 204, 192, 1);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(255, 255, 255, 1);
  }
  img {
    margin-right: 10px;
  }
`;

export default Login;
