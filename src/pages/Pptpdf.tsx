import React, { useState } from 'react';

const GeneratePPTFromPDF: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [topic, setTopic] = useState<string>('');
    const [slidesNum, setSlidesNum] = useState<number>(1);
    const [status, setStatus] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
            setStatus("Please upload a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify({ topic, slides_num: slidesNum }));

        setStatus("Generating PPT...");

        try {
            const response = await fetch("http://15.206.99.14:5000/ppt_pdf/generate_pdf_slides", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "An error occurred while generating the PPT.");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${topic.replace(/\s+/g, "_")}.pptx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            setStatus("PPT generated and downloaded successfully!");
        } catch (error: any) {
            setStatus(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Generate PowerPoint Slides from PDF</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">Upload PDF:</label>
                <input
                    type="file"
                    id="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
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

                <label htmlFor="slides_num" className="block text-sm font-medium text-gray-700 mb-2">Number of Slides:</label>
                <input
                    type="number"
                    id="slides_num"
                    min="1"
                    value={slidesNum}
                    onChange={(e) => setSlidesNum(parseInt(e.target.value))}
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

export default GeneratePPTFromPDF;
