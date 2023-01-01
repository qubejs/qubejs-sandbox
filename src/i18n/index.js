import en from './langs/en.json';
import es from './langs/es.json';
// import ar from './langs/ar.json';
// import hn from './langs/hn.json';
// import dt from './langs/dt.json';
import fr from './langs/fr.json';
// import hgr from './langs/hgr.json';
// import rs from './langs/rs.json';
// import gr from './langs/gr.json';
// import it from './langs/it.json';

const language = (name, lang, messages, dir) => {
  return {
    name: name,
    language: lang,
    messages,
    direction: dir || 'ltr'
  };
};

const languages = {
  en: language('English', 'en', en),
  // hn: language('Hindi', 'hn', hn),
  es: language('Spanish', 'es', es),
  // ar: language('Arabic', 'ar', ar),
  // dt: language('Dutch', 'dt', dt),
  fr: language('French', 'fr', fr)
  // hgr: language('Hungarian', 'hgr', hgr),
  // rs: language('Russian', 'rs', rs),
  // gr: language('German', 'gr', gr),
  // it: language('Itallian', 'it', it)
};

export default languages;
