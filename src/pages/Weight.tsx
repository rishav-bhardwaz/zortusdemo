import React, { useState } from 'react';

const Weight: React.FC = () => {
    const [hasOutcomes, setHasOutcomes] = useState<string>('true');
    const [outcomes, setOutcomes] = useState<string>('');
    const [generateQuiz, setGenerateQuiz] = useState<string>('true');
    const [numQuiz, setNumQuiz] = useState<number>(10);
    const [quizDifficulty, setQuizDifficulty] = useState<string>('medium');
    const [files, setFiles] = useState<FileList | null>(null);
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!files || files.length === 0) {
            setStatus("Please upload at least one file.");
            return;
        }

        const formData = new FormData();
        formData.append("has_outcomes", hasOutcomes);
        formData.append("outcomes", outcomes);
        formData.append("generate_quiz", generateQuiz);
        formData.append("num_quiz", numQuiz.toString());
        formData.append("quiz_difficulty", quizDifficulty);
        for (const file of files) {
            formData.append("files", file);
        }

        setStatus("Processing your request...");

        try {
            const response = await fetch("http://15.206.99.14:5000/weightage/weightage_analysis", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to process the request.");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = generateQuiz === 'true' ? "Generated_Quiz.docx" : "Weightage_Analysis.docx";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            setStatus("File downloaded successfully!");
        } catch (error: any) {
            console.error("Error:", error);
            setStatus("Error processing request. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Weightage Analysis and Quiz Generator</h1>
            <h3 className="text-sm italic text-gray-600 mb-4">Weightage analysis will only generate if quiz generation is set to false.</h3>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <label htmlFor="has-outcomes" className="block text-sm font-medium text-gray-700 mb-2">Include Outcomes?</label>
                <select
                    id="has-outcomes"
                    value={hasOutcomes}
                    onChange={(e) => setHasOutcomes(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <label htmlFor="outcomes" className="block text-sm font-medium text-gray-700 mb-2">Outcomes (JSON Array)</label>
                <textarea
                    id="outcomes"
                    value={outcomes}
                    onChange={(e) => setOutcomes(e.target.value)}
                    placeholder='["Understand concepts", "Apply principles"]'
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                />

                <label htmlFor="generate-quiz" className="block text-sm font-medium text-gray-700 mb-2">Generate Quiz?</label>
                <select
                    id="generate-quiz"
                    value={generateQuiz}
                    onChange={(e) => setGenerateQuiz(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <label htmlFor="num-quiz" className="block text-sm font-medium text-gray-700 mb-2">Number of Quiz Questions</label>
                <input
                    type="number"
                    id="num-quiz"
                    value={numQuiz}
                    onChange={(e) => setNumQuiz(Number(e.target.value))}
                    min={1}
                    max={50}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                />

                <label htmlFor="quiz-difficulty" className="block text-sm font-medium text-gray-700 mb-2">Quiz Difficulty</label>
                <select
                    id="quiz-difficulty"
                    value={quizDifficulty}
                    onChange={(e) => setQuizDifficulty(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
                <input
                    type="file"
                    id="file-upload"
                    accept="application/pdf"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Submit
                </button>
            </form>
            {status && <div className="mt-4 text-sm text-gray-600">{status}</div>}
        </div>
    );
};

export default Weight;
