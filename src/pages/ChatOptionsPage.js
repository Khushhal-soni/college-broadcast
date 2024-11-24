import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChatOptionsPage() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-950 flex flex-col items-center justify-center p-4 text-white relative">

            <div className="text-center space-y-8">
           
                <h1 className="text-4xl md:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Choose Your Chat Room
                    </span>
                </h1>

                
                <div className="space-y-6">
                    <button
                        onClick={() => navigate('/year-based')}
                        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Year-Based Chat
                    </button>
                    <button
                        onClick={() => navigate('/open-chat')}
                        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Open Chat Room
                    </button>
                </div>
            </div>
        </div>
    );
}
