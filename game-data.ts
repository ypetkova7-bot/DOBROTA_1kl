export interface Question {
  id: string
  text: string
  options: { label: string; text: string }[]
  correctAnswer: string
}

export interface Mission {
  id: number
  name: string
  description: string
  questions: Record<string, Question[]>
}

export interface Team {
  id: string
  name: string
  colorClass: string
  bgClass: string
  icon: string
}

export const teams: Team[] = [
  {
    id: "honesty",
    name: "Пазители на честността",
    colorClass: "text-[oklch(0.65_0.18_200)]",
    bgClass: "bg-[oklch(0.65_0.18_200)]",
    icon: "⭐",
  },
  {
    id: "fairness",
    name: "Пазители на справедливостта",
    colorClass: "text-[oklch(0.7_0.18_330)]",
    bgClass: "bg-[oklch(0.7_0.18_330)]",
    icon: "⚖️",
  },
  {
    id: "friendship",
    name: "Пазители на приятелството",
    colorClass: "text-[oklch(0.65_0.2_145)]",
    bgClass: "bg-[oklch(0.65_0.2_145)]",
    icon: "💚",
  },
  {
    id: "kindness",
    name: "Пазители на добрите думи",
    colorClass: "text-[oklch(0.75_0.15_80)]",
    bgClass: "bg-[oklch(0.75_0.15_80)]",
    icon: "💬",
  },
]

export const story = `Добре дошли, смели пазители! В далечното царство на Добротата живееха щастливи хора. Те винаги показваха учтивост към другите и ценяха приятелството. Но една тъмна сянка дойде и скри Диаманта на Добротата!

Без диаманта хората забравиха какво е честност и справедливост. Вашата мисия е да върнете доброта в кралството! Ще преминете през три мисии и ще докажете, че разбирате истинската сила на добрите дела.

Готови ли сте да станете истински Пазители на Добротата?`

export const missions: Mission[] = [
  {
    id: 1,
    name: "Разпознавам доброто",
    description: "Открийте кое поведение е правилно!",
    questions: {
      honesty: [
        {
          id: "h1q1",
          text: "Какво означава да си честен?",
          options: [
            { label: "А", text: "Да казваш истината" },
            { label: "Б", text: "Да крадеш бонбони" },
            { label: "В", text: "Да лъжеш мама" },
          ],
          correctAnswer: "А",
        },
        {
          id: "h1q2",
          text: "Ако намериш чужда играчка, какво трябва да направиш?",
          options: [
            { label: "А", text: "Да я скриеш" },
            { label: "Б", text: "Да я върнеш на собственика" },
            { label: "В", text: "Да я вземеш за себе си" },
          ],
          correctAnswer: "Б",
        },
      ],
      fairness: [
        {
          id: "f1q1",
          text: "Какво е справедливост?",
          options: [
            { label: "А", text: "Само аз да получавам бонбони" },
            { label: "Б", text: "Всички да получат по равно" },
            { label: "В", text: "Да взема повече от другите" },
          ],
          correctAnswer: "Б",
        },
        {
          id: "f1q2",
          text: "В играта Мария иска да играе, но няма място. Какво правим?",
          options: [
            { label: "А", text: "Казваме ѝ да си тръгне" },
            { label: "Б", text: "Правим място за нея" },
            { label: "В", text: "Игнорираме я" },
          ],
          correctAnswer: "Б",
        },
      ],
      friendship: [
        {
          id: "fr1q1",
          text: "Какво правят добрите приятели?",
          options: [
            { label: "А", text: "Помагат си един на друг" },
            { label: "Б", text: "Карат се всеки ден" },
            { label: "В", text: "Не играят заедно" },
          ],
          correctAnswer: "А",
        },
        {
          id: "fr1q2",
          text: "Приятелят ти е тъжен. Какво правиш?",
          options: [
            { label: "А", text: "Смееш му се" },
            { label: "Б", text: "Отиваш да го прегърнеш" },
            { label: "В", text: "Игнорираш го" },
          ],
          correctAnswer: "Б",
        },
      ],
      kindness: [
        {
          id: "k1q1",
          text: "Кои са добри думи?",
          options: [
            { label: "А", text: "Благодаря и моля" },
            { label: "Б", text: "Глупак и лош" },
            { label: "В", text: "Няма такива" },
          ],
          correctAnswer: "А",
        },
        {
          id: "k1q2",
          text: "Какво казваме, когато някой ни помогне?",
          options: [
            { label: "А", text: "Нищо" },
            { label: "Б", text: "Благодаря!" },
            { label: "В", text: "Върви си" },
          ],
          correctAnswer: "Б",
        },
      ],
    },
  },
  {
    id: 2,
    name: "Откривам доброто",
    description: "Намерете правилния отговор!",
    questions: {
      honesty: [
        {
          id: "h2q1",
          text: "Иван счупи чаша. Какво е честно да направи?",
          options: [
            { label: "А", text: "Да каже, че котката я счупи" },
            { label: "Б", text: "Да каже истината" },
            { label: "В", text: "Да обвини сестра си" },
          ],
          correctAnswer: "Б",
        },
        {
          id: "h2q2",
          text: "Ако не си написал домашното, какво правиш?",
          options: [
            { label: "А", text: "Казвам на учителя истината" },
            { label: "Б", text: "Лъжа, че кучето го изяде" },
            { label: "В", text: "Преписвам от съученик" },
          ],
          correctAnswer: "А",
        },
      ],
      fairness: [
        {
          id: "f2q1",
          text: "Имаш 4 бонбона и 2 приятели. Как ги делиш справедливо?",
          options: [
            { label: "А", text: "Всички за мен" },
            { label: "Б", text: "По 1 за всеки, останалите за мен" },
            { label: "В", text: "По равно - по 1 за всеки, един остава" },
          ],
          correctAnswer: "В",
        },
        {
          id: "f2q2",
          text: "Двама искат една и съща играчка. Какво е справедливо?",
          options: [
            { label: "А", text: "Да се карат за нея" },
            { label: "Б", text: "Да играят с нея на ред" },
            { label: "В", text: "Един да я скрие" },
          ],
          correctAnswer: "Б",
        },
      ],
      friendship: [
        {
          id: "fr2q1",
          text: "Как показваме приятелство?",
          options: [
            { label: "А", text: "Делим се с играчките си" },
            { label: "Б", text: "Взимаме чуждите неща" },
            { label: "В", text: "Не говорим с никого" },
          ],
          correctAnswer: "А",
        },
        {
          id: "fr2q2",
          text: "Новото дете в класа седи само. Какво правиш?",
          options: [
            { label: "А", text: "Оставяш го само" },
            { label: "Б", text: "Каниш го да играе с теб" },
            { label: "В", text: "Сочиш го с пръст" },
          ],
          correctAnswer: "Б",
        },
      ],
      kindness: [
        {
          id: "k2q1",
          text: "С добри думи показваме:",
          options: [
            { label: "А", text: "Учтивост и уважение" },
            { label: "Б", text: "Грубост" },
            { label: "В", text: "Безразличие" },
          ],
          correctAnswer: "А",
        },
        {
          id: "k2q2",
          text: "Когато влизаме в стаята, какво казваме?",
          options: [
            { label: "А", text: "Нищо" },
            { label: "Б", text: "Добър ден!" },
            { label: "В", text: "Махам се!" },
          ],
          correctAnswer: "Б",
        },
      ],
    },
  },
  {
    id: 3,
    name: "Поправи и избери доброто",
    description: "Коригирайте грешките и изберете правилно!",
    questions: {
      honesty: [
        {
          id: "h3q1",
          text: "Петър казва: 'Не съм аз, беше брат ми!' Но той го направи. Как да поправи грешката?",
          options: [
            { label: "А", text: "Да продължи да лъже" },
            { label: "Б", text: "Да признае истината" },
            { label: "В", text: "Да избяга" },
          ],
          correctAnswer: "Б",
        },
        {
          id: "h3q2",
          text: "Честният човек винаги:",
          options: [
            { label: "А", text: "Казва истината" },
            { label: "Б", text: "Крие нещата" },
            { label: "В", text: "Обвинява другите" },
          ],
          correctAnswer: "А",
        },
      ],
      fairness: [
        {
          id: "f3q1",
          text: "Ана взе 5 бисквити, а Боби - само 1. Това справедливо ли е?",
          options: [
            { label: "А", text: "Да, защото Ана иска повече" },
            { label: "Б", text: "Не, трябва да са равни" },
            { label: "В", text: "Да, защото тя е по-голяма" },
          ],
          correctAnswer: "Б",
        },
        {
          id: "f3q2",
          text: "Кое е пример за справедливост?",
          options: [
            { label: "А", text: "Всички играят по ред" },
            { label: "Б", text: "Един играе винаги" },
            { label: "В", text: "Само момчетата играят" },
          ],
          correctAnswer: "А",
        },
      ],
      friendship: [
        {
          id: "fr3q1",
          text: "Мария се скара с приятелката си. Как да поправи приятелството?",
          options: [
            { label: "А", text: "Да ѝ каже 'Извинявай'" },
            { label: "Б", text: "Да не говори с нея повече" },
            { label: "В", text: "Да говори лошо за нея" },
          ],
          correctAnswer: "А",
        },
        {
          id: "fr3q2",
          text: "Добрият приятел:",
          options: [
            { label: "А", text: "Те подкрепя" },
            { label: "Б", text: "Ти взема нещата" },
            { label: "В", text: "Те игнорира" },
          ],
          correctAnswer: "А",
        },
      ],
      kindness: [
        {
          id: "k3q1",
          text: "Георги каза грубо на баба си. Как да поправи грешката?",
          options: [
            { label: "А", text: "Да каже 'Извинявай, бабо'" },
            { label: "Б", text: "Да избяга навън" },
            { label: "В", text: "Да се направи, че нищо не е станало" },
          ],
          correctAnswer: "А",
        },
        {
          id: "k3q2",
          text: "Учтивият човек винаги:",
          options: [
            { label: "А", text: "Казва 'моля' и 'благодаря'" },
            { label: "Б", text: "Вика и се кара" },
            { label: "В", text: "Не поздравява" },
          ],
          correctAnswer: "А",
        },
      ],
    },
  },
]

export const finalQuestion: Question = {
  id: "final",
  text: "Как показваме доброта към другите всеки ден?",
  options: [
    { label: "А", text: "С честност, учтивост и приятелство" },
    { label: "Б", text: "Като сме груби и нечестни" },
    { label: "В", text: "Като не говорим с никого" },
  ],
  correctAnswer: "А",
}

export const hintCard = {
  name: "Карта Подсказка",
  description: "Помисли за добрите неща! Какво би направил добър приятел?",
  rules: [
    "Използвай само 1 път на мисия",
    "Премахва 1 грешен отговор",
    "Не дава точки сама по себе си",
  ],
}

export const timingScript = [
  { time: "0-3 мин", activity: "Въведение и история" },
  { time: "3-5 мин", activity: "Представяне на отборите" },
  { time: "5-12 мин", activity: "Мисия 1: Разпознавам доброто" },
  { time: "12-19 мин", activity: "Мисия 2: Откривам доброто" },
  { time: "19-26 мин", activity: "Мисия 3: Поправи и избери доброто" },
  { time: "26-28 мин", activity: "Финал: Сандъкът с Диаманта" },
  { time: "28-30 мин", activity: "Награждаване и обобщение" },
]

export const materials = [
  "Интерактивна дъска или проектор",
  "Табла за точки за всеки отбор",
  "Карти с имена на отборите",
  "Звукова сигнализация за отговори",
  "Награди за отборите (стикери, звездички)",
]
