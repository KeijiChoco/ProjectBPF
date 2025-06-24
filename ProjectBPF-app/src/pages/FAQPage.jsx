// File: src/pages/FaqPage.jsx

import React, { useState, useEffect } from 'react';
import { faqAPI } from '../services/faqAPI';
import { FaChevronDown } from 'react-icons/fa';

export default function FaqPage() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openId, setOpenId] = useState(null);

    useEffect(() => {
        const getFaqs = async () => {
            try {
                const data = await faqAPI.fetchFaq();
                setFaqs(data);
            } catch (err) {
                setError('Gagal memuat data FAQ.');
                console.error(err);
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
    if (error) return <div className="text-center p-10 text-merah">{error}</div>;

    return (
        <div className="container mx-auto py-8 max-w-3xl">
            <h1 className="text-4xl font-bold font-heading text-center mb-10 text-coffee-dark">
                Frequently Asked Questions
            </h1>
            <div className="space-y-4">
                {faqs.map((faq) => {
                    const isOpen = openId === faq.idfaq; 
                    return (
                        <div key={faq.idfaq} className="border-b border-gray-200 pb-4"> 
                            <button
                                onClick={() => toggleFaq(faq.idfaq)} 
                                className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
                            >
                                <h2 className="text-xl font-semibold font-heading text-coffee-dark">
                                    {faq.pertanyaan}
                                </h2>
                                <FaChevronDown 
                                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                            >
                                <p className="pt-2 pr-8 font-body text-gray-600">
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