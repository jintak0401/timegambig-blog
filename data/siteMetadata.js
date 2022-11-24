const siteMetadata = {
  title: 'Time Gambit Blog',
  author: 'Time Gambit',
  headerTitle: 'Time Gambit',
  description: 'Time Gambit의 블로그',
  language: 'ko-KR',
  theme: 'system', // system, dark or light
  siteUrl: 'https://timegambit.com',
  siteRepo: 'https://github.com/jintak/timegambit-blog',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'jintak0401@naver.com',
  github: 'https://github.com/jintak0401',
  twitter: '',
  facebook: '',
  youtube: '',
  linkedin: '',
  locale: 'ko-KR',
  oauth: {
    providers: ['google', 'github', 'naver', 'kakao'],
  },
  analytics: {
    googleAnalyticsId: 'G-KM9ZTPVMSC', // e.g. UA-000000-2 or G-XXXXXXX
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comment: {
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      emitMetaData: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // Place the comment box above the comments. options: bottom, top
      inputPosition: 'bottom',
      // Choose the language giscus will be displayed in. options: en, es, zh-CN, zh-TW, ko, ja etc
      lang: 'ko',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
    },
  },
};

module.exports = siteMetadata;
