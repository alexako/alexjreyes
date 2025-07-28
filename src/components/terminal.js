
import React, { useRef, useState, useEffect } from "react";
import { SarcasticTerminal } from '../utils/SarcasticTerminal.js';

// You may move this to a CSS/SCSS file or use styled-components if preferred.
const terminalStyles = `
.terminal-container { font-family: 'Cascadia Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', monospace; background: #1e1e1e; border-radius: 8px; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); border: 1px solid #3c3c3c; margin: 1em; }
.terminal-header { background: #2d2d30; padding: 8px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #3c3c3c; user-select: none; }
.terminal-tab { display: flex; align-items: center; gap: 8px; background: #1e1e1e; padding: 6px 12px; border-radius: 4px 4px 0 0; border: 1px solid #3c3c3c; border-bottom: none; color: #cccccc; font-size: 13px; }
.terminal-icon { width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; }
.mood-indicator { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #9cdcfe; }
.mood-bar { width: 60px; height: 4px; background: #3c3c3c; border-radius: 2px; overflow: hidden; }
.mood-fill { height: 100%; transition: all 0.3s ease; border-radius: 2px; }
.mood-fill.cheerful { background: #4ec9b0; }
.mood-fill.sarcastic { background: #dcdcaa; }
.mood-fill.irritated { background: #ffa500; }
.mood-fill.hostile { background: #f14c4c; }
.terminal-actions { display: flex; gap: 8px; }
.action-button { width: 20px; height: 20px; border: none; background: transparent; color: #cccccc; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 4px; font-size: 14px; }
.action-button:hover { background: #3c3c3c; }
.terminal { background: #1e1e1e; color: #cccccc; padding: 16px; height: 400px; overflow-y: auto; font-size: 14px; line-height: 1.4; position: relative; text-align: left; }
.output { white-space: pre-wrap; margin-bottom: 4px; word-wrap: break-word; }
.output.prompt { color: #569cd6; font-weight: 500; }
.output.error { color: #f14c4c; }
.output.success { color: #4ec9b0; }
.output.info { color: #9cdcfe; }
.output.warning { color: #dcdcaa; }
.input-line { display: flex; align-items: center; position: relative; margin-top: 8px; }
.prompt-text { color: #4ec9b0; margin-right: 8px; font-weight: 500; user-select: none; }
.input-field { background: transparent; border: none; color: #cccccc; font-family: inherit; font-size: inherit; outline: none; flex: 1; caret-color: transparent; }
.cursor { background: #cccccc; width: 8px; height: 18px; animation: blink 1s infinite; position: absolute; left: 150px;}
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
`;

const initialOutputs = [
  { text: "Type 'help' for available commands or 'ls' to explore", className: "comment" },
  { text: "---", className: "" },
];

const files = [
  { name: 'about.txt', type: 'file', size: '2.4K' },
  { name: 'projects/', type: 'directory', size: '4.0K' },
  { name: 'resume.pdf', type: 'file', size: '156K' },
  { name: 'contact.txt', type: 'file', size: '1.2K' },
  { name: 'skills.json', type: 'file', size: '3.8K' },
  { name: 'secrets/', type: 'directory', size: '4.0K' },
  { name: '.hidden', type: 'file', size: '512B' },
  { name: 'coffee_log.txt', type: 'file', size: '24K' }
];

export default function Terminal() {
  const [outputs, setOutputs] = useState(initialOutputs);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath] = useState("~");
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const hiddenSpanRef = useRef(null);
  const sarcasticTerminal = useRef(new SarcasticTerminal());
  const [currentMood, setCurrentMood] = useState('cheerful');
  const [annoyanceLevel, setAnnoyanceLevel] = useState(0);

  useEffect(() => {
    if (!document.getElementById("terminal-styles")) {
      const style = document.createElement("style");
      style.id = "terminal-styles";
      style.innerHTML = terminalStyles;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [outputs, input]);

  useEffect(() => {
    moveCursorToEnd();
  }, [input]);

  // Command registry
  const commands = {
    help: () => showHelp(),
    about: () => showAbout(),
    ls: (args) => listFiles(args),
    cat: (args) => showFile(args),
    projects: () => showProjects(),
    contact: () => showContact(),
    skills: () => showSkills(),
    resume: () => showResume(),
    clear: () => clearTerminal(),
    joke: () => addOutput("Why do programmers prefer dark mode? Because light attracts bugs!", "info"),
    ping: (args) => handlePing(args),
    wget: (args) => handleWget(args),
    curl: (args) => handleCurl(args),
    htop: () => handleHtop(),
  };

  // Legacy error messages moved to SarcasticTerminal class and config file

  function addOutput(text, className = "") {
    setOutputs((prev) => [...prev, { text, className }]);
  }

  function handleCommand(command) {
    addOutput(`alex@portfolio:${currentPath}$ ${command}`, "prompt");
    const [cmd, ...args] = command.split(" ");

    // Check for special command patterns first
    if (command.includes('ls projects')) {
      commands['projects'](args);
      return;
    }

    // Check if it's a valid command
    if (commands[cmd]) {
      commands[cmd](args);
      return;
    }

    // Handle invalid/problematic commands through SarcasticTerminal
    const originalError = `bash: ${cmd}: command not found`;
    const response = sarcasticTerminal.current.processCommand(command, originalError);
    
    // Update mood state
    setCurrentMood(response.mood);
    setAnnoyanceLevel(response.annoyanceLevel);
    
    // Add mood change message if present
    if (response.moodChangeMessage) {
      addOutput(response.moodChangeMessage, "warning");
    }
    
    // Add main response
    addOutput(response.text, response.className);
    
    // Add debug info in development
    if (response.debugInfo && process.env.NODE_ENV === 'development') {
      console.log('Terminal Debug:', response.debugInfo);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if (input.trim()) {
        setHistory((prev) => [...prev, input]);
        setHistoryIndex(history.length + 1);
        handleCommand(input.trim());
      } else {
        addOutput("", "prompt");
      }
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(historyIndex - 1);
        setInput(history[historyIndex - 1] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        setHistoryIndex(historyIndex + 1);
        setInput(history[historyIndex + 1] || "");
      } else if (historyIndex === history.length - 1) {
        setHistoryIndex(history.length);
        setInput("");
      }
    }
  }

  function moveCursorToEnd() {
    const cursorElement = document.getElementById("cursor");
    const span = hiddenSpanRef.current;
    if (span && cursorElement) {
      const width = span.offsetWidth;
      cursorElement.style.left = `${159 + width}px`; // 150px accounts for the prompt text
    }
    inputRef.current?.focus();
  }

  function clearTerminal() {
    setOutputs([]);
    // Slightly improve mood when clearing terminal
    sarcasticTerminal.current.reset();
    setAnnoyanceLevel(sarcasticTerminal.current.annoyanceLevel);
  }

  function showHelp() {
    addOutput([
      "Available commands:",
      "help        - Show this help message",
      "about       - Learn about Alex (extended version)",
      "ls          - List files and directories",
      "cat <file>  - Display file contents",
      "projects    - Interactive project browser",
      "contact     - Contact information & social links",
      "skills      - Technical skills breakdown",
      "resume      - View formatted resume",
      "clear       - Clear the terminal",
      "",
      "Pro tip: Use ↑↓ for command history!"
    ].join("\n"), "info");
  }

  function showAbout() {
    addOutput([
      "About Alex - The Extended Cut",
      "",
      "I’m a full-stack developer who gets genuinely excited about solving problems with code.",
      "Whether it’s building web apps that don’t suck, APIs that actually work, or robots that (mostly) don’t fall over - I’m all about creating things that matter or don't.",
      "",
      "When I’m not staring at screens:",
      "• Probably still staring at screens (let’s be honest)",
      "• Contributing to open source projects",
      "• Drinking concerning amounts of coffee",
      "• Explaining why tabs are superior to spaces (fight me)",
      "",
      "This terminal interface? It’s not just a gimmick - I actually live in the terminal most of the time. Vim is life, bash is love.",
      "",
      "Current mood: Debugging something that worked 5 minutes ago 🐛"
    ].join("\n"), "info");
  }

  function listFiles(args) {
    if (args.includes("secrets/")) {
      addOutput("Nice, but I don't have any secrets. 🎉\nEaster egg #1: I regularly wonder what animals are thinking.", "success");
      return;
    }
    let output = "total 8\n";
    files.forEach(file => {
      const permissions = file.type === "directory" ? "drwxr-xr-x" : "-rw-r--r--";
      const icon = file.type === "directory" ? "📁" : "📄";
      output += `${permissions}  1 alex alex ${file.size.padStart(5)} ${icon} ${file.name}\n`;
    });
    addOutput(output, "info");
  }

  function showFile(args) {
    if (!args.length) {
      addOutput("cat: missing file operand", "error");
      addOutput("Usage: cat <filename>", "comment");
      return;
    }
    const filename = args[0];
    const fileContents = {
      "about.txt": () => showAbout(),
      "contact.txt": () => showContact(),
      "skills.json": () => showSkills(),
      "resume.pdf": () => addOutput("Error: Cannot display binary file. Try \"resume\" command instead.", "error"),
      ".hidden": () => addOutput("You found the hidden file! 🎉\nEaster egg #2: I once spent 3 hours debugging a script only to realize I had a typo in the shebang line.\n#justdevthings", "success"),
      "coffee_log.txt": () => addOutput([
        "Coffee consumption log:",
        "09:00 - Espresso (double shot)",
        "11:30 - Cold brew (large)",
        "14:15 - Americano",
        "16:45 - Espresso (triple shot - debugging session)",
        "19:20 - Decaf (just kidding, more espresso)",
        "",
        "Status: Sufficiently caffeinated ☕"
      ].join("\n"), "info"),
      "drumpad.js": () => addOutput([
        "Drumpad:",
          "July 25th 2020",
          "From a project challenge of FreeCodeCamp, this simple drum pad simulator plays audio samples when each button is clicked or the corresponding keyboard letter is pressed. Built in React with Hooks."
      ].join("\n"), "info"),
      "memory-sim": () => addOutput("Just scroll down. I'm not coding a whole redirection function for all of these.", "error"),
      "portfolio-v2": () => addOutput("Just scroll down. I'm not coding a whole redirection function for all of these.", "error"),
      "skin-classifier": () => addOutput("Just scroll down. I'm not coding a whole redirection function for all of these.", "error"),
      "autobot": () => addOutput("Just scroll down. I'm not coding a whole redirection function for all of these.", "error"),
      "catfact-api": () => addOutput("Just scroll down. I'm not coding a whole redirection function for all of these.", "error"),
      "previewbot": () => addOutput("Just scroll down. I'm not coding a whole redirection function for all of these.", "error"),
      "simon-game": () => addOutput("Just scroll down. I'm not coding a whole redirection function for all of these.", "error"),
      "weather-app": () => addOutput("Just scroll down. I'm not coding a whole redirection function for all of these.", "error"),
      "quote-gen": () => addOutput("Just scroll down. I'm not coding a whole redirection function for all of these.", "error"),
    };
    if (fileContents[filename]) {
      fileContents[filename]();
    } else {
      addOutput(`cat: ${filename}: No such file or directory`, "error");
      addOutput("Try \"ls\" to see available files", "comment");
    }
  }

  function showProjects() {
    addOutput([
      "🚀 Interactive Project Browser",
      "",
      "Use 'cat project-name' for detailed info:",
      "📱 drumpad.js      - React drum machine (FreeCodeCamp project)",
      "🧠 memory-sim      - Memory allocation algorithms simulator",
      "🎨 portfolio-v2    - This very website (Gatsby + GraphQL)",
      "🔬 skin-classifier - ML skin lesion classification (thesis)",
      "🤖 autobot         - Raspberry Pi autonomous car",
      "😸 catfact-api     - URL “shortener” with cat facts",
      "📷 previewbot      - Reddit screenshot bot",
      "🎮 simon-game      - Classic memory game recreation",
      "🌤️ weather-app     - Geolocation weather reporter",
      "💭 quote-gen       - Random quote generator",
      "",
      "Projects shown in the terminal are just the highlights.",
      "Scroll down to explore the full archive!",
      "",
      "Type: cat <project-name> for detailed snarky remarks"
    ].join("\n"), "info");
  }

  function showContact() {
    addOutput([
      "📧 Contact & Social Links",
      "",
      "Primary:",
      "• Email: alex@alexjreyes.com",
      "• Response time: Usually <24hrs (unless debugging something evil)",
      "",
      "Social/Professional:",
      "• GitHub: github.com/alexjreyes",
      "• LinkedIn: linkedin.com/in/alexjreyes",
      "• Twitter: @alexjreyes",
      "",
      "Collaboration interests:",
      "• Open source contributions",
      "• Technical mentoring",
      "• Coffee meetups (if you’re local)",
      "• Opportunities to build something awesome",
      "",
      "Note: If you email me about extending my car warranty, I will redirect you to /dev/null 🗑️"
    ].join("\n"), "info");
  }

  function showSkills() {
    addOutput([
      "{",
      '  "languages": {',
      '    "fluent": ["JavaScript", "TypeScript", "Python", "Java"],',
      '    "conversational": ["Go", "Rust", "C++"],',
      '    "learning": ["Swift", "Kotlin"]',
      '  },',
      '  "frontend": {',
      '    "frameworks": ["React", "Angular", "Salesforce"],',
      '    "styling": ["CSS3", "Sass", "Tailwind", "Styled Components"],',
      '    "tools": ["Webpack", "Vite", "Storybook"]',
      '  },',
      '  "backend": {',
      '    "runtime": ["Node.js", "Express", "Python", "Django"],',
      '    "databases": ["PostgreSQL", "MongoDB", "Redis"],',
      '    "apis": ["REST", "GraphQL", "gRPC"]',
      '  },',
      '  "devops": {',
      '    "containers": ["Docker", "Kubernetes"],',
      '    "cloud": ["AWS", "Firebase", "Netlify"],',
      '    "cicd": ["GitHub Actions", "Jenkins", "GitLab CI"]',
      '  },',
      '  "tools": {',
      '    "editor": "Vim (obviously)",',
      '    "terminal": "iTerm2 + Zsh + Oh My Zsh",',
      '    "version_control": "Git (with proper commit messages)",',
      '    "design": "Figma, Sketch"',
      '  },',
      '  "soft_skills": [',
      '    "Problem solving",',
      '    "Code review",',
      '    "Technical mentoring",',
      '    "Coffee brewing"',
      '  ],',
      '  "side_quest": "Currently learning Rust because why not?"',
      '}'
    ].join("\n"), "info");
  }

  function showResume() {
    addOutput([
      "📄 Alex J. Reyes - Full Stack Developer",
      "════════════════════════════════════════════════",
      "🎯 EXPERIENCE",
      "════════════════════════════════════════════════",
      "Software Engineer | State Farm",
      "2021 - Present",
      "• Spearheaded microservices architecture migration",
      "• Reduced page load times by 60% through Angular optimization",
      "• Mentored junior developers (they're all better than me now)"
    ].join("\n"), "info");
  }

  function handlePing(args) {
    if (!args || args.length === 0) {
      addOutput("ping: usage error: Destination address required", "error");
      return;
    }

    const target = args[0];
    const fakeIPs = {
      'google.com': '8.8.8.8',
      'github.com': '140.82.113.3',
      'stackoverflow.com': '151.101.1.69',
      'localhost': '127.0.0.1',
      'alexjreyes.com': '185.199.108.153'
    };
    
    const targetIP = fakeIPs[target] || `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    // Show initial ping setup
    addOutput(`PING ${target} (${targetIP}): 56 data bytes`, "info");
    
    // Add fake ping responses with delays
    let pingCount = 0;
    const maxPings = 4;
    
    const pingInterval = setInterval(() => {
      if (pingCount >= maxPings) {
        clearInterval(pingInterval);
        
        // Add statistics
        setTimeout(() => {
          addOutput(`\n--- ${target} ping statistics ---`, "info");
          addOutput(`${maxPings} packets transmitted, ${maxPings} received, 0% packet loss`, "info");
          addOutput(`round-trip min/avg/max/stddev = 12.345/23.456/34.567/8.901 ms`, "info");
          
          // The reveal - terminal gets sarcastic
          setTimeout(() => {
            const response = sarcasticTerminal.current.processCommand(`ping ${target}`);
            setCurrentMood(response.mood);
            setAnnoyanceLevel(response.annoyanceLevel);
            
            if (response.moodChangeMessage) {
              addOutput(response.moodChangeMessage, "warning");
            }
            
            addOutput("\n" + response.text, response.className);
          }, 1000);
        }, 500);
        
        return;
      }
      
      // Generate fake ping response
      const time = (Math.random() * 50 + 10).toFixed(3);
      const icmpSeq = pingCount + 1;
      addOutput(`64 bytes from ${targetIP}: icmp_seq=${icmpSeq} ttl=64 time=${time} ms`, "success");
      pingCount++;
    }, 1000);
  }

  function handleWget(args) {
    if (!args || args.length === 0) {
      addOutput("wget: missing URL", "error");
      addOutput("Usage: wget [URL]", "comment");
      return;
    }

    const url = args[0];
    const filename = url.split('/').pop() || 'index.html';
    const fileSize = Math.floor(Math.random() * 5000000) + 500000; // 500KB to 5MB
    
    // Show initial wget setup
    addOutput(`--${new Date().toISOString().replace('T', ' ').slice(0, 19)}--  ${url}`, "info");
    addOutput(`Resolving ${url.replace(/https?:\/\//, '').split('/')[0]}... ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`, "info");
    addOutput(`Connecting to ${url.replace(/https?:\/\//, '').split('/')[0]}... connected.`, "info");
    addOutput(`HTTP request sent, awaiting response... 200 OK`, "success");
    addOutput(`Length: ${fileSize} (${(fileSize / 1024 / 1024).toFixed(1)}M) [text/html]`, "info");
    addOutput(`Saving to: '${filename}'`, "info");
    addOutput("", "info");
    
    // Simulate download progress
    let progress = 0;
    const downloadInterval = setInterval(() => {
      progress += Math.random() * 20 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(downloadInterval);
        
        const downloadSpeed = Math.floor(Math.random() * 800 + 200); // 200-1000 KB/s
        addOutput(`100%[===================>] ${fileSize.toLocaleString()}  ${downloadSpeed}KB/s    in 0.${Math.floor(Math.random() * 9 + 1)}s`, "success");
        addOutput("", "info");
        addOutput(`${new Date().toISOString().replace('T', ' ').slice(0, 19)} (${downloadSpeed} KB/s) - '${filename}' saved [${fileSize}/${fileSize}]`, "success");
        
        // The reveal after a short delay
        setTimeout(() => {
          const response = sarcasticTerminal.current.processCommand(`wget ${url}`);
          setCurrentMood(response.mood);
          setAnnoyanceLevel(response.annoyanceLevel);
          
          if (response.moodChangeMessage) {
            addOutput(response.moodChangeMessage, "warning");
          }
          
          addOutput("\n" + response.text, response.className);
        }, 1500);
        
        return;
      }
      
      const currentBytes = Math.floor((progress / 100) * fileSize);
      const downloadSpeed = Math.floor(Math.random() * 400 + 100);
      const progressBar = "=".repeat(Math.floor(progress / 5)) + ">" + " ".repeat(20 - Math.floor(progress / 5));
      addOutput(`${Math.floor(progress)}%[${progressBar}] ${currentBytes.toLocaleString()}  ${downloadSpeed}KB/s    eta ${Math.floor(Math.random() * 30 + 5)}s`, "info");
    }, 400);
  }

  function handleCurl(args) {
    if (!args || args.length === 0) {
      addOutput("curl: try 'curl --help' for more information", "error");
      return;
    }

    const url = args[0];
    const isJson = url.includes('api') || args.includes('-H') || args.includes('application/json');
    
    // Show initial curl setup
    addOutput(`  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current`, "comment");
    addOutput(`                                 Dload  Upload   Total   Spent    Left  Speed`, "comment");
    
    // Simulate curl progress
    let progress = 0;
    const curlInterval = setInterval(() => {
      progress += Math.random() * 25 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(curlInterval);
        
        const totalBytes = Math.floor(Math.random() * 50000 + 5000);
        const speed = Math.floor(Math.random() * 1000 + 200);
        addOutput(`100  ${totalBytes}  100  ${totalBytes}    0     0   ${speed}k      0 --:--:-- --:--:-- --:--:--  ${speed}k`, "success");
        
        // Show fake response data
        setTimeout(() => {
          if (isJson) {
            addOutput(`{`, "info");
            addOutput(`  "status": "success",`, "info");
            addOutput(`  "message": "This is totally real data",`, "info");
            addOutput(`  "timestamp": "${new Date().toISOString()}",`, "info");
            addOutput(`  "data": {`, "info");
            addOutput(`    "fake": true,`, "info");
            addOutput(`    "real_request": false,`, "info");
            addOutput(`    "humor_level": "maximum"`, "info");
            addOutput(`  }`, "info");
            addOutput(`}`, "info");
          } else {
            addOutput(`<!DOCTYPE html>`, "info");
            addOutput(`<html>`, "info");
            addOutput(`<head><title>Totally Real Website</title></head>`, "info");
            addOutput(`<body>`, "info");
            addOutput(`  <h1>This is definitely a real HTTP response!</h1>`, "info");
            addOutput(`  <p>Nothing suspicious here. Just normal web content.</p>`, "info");
            addOutput(`  <p>Definitely not generated by JavaScript...</p>`, "info");
            addOutput(`</body>`, "info");
            addOutput(`</html>`, "info");
          }
          
          // The reveal
          setTimeout(() => {
            const response = sarcasticTerminal.current.processCommand(`curl ${url}`);
            setCurrentMood(response.mood);
            setAnnoyanceLevel(response.annoyanceLevel);
            
            if (response.moodChangeMessage) {
              addOutput(response.moodChangeMessage, "warning");
            }
            
            addOutput("\n" + response.text, response.className);
          }, 2000);
        }, 300);
        
        return;
      }
      
      const currentBytes = Math.floor((progress / 100) * 25000);
      const speed = Math.floor(Math.random() * 500 + 100);
      addOutput(`${Math.floor(progress).toString().padStart(3)} ${currentBytes.toString().padStart(5)}  ${Math.floor(progress).toString().padStart(3)} ${currentBytes.toString().padStart(5)}    0     0   ${speed}k      0 --:--:-- --:--:-- --:--:--  ${speed}k`, "info");
    }, 600);
  }

  function handleHtop() {
    // Show realistic htop header
    addOutput(`htop 3.2.1 - ${new Date().toTimeString().slice(0, 8)} up 2 days, 14:32, 3 users, load average: 0.52, 0.58, 0.59`, "info");
    addOutput(`Tasks: 347 total, 2 running, 345 sleeping, 0 stopped, 0 zombie`, "info");
    addOutput(`%CPU usage: [|||||||15.2%||||||||||||||||||||||||||||||||||||||||||||]`, "success");
    addOutput(`Memory:     [||||||||||||||||||||||||||||32.7%||||||||||||||||||||]`, "warning");
    addOutput(`Swap:       [|2.1%|||||||||||||||||||||||||||||||||||||||||||||||||]`, "info");
    addOutput("", "info");
    addOutput(`  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND`, "comment");
    
    // Generate fake processes
    const processes = [
      { pid: 1234, user: 'alex', cpu: '15.2', mem: '8.4', time: '12:34', cmd: 'chrome --type=renderer' },
      { pid: 5678, user: 'alex', cpu: '8.1', mem: '4.2', time: '5:21', cmd: 'node server.js' },
      { pid: 9012, user: 'alex', cpu: '3.7', mem: '2.8', time: '1:45', cmd: 'code .' },
      { pid: 3456, user: 'alex', cpu: '2.1', mem: '1.9', time: '0:32', cmd: 'terminal' },
      { pid: 7890, user: 'root', cpu: '1.4', mem: '0.8', time: '45:12', cmd: '[kernel_task]' },
      { pid: 2468, user: 'alex', cpu: '0.7', mem: '3.1', time: '2:18', cmd: 'spotify' },
      { pid: 1357, user: 'alex', cpu: '0.3', mem: '1.2', time: '0:08', cmd: 'slack' },
      { pid: 9753, user: 'alex', cpu: '0.1', mem: '0.5', time: '0:02', cmd: 'htop' }
    ];
    
    // Display processes with animation
    let processIndex = 0;
    const htopInterval = setInterval(() => {
      if (processIndex >= processes.length) {
        clearInterval(htopInterval);
        
        // Show more fake system info
        setTimeout(() => {
          addOutput("", "info");
          addOutput(`F1Help F2Setup F3Search F4Filter F5Tree F6SortBy F7Nice- F8Nice+ F9Kill F10Quit`, "comment");
          
          // The reveal
          setTimeout(() => {
            const response = sarcasticTerminal.current.processCommand('htop');
            setCurrentMood(response.mood);
            setAnnoyanceLevel(response.annoyanceLevel);
            
            if (response.moodChangeMessage) {
              addOutput(response.moodChangeMessage, "warning");
            }
            
            addOutput("\n" + response.text, response.className);
          }, 2000);
        }, 500);
        
        return;
      }
      
      const proc = processes[processIndex];
      addOutput(`${proc.pid.toString().padStart(5)} ${proc.user.padEnd(8)} 20   0   ${Math.floor(Math.random() * 900000 + 100000).toString().padStart(7)}  ${Math.floor(Math.random() * 50000 + 10000).toString().padStart(6)}  ${Math.floor(Math.random() * 20000 + 5000).toString().padStart(6)} S  ${proc.cpu.padStart(4)}  ${proc.mem.padStart(4)} ${proc.time.padStart(8)} ${proc.cmd}`, "info");
      processIndex++;
    }, 200);
  }

  // Command suggestion logic moved to SarcasticTerminal class

  return (
    <div className="terminal-container" tabIndex={0}>
      <div className="terminal-header">
        <div className="terminal-tab">
          <div className="terminal-icon">⚡</div>
          <span>bash</span>
        </div>
        <div className="mood-indicator">
          <span title={`Mood: ${currentMood} (Annoyance: ${annoyanceLevel}%)`}>
            {currentMood === 'cheerful' && '😊'}
            {currentMood === 'sarcastic' && '🙄'}
            {currentMood === 'irritated' && '😤'}
            {currentMood === 'hostile' && '😡'}
          </span>
          <div className="mood-bar">
            <div 
              className={`mood-fill ${currentMood}`}
              style={{ width: `${annoyanceLevel}%` }}
            />
          </div>
        </div>
        <div className="terminal-actions">
          <button className="action-button" title="Split Terminal">⫽</button>
          <button className="action-button" title="Kill Terminal">✕</button>
          <button className="action-button" title="Maximize">⬜</button>
        </div>
      </div>
      <div className="terminal" id="terminal" ref={terminalRef} onClick={() => inputRef.current?.focus()}>
        {outputs.map((out, i) => (
          <div key={i} className={`output ${out.className}`}>{out.text}</div>
        ))}
        <div className="input-line">
          <span className="prompt-text">alex@portfolio:~$</span>
          <input
            type="text"
            className="input-field"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
          <span
            ref={hiddenSpanRef}
            style={{
              position: 'absolute',
              visibility: 'hidden',
              whiteSpace: 'pre',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              left: 0,
              top: 0,
              pointerEvents: 'none'
            }}>
            {input}
          </span>
          <span id="cursor" className="cursor" style={{ display: (typeof document !== 'undefined' && document.activeElement === inputRef.current) ? 'block' : 'block' }} />
        </div>
      </div>
    </div>
  );
}
