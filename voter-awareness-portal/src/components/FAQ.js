// src/components/FAQ.js
import React, { useState } from 'react';

const FAQ = ({ language }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = {
    hindi: [
      {
        question: "मतदान के लिए पात्र होने के लिए न्यूनतम आयु क्या है?",
        answer: "भारत में मतदान के लिए न्यूनतम आयु 18 वर्ष है। कोई भी भारतीय नागरिक जिसकी आयु 18 वर्ष या उससे अधिक है, मतदाता के रूप में पंजीकरण करा सकता है।"
      },
      {
        question: "मतदाता पंजीकरण के लिए कैसे आवेदन करें?",
        answer: "आप ऑनलाइन आवेदन कर सकते हैं: 1) राष्ट्रीय मतदाता सेवा पोर्टल (nvsp.in) पर जाएं, 2) फॉर्म 6 भरें, 3) आवश्यक दस्तावेज अपलोड करें, 4) आवेदन जमा करें। आप ऑफलाइन भी आवेदन कर सकते हैं अपने नजदीकी मतदाता पंजीकरण केंद्र पर जाकर।"
      },
      {
        question: "मतदाता पहचान पत्र के लिए कौन से दस्तावेज आवश्यक हैं?",
        answer: "मुख्य दस्तावेज: 1) आयु प्रमाण (जन्म प्रमाण पत्र, 10वीं की मार्कशीट), 2) पता प्रमाण (आधार कार्ड, ड्राइविंग लाइसेंस, उपयोगिता बिल), 3) फोटो।"
      },
      {
        question: "क्या मैं अपना मतदान स्थान बदल सकता हूँ?",
        answer: "हाँ, आप मतदान स्थान परिवर्तन के लिए आवेदन कर सकते हैं। यदि आप एक ही निर्वाचन क्षेत्र के भीतर स्थानांतरित होते हैं तो फॉर्म 8A का उपयोग करें। यदि आप अलग निर्वाचन क्षेत्र में जाते हैं तो फॉर्म 6 भरें।"
      },
      {
        question: "मतदान क्यों महत्वपूर्ण है?",
        answer: "मतदान: 1) आपको सरकार चुनने का अधिकार देता है, 2) आपकी आवाज सुनाई जाती है, 3) लोकतंत्र को मजबूत करता है, 4) भविष्य की नीतियों को प्रभावित करता है, 5) जवाबदेही सुनिश्चित करता है।"
      },
      {
        question: "क्या NRI मतदान कर सकते हैं?",
        answer: "हाँ, भारतीय मूल के विदेशी नागरिक (NRI) मतदान कर सकते हैं। उन्हें फॉर्म 6A भरकर पंजीकरण कराना होगा और मतदान के दिन भारत में उपस्थित रहना होगा।"
      }
    ],
    english: [
      {
        question: "What is the minimum age to be eligible for voting?",
        answer: "The minimum age for voting in India is 18 years. Any Indian citizen who is 18 years or older can register as a voter."
      },
      {
        question: "How to apply for voter registration?",
        answer: "You can apply online: 1) Visit National Voter Service Portal (nvsp.in), 2) Fill Form 6, 3) Upload required documents, 4) Submit application. You can also apply offline by visiting your nearest voter registration center."
      },
      {
        question: "What documents are required for voter ID card?",
        answer: "Main documents: 1) Age proof (Birth certificate, 10th marksheet), 2) Address proof (Aadhaar card, Driving license, Utility bill), 3) Photograph."
      },
      {
        question: "Can I change my voting location?",
        answer: "Yes, you can apply for voting location change. Use Form 8A if you move within the same constituency. Fill Form 6 if you move to different constituency."
      },
      {
        question: "Why is voting important?",
        answer: "Voting: 1) Gives you right to choose government, 2) Makes your voice heard, 3) Strengthens democracy, 4) Influences future policies, 5) Ensures accountability."
      },
      {
        question: "Can NRIs vote?",
        answer: "Yes, Non-Resident Indians (NRIs) can vote. They need to register by filling Form 6A and be present in India on voting day."
      }
    ]
  };

  const t = language === 'hindi' ? faqData.hindi : faqData.english;

  return (
    <div className="faq-section">
      <div className="container">
        <h2>{language === 'hindi' ? "सामान्य प्रश्न" : "Frequently Asked Questions"}</h2>
        <p className="faq-subtitle">
          {language === 'hindi' 
            ? "मतदान और पंजीकरण से संबंधित सामान्य प्रश्न" 
            : "Common questions about voting and registration"}
        </p>
        
        <div className="faq-list">
          {t.map((faq, index) => (
            <div key={index} className="faq-item">
              <div 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                style={{ cursor: 'pointer' }}
              >
                {faq.question}
                <span className="faq-toggle">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <h3>{language === 'hindi' ? "अधिक जानकारी के लिए" : "For More Information"}</h3>
          <p>
            {language === 'hindi' 
              ? "अधिक प्रश्नों के लिए हमसे संपर्क करें या आधिकारिक वेबसाइट देखें:" 
              : "Contact us for more questions or visit official websites:"}
          </p>
          <div className="faq-links">
            <a href="https://eci.gov.in" target="_blank" rel="noopener noreferrer">
              Election Commission of India
            </a>
            <a href="https://nvsp.in" target="_blank" rel="noopener noreferrer">
              National Voter Service Portal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;