import React, { useState, useEffect, useRef } from 'react';
import { faqAPI } from "../../services/AllServices";
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

export default function FaqPage() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openId, setOpenId] = useState(null);
    const contentRefs = useRef({});

    useEffect(() => {
        const getFaqs = async () => {
            try {
                const data = await faqAPI.fetchFAQ();
                console.log('FAQ data:', data);
                setFaqs(data);
            } catch (err) {
                setError('Gagal memuat data FAQ. Silakan coba lagi nanti.');
                console.error('Error fetching FAQ:', err);
            } finally {
                setLoading(false);
            }
        };
        getFaqs();
    }, []);

    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };

    if (loading) {
        return (
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <div className="text-center p-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-dark mx-auto mb-4"></div>
                    <p>Memuat FAQ untuk Anda...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <div className="text-center p-10 text-red-500">{error}</div>
            </div>
        );
    }

    if (!faqs || faqs.length === 0) {
        return (
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <h1 className="text-4xl font-bold font-heading text-center mb-10 text-coffee-dark">
                    Frequently Asked Questions
                </h1>
                <div className="text-center py-16">
                    <FaQuestionCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        Belum Ada FAQ Tersedia
                    </h3>
                    <p className="text-gray-500">
                        FAQ sedang dalam persiapan. Silakan kembali lagi nanti.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-coffee-dark">
                    Frequently Asked Questions
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Temukan jawaban untuk pertanyaan yang sering diajukan tentang program pelatihan barista kami
                </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-3">
                {faqs.map((faq, index) => {
                    const faqId = faq.id;
                    const isOpen = openId === faqId;
                    
                    return (
                        <div 
                            key={faqId} 
                            className={`bg-white rounded-xl shadow-sm border transition-all duration-300 overflow-hidden ${
                                isOpen 
                                    ? 'shadow-md border-coffee-light ring-1 ring-coffee-light/20' 
                                    : 'border-gray-200 hover:shadow-md hover:border-coffee-light/50'
                            }`}
                        >
                            {/* Question Button */}
                            <button
                                onClick={() => toggleFaq(faqId)}
                                className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-coffee-light/50 focus:ring-inset transition-colors duration-200"
                                aria-expanded={isOpen}
                                aria-controls={`faq-answer-${faqId}`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                                                isOpen 
                                                    ? 'bg-coffee-dark text-white' 
                                                    : 'bg-coffee-light text-coffee-dark'
                                            }`}>
                                                {String(index + 1).padStart(2, '0')}
                                            </div>
                                        </div>
                                        <h2 className="text-lg md:text-xl font-semibold font-heading text-coffee-dark pr-4 leading-relaxed">
                                            {faq.pertanyaan}
                                        </h2>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <FaChevronDown 
                                            className={`w-5 h-5 transform transition-all duration-300 text-coffee-dark ${
                                                isOpen ? 'rotate-180 text-accent' : 'hover:text-accent'
                                            }`} 
                                        />
                                    </div>
                                </div>
                            </button>

                            {/* Answer Content */}
                            <div
                                id={`faq-answer-${faqId}`}
                                ref={el => contentRefs.current[faqId] = el}
                                className={`transition-all duration-500 ease-in-out ${
                                    isOpen 
                                        ? 'max-h-[500px] opacity-100' 
                                        : 'max-h-0 opacity-0'
                                }`}
                                style={{
                                    maxHeight: isOpen 
                                        ? contentRefs.current[faqId]?.scrollHeight + 'px' 
                                        : '0px'
                                }}
                            >
                                <div className="px-6 pb-6">
                                    <div className="ml-12 border-l-2 border-coffee-light/30 pl-6">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="font-body text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                {faq.jawaban}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer CTA */}
            <div className="mt-16 text-center bg-coffee-light/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold font-heading text-coffee-dark mb-4">
                    Masih Ada Pertanyaan?
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Jika Anda tidak menemukan jawaban yang dicari, jangan ragu untuk menghubungi tim kami
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/contact"
                        className="bg-coffee-dark text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Hubungi Kami
                    </a>
                    <a
                        href="mailto:info@baristacourse.com"
                        className="bg-white text-coffee-dark border-2 border-coffee-dark font-semibold py-3 px-6 rounded-lg hover:bg-coffee-dark hover:text-white transition-colors"
                    >
                        Kirim Email
                    </a>
                </div>
            </div>
        </div>
    );
}