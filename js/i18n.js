// i18n.js — UI strings + helpers for picking localized text and transliteration.
// Prayer/mystery content lives in the JSON data; this file only covers app chrome.

export const UI = {
  novena_title: { pl:"Nowenna Pompejańska", it:"Novena Pompeiana", fr:"Neuvaine de Pompéi", es:"Novena de Pompeya", de:"Pompejanische Novene", la:"Novena Pompeiana", ru:"Помпейская новенна", uk:"Помпейська новена", be:"Пампейская навэна", zh:"龐貝聖母九日敬禮" },
  subtitle: { pl:"54-dniowa nowenna różańcowa", it:"Novena del rosario di 54 giorni", fr:"Neuvaine du rosaire de 54 jours", es:"Novena del rosario de 54 días", de:"54-tägige Rosenkranz-Novene", la:"Novena rosarii dierum LIV", ru:"54-дневная новенна Розария", uk:"54-денна новена Розарія", be:"54-дзённая навэна Ружанца", zh:"五十四日玫瑰經九日敬禮" },
  intro: { pl:"27 dni próśb i 27 dni dziękczynienia do Matki Bożej Różańcowej z Pompei.", it:"27 giorni di supplica e 27 di ringraziamento alla Madonna del Rosario di Pompei.", fr:"27 jours de supplication et 27 d'action de grâces à Notre-Dame du Rosaire de Pompéi.", es:"27 días de súplica y 27 de acción de gracias a la Virgen del Rosario de Pompeya.", de:"27 Tage Bitte und 27 Tage Dank an die Rosenkranzkönigin von Pompeji.", la:"Dies XXVII supplicationis et XXVII gratiarum actionis ad Beatam Mariam Rosarii Pompeianam.", ru:"27 дней прошения и 27 дней благодарения Богоматери Розария Помпейской.", uk:"27 днів прохання і 27 днів подяки до Богородиці Розарія Помпейської.", be:"27 дзён просьбаў і 27 дзён падзякі да Маці Божай Ружанцовай з Пампеі.", zh:"向龐貝玫瑰聖母祈求二十七日，感恩二十七日。" },
  begin_novena: { pl:"Rozpocznij nowennę", it:"Inizia la novena", fr:"Commencer la neuvaine", es:"Comenzar la novena", de:"Novene beginnen", la:"Novenam incipere", ru:"Начать новенну", uk:"Розпочати новену", be:"Распачаць навэну", zh:"開始九日敬禮" },
  begin_day: { pl:"Rozpocznij dzień", it:"Inizia il giorno", fr:"Commencer le jour", es:"Comenzar el día", de:"Tag beginnen", la:"Diem incipere", ru:"Начать день", uk:"Почати день", be:"Пачаць дзень", zh:"開始今日" },
  continue: { pl:"Kontynuuj modlitwę", it:"Continua la preghiera", fr:"Continuer la prière", es:"Continuar la oración", de:"Gebet fortsetzen", la:"Orationem pergere", ru:"Продолжить молитву", uk:"Продовжити молитву", be:"Працягнуць малітву", zh:"繼續祈禱" },
  next: { pl:"Dalej", it:"Avanti", fr:"Suivant", es:"Siguiente", de:"Weiter", la:"Pergere", ru:"Далее", uk:"Далі", be:"Далей", zh:"下一步" },
  back: { pl:"Wstecz", it:"Indietro", fr:"Précédent", es:"Atrás", de:"Zurück", la:"Retro", ru:"Назад", uk:"Назад", be:"Назад", zh:"上一步" },
  finish_day: { pl:"Zakończ dzień", it:"Concludi il giorno", fr:"Terminer le jour", es:"Terminar el día", de:"Tag abschließen", la:"Diem concludere", ru:"Завершить день", uk:"Завершити день", be:"Завяршыць дзень", zh:"完成今日" },
  day_word: { pl:"Dzień", it:"Giorno", fr:"Jour", es:"Día", de:"Tag", la:"Dies", ru:"День", uk:"День", be:"Дзень", zh:"日" },
  language: { pl:"Język", it:"Lingua", fr:"Langue", es:"Idioma", de:"Sprache", la:"Lingua", ru:"Язык", uk:"Мова", be:"Мова", zh:"語言" },
  show_translit: { pl:"Pokaż transliterację", it:"Mostra traslitterazione", fr:"Afficher la translittération", es:"Mostrar transliteración", de:"Transliteration anzeigen", la:"Transliterationem monstrare", ru:"Показывать транслитерацию", uk:"Показувати транслітерацію", be:"Паказваць транслітарацыю", zh:"顯示音譯" },
  intention_placeholder: { pl:"W jakiej intencji się modlisz?", it:"Per quale intenzione preghi?", fr:"Pour quelle intention priez-vous ?", es:"¿Por qué intención rezas?", de:"Für welches Anliegen betest du?", la:"Pro qua intentione oras?", ru:"О каком намерении вы молитесь?", uk:"За яку інтенцію ви молитеся?", be:"За якую інтэнцыю вы моліцеся?", zh:"你為何意向祈禱？" },
  intention_note: { pl:"Ta intencja będzie Ci towarzyszyć przez całą nowennę.", it:"Questa intenzione ti accompagnerà per tutta la novena.", fr:"Cette intention vous accompagnera durant toute la neuvaine.", es:"Esta intención te acompañará durante toda la novena.", de:"Dieses Anliegen begleitet dich durch die ganze Novene.", la:"Haec intentio te per totam novenam comitabitur.", ru:"Это намерение будет сопровождать вас всю новенну.", uk:"Ця інтенція супроводжуватиме вас усю новену.", be:"Гэтая інтэнцыя будзе суправаджаць вас усю навэну.", zh:"此意向將伴隨你完成整個九日敬禮。" },
  edit: { pl:"Edytuj", it:"Modifica", fr:"Modifier", es:"Editar", de:"Bearbeiten", la:"Mutare", ru:"Изменить", uk:"Змінити", be:"Змяніць", zh:"編輯" },
  save: { pl:"Zapisz", it:"Salva", fr:"Enregistrer", es:"Guardar", de:"Speichern", la:"Servare", ru:"Сохранить", uk:"Зберегти", be:"Захаваць", zh:"儲存" },
  cancel: { pl:"Anuluj", it:"Annulla", fr:"Annuler", es:"Cancelar", de:"Abbrechen", la:"Renuntiare", ru:"Отмена", uk:"Скасувати", be:"Скасаваць", zh:"取消" },
  skip_for_now: { pl:"Pomiń na razie", it:"Salta per ora", fr:"Passer pour l'instant", es:"Omitir por ahora", de:"Vorerst überspringen", la:"Nunc praeterire", ru:"Пропустить пока", uk:"Пропустити поки", be:"Прапусціць пакуль", zh:"暫時略過" },
  tap_to_count: { pl:"Dotknij, aby liczyć", it:"Tocca per contare", fr:"Touchez pour compter", es:"Toca para contar", de:"Zum Zählen tippen", la:"Tange ad numerandum", ru:"Коснитесь, чтобы считать", uk:"Торкніться, щоб лічити", be:"Дакраніцеся, каб лічыць", zh:"輕觸計數" },
  scripture_add: { pl:"Dodaj tekst Pisma", it:"Aggiungi il testo biblico", fr:"Ajouter le texte biblique", es:"Añadir el texto bíblico", de:"Bibeltext hinzufügen", la:"Textum Scripturae addere", ru:"Добавить текст Писания", uk:"Додати текст Письма", be:"Дадаць тэкст Пісьма", zh:"加入聖經經文" },
  scripture_hint: { pl:"Wklej własny tekst z legalnie posiadanej Biblii. Zapisywany tylko na tym urządzeniu.", it:"Incolla il testo dalla tua Bibbia. Salvato solo su questo dispositivo.", fr:"Collez le texte de votre Bible. Enregistré uniquement sur cet appareil.", es:"Pega el texto de tu Biblia. Guardado solo en este dispositivo.", de:"Füge den Text aus deiner Bibel ein. Nur auf diesem Gerät gespeichert.", la:"Textum ex Bibliis tuis insere. Solum in hoc instrumento servatur.", ru:"Вставьте текст из вашей Библии. Хранится только на этом устройстве.", uk:"Вставте текст із вашої Біблії. Зберігається лише на цьому пристрої.", be:"Устаўце тэкст з вашай Бібліі. Захоўваецца толькі на гэтай прыладзе.", zh:"貼上你聖經中的經文。僅儲存於此裝置。" },
  meditation: { pl:"Rozważanie", it:"Meditazione", fr:"Méditation", es:"Meditación", de:"Betrachtung", la:"Meditatio", ru:"Размышление", uk:"Роздум", be:"Разважанне", zh:"默想" },
  mystery_word: { pl:"Tajemnica", it:"Mistero", fr:"Mystère", es:"Misterio", de:"Geheimnis", la:"Mysterium", ru:"Тайна", uk:"Таїна", be:"Таямніца", zh:"奧蹟" },
  opening_section: { pl:"Wprowadzenie", it:"Introduzione", fr:"Introduction", es:"Introducción", de:"Einleitung", la:"Introductio", ru:"Вступление", uk:"Вступ", be:"Уступ", zh:"開端" },
  closing_section: { pl:"Zakończenie", it:"Conclusione", fr:"Conclusion", es:"Conclusión", de:"Abschluss", la:"Conclusio", ru:"Заключение", uk:"Завершення", be:"Заканчэнне", zh:"結束" },
  day_done_title: { pl:"Dzień ukończony", it:"Giorno completato", fr:"Jour terminé", es:"Día completado", de:"Tag abgeschlossen", la:"Dies completus", ru:"День завершён", uk:"День завершено", be:"Дзень завершаны", zh:"今日已完成" },
  day_done_body: { pl:"Niech Maryja zachowa Twoją intencję w swoim Sercu.", it:"Che Maria custodisca la tua intenzione nel suo Cuore.", fr:"Que Marie garde votre intention dans son Cœur.", es:"Que María guarde tu intención en su Corazón.", de:"Maria bewahre dein Anliegen in ihrem Herzen.", la:"Maria intentionem tuam in Corde suo custodiat.", ru:"Да сохранит Мария ваше намерение в Своём Сердце.", uk:"Нехай Марія збереже вашу інтенцію у Своєму Серці.", be:"Няхай Марыя захавае вашу інтэнцыю ў Сваім Сэрцы.", zh:"願聖母將你的意向珍藏於心。" },
  mark_complete: { pl:"Zapisz dzień jako ukończony", it:"Segna il giorno come completato", fr:"Marquer le jour comme terminé", es:"Marcar el día como completado", de:"Tag als abgeschlossen markieren", la:"Diem ut completum signare", ru:"Отметить день завершённым", uk:"Позначити день завершеним", be:"Адзначыць дзень завершаным", zh:"標記今日完成" },
  back_home: { pl:"Strona główna", it:"Pagina iniziale", fr:"Accueil", es:"Inicio", de:"Startseite", la:"Initium", ru:"Главная", uk:"Головна", be:"Галоўная", zh:"首頁" },
  restart_day: { pl:"Zacznij dzień od nowa", it:"Ricomincia il giorno", fr:"Recommencer le jour", es:"Reiniciar el día", de:"Tag neu beginnen", la:"Diem denuo incipere", ru:"Начать день заново", uk:"Почати день знову", be:"Пачаць дзень нанова", zh:"重新開始今日" },
  finished_title: { pl:"Nowenna ukończona", it:"Novena completata", fr:"Neuvaine achevée", es:"Novena completada", de:"Novene vollendet", la:"Novena completa", ru:"Новенна завершена", uk:"Новену завершено", be:"Навэна завершана", zh:"九日敬禮圓滿完成" },
  finished_body: { pl:"Przeżyłeś wszystkie 54 dni. „I nigdy nie słyszano, abyś kogokolwiek opuściła.”", it:"Hai vissuto tutti i 54 giorni. «Non si è mai udito che tu abbia abbandonato qualcuno.»", fr:"Vous avez vécu les 54 jours. « On n'a jamais entendu dire que vous ayez abandonné quelqu'un. »", es:"Has vivido los 54 días. «Jamás se oyó decir que abandonaras a nadie.»", de:"Du hast alle 54 Tage vollendet. „Noch nie wurde gehört, dass du jemanden verlassen hast.“", la:"Omnes dies LIV complevisti. «Numquam auditum est quemquam a te derelictum esse.»", ru:"Вы прошли все 54 дня. «Никогда не было слышно, чтобы Ты оставила кого-либо.»", uk:"Ви пройшли всі 54 дні. «Ніколи не чувано, щоб Ти когось залишила.»", be:"Вы прайшлі ўсе 54 дні. «Ніколі не было чутна, каб Ты каго пакінула.»", zh:"你已走過全部五十四日。「從未聽聞祢曾遺棄求祢庇佑的人。」" },
  start_new: { pl:"Rozpocznij nową nowennę", it:"Inizia una nuova novena", fr:"Commencer une nouvelle neuvaine", es:"Comenzar una nueva novena", de:"Neue Novene beginnen", la:"Novam novenam incipere", ru:"Начать новую новенну", uk:"Розпочати нову новену", be:"Распачаць новую навэну", zh:"開始新的九日敬禮" },
  confirm_restart_novena: { pl:"Rozpocząć nową nowennę od dnia 1? Bieżący postęp zostanie wyzerowany.", it:"Iniziare una nuova novena dal giorno 1? I progressi attuali saranno azzerati.", fr:"Commencer une nouvelle neuvaine au jour 1 ? La progression actuelle sera réinitialisée.", es:"¿Comenzar una nueva novena desde el día 1? El progreso actual se restablecerá.", de:"Neue Novene ab Tag 1 beginnen? Der aktuelle Fortschritt wird zurückgesetzt.", la:"Novam novenam a die 1 incipere? Progressus praesens delebitur.", ru:"Начать новую новенну с дня 1? Текущий прогресс будет сброшен.", uk:"Розпочати нову новену з дня 1? Поточний прогрес буде скинуто.", be:"Распачаць новую навэну з дня 1? Бягучы прагрэс будзе скінуты.", zh:"從第 1 日開始新的九日敬禮？目前進度將被重設。" },
  of_word: { pl:"z", it:"di", fr:"sur", es:"de", de:"von", la:"ex", ru:"из", uk:"з", be:"з", zh:"／" },

  signin_title: { pl:"Zaloguj się", it:"Accedi", fr:"Connexion", es:"Iniciar sesión", de:"Anmelden", la:"Ingredere", ru:"Вход", uk:"Вхід", be:"Уваход", zh:"登入" },
  signin_sub: { pl:"Zaloguj się kontem WillpowerLab, aby się modlić.", it:"Accedi con il tuo account WillpowerLab per pregare.", fr:"Connectez-vous avec votre compte WillpowerLab pour prier.", es:"Inicia sesión con tu cuenta de WillpowerLab para rezar.", de:"Melde dich mit deinem WillpowerLab-Konto an, um zu beten.", la:"Ingredere ratione WillpowerLab tua ut ores.", ru:"Войдите через аккаунт WillpowerLab, чтобы молиться.", uk:"Увійдіть через акаунт WillpowerLab, щоб молитися.", be:"Увайдзіце праз рахунак WillpowerLab, каб маліцца.", zh:"使用 WillpowerLab 帳戶登入以開始祈禱。" },
  email_label: { pl:"E-mail", it:"E-mail", fr:"E-mail", es:"Correo electrónico", de:"E-Mail", la:"E-mail", ru:"Эл. почта", uk:"Ел. пошта", be:"Эл. пошта", zh:"電子郵件" },
  password_label: { pl:"Hasło", it:"Password", fr:"Mot de passe", es:"Contraseña", de:"Passwort", la:"Tessera", ru:"Пароль", uk:"Пароль", be:"Пароль", zh:"密碼" },
  signin_btn: { pl:"Zaloguj się", it:"Accedi", fr:"Se connecter", es:"Entrar", de:"Anmelden", la:"Ingredere", ru:"Войти", uk:"Увійти", be:"Увайсці", zh:"登入" },
  signing_in: { pl:"Logowanie…", it:"Accesso…", fr:"Connexion…", es:"Entrando…", de:"Anmeldung…", la:"Ingrediens…", ru:"Вход…", uk:"Вхід…", be:"Уваход…", zh:"登入中…" },
  forgot_password: { pl:"Nie pamiętasz hasła?", it:"Password dimenticata?", fr:"Mot de passe oublié ?", es:"¿Olvidaste tu contraseña?", de:"Passwort vergessen?", la:"Tesseram oblitus es?", ru:"Забыли пароль?", uk:"Забули пароль?", be:"Забылі пароль?", zh:"忘記密碼？" },
  no_account: { pl:"Nie masz konta? Załóż je", it:"Non hai un account? Creane uno", fr:"Pas de compte ? Créez-en un", es:"¿No tienes cuenta? Crea una", de:"Kein Konto? Erstelle eins", la:"Rationem non habes? Crea", ru:"Нет аккаунта? Создайте", uk:"Немає акаунта? Створіть", be:"Няма рахунку? Стварыце", zh:"沒有帳戶？前往註冊" },
  signin_error: { pl:"Nie udało się zalogować. Sprawdź dane.", it:"Accesso non riuscito. Controlla i dati.", fr:"Échec de la connexion. Vérifiez vos identifiants.", es:"No se pudo iniciar sesión. Verifica tus datos.", de:"Anmeldung fehlgeschlagen. Prüfe deine Daten.", la:"Ingressus defecit. Data examina.", ru:"Не удалось войти. Проверьте данные.", uk:"Не вдалося увійти. Перевірте дані.", be:"Не ўдалося ўвайсці. Праверце даныя.", zh:"登入失敗，請檢查你的資料。" },
  account: { pl:"Konto", it:"Account", fr:"Compte", es:"Cuenta", de:"Konto", la:"Ratio", ru:"Аккаунт", uk:"Акаунт", be:"Рахунак", zh:"帳戶" },
  sign_out: { pl:"Wyloguj się", it:"Esci", fr:"Se déconnecter", es:"Cerrar sesión", de:"Abmelden", la:"Exire", ru:"Выйти", uk:"Вийти", be:"Выйсці", zh:"登出" },
};

export const CATEGORY = {
  joyful:    { pl:"Radosna",    it:"Gaudioso",     fr:"Joyeux",     es:"Gozoso",    de:"Freudenreich", la:"Gaudiosum", ru:"Радостная", uk:"Радісна",  be:"Радасная",  zh:"歡喜" },
  luminous:  { pl:"Światła",    it:"Luminoso",     fr:"Lumineux",   es:"Luminoso",  de:"Lichtreich",   la:"Luminosum", ru:"Светлая",   uk:"Світла",   be:"Светлая",   zh:"光明" },
  sorrowful: { pl:"Bolesna",    it:"Doloroso",     fr:"Douloureux", es:"Doloroso",  de:"Schmerzhaft",  la:"Dolorosum", ru:"Скорбная",  uk:"Скорботна", be:"Балесная", zh:"痛苦" },
  glorious:  { pl:"Chwalebna",  it:"Glorioso",     fr:"Glorieux",   es:"Glorioso",  de:"Glorreich",    la:"Gloriosum", ru:"Славная",   uk:"Славна",   be:"Хвалебная", zh:"榮福" },
};

const FALLBACK = "pl";

// Pick a localized string from a { lang: text } map, falling back gracefully.
export function pick(map, lang) {
  if (!map) return "";
  return map[lang] ?? map[FALLBACK] ?? Object.values(map)[0] ?? "";
}

// Pick the transliteration for a map + language, or "" if none.
export function pickTranslit(map, lang, langMeta) {
  if (!map || !langMeta || !langMeta.has_translit) return "";
  return map[langMeta.translit_key] ?? "";
}

// UI string shortcut.
export function ui(key, lang) {
  return pick(UI[key], lang);
}

// "Dzień 3 / 54" with locale-aware ordering for Chinese.
export function formatDay(n, total, lang) {
  if (lang === "zh") return `第 ${n} 日 ／ ${total}`;
  return `${ui("day_word", lang)} ${n} ${ui("of_word", lang)} ${total}`;
}
