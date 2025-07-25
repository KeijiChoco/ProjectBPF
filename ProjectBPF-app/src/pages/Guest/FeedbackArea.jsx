import React, { useEffect, useState } from "react";
import { feedbackAPI } from '../../api/feedbackAPI';

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    feedbackAPI
      .fetchFeedback()
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat feedback.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="w-64 h-8 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                <div className="space-y-3 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="w-32 h-5 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-200"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Testimoni dari pelanggan yang telah merasakan layanan terbaik kami
          </p>
        </div>

        {/* Feedback Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((fb, index) => (
            <div
              key={fb.id}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Quote */}
              <div className="mb-6 relative">
                <div className="absolute -top-2 -left-2 text-4xl text-gray-300 font-serif">"</div>
                <p className="text-gray-600 italic leading-relaxed whitespace-pre-line pl-6 text-lg">
                  {fb.feedback}
                </p>
                <div className="absolute -bottom-2 -right-2 text-4xl text-gray-300 font-serif">"</div>
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                  {fb.emoji || "💬"}
                </div>
                <div>
                  <h3 className="text-gray-800 font-semibold text-lg">{fb.name}</h3>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        {feedbacks.length > 0 && (
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-6 bg-white px-8 py-4 rounded-xl shadow-md border border-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{feedbacks.length}</div>
                <div className="text-sm text-gray-600">Total Testimoni</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}