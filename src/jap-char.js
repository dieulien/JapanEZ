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
  シ: "shi",
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
  ン: "n'",
  clearBuffer: "clearBuffer",
};

const limitedKatakanaList = [
  "ア",
  "イ",
  "ウ",
  "エ",
  "オ",
  "カ",
  "キ",
  "ク",
  "ケ",
  "コ",
  "シ",
  "ス",
  "ソ",
  "タ",
  "テ",
  "ト",
  "ナ",
  "ニ",
  "ネ",
  "ハ",
  "フ",
  "ホ",
  "マ",
  "ミ",
  "ム",
  "メ",
  "モ",
  "ヤ",
  "ラ",
  "リ",
  "ル",
  "レ",
];

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
    shortHint: "It looks like an <u>ea</u>gle (i)",
  },
  ウ: {
    romaji: "u",
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%A6.jpg",
    shortHint: "ウ looks like う (u)",
  },
  エ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%A8.jpg",
    shortHint:
      "Imagine this is the girders an <u>e</u>ngineer would use to build buildings",
  },
  オ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AA.jpg",
    shortHint:
      'A dude flapping open his trench coat to flash you. "<u>Oh</u> MY GOD!" you say. ',
  },
  カ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AB.jpg",
    shortHint: "It looks just like the Hiragana か",
  },
  キ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AD.jpg",
    shortHint: "A key (ki)",
  },
  ク: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%AF.jpg",
    shortHint: "A long <u>coo</u>ks's (ku) hat",
  },
  ケ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B1.jpg",
    shortHint: "It looks like the letter <u>K</u> (ke)",
  },
  コ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B3.jpg",
    shortHint: "Two 90 degrees <u>co</u>rners (ko)",
  },
  サ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B5.jpg",
    shortHint: "Three <u>sa</u>rdines stacked on top of each other",
  },
  シ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B7.jpg",
    shortHint: "<u>She</u> has a very werid face (shi)",
  },
  ス: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%B9.jpg",
    shortHint: "A hanger where you hang up your fancy <u>su</u>it (su)",
  },
  セ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%BB.jpg",
    shortHint: "It looks like the Hiragana せ",
  },
  ソ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%BD.jpg",
    shortHint: "One needle and a long thread which you use to <u>sew</u> (so)",
  },
  タ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%82%BF.jpg",
    shortHint: "A <u>ti</u>dal wave racing across the sea (ta)",
  },
  チ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%81.jpg",
    shortHint: "A <u>chee</u>rleader doing a <u>chee</u>r (chi)",
  },
  ツ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%84.jpg",
    shortHint: "<u>Two</u> (tsu) needles",
  },
  テ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%86.jpg",
    shortHint: "A <u>te</u>lephone pole",
  },
  ト: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%88.jpg",
    shortHint: "A <u>to</u>tem pole",
  },
  ナ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8A.jpg",
    shortHint: "A majestic <u>na</u>rwhal",
  },
  ニ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8B.jpg",
    shortHint: "Two <u>nee</u>dles (ni) laying on their side",
  },
  ヌ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8C.jpg",
    shortHint:
      "The chopsticks are grabbing onto some <u>noo</u>dles & pulling them out of a bowl. (nu)",
  },
  ネ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8D.jpg",
    shortHint: "A <u>ne</u>cromancer has summoned this zombie",
  },
  ノ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8E.jpg",
    shortHint: "A really long <u>no</u>se",
  },
  ハ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%8F.jpg",
    shortHint: "A rice paddy <u>ha</u>t",
  },
  ヒ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%92.jpg",
    shortHint: "<u>He</u> (hi) has no head. <u>He</u> is reaching out to you.",
  },
  フ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%95.jpg",
    shortHint: "A <u>fu</u>nny looking owl",
  },
  ヘ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%98.jpg",
    shortHint: "This looks like the Hiragana へ",
  },
  ホ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%9B.jpg",
    shortHint: "A <u>ho</u>ly cross",
  },
  マ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%9E.jpg",
    shortHint: "Look at all those angles! Those lengths! All that <u>ma</u>th!",
  },
  ミ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%9F.jpg",
    shortHint: "Three <u>mi</u>ssiles, flying towards you. Be careful!",
  },
  ム: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A0.jpg",
    shortHint: "It is shaped like a pile of poop. Cow poop. <u>Moo</u>. (mu)",
  },
  メ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A1.jpg",
    shortHint: 'め <u>Me</u> is Japnese for "eye"',
  },
  モ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A2.jpg",
    shortHint: "This looks like the Hiragana も",
  },
  ヤ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A4.jpg",
    shortHint: "This looks just like the Hiragana や",
  },
  ユ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A6.jpg",
    shortHint: "You (yu) have a hook for a hand",
  },
  ヨ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A8.jpg",
    shortHint: "A <u>yo</u>gurt containers",
  },
  ラ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%A9.jpg",
    shortHint: "It is a <u>ra</u>ptor wearing sweet <u>ra</u>y-bans",
  },
  リ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AA.jpg",
    shortHint: "It looks like the Hiragana り",
  },
  ル: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AB.jpg",
    shortHint:
      "There are two <u>rou</u>tes (ru) you can take. Route 1 & Route 2.",
  },
  レ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AC.jpg",
    shortHint: "Look at that beautiful <u>re</u>d hair that <u>Re</u>i has!",
  },
  ロ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AD.jpg",
    shortHint:
      "This <u>ro</u>ad goes around in a square, never ending. What a terrible <u>ro</u>ad this is.",
  },
  ワ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%AF.jpg",
    shortHint:
      "You often begin your question with the word <u>wha</u>t (wa). <u>Wha</u>t are you doing?",
  },
  ヲ: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%B2.jpg",
    shortHint: "A dog <u>wo</u>ofing (wo) so hard its tongue is flying out",
  },
  ン: {
    imageLink:
      "https://s3.amazonaws.com/image.japanesereading.com/%E3%83%B3.jpg",
    shortHint: "This guy only has one eye. <u>N</u>oooo!",
  },
};

export { katakanaToRomaji, katakanaHint, limitedKatakanaList };
