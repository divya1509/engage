import React, { useEffect } from "react";
import Classes from "../Classes/Classes";
import dataBase from "../../Lib/firebase";
import { useLocalContext } from "../../Context/context";
import styled from "styled-components";

function FacultyDash() {
  //   classes map -> to render ever class
  const { classesArray, setClassesArray, loggedInMail } = useLocalContext();

  useEffect(() => {
    let tempClassData = [];
    const getClasses = dataBase
      .collection("Classes")
      .get()
      .then((data) => {
        data.docs.map((tempData) => {
          // console.log(tempData.data().owner == loggedInMail);
          if (tempData.data().owner === loggedInMail)
            tempClassData = [...tempClassData, tempData.data()];
        });
        console.log(tempClassData);
        setClassesArray(tempClassData);
  });
  }, []);

  return (
    <Container>
      {/* <CreateASS/>
            <CreateTest/> */}
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

export default FacultyDash;
