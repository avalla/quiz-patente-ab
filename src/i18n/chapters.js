const chapterTranslations = {
  1: {
    it: 'Definizioni stradali e di traffico',
    en: 'Road and traffic definitions',
  },
  2: {
    it: 'Segnali di pericolo',
    en: 'Danger signs',
  },
  3: {
    it: 'Segnali di divieto',
    en: 'Prohibition signs',
  },
  4: {
    it: 'Segnali di obbligo',
    en: 'Mandatory signs',
  },
  5: {
    it: 'Segnali di precedenza',
    en: 'Right-of-way signs',
  },
  6: {
    it: 'Segnaletica orizzontale',
    en: 'Road markings',
  },
  7: {
    it: 'Segnalazioni semaforiche',
    en: 'Traffic light signals',
  },
  8: {
    it: 'Segnali di indicazione',
    en: 'Information signs',
  },
  9: {
    it: 'Segnali complementari',
    en: 'Supplementary signs',
  },
  10: {
    it: 'Pannelli integrativi dei segnali',
    en: 'Supplementary panels',
  },
  11: {
    it: 'Limiti di velocità',
    en: 'Speed limits',
  },
  12: {
    it: 'Distanza di sicurezza',
    en: 'Safe following distance',
  },
  13: {
    it: 'Norme sulla circolazione dei veicoli',
    en: 'Rules for vehicle circulation',
  },
  14: {
    it: 'Esempi di precedenza (ordine di precedenza agli incroci)',
    en: 'Right-of-way examples (priority at intersections)',
  },
  15: {
    it: 'Norme sul sorpasso',
    en: 'Overtaking rules',
  },
  16: {
    it: 'Fermata, sosta, arresto e partenza',
    en: 'Stopping, parking, halting and moving off',
  },
  17: {
    it: 'Ingombro della carreggiata',
    en: 'Roadway obstruction',
  },
  18: {
    it: 'Uso delle luci',
    en: 'Use of lights',
  },
  19: {
    it: 'Dispositivi di equipaggiamento: funzione ed uso',
    en: 'Equipment devices: function and use',
  },
  20: {
    it: 'Patenti di guida',
    en: 'Driving licences',
  },
  21: {
    it: 'Comportamenti per prevenire incidenti stradali',
    en: 'Behaviours to prevent road accidents',
  },
  22: {
    it: 'Guida in relazione alle qualità e condizioni fisiche e psichiche',
    en: 'Driving in relation to physical and mental conditions',
  },
  23: {
    it: 'Responsabilità civile, penale, amministrativa',
    en: 'Civil, criminal and administrative liabilities',
  },
  24: {
    it: 'Limitazione dei consumi',
    en: 'Reducing consumption',
  },
  25: {
    it: 'Elementi costitutivi del veicolo importanti per la sicurezza',
    en: 'Vehicle components important for safety',
  },
};

const mockTestTranslation = {
  it: "Prova d'esame simulata",
  en: 'Mock test',
};

function buildLabel(id, it, en) {
  if (en) {
    return `${id !== null ? `${id}. ` : ''}${it} - ${en}`;
  }
  return `${id !== null ? `${id}. ` : ''}${it}`;
}

export function getChapterLabel({ id_chapter, descrizione }) {
  const translation = chapterTranslations[id_chapter] || {};
  const italian = translation.it || descrizione;
  const english = translation.en || '';
  return buildLabel(id_chapter, italian, english);
}

export function getMockTestLabel() {
  return buildLabel(null, mockTestTranslation.it, mockTestTranslation.en);
}

export default chapterTranslations;
