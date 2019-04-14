import i18n from "i18next";
import {initReactI18next} from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "All days": "All days",
      "Home": "Home",
      "Add new day": "Add new day",
      "SW": "SW",
      "EN": "EN",
      "Sign out": "Sign out",
      "Amount in KG": "Amount in KG",
      "Repetitions": "Repetitions",
      "Save set": "Save set",
      "Discard set": "Discard set",
      "Add set": "Add set",
      "Click on a set for different actions": "Click on a set for different actions (soon, anyway ;))",
      "Save exercise": "Save exercise",
      "Feeling": "Feeling",
      "Discard exercise": "Discard exercise",
      "Open detailed view": "Open detailed view",
      "Add exercise": "Add exercise",
      "Exercise name": "Exercise name",
      "Workout location": "Workout location",
      "Muscle groups": "Muscle groups",
      "Title": "Title",
      "Start time": "Start time",
      "End time": "End time",
      "Edit day": "Edit day",
      "End day": "End day",
      "Delete day": "Delete day",
      "Click to": "Click to",
      "collapse": "collapse",
      "expand": "expand",
      "Amount must be 0 or higher": "Amount must be 0 or higher",
      "Repetitions must be higher than 1": "Repetitions must be higher than 1",
      "Index must be higher than 1": "Index must be higher than 1",
      "Save new day": "Save new day",
      "Start date": "Start date",
      "End date": "End date",
      "must be set": "must be set",
      "Update day": "Update day",
      "Save": "Save",
      "Discard": "Discard",
      "Abort": "Abort",
      "Title can't be empty": "Title can't be empty",
      "Delete": "Delete",
      "to edit": "to edit",
      "Welcome to your": "Welcome to your",
      "exercise diary": "exercise diary",
      "This application will help you to": "This application will help you to",
      "Exercise type": "Exercise type",
      "Sets and reps": "Sets and reps",
      "Time and distance": "Time and distance",
      "Notes": "Notes",
      "Stop timer": "Stop timer",
      "Start timer": "Start timer",
      "Click again to delete!": "Click again to delete!",

      // Features
      "Track your sets and repetitions": "Track your sets and repetitions",
      "Track your cardio machines": "Track your cardio machines",
      "See how long you've been exercising": "See how long you've been exercising",
      "Know how long you ran last time": "Know how long you ran last time",
      "Know how long your rest has been": "Know how long your rest has been",
      "Know what you lifted last time": "Know what you lifted last time",
      "Know how fast you ran last time": "Know how fast you ran last time",
    }
  },
  sv: {
    translation: {
      "All days": "Alla dagar",
      "Home": "Hem",
      "Add new day": "Lägg till ny dag",
      "SW": "SV",
      "EN": "EN",
      "Sign out": "Logga ut",
      "Amount in KG": "Vikt (kg)",
      "Repetitions": "Repetitioner",
      "Save set": "Spara set",
      "Discard set": "Avbryt",
      "Add set": "Nytt set",
      "Click on a set for different actions": "Tryck på ett set för olika aktioner (snart, iaf ;))",
      "Save exercise": "Spara övning",
      "Feeling": "Känsla",
      "Discard exercise": "Avbryt",
      "Open detailed view": "Öppna detaljvyn",
      "Add exercise": "Ny övning",
      "Exercise name": "Övningsnamn",
      "Workout location": "Träningslokal",
      "Muscle groups": "Muskelgrupper",
      "Title": "Titel",
      "Start time": "Starttid",
      "End time": "Sluttid",
      "Edit day": "Redigera dag",
      "End day": "Avsluta dag",
      "Delete day": "Ta bort dag",
      "Click to": "Klicka för att",
      "collapse": "fälla ihop",
      "expand": "veckla ut",
      "Amount must be 0 or higher": "Vikten måste vara 0 eller högre",
      "Repetitions must be higher than 1": "Repetitioner måste vara högre än 1",
      "Index must be higher than 1": "Index måste vara högre än 1",
      "Save new day": "Lägg till ny dag",
      "Start date": "Startdatum",
      "End date": "Slutdatum",
      "must be set": "måste finnas",
      "Update day": "Uppdatera dag",
      "Save": "Spara",
      "Discard": "Avbryt",
      "Abort": "Avbryt",
      "Title can't be empty": "Titel kan inte vara tom",
      "Delete": "Ta bort",
      "to edit": "för att redigera",
      "Welcome to your": "Välkommen till din",
      "exercise diary": "träningsdagbok",
      "This application will help you to": "Denna applikation hjälper dig att",
      "Exercise type": "Övningstyp",
      "Sets and reps": "Set och repetitioner",
      "Time and distance": "Flås",
      "Notes": "Noteringar",
      "Stop timer": "Stoppa timern",
      "Start timer": "Starta timern",
      "Click again to delete!": "Klicka igen för att ta bort",

      // Features
      "Track your sets and repetitions": "Hålla koll på dina set och repetitioner",
      "Track your cardio machines": "Hålla koll på dina flåsmaskiner",
      "See how long you've been exercising": "Se hur länge du har tränat",
      "Know how long you ran last time": "Veta hur länge du sprang förra gången",
      "Know how long your rest has been": "Veta hur länge du har vilat",
      "Know what you lifted last time": "Veta vad du lyfte förra gången",
      "Know how fast you ran last time": "Veta hur snabbt du sprang förra gången",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "sv",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
