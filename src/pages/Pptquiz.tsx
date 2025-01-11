import React, { useState } from 'react';

const GenerateQuizPPT: React.FC = () => {
    const [grade, setGrade] = useState<string>('');
    const [subject, setSubject] = useState<string>('');
    const [topic, setTopic] = useState<string>('');
    const [chapter, setChapter] = useState<string>('');
    const [numQuestions, setNumQuestions] = useState<number>(5);
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!grade || !subject || !topic || !chapter || !numQuestions) {
            setStatus("Please fill out all required fields.");
            return;
        }

        const formData = {
            grade,
            subject,
            topic,
            chapter,
            num_questions: numQuestions
        };

        setStatus("Generating Quiz PPT...");

        try {
            const response = await fetch("http://15.206.99.14:5000/quiz/generate_mcqs_manual_ppt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to generate PPT.");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${topic.replace(/\s+/g, '_')}_quiz.pptx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            setStatus("Quiz PPT Generated Successfully!");
        } catch (error: any) {
            console.error('Error:', error);
            setStatus("Error generating PPT. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Generate Quiz PPT</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">Grade:</label>
                <input
                    type="text"
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">Topic:</label>
                <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <label htmlFor="chapter" className="block text-sm font-medium text-gray-700 mb-2">Chapter:</label>
                <input
                    type="text"
                    id="chapter"
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <label htmlFor="num_questions" className="block text-sm font-medium text-gray-700 mb-2">Number of Questions:</label>
                <input
                    type="number"
                    id="num_questions"
                    min="1"
                    max="20"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Generate PPT
                </button>
            </form>
            {status && <div className="mt-4 text-sm text-gray-600">{status}</div>}
        </div>
    );
};

export default GenerateQuizPPT;
