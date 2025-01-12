import React, { useState } from 'react';

const GenerateQuizDOCX: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [numMcqs, setNumMcqs] = useState<number>(5);
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
            setStatus("Please upload a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("num_mcqs", numMcqs.toString());

        setStatus("Generating MCQs...");

        try {
            const response = await fetch("http://15.206.99.14:5000/quiz/generate_mcqs_document_docx", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to generate MCQs.");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Generated_Quiz_Document.docx";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            setStatus("MCQs Generated Successfully!");
        } catch (error: any) {
            console.error("Error:", error);
            setStatus("Error generating MCQs. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">MCQ Generator</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">Upload PDF File:</label>
                <input
                    type="file"
                    id="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <label htmlFor="num_mcqs" className="block text-sm font-medium text-gray-700 mb-2">Number of MCQs:</label>
                <input
                    type="number"
                    id="num_mcqs"
                    min="1"
                    max="20"
                    value={numMcqs}
                    onChange={(e) => setNumMcqs(parseInt(e.target.value))}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                >
                    Generate MCQs
                </button>
            </form>
            {status && <div className="mt-4 text-sm text-gray-600">{status}</div>}
        </div>
    );
};

export default GenerateQuizDOCX;
