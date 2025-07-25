// File: src/pages/Guest/FAQPage.jsx

import React, { useState, useEffect } from 'react';
import { faqAPI } from "../../services/faqAPI";
import { FaChevronDown } from 'react-icons/fa';

export default function FaqPage() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        const getFaqs = async () => {
            try {
                // Ubah dari fetchFaq() menjadi fetchFAQ()
                const data = await faqAPI.fetchFAQ();
                console.log('FAQ data:', data); // Debug log
                setFaqs(data);
            } catch (err) {
                setError('Gagal memuat data FAQ.');
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

    if (loading) return <div className="text-center p-10">Memuat FAQ...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    // Jika tidak ada data FAQ
    if (!faqs || faqs.length === 0) {
        return (
            <div className="container mx-auto py-8 max-w-3xl">
                <h1 className="text-4xl font-bold font-heading text-center mb-10 text-coffee-dark">
                    Frequently Asked Questions
                </h1>
                <div className="text-center p-10 text-gray-500">
                    Belum ada FAQ yang tersedia.
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 max-w-3xl">
            <h1 className="text-4xl font-bold font-heading text-center mb-10 text-coffee-dark">
                Frequently Asked Questions
            </h1>
            <div className="space-y-4">
                {faqs.map((faq) => {
                    // Pastikan menggunakan field yang benar dari database
                    const faqId = faq.id || faq.idfaq; // Fallback jika nama field berbeda
                    const isOpen = openId === faqId; 
                    
                    return (
                        <div key={faqId} className="border-b border-gray-200 pb-4"> 
                            <button
                                onClick={() => toggleFaq(faqId)} 
                                className="w-full flex justify-between items-center text-left py-4 focus:outline-none hover:bg-gray-50 transition-colors duration-200"
                            >
                                <h2 className="text-xl font-semibold font-heading text-coffee-dark">
                                    {faq.pertanyaan}
                                </h2>
                                <FaChevronDown 
                                    className={`transform transition-transform duration-300 text-coffee-dark ${isOpen ? 'rotate-180' : ''}`} 
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="pt-2 pr-8 font-body text-gray-600 leading-relaxed">
                                    {faq.jawaban}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}