import React, { useState } from 'react';

const GenerateExamPaper: React.FC = () => {
    const [exam, setExam] = useState<string>('');
    const [language, setLanguage] = useState<string>('');

    const sendRequest = async () => {
        if (!exam) {
            alert('Please select an exam.');
            return;
        }
        const data = { exam, language };

        try {
            const response = await fetch('http://15.206.99.14:5000/paper/generate_paper', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'Generated_Exam_Paper.docx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            alert('Exam Paper Generated Successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error generating exam paper. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Generate Exam Paper</h1>
            <h2 className="text-lg text-gray-600 mb-6 text-center">
                Generate model papers tailored to the exam curriculum, textbooks, past years' papers.
            </h2>
            <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="exam" className="block text-sm font-medium text-gray-700 mb-2">Exam:</label>
                <select
                    id="exam"
                    value={exam}
                    onChange={(e) => setExam(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="" disabled>Select an exam</option>
                    <option value="Class 12th CBSE Physics">Class 12th CBSE Physics</option>
                    <option value="Class 12th CBSE Chemistry">Class 12th CBSE Chemistry</option>
                    <option value="JEE Main">JEE Main</option>
                    <option value="NEET">NEET</option>
                </select>

                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">Language:</label>
                <input
                    type="text"
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="Enter Language (e.g., English)"
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <button
                    type="button"
                    onClick={sendRequest}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Generate
                </button>
            </form>
        </div>
    );
};

export default GenerateExamPaper;
