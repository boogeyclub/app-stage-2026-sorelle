export type TranslationNode = string | { [key: string]: TranslationNode };
export type TranslationDictionary = Record<string, TranslationNode>;

export const TRANSLATIONS = {
  en: {
    meta: {
      landingTitle: 'CacaoMarket | Cocoa trade with confidence',
      loginTitle: 'CacaoMarket | Sign in',
      registrationTitle: 'CacaoMarket | Create your account',
      confirmationTitle: 'CacaoMarket | Confirm your account',
      administratorDashboardTitle: 'CacaoMarket | Administrator workspace',
      sellerDashboardTitle: 'CacaoMarket | Seller workspace',
      userDashboardTitle: 'CacaoMarket | User workspace',
      accountTitle: 'CacaoMarket | Account settings'
    },
    common: {
      brandName: 'CacaoMarket',
      homeAria: 'CacaoMarket home',
      primaryNavigation: 'Primary navigation',
      languageSelector: 'Choose language',
      switchToLanguage: 'Switch to {{language}}',
      languageNames: {
        english: 'English',
        french: 'French'
      },
      languageCodes: {
        english: 'EN',
        french: 'FR'
      }
    },
    notifications: {
      outletAria: 'Notifications',
      dismiss: 'Dismiss notification',
      types: {
        loading: 'In progress',
        success: 'Success',
        error: 'Error',
        warning: 'Attention',
        info: 'Information'
      },
      forms: {
        invalid: 'Review the highlighted fields before continuing.'
      },
      api: {
        requestFailed: 'We could not complete the request. Please try again.'
      },
      registration: {
        starting: 'Creating your account…',
        success: 'Your registration request was accepted. Check your email to confirm it.'
      },
      confirmation: {
        starting: 'Confirming your CacaoMarket account…',
        success: 'Your account is confirmed. Redirecting you to sign in…',
        alreadyConfirmed: 'This account was already confirmed. Redirecting you to sign in…',
        missingToken: 'This confirmation link is incomplete. Please use the complete link from your email.'
      },
      login: {
        starting: 'Checking your credentials…',
        success: 'You are signed in.'
      },
      session: {
        signingOut: 'Signing you out securely…',
        signedOut: 'You have been signed out.',
        signOutFailed: 'We could not sign you out. Please try again.',
        disconnecting: 'Disconnecting the selected browser session…',
        disconnected: 'The browser session was disconnected.',
        disconnectFailed: 'We could not disconnect that browser session. Please try again.',
        sessionsLoadFailed: 'We could not load your browser sessions right now.'
      },
      language: {
        changed: 'Language changed to {{language}}.'
      }
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
        sourceCocoaShort: 'I source cocoa',
        signIn: 'Sign in'
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
    },
    auth: {
      shared: {
        secureAccess: 'Secure access for the cocoa market',
        backToMarket: 'Back to CacaoMarket',
        footer: 'CacaoMarket — cocoa trade with confidence',
        profileProtection: 'Your account information is protected and used only to create your market profile.',
        showPassword: 'Show password',
        hidePassword: 'Hide password'
      },
      login: {
        eyebrow: 'Welcome back',
        title: 'Sign in to move cocoa trade forward.',
        description: 'Access your CacaoMarket workspace to manage your profile, market activity, and conversations.',
        identityLabel: 'Email address or login',
        identityPlaceholder: 'you@example.com or your login',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter your password',
        rememberMe: 'Keep this session active longer',
        forgotPassword: 'Forgot password?',
        submit: 'Sign in securely',
        submitting: 'Signing in…',
        signedIn: 'You are signed in as {{name}}.',
        errors: {
          invalidCredentials: 'Your email, login, or password is incorrect.',
          pendingConfirmation: 'Confirm the email sent during registration before signing in.',
          requestFailed: 'We could not sign you in right now. Please try again.'
        },
        noAccount: 'New to CacaoMarket?',
        createAccount: 'Create an account',
        identityRequired: 'Enter your email address or login.',
        passwordRequired: 'Enter your password.',
        passwordMin: 'Your password must contain at least 8 characters.'
      },
      confirmation: {
        eyebrow: 'Email verification',
        title: 'Confirming your CacaoMarket account',
        description: 'We are securely verifying your personal confirmation link.',
        loadingTitle: 'Confirming your email address…',
        loadingDescription: 'Please keep this page open while we activate your account.',
        successTitle: 'Your account is confirmed.',
        successDescription: 'You can now sign in and begin using CacaoMarket.',
        redirecting: 'Redirecting to sign in in {{seconds}} seconds.',
        signInNow: 'Sign in now',
        errorTitle: 'We could not confirm your account.',
        missingToken: 'This confirmation link is incomplete. Open the complete link from your email or register again.',
        registerAgain: 'Create a new account',
        errors: {
          invalid: 'This confirmation link is invalid. Please request a new registration link.',
          expired: 'This confirmation link has expired. Please register again.',
          alreadyConfirmed: 'This account has already been confirmed. You can sign in now.',
          unavailable: 'This confirmation link is not available for activation. Please register again.',
          requestFailed: 'We could not confirm your account right now. Please try again.'
        }
      },
      registration: {
        eyebrow: 'Create your market profile',
        title: 'Start your next cocoa trade with clarity.',
        description: 'Create an account to present your interest in selling or sourcing commercial cocoa lots.',
        chooseRole: 'How will you use CacaoMarket?',
        sellerTitle: 'I want to sell cocoa',
        sellerDescription: 'For farmers, cooperatives, and sellers with cocoa lots to present.',
        buyerTitle: 'I want to source cocoa',
        buyerDescription: 'For buyers and sourcing teams looking for commercial quantities.',
        firstNameLabel: 'First name',
        firstNamePlaceholder: 'Your first name',
        lastNameLabel: 'Last name',
        lastNamePlaceholder: 'Your last name',
        emailLabel: 'Email address',
        emailPlaceholder: 'you@example.com',
        loginLabel: 'Choose a login',
        loginPlaceholder: 'Your preferred login',
        passwordLabel: 'Create a password',
        passwordPlaceholder: 'At least 8 characters',
        confirmPasswordLabel: 'Confirm password',
        confirmPasswordPlaceholder: 'Repeat your password',
        agreement: 'I agree to create a CacaoMarket account for market-related communication.',
        submit: 'Create my account',
        submitting: 'Sending confirmation email…',
        confirmationSent: 'A confirmation email was sent to {{email}}.',
        confirmationExpiry: 'Open its personal link within 3 hours. Unconfirmed registrations expire and are removed automatically.',
        errors: {
          identityExists: 'An account already uses this email address or login.',
          deliveryUnavailable: 'We could not send your confirmation email. Please try again later.',
          requestFailed: 'We could not start your registration. Please review your information and try again.'
        },
        alreadyAccount: 'Already have an account?',
        signIn: 'Sign in',
        roleRequired: 'Choose how you will use CacaoMarket.',
        firstNameRequired: 'Enter your first name.',
        lastNameRequired: 'Enter your last name.',
        emailRequired: 'Enter your email address.',
        emailInvalid: 'Enter a valid email address.',
        loginRequired: 'Choose a login.',
        loginMin: 'Your login must contain at least 3 characters.',
        passwordRequired: 'Create a password.',
        passwordMin: 'Your password must contain at least 8 characters.',
        confirmPasswordRequired: 'Confirm your password.',
        passwordMismatch: 'The password confirmation does not match.',
        agreementRequired: 'Please confirm your agreement to continue.'
      }
    },
    dashboard: {
      roles: {
        administrator: 'Administrator',
        seller: 'Seller',
        user: 'User'
      },
      header: {
        overview: 'Overview',
        accountSettings: 'Account settings',
        signOut: 'Sign out',
        accountMenu: 'Account menu',
        signedInAs: 'Signed in as {{role}}',
        openAccountMenu: 'Open account menu'
      },
      shared: {
        workspace: 'CacaoMarket workspace',
        ready: 'Ready for your next step',
        nextStep: 'Suggested next step',
        viewAccount: 'View account settings',
        secureWorkspace: 'Your workspace is protected by a browser session.'
      },
      admin: {
        eyebrow: 'Administrator workspace',
        title: 'Keep the CacaoMarket ecosystem moving with confidence.',
        description: 'Your operational home for supervising access, trade activity, and the platform experience.',
        accessCard: {
          title: 'Access governance',
          description: 'Review roles and keep the right people connected to the marketplace.'
        },
        sessionsCard: {
          title: 'Connected browsers',
          description: 'Session controls make it easier to keep account access deliberate and secure.'
        },
        marketCard: {
          title: 'Market readiness',
          description: 'Prepare the operating view for the next wave of cocoa activity.'
        },
        nextTitle: 'Set the operational rhythm',
        nextDescription: 'Your administrator dashboard is ready for user management, role controls, and future market oversight modules.',
        accountAction: 'Open my account settings'
      },
      seller: {
        eyebrow: 'Seller workspace',
        title: 'Turn your cocoa availability into a clear market story.',
        description: 'This is your home for preparing lots, presenting readiness, and following buyer interest.',
        prepareCard: {
          title: 'Prepare your next lot',
          description: 'Bring together volume, origin, quality, and your preferred delivery window.'
        },
        profileCard: {
          title: 'Strengthen your seller profile',
          description: 'Keep the contact details and commercial context buyers need up to date.'
        },
        conversationsCard: {
          title: 'Stay ready for conversations',
          description: 'Future buyer requests and trade conversations will appear here.'
        },
        nextTitle: 'Your seller workspace is ready',
        nextDescription: 'Complete your account details now so your cocoa listings can be introduced with confidence.',
        accountAction: 'Review my seller account'
      },
      user: {
        eyebrow: 'User workspace',
        title: 'Source cocoa with more context and less uncertainty.',
        description: 'Your personal workspace will bring qualified cocoa opportunities and trade conversations into one focused view.',
        discoverCard: {
          title: 'Discover qualified lots',
          description: 'Explore market-ready cocoa opportunities when the marketplace catalogue is available.'
        },
        preferencesCard: {
          title: 'Clarify your sourcing needs',
          description: 'Your account will help you keep origin, volume, and timing preferences visible.'
        },
        conversationsCard: {
          title: 'Build meaningful connections',
          description: 'Future seller conversations and requests will be organised here.'
        },
        nextTitle: 'Your sourcing workspace is ready',
        nextDescription: 'Review your account details so the right cocoa opportunities can find you.',
        accountAction: 'Review my account'
      },
      account: {
        eyebrow: 'Account settings',
        title: 'Your profile and connected browsers.',
        description: 'Review the profile used in this workspace and manage every active browser session for this account.',
        profileTitle: 'Profile',
        name: 'Name',
        email: 'Email address',
        login: 'Login',
        role: 'User type',
        sessionsTitle: 'Connected browsers',
        sessionsDescription: 'Each successful browser login has its own protected session. You can disconnect a browser you no longer use.',
        current: 'This browser',
        remembered: 'Extended session',
        standard: 'Standard session',
        lastActive: 'Last active {{time}}',
        expires: 'Expires {{time}}',
        created: 'Signed in {{time}}',
        disconnect: 'Disconnect',
        disconnectCurrent: 'Sign out this browser',
        noSessions: 'No active browser sessions were found.',
        refreshSessions: 'Refresh sessions',
        loadingSessions: 'Loading your connected browsers…'
      }
    }
  },
  fr: {
    meta: {
      landingTitle: 'CacaoMarket | Le commerce du cacao en toute confiance',
      loginTitle: 'CacaoMarket | Connexion',
      registrationTitle: 'CacaoMarket | Créer votre compte',
      confirmationTitle: 'CacaoMarket | Confirmer votre compte',
      administratorDashboardTitle: 'CacaoMarket | Espace administrateur',
      sellerDashboardTitle: 'CacaoMarket | Espace vendeur',
      userDashboardTitle: 'CacaoMarket | Espace utilisateur',
      accountTitle: 'CacaoMarket | Paramètres du compte'
    },
    common: {
      brandName: 'CacaoMarket',
      homeAria: 'Accueil CacaoMarket',
      primaryNavigation: 'Navigation principale',
      languageSelector: 'Choisir la langue',
      switchToLanguage: 'Passer en {{language}}',
      languageNames: {
        english: 'anglais',
        french: 'français'
      },
      languageCodes: {
        english: 'EN',
        french: 'FR'
      }
    },
    notifications: {
      outletAria: 'Notifications',
      dismiss: 'Fermer la notification',
      types: {
        loading: 'En cours',
        success: 'Succès',
        error: 'Erreur',
        warning: 'Attention',
        info: 'Information'
      },
      forms: {
        invalid: 'Vérifiez les champs mis en évidence avant de continuer.'
      },
      api: {
        requestFailed: 'Nous n’avons pas pu terminer la demande. Réessayez.'
      },
      registration: {
        starting: 'Création de votre compte…',
        success: 'Votre demande d’inscription a été acceptée. Consultez votre e-mail pour la confirmer.'
      },
      confirmation: {
        starting: 'Confirmation de votre compte CacaoMarket…',
        success: 'Votre compte est confirmé. Redirection vers la connexion…',
        alreadyConfirmed: 'Ce compte était déjà confirmé. Redirection vers la connexion…',
        missingToken: 'Ce lien de confirmation est incomplet. Utilisez le lien complet reçu par e-mail.'
      },
      login: {
        starting: 'Vérification de vos identifiants…',
        success: 'Vous êtes connecté(e).'
      },
      session: {
        signingOut: 'Déconnexion sécurisée en cours…',
        signedOut: 'Vous êtes déconnecté(e).',
        signOutFailed: 'Nous ne pouvons pas vous déconnecter. Réessayez.',
        disconnecting: 'Déconnexion de la session navigateur sélectionnée…',
        disconnected: 'La session navigateur a été déconnectée.',
        disconnectFailed: 'Nous ne pouvons pas déconnecter cette session navigateur. Réessayez.',
        sessionsLoadFailed: 'Nous ne pouvons pas charger vos sessions navigateur pour le moment.'
      },
      language: {
        changed: 'La langue a été changée pour {{language}}.'
      }
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
        sourceCocoaShort: 'Je recherche du cacao',
        signIn: 'Se connecter'
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
    },
    auth: {
      shared: {
        secureAccess: 'Accès sécurisé au marché du cacao',
        backToMarket: 'Retour à CacaoMarket',
        footer: 'CacaoMarket — le commerce du cacao en toute confiance',
        profileProtection: 'Vos informations sont protégées et utilisées uniquement pour créer votre profil de marché.',
        showPassword: 'Afficher le mot de passe',
        hidePassword: 'Masquer le mot de passe'
      },
      login: {
        eyebrow: 'Bienvenue',
        title: 'Connectez-vous pour faire avancer votre commerce du cacao.',
        description: 'Accédez à votre espace CacaoMarket pour gérer votre profil, votre activité de marché et vos conversations.',
        identityLabel: 'Adresse e-mail ou identifiant',
        identityPlaceholder: 'vous@exemple.com ou votre identifiant',
        passwordLabel: 'Mot de passe',
        passwordPlaceholder: 'Saisissez votre mot de passe',
        rememberMe: 'Garder cette session active plus longtemps',
        forgotPassword: 'Mot de passe oublié ?',
        submit: 'Se connecter en toute sécurité',
        submitting: 'Connexion en cours…',
        signedIn: 'Vous êtes connecté(e) en tant que {{name}}.',
        errors: {
          invalidCredentials: 'Votre e-mail, identifiant ou mot de passe est incorrect.',
          pendingConfirmation: 'Confirmez l’e-mail reçu lors de votre inscription avant de vous connecter.',
          requestFailed: 'Nous ne pouvons pas vous connecter pour le moment. Réessayez.'
        },
        noAccount: 'Nouveau sur CacaoMarket ?',
        createAccount: 'Créer un compte',
        identityRequired: 'Saisissez votre adresse e-mail ou votre identifiant.',
        passwordRequired: 'Saisissez votre mot de passe.',
        passwordMin: 'Votre mot de passe doit contenir au moins 8 caractères.'
      },
      confirmation: {
        eyebrow: 'Vérification de l’e-mail',
        title: 'Confirmation de votre compte CacaoMarket',
        description: 'Nous vérifions de manière sécurisée votre lien personnel de confirmation.',
        loadingTitle: 'Confirmation de votre adresse e-mail…',
        loadingDescription: 'Gardez cette page ouverte pendant l’activation de votre compte.',
        successTitle: 'Votre compte est confirmé.',
        successDescription: 'Vous pouvez maintenant vous connecter et commencer à utiliser CacaoMarket.',
        redirecting: 'Redirection vers la connexion dans {{seconds}} secondes.',
        signInNow: 'Se connecter maintenant',
        errorTitle: 'Nous n’avons pas pu confirmer votre compte.',
        missingToken: 'Ce lien de confirmation est incomplet. Ouvrez le lien complet reçu par e-mail ou inscrivez-vous de nouveau.',
        registerAgain: 'Créer un nouveau compte',
        errors: {
          invalid: 'Ce lien de confirmation est invalide. Demandez un nouveau lien en vous inscrivant à nouveau.',
          expired: 'Ce lien de confirmation a expiré. Veuillez vous inscrire de nouveau.',
          alreadyConfirmed: 'Ce compte a déjà été confirmé. Vous pouvez vous connecter.',
          unavailable: 'Ce lien de confirmation ne peut pas activer ce compte. Veuillez vous inscrire de nouveau.',
          requestFailed: 'Nous ne pouvons pas confirmer votre compte pour le moment. Réessayez.'
        }
      },
      registration: {
        eyebrow: 'Créez votre profil de marché',
        title: 'Préparez votre prochaine transaction cacao avec clarté.',
        description: 'Créez un compte pour présenter votre intérêt à vendre ou à rechercher des lots de cacao commerciaux.',
        chooseRole: 'Comment allez-vous utiliser CacaoMarket ?',
        sellerTitle: 'Je souhaite vendre du cacao',
        sellerDescription: 'Pour les producteurs, coopératives et vendeurs ayant des lots de cacao à présenter.',
        buyerTitle: 'Je souhaite rechercher du cacao',
        buyerDescription: 'Pour les acheteurs et équipes sourcing qui recherchent des quantités commerciales.',
        firstNameLabel: 'Prénom',
        firstNamePlaceholder: 'Votre prénom',
        lastNameLabel: 'Nom',
        lastNamePlaceholder: 'Votre nom',
        emailLabel: 'Adresse e-mail',
        emailPlaceholder: 'vous@exemple.com',
        loginLabel: 'Choisissez un identifiant',
        loginPlaceholder: 'Votre identifiant préféré',
        passwordLabel: 'Créez un mot de passe',
        passwordPlaceholder: 'Au moins 8 caractères',
        confirmPasswordLabel: 'Confirmez le mot de passe',
        confirmPasswordPlaceholder: 'Répétez votre mot de passe',
        agreement: 'J’accepte de créer un compte CacaoMarket pour des échanges liés au marché.',
        submit: 'Créer mon compte',
        submitting: 'Envoi de l’e-mail de confirmation…',
        confirmationSent: 'Un e-mail de confirmation a été envoyé à {{email}}.',
        confirmationExpiry: 'Ouvrez son lien personnel dans les 3 heures. Les inscriptions non confirmées expirent et sont supprimées automatiquement.',
        errors: {
          identityExists: 'Un compte utilise déjà cette adresse e-mail ou cet identifiant.',
          deliveryUnavailable: 'Nous n’avons pas pu envoyer votre e-mail de confirmation. Réessayez plus tard.',
          requestFailed: 'Nous n’avons pas pu démarrer votre inscription. Vérifiez vos informations et réessayez.'
        },
        alreadyAccount: 'Vous avez déjà un compte ?',
        signIn: 'Se connecter',
        roleRequired: 'Choisissez comment vous utiliserez CacaoMarket.',
        firstNameRequired: 'Saisissez votre prénom.',
        lastNameRequired: 'Saisissez votre nom.',
        emailRequired: 'Saisissez votre adresse e-mail.',
        emailInvalid: 'Saisissez une adresse e-mail valide.',
        loginRequired: 'Choisissez un identifiant.',
        loginMin: 'Votre identifiant doit contenir au moins 3 caractères.',
        passwordRequired: 'Créez un mot de passe.',
        passwordMin: 'Votre mot de passe doit contenir au moins 8 caractères.',
        confirmPasswordRequired: 'Confirmez votre mot de passe.',
        passwordMismatch: 'La confirmation du mot de passe ne correspond pas.',
        agreementRequired: 'Veuillez confirmer votre accord pour continuer.'
      }
    },
    dashboard: {
      roles: {
        administrator: 'Administrateur',
        seller: 'Vendeur',
        user: 'Utilisateur'
      },
      header: {
        overview: 'Vue d’ensemble',
        accountSettings: 'Paramètres du compte',
        signOut: 'Se déconnecter',
        accountMenu: 'Menu du compte',
        signedInAs: 'Connecté(e) en tant que {{role}}',
        openAccountMenu: 'Ouvrir le menu du compte'
      },
      shared: {
        workspace: 'Espace CacaoMarket',
        ready: 'Prêt pour votre prochaine étape',
        nextStep: 'Prochaine étape suggérée',
        viewAccount: 'Voir les paramètres du compte',
        secureWorkspace: 'Votre espace est protégé par une session navigateur.'
      },
      admin: {
        eyebrow: 'Espace administrateur',
        title: 'Faites avancer l’écosystème CacaoMarket en toute confiance.',
        description: 'Votre espace opérationnel pour superviser les accès, l’activité commerciale et l’expérience de la plateforme.',
        accessCard: {
          title: 'Gouvernance des accès',
          description: 'Examinez les rôles et assurez-vous que les bonnes personnes sont connectées à la place de marché.'
        },
        sessionsCard: {
          title: 'Navigateurs connectés',
          description: 'Les contrôles de session rendent l’accès aux comptes plus réfléchi et plus sécurisé.'
        },
        marketCard: {
          title: 'Préparation du marché',
          description: 'Préparez la vue opérationnelle pour la prochaine activité autour du cacao.'
        },
        nextTitle: 'Donnez le rythme opérationnel',
        nextDescription: 'Votre tableau de bord administrateur est prêt pour la gestion des utilisateurs, les contrôles de rôles et les futurs modules de supervision du marché.',
        accountAction: 'Ouvrir mes paramètres de compte'
      },
      seller: {
        eyebrow: 'Espace vendeur',
        title: 'Transformez votre disponibilité cacao en une offre de marché claire.',
        description: 'Voici votre espace pour préparer vos lots, présenter leur disponibilité et suivre l’intérêt des acheteurs.',
        prepareCard: {
          title: 'Préparez votre prochain lot',
          description: 'Réunissez le volume, l’origine, la qualité et votre période de livraison préférée.'
        },
        profileCard: {
          title: 'Renforcez votre profil vendeur',
          description: 'Gardez à jour les coordonnées et le contexte commercial dont les acheteurs ont besoin.'
        },
        conversationsCard: {
          title: 'Restez prêt pour les échanges',
          description: 'Les futures demandes acheteurs et conversations commerciales apparaîtront ici.'
        },
        nextTitle: 'Votre espace vendeur est prêt',
        nextDescription: 'Complétez vos informations de compte dès maintenant afin que vos offres de cacao soient présentées avec confiance.',
        accountAction: 'Vérifier mon compte vendeur'
      },
      user: {
        eyebrow: 'Espace utilisateur',
        title: 'Approvisionnez-vous en cacao avec plus de contexte et moins d’incertitude.',
        description: 'Votre espace personnel réunira les opportunités cacao qualifiées et les conversations commerciales dans une vue ciblée.',
        discoverCard: {
          title: 'Découvrez des lots qualifiés',
          description: 'Explorez les opportunités cacao prêtes pour le marché lorsque le catalogue sera disponible.'
        },
        preferencesCard: {
          title: 'Précisez vos besoins d’approvisionnement',
          description: 'Votre compte vous aidera à garder visibles vos préférences d’origine, de volume et de calendrier.'
        },
        conversationsCard: {
          title: 'Créez des relations utiles',
          description: 'Les futures conversations et demandes aux vendeurs seront organisées ici.'
        },
        nextTitle: 'Votre espace approvisionnement est prêt',
        nextDescription: 'Vérifiez vos informations de compte afin que les bonnes opportunités cacao puissent vous trouver.',
        accountAction: 'Vérifier mon compte'
      },
      account: {
        eyebrow: 'Paramètres du compte',
        title: 'Votre profil et vos navigateurs connectés.',
        description: 'Vérifiez le profil utilisé dans cet espace et gérez chaque session navigateur active de ce compte.',
        profileTitle: 'Profil',
        name: 'Nom',
        email: 'Adresse e-mail',
        login: 'Identifiant',
        role: 'Type d’utilisateur',
        sessionsTitle: 'Navigateurs connectés',
        sessionsDescription: 'Chaque connexion navigateur réussie possède sa propre session protégée. Vous pouvez déconnecter un navigateur que vous n’utilisez plus.',
        current: 'Ce navigateur',
        remembered: 'Session prolongée',
        standard: 'Session standard',
        lastActive: 'Dernière activité {{time}}',
        expires: 'Expire {{time}}',
        created: 'Connexion {{time}}',
        disconnect: 'Déconnecter',
        disconnectCurrent: 'Se déconnecter de ce navigateur',
        noSessions: 'Aucune session navigateur active n’a été trouvée.',
        refreshSessions: 'Actualiser les sessions',
        loadingSessions: 'Chargement de vos navigateurs connectés…'
      }
    }
  }
} as const satisfies Record<'en' | 'fr', TranslationDictionary>;
