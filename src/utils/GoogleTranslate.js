// GoogleTranslate.js
import React, { useState, useEffect } from "react";

const GoogleTranslate = () => {
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    const apiKey = "AIzaSyD-OxXZntSk69Vp-MDipfDGoLNVOdlygUA"; // Replace with your actual API key
    const sourceLanguage = "en"; // Source language
    const targetLanguage = "es"; // Target language

    const translatePage = async () => {
      try {
        const response = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              q: document.documentElement.innerHTML, // Translate the entire page content
              source: sourceLanguage,
              target: targetLanguage,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Translation request failed");
        }

        console.log(response);
        const data = await response.json();
        const translatedHtml = data.data.translations[0].translatedText;
        setTranslation(translatedHtml);
      } catch (error) {
        console.error("Error translating page:", error);
      }
    };

    translatePage();
  }, []);

  return (
    translation && <div dangerouslySetInnerHTML={{ __html: translation }} />
  );
};

export default GoogleTranslate;
