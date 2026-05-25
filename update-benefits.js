const fs = require('fs');

const benefitsDe = {
  "hero": {
    "badge": "Vorteile",
    "title": "Deine Benefits bei Coday",
    "desc": "Wir bieten dir mehr als nur einen Arbeitsplatz."
  },
  "items": [
    {
      "icon": "rocket_launch",
      "title": "Weiterentwicklung",
      "text": "Stetiges Lernen."
    },
    {
      "icon": "heart",
      "title": "Gesundheit",
      "text": "Wir kümmern uns um deine Gesundheit."
    },
    {
      "icon": "users",
      "title": "Tolles Team",
      "text": "Wir arbeiten zusammen an spannenden Projekten."
    }
  ]
};

const benefitsEn = {
  "hero": {
    "badge": "Benefits",
    "title": "Your Benefits at Coday",
    "desc": "We offer more than just a job."
  },
  "items": [
    {
      "icon": "rocket_launch",
      "title": "Growth",
      "text": "Continuous learning."
    },
    {
      "icon": "heart",
      "title": "Health",
      "text": "We care about your health."
    },
    {
      "icon": "users",
      "title": "Great Team",
      "text": "We work together on exciting projects."
    }
  ]
};

const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));
de.careers.benefits = benefitsDe;
fs.writeFileSync('messages/de.json', JSON.stringify(de, null, 2));

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
en.careers.benefits = benefitsEn;
fs.writeFileSync('messages/en.json', JSON.stringify(en, null, 2));

console.log('Updated benefits in messages');
