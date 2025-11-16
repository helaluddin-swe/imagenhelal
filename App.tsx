
import React, { useState, useCallback } from 'react';
import { generateImages } from './services/geminiService';
import Spinner from './components/Spinner';
import ErrorAlert from './components/ErrorAlert';
import ImageCard from './components/ImageCard';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImages([]);

    try {
      const generatedImages = await generateImages(prompt);
      setImages(generatedImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="py-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          AI Image Generator
        </h1>
        <p className="text-gray-400 mt-2">Powered by Imagen 4.0</p>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl flex-grow">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Spinner />
              <p className="mt-4 text-lg text-gray-300">Generating your masterpieces...</p>
              <p className="text-sm text-gray-500">This might take a moment.</p>
            </div>
          ) : error ? (
            <div className="my-8">
              <ErrorAlert message={error} />
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
              {images.map((img, index) => (
                <ImageCard key={index} imageUrl={img} />
              ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center text-center h-full p-8 bg-gray-800/50 rounded-2xl border border-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-200">Welcome!</h2>
                <p className="mt-2 text-gray-400 max-w-md">
                  Describe the image you want to create in the box below and watch your ideas come to life.
                </p>
             </div>
          )}
        </div>
      </main>

      <footer className="sticky bottom-0 bg-gray-900/80 backdrop-blur-sm p-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A photorealistic portrait of an astronaut riding a unicorn on Mars"
              className="w-full flex-grow p-4 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 resize-none"
              rows={2}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </form>
        </div>
      </footer>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
