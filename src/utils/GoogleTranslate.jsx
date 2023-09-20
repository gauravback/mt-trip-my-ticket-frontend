// GoogleTranslate.js
import React, { useState, useEffect } from "react";

const GoogleTranslate = () => {
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    const apiKey = "AIzaSyBAnWxJRhe-B073Vc5aq3kcBOidwjhO67w"; // Replace with your actual API key
    const sourceLanguage = "en"; // Source language
    const targetLanguage = "es"; // Target language

    const translatePage = async () => {
      console.log(document.documentElement.innerText);
      try {
        const response = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              q: document.documentElement.innerText, // Translate the entire page content
              source: sourceLanguage,
              target: targetLanguage,
            }),
          }
        );

        // if (!response.ok) {
        //   throw new Error("Translation request failed");
        // }

        const data = await response.json();
        console.log(data);
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
