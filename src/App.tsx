import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GenerateExamPaper from './pages/Modelpaper';
import GeneratePPTManual from './pages/Pptmanual';
import GeneratePPTFromPDF from './pages/Pptpdf';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/modelpaper" element={<GenerateExamPaper />} />
        <Route path="/pptmanual" element={<GeneratePPTManual />} />
        <Route path="/pptpdf" element={<GeneratePPTFromPDF />} />
        {/* <Route path="/demo/counter" element={<CounterDemo />} />
        <Route path="/demo/todo" element={<TodoDemo />} />
        <Route path="/demo/weather" element={<WeatherDemo />} />
        <Route path="/demo/calculator" element={<CalculatorDemo />} />
        <Route path="/demo/color-picker" element={<ColorPickerDemo />} />
        <Route path="/demo/timer" element={<TimerDemo />} />
        <Route path="/demo/quiz" element={<QuizDemo />} />
        <Route path="/demo/notes" element={<NotesDemo />} />
        <Route path="/demo/drawing" element={<DrawingDemo />} />
        <Route path="/demo/music-player" element={<MusicPlayerDemo />} /> */}
      </Routes>
    </Router>
  );
}

export default App;