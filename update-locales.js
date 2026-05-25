const fs = require('fs');

const careersDe = {
  "jobs": {
    "hero_title_prefix": "Wir suchen",
    "culture_badge": "Teamkultur",
    "hero_rotating": ["Entwickler", "Designer", "Talente"],
    "hero_desc": "Werde Teil unseres Teams und gestalte die digitale Zukunft.",
    "list": [
      {
        "id": "1",
        "type": "Vollzeit",
        "location": "Wetzlar / Remote",
        "title": "Senior Frontend Developer",
        "desc": "Wir suchen einen erfahrenen Frontend-Entwickler mit React und Next.js Erfahrung.",
        "mailtoSubject": "Bewerbung als Senior Frontend Developer"
      }
    ],
    "button": "Jetzt bewerben",
    "no_jobs": {
      "title": "Keine passende Stelle dabei?",
      "desc": "Wir sind immer auf der Suche nach Talenten. Bewirb dich initiativ!",
      "button": "Initiativbewerbung"
    }
  },
  "culture": {
    "hero": {
      "title_start": "Unsere",
      "title_gradient": "Kultur",
      "desc": "Wir arbeiten mit Leidenschaft, Transparenz und Innovation.",
      "badge": "Über uns"
    },
    "values": {
      "title": "Unsere Werte",
      "desc": "Das ist uns wichtig.",
      "items": [
        "Transparenz in jedem Schritt",
        "Höchste Code-Qualität",
        "Echte Partnerschaften"
      ]
    },
    "team": {
      "title": "Das Team",
      "desc": "Lerne die Menschen hinter Coday kennen."
    }
  }
};

const careersEn = {
  "jobs": {
    "hero_title_prefix": "We are hiring",
    "culture_badge": "Culture",
    "hero_rotating": ["Developers", "Designers", "Talents"],
    "hero_desc": "Join our team and shape the digital future.",
    "list": [
      {
        "id": "1",
        "type": "Full-time",
        "location": "Wetzlar / Remote",
        "title": "Senior Frontend Developer",
        "desc": "We are looking for an experienced frontend developer with React and Next.js experience.",
        "mailtoSubject": "Application for Senior Frontend Developer"
      }
    ],
    "button": "Apply now",
    "no_jobs": {
      "title": "No suitable position?",
      "desc": "We are always looking for talents. Send us an unsolicited application!",
      "button": "Unsolicited Application"
    }
  },
  "culture": {
    "hero": {
      "title_start": "Our",
      "title_gradient": "Culture",
      "desc": "We work with passion, transparency, and innovation.",
      "badge": "About us"
    },
    "values": {
      "title": "Our Values",
      "desc": "This is what matters to us.",
      "items": [
        "Transparency in every step",
        "Highest code quality",
        "True partnerships"
      ]
    },
    "team": {
      "title": "The Team",
      "desc": "Meet the people behind Coday."
    }
  }
};

const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
de.careers = careersDe;
fs.writeFileSync('messages/de.json', JSON.stringify(de, null, 2));

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
en.careers = careersEn;
fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));

console.log('Updated messages/de.json and messages/en.json');
