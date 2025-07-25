import React, { useState } from "react";
import { motion } from "framer-motion";

const emojis = [
  { label: "😊", bg: "/Excited.png" },
  { label: "😐", bg: "/feedback/neutral-card.png" },
  { label: "😔", bg: "/feedback/sad-card.png" },
];

const FeedbackSection = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simpan atau kirim feedback di sini
    console.log("Feedback submitted:", {
      name,
      feedback,
      emoji: selectedEmoji,
    });
    // Reset form
    setName("");
    setFeedback("");
    setSelectedEmoji(null);
  };

  return (
    <section className="container mx-auto flex flex-col items-center rounded-2xl shadow-xl py-16 px-6 bg-[#fdf9f5]">
      <h2 className="text-4xl font-bold text-center text-coffee-dark mb-10">
        Tinggalkan Feedbackmu!
      </h2>

      <div className="flex flex-col md:flex-row items-start justify-center gap-10">
        {/* Emoji Selector - Vertical */}
        <div className="flex md:flex-col gap-4 items-center">
          {emojis.map((emoji, index) => (
            <button
              key={index}
              onClick={() => setSelectedEmoji(emoji)}
              className={`text-4xl transition hover:scale-110 ${
                selectedEmoji?.label === emoji.label
                  ? "ring-2 ring-coffee-dark rounded-full"
                  : ""
              }`}
            >
              {emoji.label}
            </button>
          ))}
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-[6in] h-[4in] bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Background Image */}
          {selectedEmoji && (
            <img
              src={selectedEmoji.bg}
              alt="Feedback Card"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 h-full flex flex-col justify-between p-6"
          >
            <div>
              <label className="block mb-1 font-semibold text-coffee-dark">
                Nama
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 rounded-md bg-white bg-opacity-80 backdrop-blur-sm border border-coffee-light mb-4"
              />

              <label className="block mb-1 font-semibold text-coffee-dark">
                Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows={3}
                className="w-full p-2 rounded-md bg-white bg-opacity-80 backdrop-blur-sm border border-coffee-light"
              ></textarea>
            </div>

            <button
              type="submit"
              className="self-end mt-4 px-6 py-2 rounded-md transition font-semibold text-white"
              style={{ backgroundColor: "#432818" }}
            >
              Kirim
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default FeedbackSection;
