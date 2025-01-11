import React, { useState } from 'react';

const GenerateQuizJSON: React.FC = () => {
    const [classInput, setClassInput] = useState<string>('');
    const [course, setCourse] = useState<string>('');
    const [chapter, setChapter] = useState<string>('');
    const [topic, setTopic] = useState<string>('');
    const [numQuestions, setNumQuestions] = useState<number>(1);
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!classInput || !course || !chapter || !numQuestions) {
            setStatus("Please fill out all required fields.");
            return;
        }

        const queryParams = new URLSearchParams({
            class: classInput,
            course,
            chapter,
            topic,
            num_questions: numQuestions.toString()
        }).toString();

        setStatus("Generating Quiz JSON...");

        try {
            const response = await fetch(`http://15.206.99.14:5000/quiz/generate_mcqs_manual_json?${queryParams}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Failed to generate quiz. Please check your inputs and try again.');
            }

            const data = await response.json();
            const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(jsonBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Generated_Quiz.json';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            setStatus("Quiz JSON Generated Successfully!");
        } catch (error: any) {
            console.error('Error:', error);
            setStatus("Error generating quiz. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Generate Quiz JSON</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">Class:</label>
                <input
                    type="text"
                    id="class"
                    value={classInput}
                    onChange={(e) => setClassInput(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">Course:</label>
                <input
                    type="text"
                    id="course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
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

                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">Topic:</label>
                <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <label htmlFor="num_questions" className="block text-sm font-medium text-gray-700 mb-2">Number of Questions:</label>
                <input
                    type="number"
                    id="num_questions"
                    min="1"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                >
                    Generate Quiz JSON
                </button>
            </form>
            {status && <div className="mt-4 text-sm text-gray-600">{status}</div>}
        </div>
    );
};

export default GenerateQuizJSON;
