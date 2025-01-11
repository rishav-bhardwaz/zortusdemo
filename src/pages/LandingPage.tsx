import { useNavigate } from 'react-router-dom';
import {
  Calculator,
  Clock,
  CloudSun,
  Edit3,
  Layout,
  Music,
  Palette,
  PenTool,
  CheckSquare,
  HelpCircle
} from 'lucide-react';

const demos = [
  {
    title: 'Model Paper Generator',
    description: 'Generate model papers tailored to the exam curriculum, textbooks, past years\' papers',
    icon: <Layout className="w-6 h-6" />,
    path: '/modelpaper',
    color: 'bg-blue-500'
  },
  {
    title: 'PPT Manual Generator',
    description: 'Generate PowerPoint slides manually with custom content',
    icon: <CheckSquare className="w-6 h-6" />,
    path: '/pptmanual',
    color: 'bg-green-500'
  },
  {
    title: 'Generate PPT from PDF',
    description: 'Generate PowerPoint slides from a PDF file',
    icon: <CloudSun className="w-6 h-6" />,
    path: '/pptpdf',
    color: 'bg-yellow-500'
  },
  {
    title: 'Calculator',
    description: 'A modern calculator with a clean interface',
    icon: <Calculator className="w-6 h-6" />,
    path: '/demo/calculator',
    color: 'bg-purple-500'
  },
  {
    title: 'Color Picker',
    description: 'Generate and explore beautiful color palettes',
    icon: <Palette className="w-6 h-6" />,
    path: '/demo/color-picker',
    color: 'bg-pink-500'
  },
  {
    title: 'Timer',
    description: 'A countdown timer with customizable intervals',
    icon: <Clock className="w-6 h-6" />,
    path: '/demo/timer',
    color: 'bg-indigo-500'
  },
  {
    title: 'Quiz App',
    description: 'Test your knowledge with this interactive quiz',
    icon: <HelpCircle className="w-6 h-6" />,
    path: '/demo/quiz',
    color: 'bg-red-500'
  },
  {
    title: 'Notes App',
    description: 'Take and organize notes with markdown support',
    icon: <Edit3 className="w-6 h-6" />,
    path: '/demo/notes',
    color: 'bg-teal-500'
  },
  {
    title: 'Drawing App',
    description: 'Express your creativity with this drawing tool',
    icon: <PenTool className="w-6 h-6" />,
    path: '/demo/drawing',
    color: 'bg-orange-500'
  },
  {
    title: 'Music Player',
    description: 'A beautiful music player with playlist support',
    icon: <Music className="w-6 h-6" />,
    path: '/demo/music-player',
    color: 'bg-cyan-500'
  }
];

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">React Demo Gallery</h1>
          <p className="text-xl text-gray-600">Explore our collection of interactive React demos</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demos.map((demo) => (
            <div
              key={demo.path}
              onClick={() => navigate(demo.path)}
              className="group relative bg-white rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 ${demo.color} opacity-5 rounded-bl-full transition-all duration-300 group-hover:opacity-10`} />
              <div className={`${demo.color} bg-opacity-10 p-3 rounded-lg inline-block mb-4`}>
                <div className="text-gray-700">
                  {demo.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{demo.title}</h3>
              <p className="text-gray-600">{demo.description}</p>
              <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gray-400">
                →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;