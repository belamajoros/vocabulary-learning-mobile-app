import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from 'react-native-localize';

const deviceLanguage = RNLocalize.getLocales()[0].languageCode;

RNLocalize.addEventListener('change', function(){
  const language = RNLocalize.getLocales()[0].languageCode;
  i18n.changeLanguage(language);
});

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Welcome!": "Welcome!",
    }
  },
  sk: {
    translation: {
        "Welcome!": "Vitaj!",
        "Welcome": "Vitaj",
        "Password": "Heslo",
        "Your email" : "Váš email",
        "Your password": "Vaše heslo",
        "Forgot your password?" : "Zabudli ste heslo?",
        "Sign in" : "Prihlásiť sa",
        "Sign up" : "Vytvoriť nový účet",
        "Passwords do not match": "Heslá sa nezhodujú",
        "You have successfully registered your account!" : "Úspešne ste zaregistrovali svoj účet!",
        "Register a new account!" : "Zaregistrujte si nový účet!",
        "Re-enter password" : "Potvrdiť heslo",
        "Welcome to" : "Vitajte v",
        "Let's get started!" : "Začnime!",
        "Please sign in" : "Prihláste sa",
        "Enter your email to reset your password" : "Zadajte svoj e-mail a obnovte svoje heslo",
        "Reset Password" : "Obnoviť heslo",
        "Back to login" : "Späť na prihlásenie",
        "Translator" : "Prekladač",
        "Translate" : "Prekladať",
        "Enter a word/sentence you wish to translate to Slovak" : "Zadajte slovo/vetu, ktoré chcete preložiť do slovenčiny",
        "Translation of the word" : "Preklad slova",
        "Translation of the sentence is" : "Preklad vety je",
        "is" : "je",
        "Add word" : "Pridať slovo",
        "to the library" : "do knižnice",
        "Success!" : "Úspech!",
        "Okay" : "Dobre",
        "Scan" : "Skenovať",
        "Library" : "Knižnica",
        "Home" : "Domov",
        "Log out" : "Odhlásiť sa",
        "Scan text" : "Naskenujte text",
        "The system has recognized the following words" : "Systém rozpoznal nasledujúce slová",
        "I want to scan another text!" : "Chcem naskenovať ďalší text!",
        "Translation of the word is" : "Preklad slova je",
        "Hide" : "Skryť",
        "Add word to the library" : "Pridať slovo do knižnice",
        "You have learned " : "Túto slovnú zásobu ste sa doteraz naučili",
        "Remove sentence from library" : "Odstrániť vetu z knižnice",
        "Remove word from library" : "Odstrániť slovo z knižnice",
        "Word already exists in the library" : "Slovo už v knižnici existuje",
        "There was an error: " : "Vyskytla sa chyba: ",
        "You have not learned a word yet !" : "Zatiaľ ste sa nenaučili ani slovo",
        "You have learned this vocabulary so far !" : "Túto slovnú zásobu ste sa doteraz naučili",
        "Scan english text and the system will extract unknown words from it!" : "Naskenujte anglický text a systém z neho extrahuje neznáme slová!",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: deviceLanguage,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;