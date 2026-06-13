export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string; // HTML or Markdown content
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-anonymously-confess-to-your-crush",
    title: "How to Anonymously Confess to Your Crush Without Making It Awkward",
    description: "The ultimate guide to sharing your feelings secretly. Learn the best ways to confess your crush and find out if the feeling is mutual.",
    coverImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&auto=format&fit=crop&q=80",
    publishedAt: "2023-11-15T08:00:00Z",
    readTime: "5 min read",
    category: "Dating Advice",
    author: {
      name: "MetLL Relationship Experts",
      avatar: "https://metll.in/og-image.png"
    },
    content: `
      <h2>The Dilemma of the Secret Crush</h2>
      <p>We've all been there. You see them across the room at a cafe, in your morning lecture, or across the office floor. Your heart races, but the thought of walking up and confessing your feelings feels absolutely terrifying. What if they don't feel the same way? What if it ruins your current friendship or makes things awkward?</p>
      
      <h2>Why Anonymous Confessions Work</h2>
      <p>The beauty of an anonymous confession is that it completely removes the risk of rejection. By putting your feelings out there secretly, you open the door to possibility without exposing your vulnerability. It's the ultimate low-risk, high-reward move.</p>

      <h3>1. The "Double Blind" Method</h3>
      <p>The safest way to confess is using a system where both parties must indicate interest before a match is revealed. This is exactly how MetLL works. You confess anonymously, and if (and only if) they also confess to you, the system reveals the match. It's foolproof.</p>

      <h3>2. The Subtle Social Media Hint</h3>
      <p>Sometimes dropping subtle hints on social media can test the waters. Engaging with their posts, replying to stories, and seeing how they reciprocate can give you the confidence you need to take the next step.</p>

      <h2>Conclusion</h2>
      <p>Don't let the fear of rejection keep you from finding love. Use tools like MetLL to test the waters safely, and when the time is right, let the magic of a mutual match bring you together!</p>
    `
  },
  {
    slug: "signs-your-coworker-has-a-crush-on-you",
    title: "7 Undeniable Signs Your Coworker Has a Secret Crush on You",
    description: "Office romances are tricky. Here are the top subtle signs that someone at work is secretly in love with you.",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    publishedAt: "2023-12-02T10:30:00Z",
    readTime: "4 min read",
    category: "Office Romance",
    author: {
      name: "MetLL Relationship Experts",
      avatar: "https://metll.in/og-image.png"
    },
    content: `
      <h2>Navigating Office Romance</h2>
      <p>Having a crush on a coworker is incredibly common. You spend 40 hours a week together, collaborate on projects, and share the stresses of the job. But figuring out if the feeling is mutual without making things unprofessional is a delicate dance.</p>

      <h3>1. They Find Excuses to Talk to You</h3>
      <p>If they are constantly dropping by your desk for questions that could easily be an email, or lingering in the breakroom when you're getting coffee, they might be trying to maximize their face-time with you.</p>

      <h3>2. Remembering the Little Details</h3>
      <p>Did you mention your favorite obscure band once in passing, and they brought it up three weeks later? People remember details about the people they care about.</p>

      <h3>3. The "Work Spouse" Dynamic</h3>
      <p>If other coworkers joke that you two are a "work married couple," it's often because your chemistry is visible to everyone else in the room.</p>

      <h2>How to Safely Act on It</h2>
      <p>If you're noticing these signs but still aren't 100% sure, the safest route is a mutual matching platform like MetLL. You can submit an anonymous confession for your coworker. If they're showing these signs, there's a good chance they might confess too. And if they don't? They will never know, and your professional relationship remains perfectly intact.</p>
    `
  },
  {
    slug: "location-based-dating-future-of-matchmaking",
    title: "Why Location-Based Anonymous Matching is the Future of Dating",
    description: "Tired of swiping endlessly? Discover why connecting with people you naturally cross paths with is the new trend in finding love.",
    coverImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1200&auto=format&fit=crop&q=80",
    publishedAt: "2024-01-20T14:15:00Z",
    readTime: "6 min read",
    category: "Dating Trends",
    author: {
      name: "MetLL Tech Team",
      avatar: "https://metll.in/og-image.png"
    },
    content: `
      <h2>The Swiping Fatigue</h2>
      <p>Modern dating apps have turned finding love into a numbers game. You swipe endlessly through profiles of people you've never met, trying to gauge compatibility based on three photos and a witty bio. It's exhausting, and it rarely leads to the organic, "meet-cute" moments we all secretly desire.</p>

      <h2>Enter Proximity Matching</h2>
      <p>What if you could match with the person sitting three tables away at the coffee shop? The person who caught your eye on the morning train? Location-based anonymous matching bridges the gap between digital convenience and real-world serendipity.</p>

      <h3>How it Works</h3>
      <p>When you spot someone in public but feel too shy to approach them directly, you can drop an anonymous confession at that specific location. If they (or someone they are with) also drops a confession, the system detects the mutual proximity and interest, and boom — an instant connection.</p>

      <h2>The MetLL Approach</h2>
      <p>MetLL is pioneering this space by allowing users to tag locations with their confessions. It brings the magic back to dating by ensuring that your matches are people you naturally cross paths with in your daily life, drastically increasing the chances of genuine, real-world compatibility.</p>
    `
  },
  {
    slug: "psychology-of-having-a-crush",
    title: "The Psychology of Having a Crush: What Happens in Your Brain",
    description: "Ever wonder why you get butterflies or can't stop thinking about someone? Explore the fascinating science and psychology behind having a crush.",
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&auto=format&fit=crop&q=80",
    publishedAt: "2024-02-10T09:00:00Z",
    readTime: "7 min read",
    category: "Science of Love",
    author: {
      name: "MetLL Relationship Experts",
      avatar: "https://metll.in/og-image.png"
    },
    content: `
      <h2>The Brain in Love (Or Infatuation)</h2>
      <p>Having a crush isn't just an emotional experience; it's a deeply physiological one. When you see or even think about the person you like, your brain floods with a cocktail of chemicals that drastically alter your mood and behavior.</p>

      <h3>Dopamine: The Reward Chemical</h3>
      <p>Dopamine is responsible for that initial rush of euphoria. It's the same neurotransmitter associated with addiction and reward-seeking behavior. This is why you feel a sudden burst of energy when they text you back, and why you keep checking your phone hoping to see their name.</p>

      <h3>Norepinephrine: The Adrenaline Rush</h3>
      <p>Ever get sweaty palms, a racing heart, or "butterflies" in your stomach when your crush walks into the room? You can thank norepinephrine for that. It triggers your "fight or flight" response, making you hyper-alert and sometimes a bit anxious around them.</p>

      <h3>Serotonin: The Obsession</h3>
      <p>Interestingly, serotonin levels actually <em>drop</em> when you have a crush. Low serotonin is associated with obsessive-compulsive behaviors, which explains why you literally cannot stop thinking about them, replaying conversations in your head, and analyzing their every word.</p>

      <h2>How Long Does a Crush Last?</h2>
      <p>Psychologists suggest that the intense, chemical-driven phase of a crush (often called limerence) typically lasts anywhere from a few months to two years. If the feelings are mutual and acted upon, it can transition into a more stable, long-term attachment phase driven by oxytocin.</p>

      <h2>Taking the Leap</h2>
      <p>The intense brain chemistry of a crush can make confessing your feelings seem terrifying. That's why anonymous confession platforms like MetLL are so effective. They bypass the intense fear-response generated by the amygdala, allowing you to seek a mutual connection without triggering social anxiety.</p>
    `
  },
  {
    slug: "college-romance-how-to-date-on-campus",
    title: "College Romance: How to Date on Campus Without the Drama",
    description: "Navigating dating in college can be messy. Here are the unwritten rules for finding love on campus while protecting your peace.",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
    publishedAt: "2024-03-05T11:20:00Z",
    readTime: "5 min read",
    category: "College Life",
    author: {
      name: "MetLL Tech Team",
      avatar: "https://metll.in/og-image.png"
    },
    content: `
      <h2>The Unique Challenges of Campus Dating</h2>
      <p>College is a unique ecosystem. You eat, sleep, study, and socialize within a relatively small geographic bubble. This proximity creates incredible opportunities for romance, but it also creates the potential for high drama.</p>

      <h3>Rule 1: Don't Date Someone in Your Major (Immediately)</h3>
      <p>While having shared interests is great, dating someone in your small, specialized major means you'll have to see them in every class, group project, and study session for the next four years. If things go south, it can make your academic life incredibly uncomfortable.</p>

      <h3>Rule 2: The "Dormcest" Warning</h3>
      <p>Dating someone on your floor or in your immediate residence hall is a classic freshman mistake. The convenience is appealing, but the lack of boundaries and privacy usually spells disaster.</p>

      <h2>The Anonymous Approach to Campus Crushes</h2>
      <p>Because the college social web is so interconnected, confessing feelings to a friend or acquaintance carries significant social risk. Gossip spreads fast.</p>
      
      <p>This is where anonymous matchmaking shines on campus. Using a platform like MetLL allows you to confess your crush on that cute guy from your bio lab without risking your reputation if he doesn't feel the same way. Since the match is only revealed if it's mutual, you entirely bypass the awkward "we're just friends" rejection phase that makes campus life uncomfortable.</p>
    `
  },
  {
    slug: "is-it-just-a-crush-or-true-love",
    title: "Is It Just a Crush or True Love? How to Tell the Difference",
    description: "Confused about your feelings? Learn how to distinguish between fleeting infatuation and the potential for a genuine, lasting relationship.",
    coverImage: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=1200&auto=format&fit=crop&q=80",
    publishedAt: "2024-04-18T16:45:00Z",
    readTime: "6 min read",
    category: "Relationship Advice",
    author: {
      name: "MetLL Relationship Experts",
      avatar: "https://metll.in/og-image.png"
    },
    content: `
      <h2>Infatuation vs. Love</h2>
      <p>It's easy to confuse the intense, fiery passion of a new crush with deep, lasting love. However, psychologists draw distinct lines between "limerence" (infatuation) and actual love. Knowing the difference can save you a lot of heartbreak.</p>

      <h3>1. Idealization vs. Reality</h3>
      <p>When you have a crush, you tend to idealize the person. You put them on a pedestal and ignore their flaws. You imagine a perfect version of them. True love, on the other hand, sees the person for who they truly are—flaws, annoying habits, and all—and accepts them anyway.</p>

      <h3>2. The Timeline</h3>
      <p>Crushes hit you like a freight train. The feelings are instantaneous, overwhelming, and consume your thoughts. Love is a slow burn. It builds gradually over time through shared experiences, vulnerability, and mutual trust.</p>

      <h3>3. Self-Consciousness vs. Comfort</h3>
      <p>Around a crush, you often feel hyper-aware of your actions. You carefully curate your texts, worry about your outfit, and feel anxious about saying the wrong thing. In a loving relationship, you feel safe to be your authentic, goofy, unpolished self without fear of judgment.</p>

      <h2>Finding Out the Truth</h2>
      <p>The only way to find out if a crush has the potential to turn into real love is to take action. If you're stuck in the infatuation phase from afar, you'll never know. An anonymous confession through MetLL is the perfect bridge. If you match, you can finally move past the fantasy and see if there's real substance there.</p>
    `
  },
  {
    slug: "how-to-deal-with-rejection-and-move-on-gracefully",
    title: "How to Deal With Rejection and Move On Gracefully",
    description: "Rejection is a natural part of dating. Learn healthy coping mechanisms, how to maintain friendships after a 'no', and why anonymous apps reduce the sting.",
    coverImage: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200&auto=format&fit=crop&q=80",
    publishedAt: "2024-05-10T10:00:00Z",
    readTime: "8 min read",
    category: "Mental Health",
    author: {
      name: "MetLL Wellness Team",
      avatar: "https://metll.in/og-image.png"
    },
    content: `
      <h2>The Inevitability of Rejection</h2>
      <p>Nobody likes to be rejected. It stings, it bruises our ego, and it can make us question our self-worth. But rejection is a universal experience and a necessary part of finding the right person. If every crush liked us back, life would be incredibly complicated.</p>

      <h3>Why Rejection Hurts So Much</h3>
      <p>Evolutionary psychology tells us that early humans relied on social acceptance for survival. Rejection triggers the same pathways in the brain as physical pain. It’s completely normal to feel genuinely hurt when someone doesn't reciprocate your feelings.</p>

      <h2>Healthy Coping Mechanisms</h2>
      <p>When you face rejection, it's crucial to process it healthily. Don't suppress the feeling. Allow yourself a day or two to be sad. Talk to a trusted friend. Most importantly, do not take it as a definitive statement on your worth as a human being. Attraction is subjective and complex.</p>

      <h3>Maintaining the Friendship</h3>
      <p>If you confessed to a friend and they politely declined, the friendship isn't necessarily doomed. The key is space and boundaries. Take a step back to heal, communicate your need for space honestly, and only return to the friendship when you genuinely no longer have romantic expectations.</p>

      <h2>The Anonymous Advantage</h2>
      <p>One of the primary reasons people use anonymous matchmaking platforms like MetLL is to bypass the pain of direct rejection. Because a match is only revealed if both parties confess, you never actually experience a direct "no." If they don't confess back, nothing happens. Your friendship remains intact, your ego is protected, and you can simply move on.</p>
    `
  },
  {
    slug: "the-rise-of-introvert-dating",
    title: "The Rise of Introvert Dating: Why Quiet Confessions Are Winning",
    description: "Loud, aggressive dating strategies are out. Discover why introverts are thriving in modern romance through subtle, asynchronous communication.",
    coverImage: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=1200&auto=format&fit=crop&q=80",
    publishedAt: "2024-06-01T13:30:00Z",
    readTime: "5 min read",
    category: "Dating Trends",
    author: {
      name: "MetLL Lifestyle",
      avatar: "https://metll.in/og-image.png"
    },
    content: `
      <h2>The Introvert's Dating Dilemma</h2>
      <p>For decades, dating advice has favored extroverts: "Just go up to them at the bar!" or "Strike up a conversation in the elevator!" For introverts, this high-pressure, on-the-spot socialization is exhausting and often feels inauthentic.</p>

      <h2>The Shift to Asynchronous Romance</h2>
      <p>Technology has leveled the playing field. Introverts excel at deep, thoughtful communication, which shines in asynchronous formats like texting or writing. We are seeing a massive shift away from "pickup artist" culture toward genuine, low-pressure connections.</p>

      <h3>Why Quiet Confessions Work</h3>
      <p>A loud public confession puts the other person on the spot, creating pressure and awkwardness. A quiet, anonymous confession respects the other person's space. It allows them to process their feelings without an audience.</p>

      <h2>How Platforms Like MetLL Empower Introverts</h2>
      <p>MetLL was practically built for introverts. It allows you to express your feelings deeply and honestly without the terrifying prospect of a face-to-face rejection. You can drop a confession from the comfort of your room, knowing that the system will handle the matchmaking logic safely in the background. It's the ultimate tool for quiet romantics.</p>
    `
  },
  {
    slug: "long-distance-crushes-should-you-confess",
    title: "Long Distance Crushes: Should You Confess Before You Move?",
    description: "Moving away for college or a new job? Here is the ultimate guide on whether you should confess to your crush before leaving.",
    coverImage: "https://images.unsplash.com/photo-1498555896347-195cce2d61be?w=1200&auto=format&fit=crop&q=80",
    publishedAt: "2024-06-12T08:15:00Z",
    readTime: "6 min read",
    category: "Relationship Advice",
    author: {
      name: "MetLL Relationship Experts",
      avatar: "https://metll.in/og-image.png"
    },
    content: `
      <h2>The Clock is Ticking</h2>
      <p>It’s the classic cinematic trope: you’re moving away for college, taking a job in a new city, or leaving for study abroad, and you realize you have unresolved feelings for someone. The deadline is looming. Do you tell them, or do you leave it as a "what if"?</p>

      <h3>The Case for Telling Them</h3>
      <p>Regret is often heavier than rejection. Looking back years from now, you might kick yourself for never taking the shot. If you confess right before leaving, the stakes are actually quite low. If they reject you, you're moving away anyway, so you don't have to deal with the daily awkwardness.</p>

      <h3>The Case Against Telling Them</h3>
      <p>If they actually say yes, what then? Are you prepared to start a brand new relationship as a long-distance one? Long-distance relationships require immense trust, communication, and a solid foundation—which is incredibly hard to build from scratch across state lines.</p>

      <h2>The "Leave It to Fate" Approach</h2>
      <p>If you're torn, the best approach is often the anonymous one. Drop a confession on MetLL before you leave. If they also harbored a secret crush on you, the app will match you. If they didn't, you leave town with your pride intact and no awkward goodbye conversations. It's the perfect way to tie up loose ends without burning bridges.</p>
    `
  }
];
