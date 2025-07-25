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
      .catch((err) => {
        setError("Gagal memuat feedback");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Memuat testimoni...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {feedbacks.map((fb) => (
          <div
            key={fb.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <p className="text-gray-600 italic">"{fb.pesan}"</p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl">{fb.emoji}</span>
              <span className="text-gray-800 font-semibold">{fb.nama}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
