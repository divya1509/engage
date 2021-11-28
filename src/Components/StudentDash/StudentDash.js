import React, { useEffect } from "react";
import { useLocalContext } from "../../Context/context";
import dataBase from "../../Lib/firebase";
import Classes from "../Classes/Classes";
import styled from "styled-components";

function StudentDash() {
  const { classesArray, setClassesArray, loggedInMail } = useLocalContext();

  useEffect(() => {
    let tempClassData = [];
    const getClasses = dataBase
      .collection("Classes")
      .get()
      .then((data) => {
        data.docs.map((tempData) => {
          // console.log(tempData.data().owner == loggedInMail);
          if (tempData.data().studentsArray.includes(loggedInMail))
            tempClassData = [...tempClassData, tempData.data()];
        });
        console.log(tempClassData);
        setClassesArray(tempClassData);
      });
  }, []);

  return (
    <Container>
      {/* <TakeAss/>
            <TakeTest></TakeTest> */}
      {classesArray.map((data) => (
        <Classes classData={data} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  padding: 30px;
  display: flex;
  background: #cbc3e3;
  height: 100vh;
`;

export default StudentDash;
