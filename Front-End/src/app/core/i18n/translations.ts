export type TranslationNode = string | { [key: string]: TranslationNode };
export type TranslationDictionary = Record<string, TranslationNode>;

export const TRANSLATIONS = {
  en: {
    meta: {
      landingTitle: 'CacaoMarket | Cocoa trade with confidence'
    },
    common: {
      homeAria: 'CacaoMarket home',
      primaryNavigation: 'Primary navigation',
      languageSelector: 'Choose language',
      switchToLanguage: 'Switch to {{language}}'
    },
    landing: {
      brandTagline: 'Trade with intent',
      navigation: {
        howItWorks: 'How it works',
        forFarmers: 'For farmers',
        forBuyers: 'For buyers',
        whyCacaoMarket: 'Why CacaoMarket'
      },
      actions: {
        joinMarket: 'Join the market',
        listBatch: 'List a cocoa batch',
        sourceCocoa: 'Source cocoa with intent',
        seeWhereYouFit: 'See where you fit',
        growCocoa: 'I grow cocoa',
        sourceCocoaShort: 'I source cocoa'
      },
      hero: {
        badge: 'Built for serious cocoa trade',
        titleStart: 'Where cocoa harvests meet',
        titleAccent: 'serious demand.',
        description: 'CacaoMarket helps farmers present large, market-ready cocoa lots and helps committed buyers find the volumes, origin, and timing they need.',
        largeBatchFocus: 'Large-batch focus',
        betterBriefings: 'Better briefings',
        directDialogue: 'Direct dialogue',
        imageAlt: 'Cocoa producers preparing large sacks of cocoa at a collection point',
        marketReadyLot: 'Market-ready lot',
        cocoaInVolume: 'Cocoa, in volume',
        clearerStartingPoint: 'A clearer starting point',
        fromHarvestToMarket: 'From harvest to market',
        harvestMarketDescription: 'Make availability and commercial intent visible.',
        tradeBeginsWith: 'Trade begins with',
        volumeAndVisibility: 'volume + visibility'
      },
      highlights: {
        lotBasedTitle: 'Lot-based offers',
        lotBasedDescription: 'Built around commercial volumes.',
        discoveryTitle: 'Purposeful discovery',
        discoveryDescription: 'For growers and buyers with intent.',
        firstStepTitle: 'A simpler first step',
        firstStepDescription: 'Share the right facts from day one.'
      },
      value: {
        eyebrow: 'A marketplace with a purpose',
        title: 'Less noise. Better cocoa conversations.',
        description: 'CacaoMarket is designed around the information that makes a bulk cocoa conversation worth having — before time is spent on either side.',
        designedForTrade: 'Designed for the trade',
        advantages: {
          volume: {
            title: 'Made for volume',
            description: 'Present harvests as lots so every conversation starts with the scale that matters.'
          },
          signals: {
            title: 'Clear market signals',
            description: 'Share the facts buyers need early: origin, readiness, quantity, and availability.'
          },
          matches: {
            title: 'More purposeful matches',
            description: 'Give farmers and buyers a focused place to start commercially meaningful conversations.'
          }
        }
      },
      process: {
        eyebrow: 'How it works',
        title: 'A better route from cocoa lot to commercial conversation.',
        description: 'CacaoMarket gives each side a structured way to show what they have and what they are looking for.',
        steps: {
          publish: {
            title: 'Publish your cocoa lot',
            description: 'Describe your available volume, quality, location, and preferred delivery window in one clear market brief.'
          },
          demand: {
            title: 'Meet serious demand',
            description: 'Reach buyers looking for commercial quantities, not one-off samples or unclear conversations.'
          },
          clarity: {
            title: 'Move forward with clarity',
            description: 'Compare interest, discuss terms, and turn a qualified connection into a confident next step.'
          }
        }
      },
      farmers: {
        eyebrow: 'For farmers & cooperatives',
        title: 'Make your harvest easier to understand — and harder to overlook.',
        description: 'Create a clear listing around volume, origin, quality details, and readiness. Let the right buyers see the opportunity in your batch.',
        action: 'I have cocoa to sell'
      },
      buyers: {
        eyebrow: 'For buyers & sourcing teams',
        title: 'Start with lots that match the size of your ambition.',
        description: 'Find producers ready to discuss commercial quantities, then open a direct conversation with the context your sourcing team needs.',
        action: 'I am looking to buy'
      },
      finalCta: {
        eyebrow: 'A more connected cocoa market',
        title: 'Bring your next cocoa conversation into focus.',
        description: 'Whether you are preparing a major lot or sourcing one, CacaoMarket gives you a more intentional place to begin.'
      },
      footer: {
        description: 'Helping cocoa producers and buyers find a clearer path to trade.',
        farmers: 'Farmers',
        buyers: 'Buyers',
        about: 'About'
      }
    }
  },
  fr: {
    meta: {
      landingTitle: 'CacaoMarket | Le commerce du cacao en toute confiance'
    },
    common: {
      homeAria: 'Accueil CacaoMarket',
      primaryNavigation: 'Navigation principale',
      languageSelector: 'Choisir la langue',
      switchToLanguage: 'Passer en {{language}}'
    },
    landing: {
      brandTagline: 'Le commerce avec intention',
      navigation: {
        howItWorks: 'Comment ça marche',
        forFarmers: 'Pour les producteurs',
        forBuyers: 'Pour les acheteurs',
        whyCacaoMarket: 'Pourquoi CacaoMarket'
      },
      actions: {
        joinMarket: 'Rejoindre le marché',
        listBatch: 'Publier un lot de cacao',
        sourceCocoa: 'S’approvisionner avec clarté',
        seeWhereYouFit: 'Voir comment participer',
        growCocoa: 'Je produis du cacao',
        sourceCocoaShort: 'Je recherche du cacao'
      },
      hero: {
        badge: 'Pensé pour le commerce sérieux du cacao',
        titleStart: 'Là où les récoltes de cacao rencontrent',
        titleAccent: 'une demande sérieuse.',
        description: 'CacaoMarket aide les producteurs à présenter de grands lots de cacao prêts pour le marché et les acheteurs engagés à trouver les volumes, l’origine et le calendrier dont ils ont besoin.',
        largeBatchFocus: 'Des lots importants',
        betterBriefings: 'Des offres plus claires',
        directDialogue: 'Un dialogue direct',
        imageAlt: 'Des producteurs de cacao préparent de grands sacs de cacao dans un point de collecte',
        marketReadyLot: 'Lot prêt pour le marché',
        cocoaInVolume: 'Du cacao en volume',
        clearerStartingPoint: 'Un point de départ plus clair',
        fromHarvestToMarket: 'De la récolte au marché',
        harvestMarketDescription: 'Rendez visibles la disponibilité et l’intention commerciale.',
        tradeBeginsWith: 'Le commerce commence par',
        volumeAndVisibility: 'le volume et la visibilité'
      },
      highlights: {
        lotBasedTitle: 'Des offres par lot',
        lotBasedDescription: 'Construites autour de volumes commerciaux.',
        discoveryTitle: 'Une recherche ciblée',
        discoveryDescription: 'Pour des producteurs et acheteurs engagés.',
        firstStepTitle: 'Un premier pas plus simple',
        firstStepDescription: 'Partagez les bonnes informations dès le départ.'
      },
      value: {
        eyebrow: 'Une place de marché utile',
        title: 'Moins de bruit. De meilleures conversations autour du cacao.',
        description: 'CacaoMarket repose sur les informations qui rendent une discussion autour d’un lot de cacao réellement pertinente — avant que l’une ou l’autre partie n’y consacre du temps.',
        designedForTrade: 'Pensé pour le commerce',
        advantages: {
          volume: {
            title: 'Conçu pour le volume',
            description: 'Présentez les récoltes sous forme de lots afin que chaque échange démarre à la bonne échelle.'
          },
          signals: {
            title: 'Des signaux de marché clairs',
            description: 'Partagez dès le départ les éléments recherchés par les acheteurs : origine, disponibilité, quantité et préparation.'
          },
          matches: {
            title: 'Des mises en relation plus ciblées',
            description: 'Offrez aux producteurs et aux acheteurs un espace concentré pour démarrer des échanges commerciaux utiles.'
          }
        }
      },
      process: {
        eyebrow: 'Comment ça marche',
        title: 'Un meilleur chemin du lot de cacao à la discussion commerciale.',
        description: 'CacaoMarket donne à chaque partie une manière structurée de présenter ce qu’elle a et ce qu’elle recherche.',
        steps: {
          publish: {
            title: 'Publiez votre lot de cacao',
            description: 'Décrivez le volume disponible, la qualité, la localisation et la période de livraison souhaitée dans une offre claire.'
          },
          demand: {
            title: 'Rencontrez une demande sérieuse',
            description: 'Atteignez des acheteurs qui recherchent des quantités commerciales, pas des échantillons ponctuels ou des échanges imprécis.'
          },
          clarity: {
            title: 'Avancez avec clarté',
            description: 'Comparez les intérêts, discutez des conditions et transformez une mise en relation qualifiée en prochaine étape concrète.'
          }
        }
      },
      farmers: {
        eyebrow: 'Pour les producteurs & coopératives',
        title: 'Rendez votre récolte plus simple à comprendre — et plus difficile à ignorer.',
        description: 'Créez une offre claire autour du volume, de l’origine, de la qualité et de la disponibilité. Laissez les bons acheteurs voir l’opportunité de votre lot.',
        action: 'J’ai du cacao à vendre'
      },
      buyers: {
        eyebrow: 'Pour les acheteurs & équipes sourcing',
        title: 'Commencez avec des lots à la hauteur de votre ambition.',
        description: 'Trouvez des producteurs prêts à discuter de quantités commerciales, puis ouvrez un échange direct avec le contexte nécessaire à votre approvisionnement.',
        action: 'Je souhaite acheter'
      },
      finalCta: {
        eyebrow: 'Un marché du cacao plus connecté',
        title: 'Donnez de la clarté à votre prochaine discussion cacao.',
        description: 'Que vous prépariez un lot important ou cherchiez à vous approvisionner, CacaoMarket vous offre un point de départ plus intentionnel.'
      },
      footer: {
        description: 'Aider les producteurs et les acheteurs de cacao à trouver un chemin plus clair vers le commerce.',
        farmers: 'Producteurs',
        buyers: 'Acheteurs',
        about: 'À propos'
      }
    }
  }
} as const satisfies Record<'en' | 'fr', TranslationDictionary>;
