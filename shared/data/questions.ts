export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  securityTip: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  topic: string;
  points: number;
}

export const questions: Question[] = [
  // Internet Safety
  {
    id: "inet-001",
    text: "What technique helps you verify if an online profile is genuine?",
    options: [
      "Check for profile consistency across platforms",
      "Look only at their follower count",
      "Assume all profiles with photos are real",
      "Trust profiles that message you first"
    ],
    correctOptionIndex: 0,
    explanation: "Genuine profiles typically have consistent information, posting history, and connections across platforms. Look for details like when the account was created, the types of posts shared, and if the profile seems naturally developed over time.",
    securityTip: "Before connecting with someone online, do a quick cross-platform search of their name and check if their profile details, photos, and posting style appear consistent. Be especially cautious of recently created accounts with limited history.",
    difficulty: "beginner",
    topic: "Internet Safety",
    points: 100
  },
  {
    id: "inet-002",
    text: "Which of the following is a sign of a potentially harmful website?",
    options: [
      "The website has a modern design",
      "The URL begins with 'https://'",
      "There are many misspellings and grammar errors",
      "The website has a privacy policy"
    ],
    correctOptionIndex: 2,
    explanation: "Legitimate websites typically maintain professional standards including proper spelling and grammar. Frequent errors often indicate lack of professionalism or potentially malicious intent, as scam websites tend to have less editorial oversight.",
    securityTip: "Trust your instincts - if a website feels unprofessional due to language errors, poor design, or unusual requests, it's better to leave and find information from more established sources.",
    difficulty: "beginner",
    topic: "Internet Safety",
    points: 100
  },
  {
    id: "inet-003",
    text: "What is 'oversharing' in the context of social media?",
    options: [
      "Posting too many times in one day",
      "Sharing content from too many different topics",
      "Revealing excessive personal information that could put you at risk",
      "Having too many followers see your content"
    ],
    correctOptionIndex: 2,
    explanation: "Oversharing on social media means revealing too much personal information that could compromise your privacy, safety, or future opportunities. This includes home addresses, vacation plans, financial details, or personal struggles that might be used against you.",
    securityTip: "Before posting, ask yourself if the information could be used to identify your location, access your accounts, or harm your reputation. Consider creating content guidelines for yourself about what you will and won't share online.",
    difficulty: "beginner",
    topic: "Internet Safety",
    points: 100
  },
  
  // Digital Footprint
  {
    id: "foot-001",
    text: "Which of the following BEST describes your 'digital footprint'?",
    options: [
      "The amount of time you spend online each day",
      "The trace of data you leave behind when using the internet",
      "Your typing pattern and speed on digital devices",
      "The number of accounts you have on social media"
    ],
    correctOptionIndex: 1,
    explanation: "Your digital footprint is the trail of data you create while using the internet, including websites visited, posts made, photos uploaded, messages sent, and information shared. This includes both active contributions (deliberate posts) and passive data collection (browsing history, cookies).",
    securityTip: "Regularly review your digital footprint by searching your name online, checking privacy settings on all accounts, and using tools that show which apps and websites have your data. What you share today might have consequences years later.",
    difficulty: "beginner",
    topic: "Digital Footprint",
    points: 100
  },
  {
    id: "foot-002",
    text: "Why is it important to manage your digital footprint?",
    options: [
      "It affects how much internet bandwidth you use",
      "It can influence future job opportunities and relationships",
      "It determines your computer's processing speed",
      "It's only important for celebrities and public figures"
    ],
    correctOptionIndex: 1,
    explanation: "Your digital footprint can significantly impact your future opportunities. Employers, schools, landlords, and even potential partners often search for information about you online. Negative content can limit opportunities, while a positive digital presence can be beneficial.",
    securityTip: "Build a positive digital footprint by sharing thoughtful content related to your interests and achievements. Regularly review privacy settings, delete unnecessary accounts, and set up Google Alerts for your name to monitor new content.",
    difficulty: "beginner",
    topic: "Digital Footprint",
    points: 100
  },
  {
    id: "foot-003",
    text: "What is 'digital permanence'?",
    options: [
      "The ability to access your digital accounts forever",
      "The guaranteed storage of your files in the cloud",
      "The idea that online content can exist indefinitely, even after deletion",
      "A paid service that preserves your digital content"
    ],
    correctOptionIndex: 2,
    explanation: "Digital permanence refers to the persistent nature of online content. Even after 'deleting' something, copies may exist in backups, archives, screenshots, or have been shared by others, making truly complete deletion nearly impossible.",
    securityTip: "Think before posting as if everything is permanent. Use the 'front page test': Would you be comfortable if your post appeared on the front page of a newspaper? If not, reconsider sharing it online.",
    difficulty: "beginner",
    topic: "Digital Footprint",
    points: 100
  },
  
  // Screen Time Management
  {
    id: "scrn-001",
    text: "Which of these is a healthy approach to managing screen time?",
    options: [
      "Using devices continuously until all tasks are complete",
      "Taking regular breaks and setting time limits for different activities",
      "Completely avoiding all screens as much as possible",
      "Only using screens after midnight when you're less likely to be interrupted"
    ],
    correctOptionIndex: 1,
    explanation: "Healthy screen time management involves balance rather than elimination. Taking regular breaks (like the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds), setting purpose-based time limits, and creating screen-free times and zones help maintain digital wellness.",
    securityTip: "Use screen time management tools built into your devices or third-party apps to track usage patterns and set limits. Creating a 'tech schedule' with designated times for different activities can help maintain balance.",
    difficulty: "beginner",
    topic: "Screen Time Management",
    points: 100
  },
  {
    id: "scrn-002",
    text: "How does excessive screen time before bed affect sleep quality?",
    options: [
      "It has no significant effect on sleep",
      "It only affects sleep if you're watching action movies",
      "It can disrupt melatonin production and make falling asleep more difficult",
      "It always improves sleep by making you more tired"
    ],
    correctOptionIndex: 2,
    explanation: "The blue light emitted by screens can suppress melatonin production, a hormone that regulates sleep. Additionally, engaging with stimulating content can activate your brain rather than allowing it to wind down, making it harder to fall asleep and reducing overall sleep quality.",
    securityTip: "Implement a 'digital sunset' by turning off screens 1-2 hours before bedtime. If you must use devices, enable night mode or blue light filters, and choose relaxing rather than stimulating content.",
    difficulty: "beginner",
    topic: "Screen Time Management",
    points: 100
  },
  
  // Cyberbullying
  {
    id: "bully-001",
    text: "What should you do if you witness cyberbullying?",
    options: [
      "Ignore it completely - it's not your problem",
      "Join in to avoid becoming a target yourself",
      "Support the target privately and report the behavior",
      "Publicly argue with the bully to defend the target"
    ],
    correctOptionIndex: 2,
    explanation: "Supporting the target privately shows them they're not alone while avoiding public confrontation that might escalate the situation. Reporting the behavior to the platform helps enforce community standards. Document evidence if the bullying is severe or persistent.",
    securityTip: "Most social platforms have clear reporting mechanisms for harassment. Learn how to take screenshots and save evidence of bullying. Remember that bystander support can significantly reduce the harmful effects of cyberbullying on targets.",
    difficulty: "beginner",
    topic: "Cyberbullying",
    points: 100
  },
  {
    id: "bully-002",
    text: "What is 'exclusion' as a form of cyberbullying?",
    options: [
      "Blocking someone who is harassing you",
      "Deliberately leaving someone out of online groups or activities",
      "Setting your social media accounts to private",
      "Taking a break from social media platforms"
    ],
    correctOptionIndex: 1,
    explanation: "Exclusion is a form of cyberbullying where someone is deliberately left out of online groups, conversations, or activities as a way to hurt them socially. This can include creating group chats specifically to exclude certain people or organizing events while visibly leaving someone out.",
    securityTip: "Be mindful of how exclusionary behavior can affect others. If you notice someone being systematically excluded, consider reaching out to them privately and including them when appropriate. Recognize the difference between setting healthy boundaries and deliberately excluding to cause harm.",
    difficulty: "beginner",
    topic: "Cyberbullying",
    points: 100
  },
  
  // Digital Wellness
  {
    id: "well-001",
    text: "Which practice best supports digital wellness?",
    options: [
      "Checking notifications immediately whenever they appear",
      "Setting boundaries between online and offline life",
      "Maintaining as many social media accounts as possible",
      "Comparing your achievements to others online"
    ],
    correctOptionIndex: 1,
    explanation: "Setting clear boundaries between online and offline life is essential for digital wellness. This includes designated tech-free times and spaces, taking regular digital detoxes, and being mindful of how digital interactions affect your mental state.",
    securityTip: "Create physical 'no-tech zones' in your home (like bedrooms or dining areas) and schedule regular tech-free activities. Use 'Do Not Disturb' modes during focused work, family time, or before bed to reduce the urge to constantly check devices.",
    difficulty: "beginner",
    topic: "Digital Wellness",
    points: 100
  },
  {
    id: "well-002",
    text: "How can you reduce digital eye strain?",
    options: [
      "Use screens only in complete darkness",
      "Hold your device closer to your eyes",
      "Follow the 20-20-20 rule (every 20 minutes, look 20 feet away for 20 seconds)",
      "Increase screen brightness to maximum"
    ],
    correctOptionIndex: 2,
    explanation: "The 20-20-20 rule helps reduce eye strain by giving your eye muscles a break from focusing at the same distance. Looking at something 20 feet away for 20 seconds every 20 minutes allows your eyes to relax and reduces fatigue.",
    securityTip: "Adjust your screen position so it's slightly below eye level and about arm's length away. Use proper lighting to reduce glare, adjust your screen brightness to match your surroundings, and consider using blue light filtering glasses if you spend long hours on screens.",
    difficulty: "beginner",
    topic: "Digital Wellness",
    points: 100
  },
  
  // Online Identity
  {
    id: "ident-001",
    text: "What is 'digital citizenship'?",
    options: [
      "Having accounts on all major social platforms",
      "Using technology in responsible and ethical ways",
      "Citizenship obtained through online applications",
      "Participating in online voting systems"
    ],
    correctOptionIndex: 1,
    explanation: "Digital citizenship refers to the responsible and ethical use of technology, including appropriate online behavior, understanding digital rights and responsibilities, critical thinking about online content, and participating positively in online communities.",
    securityTip: "Practice good digital citizenship by respecting others online, fact-checking before sharing content, protecting your own and others' privacy, and standing up against harmful online behavior in constructive ways.",
    difficulty: "beginner",
    topic: "Online Identity",
    points: 100
  },
  {
    id: "ident-002",
    text: "What does 'think before you post' mean regarding online communication?",
    options: [
      "Planning elaborate social media campaigns",
      "Considering the potential long-term consequences of your online actions",
      "Writing down posts before typing them online",
      "Only posting content during business hours"
    ],
    correctOptionIndex: 1,
    explanation: "'Think before you post' reminds us to consider the potential consequences of our online content before sharing it. This includes how it might affect our reputation, relationships, future opportunities, and the well-being of others, both immediately and years later.",
    securityTip: "Before posting, pause and ask: Is this true? Is it helpful? Is it inspiring? Is it necessary? Is it kind? Would I be comfortable with this content being seen by family, employers, or appearing in news media? This mindful approach leads to more intentional online presence.",
    difficulty: "beginner",
    topic: "Online Identity",
    points: 100
  },
  
  // Intermediate level questions
  
  // Digital Footprint (Intermediate)
  {
    id: "foot-004",
    text: "What is a 'shadow profile' in the context of digital privacy?",
    options: [
      "A backup of your social media profile",
      "A secondary account you create with a pseudonym",
      "Data collected about you by companies even if you don't use their services",
      "A deleted profile that still appears in search results"
    ],
    correctOptionIndex: 2,
    explanation: "A shadow profile is information collected about you by companies even if you don't have an account with them. This happens through tracking technologies, data sharing between companies, and information provided by people who do use their services (like when a friend uploads their contact list containing your information).",
    securityTip: "Reduce shadow profiling by asking friends not to tag you or upload your contact information, using privacy-focused browsers and search engines, and regularly checking data broker sites to opt out of data collection where possible.",
    difficulty: "intermediate",
    topic: "Digital Footprint",
    points: 200
  },
  
  // Cyberbullying (Intermediate)
  {
    id: "bully-003",
    text: "What is 'doxing' and why is it harmful?",
    options: [
      "Sharing educational documents online",
      "Taking excessive documentation of events",
      "Publishing someone's private information without permission",
      "Downloading someone's public social media photos"
    ],
    correctOptionIndex: 2,
    explanation: "Doxing involves researching and publishing private information about someone without their consent, often with malicious intent. This can include home addresses, phone numbers, workplace details, or family information. It's harmful because it can lead to harassment, stalking, identity theft, or physical danger.",
    securityTip: "Protect yourself from doxing by limiting personal information shared online, using different usernames across platforms, checking images for metadata before posting, and regularly searching for your own information to see what's publicly available.",
    difficulty: "intermediate",
    topic: "Cyberbullying",
    points: 200
  },
  
  // Digital Balance (Intermediate)
  {
    id: "bal-001",
    text: "What is 'phantom vibration syndrome'?",
    options: [
      "A hardware defect causing phones to vibrate randomly",
      "The sensation of feeling your phone vibrate when it hasn't",
      "A ringtone that includes vibration patterns",
      "Software that creates custom vibration patterns"
    ],
    correctOptionIndex: 1,
    explanation: "Phantom vibration syndrome is the perception that your mobile device is vibrating when it actually isn't. This phenomenon, experienced by many smartphone users, suggests how our brains have become hyperaware of our devices, anticipating notifications even when none occur.",
    securityTip: "If you frequently experience phantom vibrations, consider it a sign to evaluate your relationship with technology. Try reducing notification frequency, setting specific check-in times rather than constant availability, or taking short digital detoxes to reset your attention patterns.",
    difficulty: "intermediate",
    topic: "Digital Wellness",
    points: 200
  },
  
  // Social Media Literacy (Intermediate)
  {
    id: "soc-001",
    text: "What is 'context collapse' in social media?",
    options: [
      "When a website crashes due to too many users",
      "The flattening of multiple audiences into one",
      "When old posts resurface unexpectedly",
      "The shortening of attention spans online"
    ],
    correctOptionIndex: 1,
    explanation: "Context collapse occurs when content intended for one audience is seen by multiple, diverse audiences who may interpret it differently. In real life, we adjust our communication based on who we're talking to, but on social media, posts can be seen by family, colleagues, friends, and strangers simultaneously.",
    securityTip: "Manage context collapse by using platform features like close friends lists, audience selectors, or multiple accounts for different contexts. Consider how different audiences might interpret your content, and when in doubt, post with your widest possible audience in mind.",
    difficulty: "intermediate",
    topic: "Digital Literacy",
    points: 200
  },
  
  // Privacy (Intermediate)
  {
    id: "priv-003",
    text: "What are 'dark patterns' in digital design?",
    options: [
      "Color schemes using dark mode",
      "Interface designs that aid visually impaired users",
      "Tricks in website and app design that manipulate users into certain actions",
      "Coding structures that use minimal processing power"
    ],
    correctOptionIndex: 2,
    explanation: "Dark patterns are deceptive design techniques that trick users into doing things they didn't intend to do, like subscribing to services, sharing more data than intended, or making unwanted purchases. These include hidden costs, forced continuity, disguised ads, and confusing interfaces.",
    securityTip: "Be vigilant when navigating websites and apps, especially during signup, checkout, or cancellation processes. Read carefully before clicking, look for pre-checked boxes, be wary of countdown timers creating false urgency, and don't hesitate to abandon a process that feels manipulative.",
    difficulty: "intermediate",
    topic: "Privacy Settings",
    points: 200
  },
  
  // Advanced level questions
  
  // Digital Wellness (Advanced)
  {
    id: "well-003",
    text: "What is 'technoference' and how does it impact relationships?",
    options: [
      "Technical interference between different devices",
      "Using technology to enhance communication in relationships",
      "Disruptions in personal interactions caused by technology use",
      "Relationship problems caused by different tech preferences"
    ],
    correctOptionIndex: 2,
    explanation: "Technoference refers to how technology interrupts and interferes with face-to-face interactions and relationships. Research shows these interruptions—even brief ones like checking notifications during conversations—can decrease relationship satisfaction, create feelings of rejection, and reduce the quality of interactions.",
    securityTip: "Create tech-free zones or times for meaningful interactions. Practice 'phubbing prevention' by keeping devices out of sight during conversations, enabling Do Not Disturb mode during quality time, and discussing technology boundaries with important people in your life.",
    difficulty: "advanced",
    topic: "Digital Wellness",
    points: 300
  },
  
  // Online Identity (Advanced)
  {
    id: "ident-003",
    text: "What is 'context-appropriate sharing' in digital communication?",
    options: [
      "Only posting content during business hours",
      "Tailoring your communication style and content to the specific platform and audience",
      "Sharing the same content across all your platforms simultaneously",
      "Posting only about contexts you're physically present in"
    ],
    correctOptionIndex: 1,
    explanation: "Context-appropriate sharing recognizes that different digital platforms have different cultures, purposes, and audiences. What's appropriate for a close friends Instagram story might be inappropriate for LinkedIn. It involves adjusting content, tone, and level of formality based on the specific context and intended audience.",
    securityTip: "Before posting, consider: Is this content suitable for this specific platform? Does it align with how others use this space? Would it make sense to my intended audience here? This mindful approach leads to more effective communication and reduces social media faux pas.",
    difficulty: "advanced",
    topic: "Online Identity",
    points: 300
  },
  
  // Digital Literacy (Advanced)
  {
    id: "lit-001",
    text: "What is 'deep fake' technology?",
    options: [
      "Advanced encryption for secure communications",
      "AI-generated content that falsely depicts real people saying or doing things",
      "Software that detects fake news with high accuracy",
      "Very convincing phishing attempts"
    ],
    correctOptionIndex: 1,
    explanation: "Deep fake technology uses artificial intelligence and machine learning to create hyper-realistic but fabricated videos, images, or audio where real people appear to say or do things they never did. This technology has rapidly advanced, making fake content increasingly difficult to distinguish from authentic media.",
    securityTip: "Develop critical media literacy skills by questioning the source of surprising or inflammatory content, looking for verification from multiple reliable sources, checking for inconsistencies in lighting or audio, and using tools designed to detect deepfakes when in doubt about content authenticity.",
    difficulty: "advanced",
    topic: "Digital Literacy",
    points: 300
  },
  
  // Algorithm Awareness (Advanced)
  {
    id: "algo-001",
    text: "What is a 'filter bubble' in online media consumption?",
    options: [
      "A feature that blocks inappropriate content",
      "A state of intellectual isolation resulting from personalized algorithms",
      "A tool that improves image quality on social media",
      "A temporary ban from posting on platforms"
    ],
    correctOptionIndex: 1,
    explanation: "A filter bubble occurs when algorithms select content based on your past behavior, creating a personalized information ecosystem that reinforces existing beliefs and limits exposure to contrary perspectives. This can lead to polarization, misinformation vulnerability, and a skewed perception of consensus on issues.",
    securityTip: "Intentionally diversify your information diet by following sources with different perspectives, regularly clearing search history and cookies, using private browsing for certain searches, and occasionally using different search engines or platforms that don't track your preferences.",
    difficulty: "advanced",
    topic: "Digital Literacy",
    points: 300
  },
  
  // Information Verification (Advanced)
  {
    id: "info-001",
    text: "What is 'lateral reading' in information verification?",
    options: [
      "Reading articles from left to right",
      "Comparing multiple articles side by side",
      "Leaving a website to verify its claims on other sites",
      "Checking sources cited within an article"
    ],
    correctOptionIndex: 2,
    explanation: "Lateral reading is a fact-checking strategy where, instead of staying on a website and evaluating it based on its own claims and appearance, you open new tabs to research the site itself, its authors, and verify claims by consulting other authoritative sources. This approach is more effective at identifying misinformation.",
    securityTip: "When encountering new or questionable information, practice lateral reading by: 1) Opening new tabs to search about the source, 2) Looking for information about the author, 3) Checking if other reputable sources report the same information, and 4) Consulting fact-checking websites.",
    difficulty: "advanced",
    topic: "Digital Literacy",
    points: 300
  }
];

export const achievements = [
  {
    id: "beginner-complete",
    name: "Digital Wellness Novice",
    description: "Complete 10 beginner-level questions",
    requirement: { type: "questions_by_difficulty", difficulty: "beginner", count: 10 },
    reward: { xp: 100, coins: 50 },
    icon: "shield-alt"
  },
  {
    id: "safety-expert",
    name: "Internet Safety Expert",
    description: "Correctly answer 10 internet safety questions",
    requirement: { type: "correct_by_topic", topic: "Internet Safety", count: 10 },
    reward: { xp: 200, coins: 100 },
    icon: "shield-check"
  },
  {
    id: "footprint-master",
    name: "Digital Footprint Master",
    description: "Complete all digital footprint challenges",
    requirement: { type: "all_in_topic", topic: "Digital Footprint" },
    reward: { xp: 300, coins: 150 },
    icon: "fingerprint"
  },
  {
    id: "screen-balance",
    name: "Screen Time Guru",
    description: "Answer all screen time management questions correctly",
    requirement: { type: "all_in_topic", topic: "Screen Time Management" },
    reward: { xp: 250, coins: 125 },
    icon: "clock"
  },
  {
    id: "cyberbullying-awareness",
    name: "Kindness Advocate",
    description: "Master all cyberbullying prevention questions",
    requirement: { type: "all_in_topic", topic: "Cyberbullying" },
    reward: { xp: 275, coins: 140 },
    icon: "heart"
  },
  {
    id: "digital-detox",
    name: "Digital Detox Master",
    description: "Complete 15 Digital Wellness questions",
    requirement: { type: "correct_by_topic", topic: "Digital Wellness", count: 15 },
    reward: { xp: 325, coins: 175 },
    icon: "leaf"
  },
  {
    id: "streak-5",
    name: "On Fire!",
    description: "Answer 5 questions correctly in a row",
    requirement: { type: "streak", count: 5 },
    reward: { xp: 100, coins: 50 },
    icon: "fire"
  },
  {
    id: "streak-10",
    name: "Perfect Streak",
    description: "Answer 10 questions correctly in a row",
    requirement: { type: "streak", count: 10 },
    reward: { xp: 300, coins: 150 },
    icon: "medal"
  },
  {
    id: "daily-login-7",
    name: "Wellness Warrior",
    description: "Log in for 7 consecutive days",
    requirement: { type: "login_streak", count: 7 },
    reward: { xp: 150, coins: 100 },
    icon: "calendar-check"
  },
  {
    id: "all-topics",
    name: "Balanced Digital Citizen",
    description: "Answer at least one question from each topic",
    requirement: { type: "all_topics" },
    reward: { xp: 250, coins: 125 },
    icon: "star"
  },
  {
    id: "advanced-5",
    name: "Digital Wellness Expert",
    description: "Correctly answer 5 advanced questions",
    requirement: { type: "correct_by_difficulty", difficulty: "advanced", count: 5 },
    reward: { xp: 400, coins: 200 },
    icon: "user-graduate"
  }
];

export const avatars = [
  {
    id: "default",
    name: "Digital Wellness Advocate",
    imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    unlocked: true,
    cost: 0
  },
  {
    id: "robot",
    name: "DigitalBot",
    imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    unlocked: true,
    cost: 0
  },
  {
    id: "hacker",
    name: "Tech Whiz",
    imageUrl: "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    unlocked: true,
    cost: 0
  },
  {
    id: "cyber-ninja",
    name: "Digital Ninja",
    imageUrl: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    unlocked: false,
    cost: 500
  },
  {
    id: "security-guru",
    name: "Wellness Guru",
    imageUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    unlocked: false,
    cost: 750
  },
  {
    id: "cyber-detective",
    name: "Digital Detective",
    imageUrl: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    unlocked: false,
    cost: 1000
  }
];
