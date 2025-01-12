import React, { useState } from 'react';

const GenerateRoadmap: React.FC = () => {
    const [examDate, setExamDate] = useState<string>('');
    const [files, setFiles] = useState<FileList | null>(null);
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!examDate || !files || files.length === 0) {
            setStatus("Please provide both an exam date and at least one file.");
            return;
        }

        const formData = new FormData();
        formData.append("exam_date", examDate);
        for (const file of files) {
            formData.append("files", file);
        }

        setStatus("Generating Roadmap...");

        try {
            const response = await fetch("http://15.206.99.14:5000/roadmap/roadmap_gen", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to generate Roadmap.");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Roadmap_Generated.docx";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            setStatus("Roadmap Generated Successfully!");
        } catch (error: any) {
            console.error("Error:", error);
            setStatus("Error generating roadmap. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Generate Study Roadmap</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <label htmlFor="exam-date" className="block text-sm font-medium text-gray-700 mb-2">Exam Date:</label>
                <input
                    type="date"
                    id="exam-date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">Upload PDF Files:</label>
                <input
                    type="file"
                    id="file-upload"
                    accept="application/pdf"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    required
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                >
                    Generate Roadmap
                </button>
            </form>
            {status && <div className="mt-4 text-sm text-gray-600">{status}</div>}
        </div>
    );
};

export default GenerateRoadmap;
