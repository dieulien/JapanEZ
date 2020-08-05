const charsToRead = [
  {
    char: "あ",
    romaji: "a",
  },
  {
    char: "い",
    romaji: "i",
  },
  {
    char: "た",
    romaji: "ta",
  },
  {
    char: "な",
    romaji: "na",
  },
  {
    char: "さ",
    romaji: "sa",
  },
  {
    char: "ち",
    romaji: "chi",
  },
];

const charsToRead2 = [
  {
    char: "な",
    romaji: "na",
  },
  {
    char: "さ",
    romaji: "ki",
  },
  {
    char: "ち",
    romaji: "chi",
  },
  {
    char: "あ",
    romaji: "a",
  },
  {
    char: "い",
    romaji: "i",
  },
  {
    char: "た",
    romaji: "ta",
  },
];

const katakanaToRomaji = {
  ア: "a",
  イ: "i",
  ウ: "u",
  エ: "e",
  オ: "o",
  カ: "ka",
  キ: "ki",
  ク: "ku",
  ケ: "ke",
  コ: "ko",
  サ: "sa",
  シ: "si",
  ス: "su",
  セ: "se",
  ソ: "so",
  タ: "ta",
  チ: "chi",
  ツ: "tsu",
  テ: "te",
  ト: "to",
  ナ: "na",
  ニ: "ni",
  ヌ: "nu",
  ネ: "ne",
  ノ: "no",
  ハ: "ha",
  ヒ: "hi",
  フ: "fu",
  ヘ: "he",
  ホ: "ho",
  マ: "ma",
  ミ: "mi",
  ム: "mu",
  メ: "me",
  モ: "mo",
  ヤ: "ya",
  ユ: "yu",
  ヨ: "yo",
  ラ: "ra",
  リ: "ri",
  ル: "ru",
  レ: "re",
  ロ: "ro",
  ワ: "wa",
  ヲ: "wo",
  ン: "n",
};

const katakanaHint = {
  ア: {
    romaji: "a",
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%A2.jpg",
    shortHint: "Find the capital 'A'",
  },
  イ: {
    romaji: "i",
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%A4.jpg",
    shortHint: "Looks like an eagle",
  },
  ウ: {
    romaji: "u",
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AB.jpg",
    shortHint: "Looks like an eagle",
  },
  エ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%A8.jpg",
    shortHint: "",
  },
  オ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AA.jpg",
    shortHint: "",
  },
  カ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AB.jpg",
    shortHint: "",
  },
  キ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AD.jpg",
    shortHint: "",
  },
  ク: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AF.jpg",
    shortHint: "",
  },
  ケ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B1.jpg",
    shortHint: "",
  },
  コ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B3.jpg",
    shortHint: "",
  },
  サ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B5.jpg",
    shortHint: "",
  },
  シ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B7.jpg",
    shortHint: "",
  },
  ス: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B9.jpg",
    shortHint: "",
  },
  セ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%BB.jpg",
    shortHint: "",
  },
  ソ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%BD.jpg",
    shortHint: "",
  },
  タ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%BF.jpg",
    shortHint: "",
  },
  チ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%81.jpg",
    shortHint: "",
  },
  ツ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%84.jpg",
    shortHint: "",
  },
  テ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%86.jpg",
    shortHint: "",
  },
  ト: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%88.jpg",
    shortHint: "",
  },
  ナ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8A.jpg",
    shortHint: "",
  },
  ニ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8B.jpg",
    shortHint: "",
  },
  ヌ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8C.jpg",
    shortHint: "",
  },
  ネ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8D.jpg",
    shortHint: "",
  },
  ノ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8E.jpg",
    shortHint: "",
  },
  ハ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8F.jpg",
    shortHint: "",
  },
  ヒ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%92.jpg",
    shortHint: "",
  },
  フ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%95.jpg",
    shortHint: "",
  },
  ヘ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%98.jpg",
    shortHint: "",
  },
  ホ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%9B.jpg",
    shortHint: "",
  },
  マ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%9E.jpg",
    shortHint: "",
  },
  ミ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%9F.jpg",
    shortHint: "",
  },
  ム: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A0.jpg",
    shortHint: "",
  },
  メ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A1.jpg",
    shortHint: "",
  },
  モ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A2.jpg",
    shortHint: "",
  },
  ヤ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A4.jpg",
    shortHint: "",
  },
  ユ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A6.jpg",
    shortHint: "",
  },
  ヨ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A8.jpg",
    shortHint: "",
  },
  ラ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A9.jpg",
    shortHint: "",
  },
  リ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AA.jpg",
    shortHint: "",
  },
  ル: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AB.jpg",
    shortHint: "",
  },
  レ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AC.jpg",
    shortHint: "",
  },
  ロ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AD.jpg",
    shortHint: "",
  },
  ワ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AF.jpg",
    shortHint: "",
  },
  ヲ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%B2.jpg",
    shortHint: "",
  },
  ン: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%B3.jpg",
    shortHint: "",
  },
};

export { charsToRead, charsToRead2, katakanaToRomaji, katakanaHint };
