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
  // Phishing & Social Engineering
  {
    id: "phish-001",
    text: "What technique do attackers commonly use to create urgency in phishing emails?",
    options: [
      "Time-limited offers",
      "Long, detailed explanations",
      "No call to action",
      "Providing multiple contact options"
    ],
    correctOptionIndex: 0,
    explanation: "Attackers commonly create a false sense of urgency in phishing emails by using time-limited offers or threats. This pressures victims to act quickly without properly verifying the email's legitimacy.",
    securityTip: "Legitimate organizations rarely create extreme urgency via email. If you receive an urgent email requesting immediate action, verify through official channels by typing the organization's URL directly in your browser (don't click links) or calling their official customer service number.",
    difficulty: "beginner",
    topic: "Phishing & Social Engineering",
    points: 100
  },
  {
    id: "phish-002",
    text: "Which of the following is a sign of a phishing email?",
    options: [
      "The email comes from a company you do business with",
      "The email has a generic greeting like 'Dear Customer'",
      "The email has the company's correct logo",
      "The email was sent during business hours"
    ],
    correctOptionIndex: 1,
    explanation: "Generic greetings like 'Dear Customer' or 'Dear User' instead of your actual name can indicate a phishing attempt. Legitimate organizations that have your information typically address you by name.",
    securityTip: "Look for personalization in emails claiming to be from services you use. If a company you regularly do business with suddenly doesn't know your name, be suspicious.",
    difficulty: "beginner",
    topic: "Phishing & Social Engineering",
    points: 100
  },
  {
    id: "phish-003",
    text: "What is 'spear phishing'?",
    options: [
      "Using fake fishing websites to collect credentials",
      "Targeted phishing attacks aimed at specific individuals or organizations",
      "Using multiple phishing methods simultaneously",
      "Phishing attacks that originate from compromised email servers"
    ],
    correctOptionIndex: 1,
    explanation: "Spear phishing refers to targeted phishing attacks that are customized for specific individuals or organizations. These attacks use personal information to make the phishing attempt more convincing.",
    securityTip: "Be especially cautious of emails that contain accurate personal details, as attackers might have researched you through social media or data breaches. This doesn't automatically make the email legitimate.",
    difficulty: "intermediate",
    topic: "Phishing & Social Engineering",
    points: 200
  },
  
  // Password Security
  {
    id: "pass-001",
    text: "Which of the following is the MOST secure password?",
    options: [
      "P@ssw0rd!",
      "ilovemydog",
      "Tr0ub4dor&3",
      "correct-horse-battery-staple"
    ],
    correctOptionIndex: 3,
    explanation: "A long passphrase like 'correct-horse-battery-staple' is more secure than shorter passwords with special characters and numbers. The length adds more entropy (randomness) making it harder to crack even without special characters.",
    securityTip: "Consider using a passphrase (multiple random words) instead of a single word with substitutions. Passphrases are easier to remember and can be more secure due to their length.",
    difficulty: "beginner",
    topic: "Password Security",
    points: 100
  },
  {
    id: "pass-002",
    text: "What is the main problem with reusing the same password across multiple sites?",
    options: [
      "It's too easy to forget which sites use that password",
      "The password becomes weaker the more you use it",
      "If one site is breached, all your accounts could be compromised",
      "Password managers won't work properly"
    ],
    correctOptionIndex: 2,
    explanation: "When you reuse passwords and one site experiences a data breach, attackers can try those same credentials on other popular websites (known as credential stuffing), potentially compromising all your accounts.",
    securityTip: "Use a unique password for every account, especially for important services like email, banking, and social media. A password manager can help you generate and store unique passwords securely.",
    difficulty: "beginner",
    topic: "Password Security",
    points: 100
  },
  {
    id: "pass-003",
    text: "What is 'two-factor authentication' (2FA)?",
    options: [
      "Using two different passwords for the same account",
      "Requiring two pieces of evidence to prove your identity",
      "Changing your password twice a year",
      "Having a backup email for password recovery"
    ],
    correctOptionIndex: 1,
    explanation: "Two-factor authentication requires something you know (like a password) and something you have (like a phone that receives a code) or something you are (like a fingerprint) to prove your identity.",
    securityTip: "Enable 2FA on all services that offer it, especially for email, banking, and social media accounts. Even if someone gets your password, they won't be able to access your account without the second factor.",
    difficulty: "beginner",
    topic: "Password Security",
    points: 100
  },
  
  // Privacy Settings
  {
    id: "priv-001",
    text: "Which social media privacy setting helps limit who can see your future posts?",
    options: [
      "Archive settings",
      "Default audience settings",
      "Timeline review",
      "Activity log"
    ],
    correctOptionIndex: 1,
    explanation: "Default audience settings let you choose who can see your future posts by default (e.g., Public, Friends, Only Me). This helps control your content's visibility without having to adjust settings for each post.",
    securityTip: "Regularly review your default privacy settings on social media platforms, as they may change after updates. Consider setting your default audience to a more restricted group rather than 'Public'.",
    difficulty: "beginner",
    topic: "Privacy Settings",
    points: 100
  },
  {
    id: "priv-002",
    text: "What information should you avoid sharing publicly on social media?",
    options: [
      "Your favorite movies",
      "Your full birth date",
      "Photos of your pets",
      "Opinions about current events"
    ],
    correctOptionIndex: 1,
    explanation: "Your full birth date (day, month, and year) should be kept private as it's often used for identity verification and can contribute to identity theft when combined with other personal information.",
    securityTip: "Consider only sharing the day and month of your birth publicly, or not sharing your birth date at all. Be cautious about sharing information that's commonly used for security questions, like your mother's maiden name or the street you grew up on.",
    difficulty: "beginner",
    topic: "Privacy Settings",
    points: 100
  },
  
  // Social Media Safety
  {
    id: "socm-001",
    text: "What should you do before accepting a friend request from someone you don't recognize?",
    options: [
      "Accept it immediately to be polite",
      "Check their profile and mutual friends to verify their identity",
      "Send them a direct message asking for money",
      "Share your personal information with them"
    ],
    correctOptionIndex: 1,
    explanation: "Before accepting unknown friend requests, you should review their profile for signs of legitimacy, check if you have mutual friends, and consider if there's a valid reason they might want to connect with you.",
    securityTip: "Be skeptical of friend requests from people you don't know, especially if they have few posts, recently created accounts, or use profile pictures that look like stock photos. When in doubt, don't accept.",
    difficulty: "beginner",
    topic: "Social Media Safety",
    points: 100
  },
  {
    id: "socm-002",
    text: "What is 'catfishing'?",
    options: [
      "Using fishing metaphors in online conversations",
      "Creating fake online identities to deceive others",
      "Following celebrities on multiple platforms",
      "Posting too many photos of your pet"
    ],
    correctOptionIndex: 1,
    explanation: "Catfishing refers to creating a fake online identity to deceive others, often to start romantic relationships, gain trust, or scam victims out of money or personal information.",
    securityTip: "Be wary of online relationships with people you've never met in person, especially if they avoid video calls or make excuses not to meet. Research the person through reverse image searches and look for inconsistencies in their stories.",
    difficulty: "beginner",
    topic: "Social Media Safety",
    points: 100
  },
  
  // Device Security
  {
    id: "dev-001",
    text: "Why is it important to keep your operating system and applications updated?",
    options: [
      "To get new features and better performance",
      "To maintain warranty coverage",
      "To patch security vulnerabilities",
      "To clear storage space"
    ],
    correctOptionIndex: 2,
    explanation: "Software updates often contain security patches that fix vulnerabilities discovered since the previous version. Without these updates, your device remains vulnerable to known security issues that attackers can exploit.",
    securityTip: "Enable automatic updates for your operating system and applications whenever possible. If you can't update automatically, establish a regular schedule to check for and install updates manually.",
    difficulty: "beginner",
    topic: "Device Security",
    points: 100
  },
  {
    id: "dev-002",
    text: "What is 'public Wi-Fi' and why can it be risky?",
    options: [
      "Wi-Fi in public parks, which is safer than other networks",
      "Free, open networks that can expose your data to eavesdropping",
      "Government-monitored Wi-Fi that tracks your location",
      "Wi-Fi that automatically blocks inappropriate content"
    ],
    correctOptionIndex: 1,
    explanation: "Public Wi-Fi refers to free, open networks available in places like cafes, airports, and hotels. These networks often lack proper encryption, making it possible for attackers on the same network to intercept your data.",
    securityTip: "Avoid accessing sensitive accounts (banking, email) on public Wi-Fi. If you must use public Wi-Fi, connect through a VPN (Virtual Private Network) to encrypt your traffic, or use your mobile data connection instead.",
    difficulty: "beginner",
    topic: "Device Security",
    points: 100
  },
  
  // Phishing (Intermediate)
  {
    id: "phish-004",
    text: "What is a 'pharming' attack?",
    options: [
      "Using fake mobile apps to harvest credentials",
      "Sending mass phishing emails to corporate employees",
      "Redirecting users from legitimate websites to fake ones",
      "Creating fake online pharmacies"
    ],
    correctOptionIndex: 2,
    explanation: "Pharming attacks redirect users from legitimate websites to fraudulent ones by exploiting vulnerabilities in DNS (Domain Name System) servers or by modifying the host files on victims' computers. Unlike phishing, which relies on users clicking malicious links, pharming can happen without user interaction.",
    securityTip: "Always verify that websites use HTTPS (look for the padlock icon) before entering sensitive information. Consider using DNS security services that block connections to known malicious domains.",
    difficulty: "intermediate",
    topic: "Phishing & Social Engineering",
    points: 200
  },
  
  // Password Security (Intermediate)
  {
    id: "pass-004",
    text: "What is a 'password manager' and why is it recommended?",
    options: [
      "A person who manages passwords for a company",
      "A service that creates easy-to-remember passwords",
      "Software that generates, stores, and autofills secure passwords",
      "A feature that requires you to change passwords monthly"
    ],
    correctOptionIndex: 2,
    explanation: "A password manager is a tool that generates, remembers, and automatically fills in strong, unique passwords for all your accounts. It typically encrypts your password database with a master password that only you know.",
    securityTip: "Use a reputable password manager to create and store complex, unique passwords for each account. This way, you only need to remember one strong master password while having different passwords everywhere else.",
    difficulty: "intermediate",
    topic: "Password Security",
    points: 200
  },
  
  // Malware
  {
    id: "malw-001",
    text: "What is 'ransomware'?",
    options: [
      "Software that displays unwanted advertisements",
      "Malware that encrypts your files and demands payment for the decryption key",
      "Programs that monitor your browsing habits",
      "Viruses that slow down your computer to force you to buy a new one"
    ],
    correctOptionIndex: 1,
    explanation: "Ransomware is malicious software that encrypts your files or locks your entire system, then demands payment (usually in cryptocurrency) to restore access. Even if you pay, there's no guarantee you'll get your files back.",
    securityTip: "Maintain regular backups of important files on external devices or cloud services not continuously connected to your computer. This ensures you can restore your data without paying the ransom if you're attacked.",
    difficulty: "intermediate",
    topic: "Malware Protection",
    points: 200
  },
  
  // Privacy (Intermediate)
  {
    id: "priv-003",
    text: "What is 'browser fingerprinting'?",
    options: [
      "Using your fingerprint to unlock your browser",
      "Scanning websites for malware before visiting them",
      "Techniques to identify your browser based on its configuration",
      "Leaving digital evidence when visiting illegal websites"
    ],
    correctOptionIndex: 2,
    explanation: "Browser fingerprinting is a tracking technique that identifies users based on their browser's unique configurations, including installed plugins, fonts, time zone, screen resolution, and other settings. Unlike cookies, fingerprinting can track users even if they clear their browsing data.",
    securityTip: "To reduce browser fingerprinting, consider using privacy-focused browsers or extensions that minimize the unique information your browser reveals. Some browsers offer 'fingerprinting protection' in their privacy settings.",
    difficulty: "intermediate",
    topic: "Privacy Settings",
    points: 200
  },
  
  // Advanced Topics
  {
    id: "adv-001",
    text: "What is a 'zero-day vulnerability'?",
    options: [
      "A vulnerability that takes zero days to exploit",
      "A security flaw known to the developer for exactly zero days",
      "A vulnerability that exists on day zero of a software release",
      "A security flaw unknown to the software developer and without a patch"
    ],
    correctOptionIndex: 3,
    explanation: "A zero-day vulnerability is a security flaw that is unknown to the software's creator and hasn't been patched. The term 'zero-day' refers to the fact that developers have had zero days to address the vulnerability since it became known.",
    securityTip: "Since you can't protect against unknown vulnerabilities directly, maintain defense-in-depth: keep all software updated, use security tools like firewalls and antivirus, practice least privilege principles, and back up critical data regularly.",
    difficulty: "advanced",
    topic: "Advanced Security",
    points: 300
  },
  {
    id: "adv-002",
    text: "What is 'end-to-end encryption' (E2EE)?",
    options: [
      "Encryption that works on both computers and mobile devices",
      "Encryption that covers all parts of a message except the sender and recipient",
      "A system where only the communicating users can read the messages",
      "Encryption that automatically expires after a certain time"
    ],
    correctOptionIndex: 2,
    explanation: "End-to-end encryption is a communication system where only the people communicating can read the messages. Nobody in between—not even the app or service provider—can access the content, as the data is encrypted on the sender's device and only decrypted on the recipient's device.",
    securityTip: "For sensitive conversations, choose messaging apps and services that provide end-to-end encryption by default or as an option. Be aware that while the message content is protected, metadata (who you're talking to, when, how often) may still be collected.",
    difficulty: "advanced",
    topic: "Advanced Security",
    points: 300
  },
  
  // More topics - adding more to reach 30 total
  
  // Social Media (Advanced)
  {
    id: "socm-003",
    text: "What is 'doxing'?",
    options: [
      "Sharing educational documents online",
      "Creating fake accounts of celebrities",
      "Publishing private information about someone without their consent",
      "Using bots to increase social media engagement"
    ],
    correctOptionIndex: 2,
    explanation: "Doxing refers to researching and publishing private information about an individual without their permission, often with malicious intent such as harassment, extortion, or coercion. This can include home addresses, phone numbers, personal email addresses, or workplace details.",
    securityTip: "Regularly search for your own name online to see what information is publicly available. Adjust privacy settings on all accounts and consider using pseudonyms for sensitive discussions. Request data removal from data broker sites that list your personal information.",
    difficulty: "advanced",
    topic: "Social Media Safety",
    points: 300
  },
  
  // Device Security (Advanced)
  {
    id: "dev-003",
    text: "What does 'HTTPS' indicate about a website?",
    options: [
      "The website is hosted in a secure country",
      "The connection between your browser and the website is encrypted",
      "The website has been verified as virus-free",
      "High-Traffic Transmission Protocol Service is being used"
    ],
    correctOptionIndex: 1,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) indicates that the connection between your browser and the website is encrypted using TLS/SSL, protecting the data transmitted from being read by third parties. This is visualized by a padlock icon in the address bar.",
    securityTip: "Always check for HTTPS and the padlock icon before entering sensitive information like passwords or credit card details. Modern browsers warn about insecure sites, but you should still verify HTTPS is active, especially for important transactions.",
    difficulty: "intermediate",
    topic: "Device Security",
    points: 200
  },
  
  // Malware (Advanced)
  {
    id: "malw-002",
    text: "What is a 'keylogger'?",
    options: [
      "A device that stores all your passwords",
      "Software that records every keystroke made on a computer",
      "A tool that generates secure keys for encryption",
      "A program that locks your keyboard when you're away"
    ],
    correctOptionIndex: 1,
    explanation: "A keylogger is malicious software or hardware that records every keystroke made on a computer, capturing sensitive information like passwords, credit card numbers, and private messages. This data is then transmitted to the attacker.",
    securityTip: "Use multi-factor authentication when possible, as it protects your accounts even if passwords are compromised. Consider using on-screen keyboards or password managers with autofill for entering sensitive information, as these can bypass keyloggers.",
    difficulty: "advanced",
    topic: "Malware Protection",
    points: 300
  },
  
  // Scams
  {
    id: "scam-001",
    text: "What is a 'tech support scam'?",
    options: [
      "When legitimate tech companies charge too much for support",
      "Fraudsters impersonating technical support to gain access to your computer",
      "Fake technical certifications offered online",
      "When support staff accidentally break your device"
    ],
    correctOptionIndex: 1,
    explanation: "Tech support scams involve fraudsters who pretend to be from well-known tech companies (like Microsoft or Apple) claiming they've detected issues with your device. They aim to gain remote access to your computer, install malware, or charge for unnecessary services.",
    securityTip: "Legitimate tech companies don't call you unprompted about device issues. Never give remote access to someone who contacts you first, and always initiate contact through the company's official website if you need support.",
    difficulty: "beginner",
    topic: "Scam Awareness",
    points: 100
  },
  
  // IoT Security
  {
    id: "iot-001",
    text: "Why should you change the default password on your home router and IoT devices?",
    options: [
      "Default passwords expire after the first month",
      "Manufacturers track your usage with default passwords",
      "Default passwords are often publicly known or easy to guess",
      "It's a requirement for warranty coverage"
    ],
    correctOptionIndex: 2,
    explanation: "Default passwords for routers and IoT (Internet of Things) devices are often publicly available in manuals and online, or use predictable patterns. Attackers can easily find or guess these passwords to access your network or devices.",
    securityTip: "Change all default passwords immediately after setting up new devices. Use strong, unique passwords for each device, particularly for your router which is the gateway to your entire network.",
    difficulty: "intermediate",
    topic: "Device Security",
    points: 200
  },
  
  // Public Wi-Fi
  {
    id: "wifi-001",
    text: "What is a 'man-in-the-middle' attack?",
    options: [
      "When someone stands between you and a public Wi-Fi router to block signals",
      "An attack where someone secretly relays and possibly alters communications",
      "When a middleman charges extra fees for internet access",
      "A cyberbullying technique targeting moderators"
    ],
    correctOptionIndex: 1,
    explanation: "A man-in-the-middle attack occurs when an attacker secretly intercepts and relays communications between two parties who believe they are directly communicating with each other. This allows the attacker to eavesdrop on, and potentially modify, the data being exchanged.",
    securityTip: "Use a VPN when on public networks, verify website certificates (look for the padlock icon), and enable two-factor authentication for important accounts. Avoid conducting sensitive transactions (banking, shopping) on public Wi-Fi unless using a VPN.",
    difficulty: "advanced",
    topic: "Network Security",
    points: 300
  },
  
  // Digital Footprint
  {
    id: "dig-001",
    text: "What is a 'digital footprint'?",
    options: [
      "The amount of storage your digital files occupy",
      "The trace of your activities you leave online",
      "A measurement of your computer's energy usage",
      "The carbon emissions generated by your internet usage"
    ],
    correctOptionIndex: 1,
    explanation: "A digital footprint refers to the trail of data you create while using the internet, including websites visited, emails sent, information submitted, and content posted. This can include both active contributions (posts, comments) and passive data collection (browsing history, location data).",
    securityTip: "Regularly review privacy settings on all your accounts and search for yourself online to see what information is publicly available. Consider using private browsing modes and privacy-focused search engines for sensitive searches.",
    difficulty: "beginner",
    topic: "Digital Footprint",
    points: 100
  },
  
  // Data Protection
  {
    id: "data-001",
    text: "What is 'data minimization'?",
    options: [
      "Compressing files to save storage space",
      "Collecting and retaining only the personal data needed for a specific purpose",
      "Switching to a smaller mobile data plan",
      "Deleting unnecessary apps from your device"
    ],
    correctOptionIndex: 1,
    explanation: "Data minimization is the practice of collecting, using, and storing only the personal data necessary to accomplish a specific purpose, and keeping it only as long as needed. This principle helps reduce privacy risks and potential damage from data breaches.",
    securityTip: "Before providing personal information to apps, websites, or services, ask yourself if it's necessary for the service you're using. Look for privacy-focused alternatives that collect less data, and regularly delete accounts and data you no longer need.",
    difficulty: "intermediate",
    topic: "Data Protection",
    points: 200
  },
  
  // Authentication
  {
    id: "auth-001",
    text: "What is 'biometric authentication'?",
    options: [
      "Using mathematics to create secure passwords",
      "Authentication requiring biological samples",
      "Verifying identity using unique physical characteristics",
      "A two-step verification process"
    ],
    correctOptionIndex: 2,
    explanation: "Biometric authentication verifies identity using unique physical or behavioral characteristics, such as fingerprints, facial recognition, voice patterns, or typing rhythm. These traits are difficult to duplicate, making biometrics potentially more secure than traditional passwords.",
    securityTip: "While convenient, biometric data can't be changed if compromised. Use biometrics alongside other authentication factors rather than as your only method. Be aware of privacy implications when organizations store your biometric data.",
    difficulty: "intermediate",
    topic: "Authentication Methods",
    points: 200
  },
  
  // Social Engineering (Advanced)
  {
    id: "soc-001",
    text: "What is 'pretexting' in social engineering?",
    options: [
      "Creating fake texts to scam people",
      "Inventing a scenario to manipulate someone into providing information",
      "Pretending to be a technical expert",
      "Testing security by sending practice phishing emails"
    ],
    correctOptionIndex: 1,
    explanation: "Pretexting is a social engineering technique where attackers create a fabricated scenario (pretext) designed to manipulate victims into providing information or taking actions. The attacker often impersonates someone with authority or right-to-know to make the request seem legitimate.",
    securityTip: "Verify the identity of anyone requesting sensitive information, even if the situation seems urgent or the person seems authoritative. Use established channels to confirm requests—for example, call back on an official number rather than one provided in an email.",
    difficulty: "advanced",
    topic: "Phishing & Social Engineering",
    points: 300
  },
  
  // Mobile Security
  {
    id: "mob-001",
    text: "Why is it risky to 'jailbreak' or 'root' your mobile device?",
    options: [
      "It voids the warranty",
      "It makes the phone run slower",
      "It bypasses security restrictions, potentially exposing your device to malware",
      "It prevents software updates"
    ],
    correctOptionIndex: 2,
    explanation: "Jailbreaking (iOS) or rooting (Android) bypasses built-in security restrictions, allowing apps to access privileged system settings and protected areas. While this enables customization, it also removes safeguards that prevent malware from accessing sensitive parts of your device.",
    securityTip: "Generally avoid jailbreaking or rooting unless you fully understand the security implications. If you do modify your device, be extremely cautious about which apps you install and what permissions you grant them.",
    difficulty: "intermediate",
    topic: "Mobile Security",
    points: 200
  },
  
  // Encryption
  {
    id: "enc-001",
    text: "What does encrypting your data accomplish?",
    options: [
      "Makes your data transfer faster",
      "Compresses your data to save space",
      "Converts your data into a coded form that only authorized parties can read",
      "Backs up your data to multiple locations"
    ],
    correctOptionIndex: 2,
    explanation: "Encryption converts readable data (plaintext) into an encoded format (ciphertext) that can only be decoded and read by someone with the appropriate decryption key. This protects the data's confidentiality, even if the encrypted data is intercepted or accessed without authorization.",
    securityTip: "Enable encryption whenever possible, including full-disk encryption on your devices, encrypted backups, and encrypted communications apps. Encryption is especially important for sensitive data and when using public networks.",
    difficulty: "beginner",
    topic: "Data Protection",
    points: 100
  }
];

export const achievements = [
  {
    id: "beginner-complete",
    name: "Cybersecurity Rookie",
    description: "Complete 10 beginner-level questions",
    requirement: { type: "questions_by_difficulty", difficulty: "beginner", count: 10 },
    reward: { xp: 100, coins: 50 },
    icon: "shield-alt"
  },
  {
    id: "phishing-expert",
    name: "Phishing Expert",
    description: "Correctly answer 10 phishing questions",
    requirement: { type: "correct_by_topic", topic: "Phishing & Social Engineering", count: 10 },
    reward: { xp: 200, coins: 100 },
    icon: "fish"
  },
  {
    id: "password-master",
    name: "Password Master",
    description: "Complete all password security challenges",
    requirement: { type: "all_in_topic", topic: "Password Security" },
    reward: { xp: 300, coins: 150 },
    icon: "key"
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
    name: "Dedicated Defender",
    description: "Log in for 7 consecutive days",
    requirement: { type: "login_streak", count: 7 },
    reward: { xp: 150, coins: 100 },
    icon: "calendar-check"
  },
  {
    id: "all-topics",
    name: "Well-Rounded",
    description: "Answer at least one question from each topic",
    requirement: { type: "all_topics" },
    reward: { xp: 250, coins: 125 },
    icon: "star"
  },
  {
    id: "advanced-5",
    name: "Security Expert",
    description: "Correctly answer 5 advanced questions",
    requirement: { type: "correct_by_difficulty", difficulty: "advanced", count: 5 },
    reward: { xp: 400, coins: 200 },
    icon: "user-graduate"
  }
];

export const avatars = [
  {
    id: "default",
    name: "CyberDefender",
    imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    unlocked: true,
    cost: 0
  },
  {
    id: "robot",
    name: "CyberBot",
    imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    unlocked: true,
    cost: 0
  },
  {
    id: "hacker",
    name: "Ethical Hacker",
    imageUrl: "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    unlocked: true,
    cost: 0
  },
  {
    id: "cyber-ninja",
    name: "Cyber Ninja",
    imageUrl: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    unlocked: false,
    cost: 500
  },
  {
    id: "security-guru",
    name: "Security Guru",
    imageUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    unlocked: false,
    cost: 750
  },
  {
    id: "cyber-detective",
    name: "Cyber Detective",
    imageUrl: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    unlocked: false,
    cost: 1000
  }
];
