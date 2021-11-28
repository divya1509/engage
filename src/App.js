import "./App.css";
import Login from "./Components/Login/Login";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import { useLocalContext } from "./Context/context";
import Home from "./Components/Home";
import SingleClass from "./Components/Classes/SingleClass";

function App() {
  const { classesArray } = useLocalContext();

  return (
    <Routes>
      <Route path="/" exact element={<Login />}></Route>
      <Route path="/home" exact element={<Home />} />
      {classesArray.map((item, index) => (
        <Route
          key={index}
          exact
          path={`/home/${item.id}`}
          element={<SingleClass classData={item} />}
        />
      ))}
    </Routes>
  );
}

export default App;
