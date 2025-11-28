import { Question } from './types';

export const questions: Question[] = [
  // E/I（外向/内向）8問
  {
    id: 'q1',
    order: 1,
    text: '休日は新しい人に会いに行く方が好きだ / 家で好きなことに没頭する方が好きだ',
    dimension: 'EI',
    options: [
      { id: 'a', label: '休日は新しい人に会いに行く方が好きだ', value: 1 },
      { id: 'b', label: '家で好きなことに没頭する方が好きだ', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q2',
    order: 2,
    text: 'アイデアは人に話しながら整理する / メモに書き出してから整理する',
    dimension: 'EI',
    options: [
      { id: 'a', label: 'アイデアは人に話しながら整理する', value: 1 },
      { id: 'b', label: 'メモに書き出してから整理する', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q3',
    order: 3,
    text: 'イベントでは自然と人を巻き込む / まず観察してから動く',
    dimension: 'EI',
    options: [
      { id: 'a', label: 'イベントでは自然と人を巻き込む', value: 1 },
      { id: 'b', label: 'まず観察してから動く', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q4',
    order: 4,
    text: '新しいチームで自己紹介をリードする / 様子を見てから話し始める',
    dimension: 'EI',
    options: [
      { id: 'a', label: '新しいチームで自己紹介をリードする', value: 1 },
      { id: 'b', label: '様子を見てから話し始める', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q5',
    order: 5,
    text: '雑談しながら仕事を進める方が楽しい / 静かな環境の方が集中できる',
    dimension: 'EI',
    options: [
      { id: 'a', label: '雑談しながら仕事を進める方が楽しい', value: 1 },
      { id: 'b', label: '静かな環境の方が集中できる', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q6',
    order: 6,
    text: '大人数の場で発言するのは苦にならない / 小人数や1対1の方が話しやすい',
    dimension: 'EI',
    options: [
      { id: 'a', label: '大人数の場で発言するのは苦にならない', value: 1 },
      { id: 'b', label: '小人数や1対1の方が話しやすい', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q7',
    order: 7,
    text: '初対面でもすぐ打ち解ける / 慣れるまで時間をかける',
    dimension: 'EI',
    options: [
      { id: 'a', label: '初対面でもすぐ打ち解ける', value: 1 },
      { id: 'b', label: '慣れるまで時間をかける', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q8',
    order: 8,
    text: '企画を話して反応を見たい / 自分で練ってから出したい',
    dimension: 'EI',
    options: [
      { id: 'a', label: '企画を話して反応を見たい', value: 1 },
      { id: 'b', label: '自分で練ってから出したい', value: -1 },
    ],
    version: 'v1',
  },

  // S/N（現実/直観）8問
  {
    id: 'q9',
    order: 9,
    text: '具体的な手順があると安心する / 大まかな方向性があれば動ける',
    dimension: 'SN',
    options: [
      { id: 'a', label: '具体的な手順があると安心する', value: 1 },
      { id: 'b', label: '大まかな方向性があれば動ける', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q10',
    order: 10,
    text: 'データや実例を重視する / コンセプトや可能性を重視する',
    dimension: 'SN',
    options: [
      { id: 'a', label: 'データや実例を重視する', value: 1 },
      { id: 'b', label: 'コンセプトや可能性を重視する', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q11',
    order: 11,
    text: 'まずは今ある情報で進める / 未来のシナリオを考えて準備する',
    dimension: 'SN',
    options: [
      { id: 'a', label: 'まずは今ある情報で進める', value: 1 },
      { id: 'b', label: '未来のシナリオを考えて準備する', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q12',
    order: 12,
    text: '小さな改善を積み上げるのが得意 / 大きく作り変える方が得意',
    dimension: 'SN',
    options: [
      { id: 'a', label: '小さな改善を積み上げるのが得意', value: 1 },
      { id: 'b', label: '大きく作り変える方が得意', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q13',
    order: 13,
    text: '詳細な仕様を詰めたい / 先に全体像を描きたい',
    dimension: 'SN',
    options: [
      { id: 'a', label: '詳細な仕様を詰めたい', value: 1 },
      { id: 'b', label: '先に全体像を描きたい', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q14',
    order: 14,
    text: '決まったやり方を守る方が安心 / 新しいやり方を試す方がワクワクする',
    dimension: 'SN',
    options: [
      { id: 'a', label: '決まったやり方を守る方が安心', value: 1 },
      { id: 'b', label: '新しいやり方を試す方がワクワクする', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q15',
    order: 15,
    text: '現場の感覚や体験を重視する / 抽象的なアイデアで発想する',
    dimension: 'SN',
    options: [
      { id: 'a', label: '現場の感覚や体験を重視する', value: 1 },
      { id: 'b', label: '抽象的なアイデアで発想する', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q16',
    order: 16,
    text: '目の前の課題から片付ける / 少し先を見越して動く',
    dimension: 'SN',
    options: [
      { id: 'a', label: '目の前の課題から片付ける', value: 1 },
      { id: 'b', label: '少し先を見越して動く', value: -1 },
    ],
    version: 'v1',
  },

  // T/F（思考/感情）8問
  {
    id: 'q17',
    order: 17,
    text: '判断は合理性や効率を優先する / 人の気持ちや影響を優先する',
    dimension: 'TF',
    options: [
      { id: 'a', label: '判断は合理性や効率を優先する', value: 1 },
      { id: 'b', label: '人の気持ちや影響を優先する', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q18',
    order: 18,
    text: '率直なフィードバックを歓迎する / 相手に配慮した伝え方を重視する',
    dimension: 'TF',
    options: [
      { id: 'a', label: '率直なフィードバックを歓迎する', value: 1 },
      { id: 'b', label: '相手に配慮した伝え方を重視する', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q19',
    order: 19,
    text: '数字や根拠で説得する / 共感やストーリーで伝える',
    dimension: 'TF',
    options: [
      { id: 'a', label: '数字や根拠で説得する', value: 1 },
      { id: 'b', label: '共感やストーリーで伝える', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q20',
    order: 20,
    text: '議論で意見がぶつかっても平気 / 空気が悪くなるのを避けたい',
    dimension: 'TF',
    options: [
      { id: 'a', label: '議論で意見がぶつかっても平気', value: 1 },
      { id: 'b', label: '空気が悪くなるのを避けたい', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q21',
    order: 21,
    text: '役割分担が明確だとやりやすい / みんなで助け合う雰囲気が大切',
    dimension: 'TF',
    options: [
      { id: 'a', label: '役割分担が明確だとやりやすい', value: 1 },
      { id: 'b', label: 'みんなで助け合う雰囲気が大切', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q22',
    order: 22,
    text: 'ルールや仕組みで解決したい / 話し合いで調整したい',
    dimension: 'TF',
    options: [
      { id: 'a', label: 'ルールや仕組みで解決したい', value: 1 },
      { id: 'b', label: '話し合いで調整したい', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q23',
    order: 23,
    text: '目標達成のために厳しく進めることがある / みんなが納得するペースを大事にする',
    dimension: 'TF',
    options: [
      { id: 'a', label: '目標達成のために厳しく進めることがある', value: 1 },
      { id: 'b', label: 'みんなが納得するペースを大事にする', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q24',
    order: 24,
    text: '「正しいこと」を基準に動く / 「優しいこと」を基準に動く',
    dimension: 'TF',
    options: [
      { id: 'a', label: '「正しいこと」を基準に動く', value: 1 },
      { id: 'b', label: '「優しいこと」を基準に動く', value: -1 },
    ],
    version: 'v1',
  },

  // J/P（判断/知覚）8問
  {
    id: 'q25',
    order: 25,
    text: '計画を立ててから動きたい / 走りながら考えたい',
    dimension: 'JP',
    options: [
      { id: 'a', label: '計画を立ててから動きたい', value: 1 },
      { id: 'b', label: '走りながら考えたい', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q26',
    order: 26,
    text: '締め切り前に早めに終わらせる / 期限ギリギリまで練ることがある',
    dimension: 'JP',
    options: [
      { id: 'a', label: '締め切り前に早めに終わらせる', value: 1 },
      { id: 'b', label: '期限ギリギリまで練ることがある', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q27',
    order: 27,
    text: '優先順位を決めて順番に進める / 気になったところから着手する',
    dimension: 'JP',
    options: [
      { id: 'a', label: '優先順位を決めて順番に進める', value: 1 },
      { id: 'b', label: '気になったところから着手する', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q28',
    order: 28,
    text: '手順が決まっている方が安心 / 状況に合わせて柔軟に変えたい',
    dimension: 'JP',
    options: [
      { id: 'a', label: '手順が決まっている方が安心', value: 1 },
      { id: 'b', label: '状況に合わせて柔軟に変えたい', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q29',
    order: 29,
    text: '予定通り進むと気持ちいい / 変化に合わせて予定を変えるのが得意',
    dimension: 'JP',
    options: [
      { id: 'a', label: '予定通り進むと気持ちいい', value: 1 },
      { id: 'b', label: '変化に合わせて予定を変えるのが得意', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q30',
    order: 30,
    text: 'ToDoリストで管理する / 思いついたときに動く方がうまくいく',
    dimension: 'JP',
    options: [
      { id: 'a', label: 'ToDoリストで管理する', value: 1 },
      { id: 'b', label: '思いついたときに動く方がうまくいく', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q31',
    order: 31,
    text: '決めたことを崩したくない / 途中で方向転換するのも平気',
    dimension: 'JP',
    options: [
      { id: 'a', label: '決めたことを崩したくない', value: 1 },
      { id: 'b', label: '途中で方向転換するのも平気', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q32',
    order: 32,
    text: '事前準備を厚くする / 現場対応で何とかする',
    dimension: 'JP',
    options: [
      { id: 'a', label: '事前準備を厚くする', value: 1 },
      { id: 'b', label: '現場対応で何とかする', value: -1 },
    ],
    version: 'v1',
  },

  // A/T 傾向（自己主張/慎重）8問
  {
    id: 'q33',
    order: 33,
    text: 'すぐ決断して動きたい / もう少し確かめてから動きたい',
    dimension: 'AT',
    options: [
      { id: 'a', label: 'すぐ決断して動きたい', value: 1 },
      { id: 'b', label: 'もう少し確かめてから動きたい', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q34',
    order: 34,
    text: '新しいアイデアはまず試す / 影響を考えてから試す',
    dimension: 'AT',
    options: [
      { id: 'a', label: '新しいアイデアはまず試す', value: 1 },
      { id: 'b', label: '影響を考えてから試す', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q35',
    order: 35,
    text: 'リスクはとりあえず受け入れて前に進む / リスクを洗い出してから進む',
    dimension: 'AT',
    options: [
      { id: 'a', label: 'リスクはとりあえず受け入れて前に進む', value: 1 },
      { id: 'b', label: 'リスクを洗い出してから進む', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q36',
    order: 36,
    text: '多少の失敗は織り込み済みで進める / 失敗を減らす対策を厚くする',
    dimension: 'AT',
    options: [
      { id: 'a', label: '多少の失敗は織り込み済みで進める', value: 1 },
      { id: 'b', label: '失敗を減らす対策を厚くする', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q37',
    order: 37,
    text: 'フィードバックは即反映したい / 一度整理してから反映したい',
    dimension: 'AT',
    options: [
      { id: 'a', label: 'フィードバックは即反映したい', value: 1 },
      { id: 'b', label: '一度整理してから反映したい', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q38',
    order: 38,
    text: '速度重視で実験を回す / 品質重視で精度を高める',
    dimension: 'AT',
    options: [
      { id: 'a', label: '速度重視で実験を回す', value: 1 },
      { id: 'b', label: '品質重視で精度を高める', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q39',
    order: 39,
    text: '前に出てリードするのが得意 / じっくり整えて支えるのが得意',
    dimension: 'AT',
    options: [
      { id: 'a', label: '前に出てリードするのが得意', value: 1 },
      { id: 'b', label: 'じっくり整えて支えるのが得意', value: -1 },
    ],
    version: 'v1',
  },
  {
    id: 'q40',
    order: 40,
    text: '「まずやってみよう」で動く / 「準備ができてから」で動く',
    dimension: 'AT',
    options: [
      { id: 'a', label: '「まずやってみよう」で動く', value: 1 },
      { id: 'b', label: '「準備ができてから」で動く', value: -1 },
    ],
    version: 'v1',
  },
];
