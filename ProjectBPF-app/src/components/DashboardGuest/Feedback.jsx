import React, { useState } from "react";
import { motion } from "framer-motion";
import { feedbackAPI } from "../../api/feedbackAPI"; // pastikan path-nya sesuai struktur project-mu

const emojis = [
  { label: "😊", bg: "/feedback/happy-card.png" },
  { label: "😐", bg: "/feedback/neutral-card.png" },
  { label: "😔", bg: "/feedback/sad-card.png" },
];

const FeedbackSection = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("😊");
  const [form, setForm] = useState({ name: "", feedback: "" });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const payload = {
      ...form,
      emoji: selectedEmoji,
    };

    try {
      await feedbackAPI.createFeedback(payload);
      setSuccessMsg("Feedback berhasil dikirim. Terima kasih!");
      setForm({ name: "", feedback: "" });
    } catch (error) {
      console.error("Gagal mengirim feedback:", error);
      setErrorMsg("Terjadi kesalahan saat mengirim feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-12 bg-gradient-to-b from-[#FFF8F0] to-[#FFFBEF]">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#432818]">
        Tinggalkan Feedbackmu!
      </h2>

      <div className="w-full flex">
        {/* Kiri */}
        <div className="w-[20%] hidden md:block">
          <img
            src="https://i.pinimg.com/736x/9a/28/6d/9a286de96bb6f4c277bdc058ffbeea87.jpg"
            alt="Kiri"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Tengah */}
        <div className="w-full md:w-[60%] px-4">
          <motion.div
            className="relative w-full max-w-2xl mx-auto p-6 rounded-xl bg-cover bg-center shadow-lg"
            style={{
              backgroundImage: `url(${
                emojis.find((e) => e.label === selectedEmoji)?.bg
              })`,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Emoji Vertikal */}
            <div className="absolute left-[-60px] top-8 hidden md:flex flex-col gap-4">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiClick(emoji.label)}
                  className={`rounded-full p-1 ${
                    selectedEmoji === emoji.label
                      ? "ring-2 ring-[#432818]"
                      : "ring-0"
                  }`}
                >
                  <span className="text-2xl">{emoji.label}</span>
                </button>
              ))}
            </div>

            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
              <label className="text-[#432818] font-semibold">Nama</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="p-2 rounded-md border focus:outline-none"
                required
              />

              <label className="text-[#432818] font-semibold">Feedback</label>
              <textarea
                name="feedback"
                value={form.feedback}
                onChange={handleChange}
                rows={4}
                className="p-2 rounded-md border resize-none focus:outline-none"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-[#432818] text-white px-6 py-2 mt-2 rounded-md self-start disabled:opacity-60"
              >
                {loading ? "Mengirim..." : "Kirim"}
              </button>

              {successMsg && (
                <p className="text-green-700 text-sm mt-2">{successMsg}</p>
              )}
              {errorMsg && (
                <p className="text-red-600 text-sm mt-2">{errorMsg}</p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Kanan */}
        <div className="w-[20%] hidden md:block">
          <img
            src="https://i.pinimg.com/736x/85/3e/14/853e14816d26f88c89ded51e89734c6a.jpg"
            alt="Kanan"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
