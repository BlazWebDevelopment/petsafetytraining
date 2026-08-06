export const SITE = {
  title: 'もふもふ日和。',
  description:
    '元保護犬の柴犬もなかと、元保護猫のくるみ・あんこ・だいふくの4匹と暮らしています。可愛くて、ちょっと騒がしくて、ほんわかした毎日を紹介していきます。',
  authorName: 'もなかママ',
  authorImage: '/photos/author.png' as string | undefined,
  authorBio:
    '４匹と一緒に昼寝をする生活に憧れながら、フルタイムで働いています。保護犬・保護猫たちとの、なんでもない日常を書き残しています。',
  url: 'https://www.petsafetytraining.com',
} as const

export type FamilyMember = {
  name: string
  seed: string
  /** Real photo; falls back to a generated placeholder when omitted. */
  image?: string
  text: string
}

export const FAMILY: FamilyMember[] = [
  {
    name: 'もなか♀',
    seed: 'monaka',
    image: '/photos/monaka.png',
    text: 'ブリーダーの廃業により、仲間たちと一緒に動物愛護センターへ持ち込まれた柴犬。ボランティア団体さんによって引き出され、里親募集にかけられました。2019年、家族になりました。誕生日は11月2日。のんびり屋さんですが、大きな音だけは今も苦手です。',
  },
  {
    name: 'くるみ♀',
    seed: 'kurumi',
    image: '/photos/kurumi.png',
    text: '生まれてまもなく段ボールに入れられ、公園の植え込みに置き去りにされていたところを保護されました。預かりさんの懸命の育児ですくすく育ち、2016年、家族になりました。誕生日は5月13日。10歳。この家でいちばん態度が大きい女王さまです。',
  },
  {
    name: 'あんこ♂',
    seed: 'anko',
    image: '/photos/anko.png',
    text: '我が家の駐車場で丸くなっていたところを保護しました。足に軽い怪我をしていた以外は元気そのもの。チラシを配りましたが飼い主さんは現れず、そのままうちの子に。2018年、家族になりました。誕生日は7月7日。おっとり甘えん坊の食いしん坊。',
  },
  {
    name: 'だいふく♂',
    seed: 'daifuku',
    image: '/photos/daifuku.png',
    text: '友人が困っていたので一時的に預かるつもりが、結局手放せなくなってそのままうちの子になりました。顔はいかついのに声はとても可愛い。なでられると豹変するツンデレ男子。2023年、家族になりました。誕生日は9月15日。網戸の破壊者。',
  },
]
