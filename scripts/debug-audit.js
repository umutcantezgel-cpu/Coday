
const API_KEY = "AIzaSyB5jP8OOs1FrVi92WAPk2fFLOmCBj34uxM"; // Using the first key from config for testing

async function testGemini() {
    const prompt = `
    Website URL: https://www.google.com
    
    HINWEIS: Dies könnte eine Single-Page-App (SPA) sein. Wenn der Body-Inhalt leer erscheint, analysiere die METADATA und Ressourcen.
    Falls keine sinnvolle Analyse möglich ist, gib einen Score von 50 und erkläre im Summary "Eingeschränkte Analyse da Inhalte per JavaScript geladen werden (SPA).".
    
    HTML-Auszug:
    <title>Google</title>
    
    ANTWORTE NUR MIT DIESEM STRICTEN JSON FORMAT:
    {
      "score": NUMBER,
      "summary": "STRING",
      "issues": [{"severity": "high|medium|low", "title": "STRING", "description": "STRING"}]
    }`;

    console.log("Calling Gemini 2.0 Flash...");

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 2048,
                        responseMimeType: "application/json", // This is the fix we suspect is needed
                    }
                })
            }
        );

        const data = await response.json();

        if (data.error) {
            console.error("API Error:", JSON.stringify(data.error, null, 2));
            return;
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log("--- RAW RESPONSE ---");
        console.log(text);
        console.log("--- END RAW RESPONSE ---");

        try {
            const parsed = JSON.parse(text);
            console.log("\n✅ Valid JSON Parsed:");
            console.log(parsed);
        } catch (e) {
            console.error("\n❌ JSON Parse Error:", e.message);
        }

    } catch (e) {
        console.error("Network Error:", e);
    }
}

testGemini();
