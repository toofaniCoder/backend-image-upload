import { ThemeProvider } from "@mui/material/styles";
import theme, { globalStyles } from "./theme";

import { GlobalStyles } from "@mui/styled-engine";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Students from "./components/student/students";
import AddStudent from "./components/student/add-student";
import EditStudent from "./components/student/edit-student";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles styles={globalStyles} />

        <Routes>
          <Route path="/" index element={<Students />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/students/:id/edit" element={<EditStudent />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
