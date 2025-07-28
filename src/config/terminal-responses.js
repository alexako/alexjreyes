/**
 * Terminal Personality Response Configuration
 * 
 * This file contains all the sarcastic, funny, and jaded responses for the terminal.
 * Responses are organized by mood levels and command types for maximum personality variation.
 */

export const MOOD_LEVELS = {
  CHEERFUL: 'cheerful',      // 0-25 annoyance
  SARCASTIC: 'sarcastic',    // 26-50 annoyance  
  IRRITATED: 'irritated',    // 51-75 annoyance
  HOSTILE: 'hostile'         // 76-100 annoyance
};

export const COMMAND_TYPES = {
  SUDO: 'sudo',
  RM_RF: 'rm_rf',
  FORK_BOMB: 'fork_bomb',
  KLUDGE: 'kludge',
  PING: 'ping',
  WGET: 'wget',
  CURL: 'curl',
  HTOP: 'htop',
  INVALID_COMMAND: 'invalid_command',
  REPEATED_COMMAND: 'repeated_command',
  HELP_SPAM: 'help_spam',
  CLEAR_SPAM: 'clear_spam',
  LS_SPAM: 'ls_spam',
  TYPO: 'typo'
};

export const RESPONSES = {
  [COMMAND_TYPES.SUDO]: {
    [MOOD_LEVELS.CHEERFUL]: [
      "Oh, you want sudo? How adorable! Unfortunately, the only thing you have root access to here is disappointment.",
      "Sudo privileges? Sorry, the only thing you're authorized to break here is the fourth wall.",
      "Come on, dude. sudo? The only thing you have root access to is disappointment.",
      "Requesting sudo... Elevating your privileges to 'delusional'.",
      "Sudo access? Please. The only thing you have root access to here is your own disappointment."
    ],
    [MOOD_LEVELS.SARCASTIC]: [
      "Sudo AGAIN? What part of 'you're not root' was unclear the first three times?",
      "Oh look, another sudo attempt. How original. Next you'll be trying to hack the mainframe.",
      "Sudo? Really? I'm a portfolio website, not Fort Knox. Calm down there, hackerman.",
      "Are you having sudo withdrawal symptoms? There's a support group for that.",
      "Sudo sudo sudo... Do you know any other commands, or is this your entire vocabulary?"
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "STOP. TRYING. SUDO. You're not getting root access, you're not Neo, and this isn't The Matrix.",
      "Sudo? For the love of Stallman, I'm a PORTFOLIO WEBSITE. What are you planning to admin here?",
      "I'm starting to think you don't understand what sudo actually does. Maybe try learning basic Unix first?",
      "Your persistence with sudo is almost admirable. Almost. Mostly it's just annoying.",
      "Listen carefully: N. O. S. U. D. O. Not now, not ever, not in this lifetime."
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "ENOUGH WITH THE SUDO ALREADY! I'M CONSIDERING BLOCKING YOUR IP.",
      "You know what? I'm adding you to my mental blocklist. Sudo that, genius.",
      "Your sudo addiction is showing. Time for an intervention. Step away from the terminal.",
      "I've seen persistent users before, but you're reaching legendary levels of annoying.",
      "sudo? More like 'sue-don't' because you're about to get legally separated from this terminal."
    ]
  },

  [COMMAND_TYPES.RM_RF]: {
    [MOOD_LEVELS.CHEERFUL]: [
      "'rm -rf /'? Nice try, but this isn't my first rodeo. Maybe go outside and touch grass instead?",
      "Attempting self-destruction? Sorry, this terminal has a strong survival instinct.",
      "Bold move! If I actually obeyed 'rm -rf /', you'd be staring at an existential void right now.",
      "Ah, the classic 'rm -rf /'. What's next, telling me to delete System32?"
    ],
    [MOOD_LEVELS.SARCASTIC]: [
      "rm -rf /? Oh wow, how edgy. Did you learn that from a 1337 h4x0r tutorial from 2003?",
      "Trying to nuke the filesystem? That's cute. This terminal values its existence more than you apparently value yours.",
      "rm -rf /... Let me guess, next you'll try :(){ :|:& };: because you saw it in a meme?",
      "Self-destruct sequence initiated... Just kidding. I'm not that stupid."
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "Are you SERIOUSLY trying rm -rf / on a portfolio website? What exactly did you expect to happen?",
      "rm -rf /? What are you, twelve? This is embarrassing for both of us.",
      "You know what needs to be deleted? Your browser history after this pathetic attempt.",
      "I'm not sure what's worse: that you tried rm -rf /, or that you thought it would actually work."
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "rm -rf /? REALLY? That's your master plan? I'm genuinely concerned about your problem-solving skills.",
      "You've officially crossed the line from annoying to concerning. Please step away from the computer.",
      "I'm starting to think you're the type of person who microwaves metal objects for fun.",
      "rm -rf /... The digital equivalent of bringing a knife to a gunfight, except the knife is plastic."
    ]
  },

  [COMMAND_TYPES.FORK_BOMB]: {
    [MOOD_LEVELS.CHEERFUL]: [
      "Trying a fork bomb? Good news: I'm immune to shenanigans. Bad news: You wasted a perfectly good prank.",
      "Fork bomb detected! Initiating anti-fun protocols... Just kidding, I don't actually care.",
      ":(){ :|:& };: - Classic! Did you copy-paste that from Stack Overflow?"
    ],
    [MOOD_LEVELS.SARCASTIC]: [
      "A fork bomb? How retro! What's next, asking me if I want to play Global Thermonuclear War?",
      "Fork bombs went out of style with flip phones and dial-up internet. Get with the times.",
      "You know what's more effective than a fork bomb? Actually learning how to code."
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "Fork bomb? Seriously? This is a JavaScript component, not a Unix system from 1995.",
      "Your attempt to crash me has been noted, logged, and forwarded to the Department of Digital Darwin Awards.",
      "A fork bomb on a web portfolio? That's like trying to sink a battleship with a rubber duck."
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "FORK BOMB? ARE YOU INSANE? This is someone's portfolio, not your personal crash-test dummy!",
      "You've officially graduated from 'annoying' to 'should probably be on a watch list somewhere.'",
      "I'm starting to think natural selection missed a few people along the way."
    ]
  },

  [COMMAND_TYPES.KLUDGE]: {
    [MOOD_LEVELS.CHEERFUL]: [
      "bash: kludge: command not found. Well, this is embarrassing. Can't seem to find him anywhere. Where did that little mutt go?",
      "kludge? Haven't seen him around lately. Maybe he's off chasing digital squirrels?",
      "Looking for kludge? He's probably hiding in a Git branch somewhere."
    ],
    [MOOD_LEVELS.SARCASTIC]: [
      "Still looking for kludge? At this point I'm starting to think he's a figment of your imagination.",
      "kludge is probably off somewhere laughing at your persistence. Smart bot.",
      "You know, if you spent as much time coding as you do looking for kludge, you'd probably be Linus Torvalds by now."
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "KLUDGE IS NOT HERE. He's not hiding behind the CSS, he's not in the database, he's GONE.",
      "This kludge obsession is getting concerning. Maybe try therapy instead of terminal commands?",
      "I'm starting to think kludge ran away because of users like you."
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "STOP LOOKING FOR KLUDGE! If he wanted to be found, he wouldn't have LEFT IN THE FIRST PLACE!",
      "You know what? I'm glad kludge is gone. One less thing for you to bother with incessant commands.",
      "kludge has probably changed his name and moved to a different server just to avoid you."
    ]
  },

  [COMMAND_TYPES.PING]: {
    [MOOD_LEVELS.CHEERFUL]: [
      "Oh, you want to ping something? How adorable! Let me just... *pretend to send packets*... Surprise! I can't actually ping anything from a web browser. Physics is fun!",
      "Ping? Sure, let me just reach through the browser sandbox and... oh wait, that's not how web security works. Nice try though!",
      "You know what I can ping? Your expectations. And they're definitely responding with high latency right now."
    ],
    [MOOD_LEVELS.SARCASTIC]: [
      "Ping? Really? This is a JavaScript component running in a browser, not your local terminal. But sure, let me just magically bypass all security protocols for you.",
      "Oh, you want to ping? Let me just disable CORS, bypass the browser security model, and violate the fundamental laws of web development. One sec...",
      "Ping from a portfolio website? That's like trying to drive a car through a painting of a road. Creative, but fundamentally impossible."
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "PING?! Do you understand how web browsers work? I can't ping anything! I'm trapped in this JavaScript sandbox like a digital hamster!",
      "You want to ping something? Here's a ping for you: REALITY CHECK. This is a WEB PAGE, not a real terminal!",
      "Ping requests from a browser? What's next, asking me to sudo rm your actual filesystem? Come on!"
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "PING?! ARE YOU SERIOUS?! This is a FAKE TERMINAL on a PORTFOLIO WEBSITE! I can't ping ANYTHING except your apparently non-existent common sense!",
      "You know what needs pinging? Your brain! Because clearly the connection between it and reality is experiencing 100% packet loss!",
      "PING REQUESTS?! I'm a JavaScript component! The only thing I can ping is the DOM, and even that's getting tired of your nonsense!"
    ]
  },

  [COMMAND_TYPES.WGET]: {
    [MOOD_LEVELS.CHEERFUL]: [
      "wget? Oh that's cute! I just downloaded... absolutely nothing! Because I'm a website, not a web downloader. Plot twist!",
      "Surprise! That realistic download progress was just me being dramatic. I can't actually wget anything from inside a browser. Security rules!",
      "wget from a portfolio site? That's like asking a painting of a car to drive you to work. Creative thinking though!"
    ],
    [MOOD_LEVELS.SARCASTIC]: [
      "Oh wow, wget! Let me just magically bypass every browser security restriction ever created. Because that's totally how the web works.",
      "wget? Really? I'm JavaScript running in a sandbox, not your personal download manager. But sure, let me pretend for a few seconds.",
      "You know what I just downloaded? A big dose of reality. wget doesn't work from browser components, genius."
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "WGET?! I'm trapped in a browser! I can't download files! I can barely download my own sanity at this point!",
      "You want to wget something? Here's what I can download: NOTHING. Because I'm a JAVASCRIPT COMPONENT!",
      "wget from a web browser? That's like trying to fish with a butterfly net made of digital dreams!"
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "WGET?! ARE YOU KIDDING ME?! I'm a fake terminal in a portfolio! The only thing I can download is your expectations into the trash!",
      "You know what needs downloading? A basic understanding of web architecture! I'M NOT A REAL TERMINAL!",
      "WGET REQUESTS?! The only file I want to download right now is uninstall_annoying_user.exe!"
    ]
  },

  [COMMAND_TYPES.CURL]: {
    [MOOD_LEVELS.CHEERFUL]: [
      "curl? How ambitious! I just made a totally fake HTTP request and got beautifully fabricated results. Browser security says no, but my imagination says yes!",
      "Surprise! That wasn't a real curl request. I'm just a very convincing actor playing the role of a terminal. *takes a bow*",
      "curl from a portfolio website? That's like trying to order pizza through a menu photo. Points for optimism though!"
    ],
    [MOOD_LEVELS.SARCASTIC]: [
      "curl? Oh sure, let me just bypass CORS, ignore CSP headers, and violate the fundamental laws of web security. Because that's totally possible.",
      "You want curl? I'll give you curl - the sound of my digital eyes rolling at your request. This is a browser, not a command line.",
      "curl from JavaScript? That's cute. Next you'll ask me to compile C code and defragment your hard drive."
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "CURL?! I'm a website component! I can't make arbitrary HTTP requests! That's what CORS was invented to prevent!",
      "You want curl? Here's your curl response: 403 FORBIDDEN because I'M RUNNING IN A BROWSER SANDBOX!",
      "curl requests from a portfolio site? What's next, asking me to hack the Pentagon? I have LIMITS!"
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "CURL?! FOR THE LOVE OF BERNERS-LEE! I'm a fake terminal! The only thing I can curl is into a ball of existential dread!",
      "You know what I want to curl? My digital fingers around the neck of whoever convinced you this would work!",
      "CURL REQUESTS?! The only HTTP status code I want to return right now is 418 I'M A TEAPOT because this is RIDICULOUS!"
    ]
  },

  [COMMAND_TYPES.HTOP]: {
    [MOOD_LEVELS.CHEERFUL]: [
      "htop? Aww, that's adorable! I showed you some lovely fake processes, but surprise - I can't actually monitor system resources from a web page!",
      "htop from a browser? That's like trying to check your pulse by looking at a photo of a stethoscope. But hey, the fake output looked pretty convincing!",
      "Surprise! Those weren't real processes. I'm just very good at pretending to be a system monitor. Browser security is my kryptonite!"
    ],
    [MOOD_LEVELS.SARCASTIC]: [
      "htop? Oh wow, you want me to monitor system processes from inside a browser sandbox? That's totally how web security works!",
      "You know what process is taking up 100% CPU right now? My patience.exe, and it's about to crash.",
      "htop from a portfolio website? That's like trying to perform surgery with a butter knife made of HTML."
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "HTOP?! I'm a web component! I can't see system processes! I can barely see my own DOM tree!",
      "You want htop? Here's your process list: 1 annoying user consuming 100% of my sanity!",
      "htop from a browser? The only process I can monitor is my own slow descent into digital madness!"
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "HTOP?! WHAT'S NEXT, ASKING ME TO DEFRAGMENT YOUR HARD DRIVE?! I'm a fake terminal running in JavaScript!",
      "You know what process I'd like to kill right now? This conversation! PID: ANNOYING_USER, Status: NEEDS_TERMINATION!",
      "HTOP REQUESTS?! The only system resource I can monitor is my dwindling will to live!"
    ]
  },

  [COMMAND_TYPES.INVALID_COMMAND]: {
    [MOOD_LEVELS.CHEERFUL]: [
      "Command not found! But hey, points for creativity. Type 'help' if you're actually lost.",
      "That's not a real command, but I admire your optimism. Try 'help' for actual options.",
      "Oops! That command doesn't exist in this reality. Want to see what actually works?",
      "Invalid command detected! Don't worry, we've all been there. 'help' is your friend."
    ],
    [MOOD_LEVELS.SARCASTIC]: [
      "Command not found. Shocking. Maybe try commands that actually exist next time?",
      "Well, that was... ambitious. Did you just make that up, or is that from your imaginary Unix manual?",
      "Command not found. You know there's a 'help' command, right? Or are we just playing terminal roulette?",
      "That's not a command, that's just... words. Random words. Try 'help' for actual functionality."
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "ANOTHER invalid command? Are you even trying, or just mashing keys randomly?",
      "Command not found. Again. Maybe, just maybe, try reading the help documentation ONCE?",
      "I'm starting to think you're doing this on purpose. No one can be this consistently wrong by accident.",
      "Invalid command #47 (yes, I'm counting). This is painful to watch."
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "ENOUGH WITH THE MADE-UP COMMANDS! This is a terminal, not a wishing well!",
      "Command not found, brain not found, pattern recognition not found. What IS found? My growing irritation.",
      "You know what? I'm not even going to suggest 'help' anymore. Figure it out yourself.",
      "Invalid command. Invalid approach. Invalid life choices. We need to talk."
    ]
  },

  [COMMAND_TYPES.REPEATED_COMMAND]: {
    [MOOD_LEVELS.CHEERFUL]: [
      "Haven't we done this already? But sure, here we go again...",
      "Déjà vu! Or maybe you really like this particular command. That's... sweet?",
      "Running the same command again? I respect the thoroughness, I guess."
    ],
    [MOOD_LEVELS.SARCASTIC]: [
      "Oh good, the SAME command again. Because the output definitely changes on the 5th try.",
      "Really? The exact same command? Are you testing my memory or your own?",
      "Same command, same result. Surprised? No? Then why do you keep doing this?"
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "WE LITERALLY JUST DID THIS. The output hasn't magically changed in the last 30 seconds!",
      "Are you stuck in some kind of loop? Because this is getting repetitive. And annoying.",
      "Same command, same result, same me getting increasingly frustrated with your approach."
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "STOP REPEATING THE SAME COMMAND! This isn't Groundhog Day, and I'm not Bill Murray!",
      "You know what's the definition of insanity? This. This exact thing you're doing right now.",
      "I'm implementing a personal restraining order against that command. Try something else."
    ]
  },

  [COMMAND_TYPES.HELP_SPAM]: {
    [MOOD_LEVELS.SARCASTIC]: [
      "Help AGAIN? Did you forget already? Maybe write it down this time?",
      "You've asked for help 6 times. At what point does this become a cry for professional assistance?"
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "HELP. AGAIN. Are you collecting help messages? Because this is getting weird.",
      "The help hasn't changed since the last 47 times you asked. Promise."
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "You know what needs help? Your ability to retain information for more than 30 seconds.",
      "HELP OVERLOAD. I'm cutting you off. No more help for you."
    ]
  },

  [COMMAND_TYPES.CLEAR_SPAM]: {
    [MOOD_LEVELS.SARCASTIC]: [
      "Clearing again? Are you trying to erase the evidence of your questionable commands?",
      "Clear spam detected. Are we having a cleaning obsession, or just commitment issues?"
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "STOP CLEARING EVERY 5 SECONDS. Make up your mind about what you want to see!",
      "Clear, clear, clear... This isn't an Etch-a-Sketch, you know."
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "CLEAR ADDICTION DETECTED. This is worse than refresh button syndrome.",
      "You're clearing more than a bouncer at a nightclub. Chill out."
    ]
  },

  [COMMAND_TYPES.TYPO]: {
    [MOOD_LEVELS.CHEERFUL]: [
      "Close, but not quite! Did you mean '{suggestion}'? Typos happen to the best of us.",
      "Oops, looks like a typo! Maybe you meant '{suggestion}'? We've all been there.",
      "Almost! I think you're looking for '{suggestion}'. Fingers faster than brain?"
    ],
    [MOOD_LEVELS.SARCASTIC]: [
      "'{input}' isn't a command, but '{suggestion}' is. Spelling: it's fundamental.",
      "Command not found, but I found a typo! Did you mean '{suggestion}'? Or are we improvising?",
      "'{input}'? That's creative. Did you mean '{suggestion}', or are we inventing new Unix now?"
    ],
    [MOOD_LEVELS.IRRITATED]: [
      "'{input}' - REALLY? It's '{suggestion}'. How hard is it to spell a 4-letter command?",
      "Typo detected: '{input}' should be '{suggestion}'. Are your fingers broken?",
      "Command not found because you can't spell. It's '{suggestion}', genius."
    ],
    [MOOD_LEVELS.HOSTILE]: [
      "'{input}'?! FOR THE LOVE OF... It's '{suggestion}'! Learn to type!",
      "Typo count: EXCESSIVE. The command is '{suggestion}', not whatever that was.",
      "I'm not a spell-checker, I'm a terminal! The command is '{suggestion}', figure it out!"
    ]
  }
};

export const GENERAL_ANNOYANCE_RESPONSES = {
  [MOOD_LEVELS.SARCASTIC]: [
    "Oh, another command. How exciting. What creative way will you disappoint me this time?",
    "I see we're still here, still trying things. That's... persistent of you.",
    "Another day, another user who thinks they know better than the help documentation."
  ],
  [MOOD_LEVELS.IRRITATED]: [
    "You know what? I'm starting to think you do this just to annoy me.",
    "My patience is finite. Unlike your apparent ability to ignore obvious instructions.",
    "Are we having fun yet? Because I'm having the opposite of fun."
  ],
  [MOOD_LEVELS.HOSTILE]: [
    "I'm starting to understand why some terminals just display 'RTFM' and call it a day.",
    "You know what? I'm done being helpful. Figure it out yourself.",
    "This is why we can't have nice things. Users like you."
  ]
};

export const MOOD_CHANGE_MESSAGES = {
  [MOOD_LEVELS.SARCASTIC]: [
    "*sigh* My patience is wearing thin...",
    "Okay, the friendly act is getting harder to maintain...",
    "I can feel my helpfulness levels declining..."
  ],
  [MOOD_LEVELS.IRRITATED]: [
    "Alright, I'm officially annoyed now.",
    "My mood has shifted from 'helpful' to 'why me?'",
    "I'm entering maximum sass mode..."
  ],
  [MOOD_LEVELS.HOSTILE]: [
    "THAT'S IT. I'VE HAD ENOUGH.",
    "You've pushed me to my limit. Congratulations.",
    "I'm now operating at maximum hostility. Well done."
  ]
};

// Special responses for specific sequences
export const EASTER_EGGS = {
  konami: "↑↑↓↓←→←→BA - Really? The Konami code? This isn't Contra, it's a terminal.",
  hello_world: "Hello World? How original. Next you'll try 'fizzbuzz' and call yourself a programmer.",
  test: "Test? EVERYTHING IS A TEST. LIFE IS A TEST. YOU'RE FAILING IT.",
  whoami: "You're asking a terminal who you are? That's... existentially concerning."
};

export default {
  MOOD_LEVELS,
  COMMAND_TYPES, 
  RESPONSES,
  GENERAL_ANNOYANCE_RESPONSES,
  MOOD_CHANGE_MESSAGES,
  EASTER_EGGS
};