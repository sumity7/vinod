import type { L } from "@/lib/i18n";

export type UpdateCategory =
  | "public-connect"
  | "public-activities"
  | "events"
  | "meetings"
  | "social-work"
  | "development"
  | "press"
  | "announcements";

export type UpdateImage = {
  src: string;
  width: number;
  height: number;
  alt: L;
  caption?: L;
  /** CSS object-position for the cropped card view, e.g. "40% 50%". */
  position?: string;
};

export type Update = {
  slug: string;
  /** Shown first on the home page and in the Updates list, with a "Featured" tag. */
  featured?: boolean;
  category: UpdateCategory;
  /** ISO yyyy-mm-dd. Left out when the date is not known; nothing is guessed. */
  date?: string;
  title: L;
  summary: L;
  /** Fuller description shown as the lead on the detail page; the card uses `summary`. */
  description?: L;
  body: L[];
  location?: L;
  /** Primary photograph, used on cards and at the top of the article. */
  image?: UpdateImage;
  /** Photograph for the top of the Updates page, when it should differ from `image`. */
  heroImage?: UpdateImage;
  /** Further photographs shown after the article text. */
  gallery?: UpdateImage[];
  /** Id of a video in content/media.ts that belongs to this update. */
  videoId?: string;
};

export const updateCategories: Record<UpdateCategory, L> = {
  "public-connect": { en: "Public Connect", hi: "जनसंपर्क" },
  "public-activities": { en: "Public Activities", hi: "जन-गतिविधियाँ" },
  events: { en: "Events", hi: "कार्यक्रम" },
  meetings: { en: "Meetings", hi: "बैठकें" },
  "social-work": { en: "Social Work", hi: "सामाजिक कार्य" },
  development: { en: "Development", hi: "विकास" },
  press: { en: "Press", hi: "प्रेस" },
  announcements: { en: "Announcements", hi: "घोषणाएँ" },
};

/**
 * Add verified updates here. If this list is ever emptied, the Updates section is hidden from the
 * navigation, the home page and the sitemap, and the /updates page returns "not found".
 * Dates are left out where the source gives none; nothing is guessed.
 */
const rudra = (n: number, width: number, height: number, alt: L): UpdateImage => ({
  src: `/images/updates/sawan-rudrabhishek/rudrabhishek-${n}.webp`,
  width,
  height,
  alt,
});

export const updates: Update[] = [
  {
    slug: "sawan-rudrabhishek-harhua-shiv-mandir",
    featured: true,
    category: "events",
    title: {
      en: "Rudrabhishek at Shiva temples across Harhua Block through the month of Sawan",
      hi: "सावन मास भर हरहुआ ब्लॉक के शिव मंदिरों में रुद्राभिषेक",
    },
    summary: {
      en: "Block Pramukh Shri Vinod Kumar Upadhyay had Rudrabhishek performed at ancient and prominent Shiva temples across Harhua Block, in Shivpur Assembly Constituency, throughout Sawan.",
      hi: "शिवपुर विधानसभा क्षेत्र के हरहुआ ब्लॉक अंतर्गत विभिन्न प्राचीन एवं प्रमुख शिव मंदिरों में ब्लॉक प्रमुख श्री विनोद कुमार उपाध्याय जी द्वारा पूरे सावन मास रुद्राभिषेक कराया गया।",
    },
    location: {
      en: "Harhua Block, Shivpur Assembly, Varanasi",
      hi: "हरहुआ ब्लॉक, शिवपुर विधानसभा, वाराणसी",
    },
    body: [
      {
        en: "Throughout the month of Sawan, Shri Vinod Kumar Upadhyay, Block Pramukh, had Rudrabhishek performed at the ancient and prominent Shiva temples of Harhua Block in the Shivpur Assembly Constituency.",
        hi: "शिवपुर विधानसभा क्षेत्र के हरहुआ ब्लॉक अंतर्गत विभिन्न प्राचीन एवं प्रमुख शिव मंदिरों में श्री विनोद कुमार उपाध्याय जी, ब्लॉक प्रमुख के द्वारा पूरे सावन मास रुद्राभिषेक कराया गया।",
      },
      {
        en: "The Rudrabhishek was held at the Shivalayas of Jhanjhupur, Gangapur, Jayrampur, Kapildhara, Soyepur New Colony and Goithaha, among others in the area.",
        hi: "ग्राम झांझूपुर, गंगापुर, जयरामपुर, कपिलधारा, सोयेपुर न्यू कॉलोनी एवं गोईठहाँ सहित क्षेत्र के विभिन्न शिवालयों में रुद्राभिषेक सम्पन्न हुआ।",
      },
    ],
    image: {
      src: "/images/updates/sawan-rudrabhishek/rudrabhishek-cover.webp",
      width: 1086,
      height: 1448,
      position: "40% 20%",
      alt: {
        en: "A man pouring milk over a Shivling inside a temple sanctum during Rudrabhishek",
        hi: "रुद्राभिषेक के दौरान मंदिर के गर्भगृह में शिवलिंग पर दूध चढ़ाते हुए एक व्यक्ति",
      },
    },
    gallery: [
      rudra(1, 1599, 1066, {
        en: "Villagers and devotees with folded hands inside a Shiva temple hall during the Sawan Rudrabhishek",
        hi: "सावन रुद्राभिषेक के दौरान शिव मंदिर के सभा-कक्ष में हाथ जोड़े खड़े ग्रामीण एवं श्रद्धालु",
      }),
      rudra(3, 853, 1280, {
        en: "A Shivling bathed in milk and decorated with bel leaves and flowers during Rudrabhishek",
        hi: "रुद्राभिषेक के दौरान दूध से अभिषिक्त, बेलपत्र एवं पुष्पों से सुसज्जित शिवलिंग",
      }),
      rudra(2, 886, 1180, {
        en: "A priest performing Rudrabhishek at a Shivling decorated with flowers",
        hi: "पुष्पों से सजे शिवलिंग पर रुद्राभिषेक कराते आचार्य",
      }),
      rudra(5, 1599, 1066, {
        en: "Devotees and priests gathered at a Shiva temple for Rudrabhishek",
        hi: "रुद्राभिषेक के लिए शिव मंदिर में एकत्र श्रद्धालु एवं आचार्यगण",
      }),
      rudra(6, 853, 1280, {
        en: "A man offering prayers with folded hands inside a Shiva shrine",
        hi: "शिव मंदिर के भीतर हाथ जोड़कर पूजा करते हुए",
      }),
      rudra(7, 1280, 853, {
        en: "Puja and aarti at a Shivling in an open-air temple courtyard",
        hi: "खुले प्रांगण वाले शिव मंदिर में शिवलिंग पर पूजा एवं आरती",
      }),
    ],
  },
  {
    slug: "raksha-bandhan-sisters-harhua",
    category: "events",
    title: {
      en: "Raksha Bandhan: a sister’s affection, a brother’s promise",
      hi: "रक्षाबंधन: बहनों का स्नेह, भाई का वचन",
    },
    summary: {
      en: "On Raksha Bandhan, as every year, more than 10,000 sisters tied rakhi and received gifts.",
      hi: "रक्षाबंधन के पावन अवसर पर प्रतिवर्ष की भाँति 10,000 से अधिक बहनों से रक्षाबंधन बँधवाकर उन्हें उपहार भेंट किए।",
    },
    body: [
      {
        en: "In the spirit of Vasudhaiva Kutumbakam and on the great festival of a brother and sister’s love, affection and respect, greetings were offered to everyone on Raksha Bandhan.",
        hi: "वसुधैव कुटुम्बकम के भाव एवं भाई-बहन के प्रेम, स्नेह और सम्मान के महापर्व रक्षाबंधन पर सभी को हार्दिक बधाई एवं शुभकामनाएँ दी गईं।",
      },
      {
        en: "On the occasion of Raksha Bandhan, as every year, more than 10,000 sisters tied rakhi and received gifts.",
        hi: "रक्षाबंधन के पावन अवसर पर प्रतिवर्ष की भाँति 10,000 से अधिक बहनों से रक्षाबंधन बँधवाकर उन्हें उपहार भेंट किए।",
      },
    ],
    image: {
      src: "/images/media/raksha-bandhan-4.webp",
      width: 1600,
      height: 1066,
      alt: {
        en: "Guests standing on the stage in front of the Raksha Bandhan greeting banner, with women seated on the right",
        hi: "रक्षाबंधन शुभकामना बैनर के सामने मंच पर खड़े अतिथि, दाईं ओर बैठी महिलाएँ",
      },
    },
    gallery: [
      {
        src: "/images/media/raksha-bandhan.webp",
        width: 1620,
        height: 1080,
        alt: {
          en: "A man in a marigold garland surrounded by women tying rakhis on Raksha Bandhan",
          hi: "गेंदे की माला पहने एक व्यक्ति, रक्षाबंधन पर राखी बाँधती बहनों के बीच",
        },
      },
      {
        src: "/images/media/raksha-bandhan-2.webp",
        width: 1180,
        height: 786,
        alt: {
          en: "A man in a marigold garland among a large gathering of women and children at a Raksha Bandhan programme",
          hi: "रक्षाबंधन कार्यक्रम में महिलाओं एवं बच्चों की बड़ी उपस्थिति के बीच गेंदे की माला पहने एक व्यक्ति",
        },
      },
      {
        src: "/images/media/raksha-bandhan-3.webp",
        width: 1600,
        height: 1066,
        alt: {
          en: "A man speaking at a podium marked “Nasha Mukt Yuva for Viksit Bharat” on a decorated stage",
          hi: "सजे हुए मंच पर “नशा मुक्त युवा फॉर विकसित भारत” लिखे डायस से बोलते हुए एक व्यक्ति",
        },
      },
    ],
  },
  {
    slug: "devkinandan-thakur-ji-welcome-varanasi",
    category: "events",
    title: {
      en: "Welcoming Pujya Shri Devkinandan Thakur Ji in Varanasi",
      hi: "पूज्य श्री देवकीनन्दन ठाकुर जी का वाराणसी में स्वागत",
    },
    summary: {
      en: "Pujya Shri Devkinandan Thakur Ji arrived at Sampurnanand Sanskrit University, Varanasi, for a seven-day katha; he was welcomed on arrival and his blessings were received.",
      hi: "वाराणसी के सम्पूर्णानन्द संस्कृत विश्वविद्यालय में सात दिवसीय कथा के लिए पधारे पूज्य श्री देवकीनन्दन ठाकुर जी का स्वागत किया गया एवं आशीर्वाद प्राप्त किया गया।",
    },
    location: {
      en: "Sampurnanand Sanskrit University, Varanasi",
      hi: "सम्पूर्णानन्द संस्कृत विश्वविद्यालय, वाराणसी",
    },
    body: [
      {
        en: "Pujya Shri Devkinandan Thakur Ji arrived at Sampurnanand Sanskrit University, Varanasi, for a seven-day katha. Reaching there with companions late that night, they welcomed Maharaj Ji and received his blessings.",
        hi: "आज रात वाराणसी के सम्पूर्णानन्द संस्कृत विश्वविद्यालय में सात दिवसीय कथा के लिए पधारे पूज्य श्री देवकीनन्दन ठाकुर जी का अपने साथियों के साथ पहुँचकर महाराज जी का स्वागत किया एवं आशीर्वाद प्राप्त किया।",
      },
    ],
    image: {
      src: "/images/updates/devkinandan-thakur-welcome-1.webp",
      width: 922,
      height: 700,
      position: "50% 35%",
      alt: {
        en: "Pujya Shri Devkinandan Thakur Ji, wearing a garland of roses and jasmine, standing beside a man in a light blue blazer",
        hi: "गुलाब और चमेली की माला पहने पूज्य श्री देवकीनन्दन ठाकुर जी, हल्के नीले ब्लेज़र में खड़े एक व्यक्ति के साथ",
      },
    },
  },
];

/**
 * Featured updates first, then newest first. Updates without a date keep their
 * listed order after the dated ones.
 */
export const publishedUpdates = () =>
  [...updates].sort(
    (a, b) =>
      Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
      (b.date ?? "").localeCompare(a.date ?? ""),
  );
