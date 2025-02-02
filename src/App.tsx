import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GenerateExamPaper from './pages/Modelpaper';
import GeneratePPTManual from './pages/Pptmanual';
import GeneratePPTFromPDF from './pages/Pptpdf';
import GenerateQuizDocument from './pages/Quizdoc';
import GenerateQuizJSON from './pages/Quizmanual';
import GenerateQuizPPT from './pages/Pptquiz';
import GenerateQuizDOCX from './pages/Docx';
import GenerateRoadmap from './pages/Roadmap';
import Weight from './pages/Weight';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/modelpaper" element={<GenerateExamPaper />} />
        <Route path="/pptmanual" element={<GeneratePPTManual />} />
        <Route path="/pptpdf" element={<GeneratePPTFromPDF />} />
        <Route path="/quizdoc" element={<GenerateQuizDocument />} />
        <Route path="/quizmanual" element={<GenerateQuizJSON />} />
        <Route path="/pptquiz" element={<GenerateQuizPPT />} />
        <Route path="/docx" element={<GenerateQuizDOCX />} />
        <Route path="/roadmap" element={<GenerateRoadmap />} />
        <Route path="/weight" element={<Weight />} />
      </Routes>
    </Router>
  );
}

export default App;