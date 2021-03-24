import { ERole, ILink, ITopic } from "./types";

// Header.tsx
export const Links: ILink[] = [
  {
    path: '/search',
    title: 'Search',
  },
  {
    path: '/',
    title: 'Board',
    class: 'mx-4'
  },
  {
    path: '/login',
    title: 'Login',
    class: 'font-bold',
  },
]

// Topics.tsx
export const Topics: ITopic[] = [{
  title: "JS",
  bgcolor: "bg-yellow-400",
},
{ 
  title: 'React',
  bgcolor: 'bg-blue-400'
},
{ 
  title: 'Vue',
  bgcolor: 'bg-green-400'
},
{ 
  title: 'Angular',
  bgcolor: 'bg-red-600'
},
{ 
  title: 'Node',
  bgcolor: 'bg-purple-400',
},
{ 
  title: 'Tailwind',
  bgcolor: 'bg-indigo-400',
}
]

// Board.tsx
export const Names = [
  'parkingfence',
  'cocktailenderman',
  'synagoguechipped',
  'blowfishcarrots',
  'dangocactus',
  'bangbangair',
  'ledgerpainting',
  'urnlodestone',
  'postboxlever',
  'speakerstal',
  'scorpionvex',
  'moyaijukebox',
  'minibuspillar',
  'dropletgravelly',
  'cartwheelbarrel',
  'chainslamp',
  'sailboatlooting',
  'roflcolumn',
  'rowboatbaked',
  'symbolstube',
  'birthdayendermite',
  'hibiscustrapdoor',
  'burritobirchwood',
  'koalanautilus',
  'sparkleritem',
  'couplekissmidlands',
  'princenote',
  'sakeslime',
  'projectorvindicator',
  'notebookghast',
  'bathtuboverworld',
  'eggplantnugget',
  'octopuscrafting',
  'monoraillime',
  'diamondsflame',
  'chipmunkinfested',
  'abcfox',
  'menorahedge',
  'sharkstaned',
  'dollarnetherrack',
  'guardsmanhills',
  'fencerrespiration',
  'newspapersquid',
  'tulipsoil',
  'speedboatclock',
  'airplanecave',
  'unamusedstew',
  'homescoal',
  'massageingot',
];

export const getRandomName = () => {
  const idx = Math.floor((Math.random() * Names.length) + 1);
  return Names[idx];
}

export const Users = [
  {
    id: 1,
    username: getRandomName(),
    role: ERole.ADMIN,
    profile_image: '/assets/faces/3.png',
  },
  {
    id: 2,
    username: getRandomName(),
    role: ERole.USER,
    profile_image: '/assets/faces/2.png',
  }
];

export const Posts = [
  {
    id: 1,
    author: 2,
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non.',
    likes: 36,
    comments: [1, 2],
    topics: [
      Topics[0],
      Topics[1],
      Topics[5],
    ],
    created_at: Date.now(),
    updated_at: Date.now(),
  }
];

export const Comments = [
  {
    id: 1,
    author: 1,
    post: 1,
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam.",
    likes: 19,
    created_at: Date.now(),
    updated_at: Date.now(),
  },
  {
    id: 2,
    author: 2,
    post: 1,
    content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam.",
    likes: 5,
    created_at: Date.now(),
    updated_at: Date.now(),
  }
]