
import React, { useRef, useState, useEffect } from "react";

// You may move this to a CSS/SCSS file or use styled-components if preferred.
const terminalStyles = `
.terminal-container { font-family: 'Cascadia Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', monospace; background: #1e1e1e; border-radius: 8px; overflow: hidden; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); border: 1px solid #3c3c3c; margin: 1em; }
.terminal-header { background: #2d2d30; padding: 8px 16px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #3c3c3c; user-select: none; }
.terminal-tab { display: flex; align-items: center; gap: 8px; background: #1e1e1e; padding: 6px 12px; border-radius: 4px 4px 0 0; border: 1px solid #3c3c3c; border-bottom: none; color: #cccccc; font-size: 13px; }
.terminal-icon { width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; }
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
    // ... fun commands (implement as needed)
    // Example:
    joke: () => addOutput("Why do programmers prefer dark mode? Because light attracts bugs!", "info"),
  };

  function addOutput(text, className = "") {
    setOutputs((prev) => [...prev, { text, className }]);
  }

  function handleCommand(command) {
    addOutput(`alex@portfolio:${currentPath}$ ${command}`, "prompt");
    const [cmd, ...args] = command.split(" ");
    if (commands[cmd]) {
      commands[cmd](args);
    } else {
      addOutput(`bash: ${cmd}: command not found`, "error");
      addOutput(`Did you mean '${suggestCommand(cmd)}'? Type 'help' for all commands.`, "comment");
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
      ".hidden": () => addOutput("You found the hidden file! 🎉\nEaster egg #1: I once spent 3 hours debugging a script only to realize I had a typo in the shebang line.\n#justdevthings", "success"),
      "coffee_log.txt": () => addOutput([
        "Coffee consumption log:",
        "09:00 - Espresso (double shot)",
        "11:30 - Cold brew (large)",
        "14:15 - Americano",
        "16:45 - Espresso (triple shot - debugging session)",
        "19:20 - Decaf (just kidding, more espresso)",
        "",
        "Status: Sufficiently caffeinated ☕"
      ].join("\n"), "info")
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
      "Projects shown on the main page are just the highlights.",
      "Use this terminal to explore the full archive!",
      "",
      "Type: cat <project-name> for detailed specs and demos"
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
      "• Mentored junior developers (they’re all better than me now)"
    ].join("\n"), "info");
  }

  function suggestCommand(input) {
    const cmds = Object.keys(commands);
    const suggestion = cmds.find(
      (cmd) =>
        cmd.includes(input) ||
        input.includes(cmd) ||
        levenshteinDistance(input, cmd) <= 2
    );
    return suggestion || "help";
  }

  // Levenshtein distance for suggestions
  function levenshteinDistance(a, b) {
    const matrix = Array.from({ length: b.length + 1 }, () =>
      Array(a.length + 1).fill(0)
    );
    for (let i = 0; i <= b.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] =
            Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  return (
    <div className="terminal-container" tabIndex={0}>
      <div className="terminal-header">
        <div className="terminal-tab">
          <div className="terminal-icon">⚡</div>
          <span>bash</span>
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
          <span id="cursor" className="cursor" style={{ display: document.activeElement === inputRef.current ? 'block' : 'block' }} />
        </div>
      </div>
    </div>
  );
}
