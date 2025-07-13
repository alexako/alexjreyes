<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VSCode Terminal</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cascadia+Code:wght@400;500;600&family=SF+Mono:wght@400;500;600&display=swap');

```
    .terminal-container {
        font-family: 'Cascadia Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'Droid Sans Mono', monospace;
        background: #1e1e1e;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        border: 1px solid #3c3c3c;
    }
    
    .terminal-header {
        background: #2d2d30;
        padding: 8px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #3c3c3c;
        user-select: none;
    }
    
    .terminal-tab {
        display: flex;
        align-items: center;
        gap: 8px;
        background: #1e1e1e;
        padding: 6px 12px;
        border-radius: 4px 4px 0 0;
        border: 1px solid #3c3c3c;
        border-bottom: none;
        color: #cccccc;
        font-size: 13px;
    }
    
    .terminal-icon {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .terminal-actions {
        display: flex;
        gap: 8px;
    }
    
    .action-button {
        width: 20px;
        height: 20px;
        border: none;
        background: transparent;
        color: #cccccc;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        font-size: 14px;
    }
    
    .action-button:hover {
        background: #3c3c3c;
    }
    
    .terminal {
        background: #1e1e1e;
        color: #cccccc;
        padding: 16px;
        height: 400px;
        overflow-y: auto;
        font-size: 14px;
        line-height: 1.4;
        position: relative;
    }
    
    .terminal::-webkit-scrollbar {
        width: 12px;
    }
    
    .terminal::-webkit-scrollbar-track {
        background: #1e1e1e;
    }
    
    .terminal::-webkit-scrollbar-thumb {
        background: #424242;
        border-radius: 6px;
    }
    
    .terminal::-webkit-scrollbar-thumb:hover {
        background: #4f4f4f;
    }
    
    .output {
        white-space: pre-wrap;
        margin-bottom: 4px;
        word-wrap: break-word;
    }
    
    .output.prompt {
        color: #569cd6;
        font-weight: 500;
    }
    
    .output.error {
        color: #f14c4c;
    }
    
    .output.success {
        color: #4ec9b0;
    }
    
    .output.info {
        color: #9cdcfe;
    }
    
    .output.warning {
        color: #dcdcaa;
    }
    
    .input-line {
        display: flex;
        align-items: center;
        position: relative;
        margin-top: 8px;
    }
    
    .prompt-text {
        color: #4ec9b0;
        margin-right: 8px;
        font-weight: 500;
        user-select: none;
    }
    
    .input-field {
        background: transparent;
        border: none;
        color: #cccccc;
        font-family: inherit;
        font-size: inherit;
        outline: none;
        flex: 1;
        caret-color: #cccccc;
    }
    
    .input-field::selection {
        background: #264f78;
    }
    
    .cursor {
        background: #cccccc;
        width: 2px;
        height: 18px;
        animation: blink 1s infinite;
        position: absolute;
        left: 0;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    /* VSCode theme colors for different output types */
    .keyword { color: #569cd6; }
    .string { color: #ce9178; }
    .number { color: #b5cea8; }
    .comment { color: #6a9955; }
    .variable { color: #9cdcfe; }
    .function { color: #dcdcaa; }
    .type { color: #4ec9b0; }
    
    /* File listing styles */
    .file-list {
        margin: 8px 0;
    }
    
    .file-item {
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 4px;
        min-width: 120px;
    }
    
    .directory {
        color: #4ec9b0;
        font-weight: 500;
    }
    
    .executable {
        color: #4ec9b0;
        font-weight: 500;
    }
    
    .hidden-file {
        color: #808080;
    }
    
    .link {
        color: #9cdcfe;
        text-decoration: underline;
    }
    
    /* Responsive design */
    @media (max-width: 768px) {
        .terminal {
            height: 300px;
            font-size: 13px;
            padding: 12px;
        }
        
        .terminal-header {
            padding: 6px 12px;
        }
        
        .terminal-tab {
            font-size: 12px;
            padding: 4px 8px;
        }
    }
    
    /* Focus styles */
    .terminal-container:focus-within .terminal-tab {
        background: #1e1e1e;
        border-color: #007acc;
    }
    
    /* Animation for typing effect */
    .typing {
        overflow: hidden;
        white-space: nowrap;
        animation: typing 0.5s steps(40, end);
    }
    
    @keyframes typing {
        from { width: 0; }
        to { width: 100%; }
    }
</style>
```

</head>
<body style="padding: 20px; background: #f5f5f5;">
    <div class="terminal-container">
        <div class="terminal-header">
            <div class="terminal-tab">
                <div class="terminal-icon">⚡</div>
                <span>bash</span>
            </div>
            <div class="terminal-actions">
                <button class="action-button" title="Split Terminal">⫽</button>
                <button class="action-button" title="Kill Terminal">✕</button>
                <button class="action-button" title="Maximize">⬜</button>
            </div>
        </div>
        <div class="terminal" id="terminal">
            <div class="output comment">Welcome to Alex's interactive portfolio terminal!</div>
            <div class="output comment">Type 'help' for available commands or 'ls' to explore</div>
            <div class="output">---</div>

```
        <div class="input-line">
            <span class="prompt-text">alex@portfolio:~$</span>
            <input type="text" class="input-field" id="input" autocomplete="off" spellcheck="false">
            <span class="cursor" id="cursor"></span>
        </div>
    </div>
</div>

<script>
    class Terminal {
        constructor() {
            this.input = document.getElementById('input');
            this.terminal = document.getElementById('terminal');
            this.cursor = document.getElementById('cursor');
            this.history = [];
            this.historyIndex = -1;
            this.currentPath = '~';
            
            this.commands = {
                help: () => this.showHelp(),
                about: () => this.showAbout(),
                ls: (args) => this.listFiles(args),
                cat: (args) => this.showFile(args),
                cd: (args) => this.changeDirectory(args),
                pwd: () => this.showPath(),
                whoami: () => this.showUser(),
                projects: () => this.showProjects(),
                contact: () => this.showContact(),
                skills: () => this.showSkills(),
                resume: () => this.showResume(),
                clear: () => this.clearTerminal(),
                matrix: () => this.matrixEffect(),
                sudo: (args) => this.sudo(args),
                hack: () => this.hack(),
                coffee: () => this.makeCoffee(),
                joke: () => this.tellJoke(),
                exit: () => this.exit(),
                vim: () => this.vim(),
                nano: () => this.nano(),
                emacs: () => this.emacs(),
                theme: () => this.changeTheme()
            };
            
            this.init();
        }
        
        init() {
            this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
            this.input.addEventListener('input', () => this.updateCursor());
            
            // Focus input when terminal is clicked
            this.terminal.addEventListener('click', () => this.input.focus());
            
            // Auto-focus on page load
            this.input.focus();
            
            this.updateCursor();
        }
        
        handleKeydown(e) {
            if (e.key === 'Enter') {
                const command = this.input.value.trim();
                if (command) {
                    this.history.push(command);
                    this.historyIndex = this.history.length;
                    this.executeCommand(command);
                } else {
                    this.addOutput('', 'prompt');
                }
                this.input.value = '';
                this.updateCursor();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.input.value = this.history[this.historyIndex];
                    this.updateCursor();
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex < this.history.length - 1) {
                    this.historyIndex++;
                    this.input.value = this.history[this.historyIndex];
                } else if (this.historyIndex === this.history.length - 1) {
                    this.historyIndex = this.history.length;
                    this.input.value = '';
                }
                this.updateCursor();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autocomplete();
            } else if (e.key === 'Escape') {
                this.input.value = '';
                this.updateCursor();
            }
        }
        
        updateCursor() {
            // Hide cursor when input is focused (browser will show its own)
            this.cursor.style.display = document.activeElement === this.input ? 'none' : 'block';
        }
        
        executeCommand(command) {
            this.addOutput(`alex@portfolio:${this.currentPath}$ ${command}`, 'prompt');
            
            const [cmd, ...args] = command.split(' ');
            
            if (this.commands[cmd]) {
                this.commands[cmd](args);
            } else {
                this.addOutput(`bash: ${cmd}: command not found`, 'error');
                this.addOutput(`Did you mean '${this.suggestCommand(cmd)}'? Type 'help' for all commands.`, 'comment');
            }
            
            this.scrollToBottom();
        }
        
        suggestCommand(input) {
            const commands = Object.keys(this.commands);
            const suggestion = commands.find(cmd => 
                cmd.includes(input) || input.includes(cmd) || this.levenshteinDistance(input, cmd) <= 2
            );
            return suggestion || 'help';
        }
        
        levenshteinDistance(a, b) {
            const matrix = [];
            for (let i = 0; i <= b.length; i++) {
                matrix[i] = [i];
            }
            for (let j = 0; j <= a.length; j++) {
                matrix[0][j] = j;
            }
            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) === a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(
                            matrix[i - 1][j - 1] + 1,
                            matrix[i][j - 1] + 1,
                            matrix[i - 1][j] + 1
                        );
                    }
                }
            }
            return matrix[b.length][a.length];
        }
        
        addOutput(text, className = '') {
            const output = document.createElement('div');
            output.className = `output ${className}`;
            output.textContent = text;
            
            // Insert before the input line
            const inputLine = this.terminal.querySelector('.input-line');
            this.terminal.insertBefore(output, inputLine);
            
            return output;
        }
        
        showHelp() {
            const helpText = `<span class="keyword">Available commands:</span>
```

<span class="function">help</span>        <span class="comment">- Show this help message</span>
<span class="function">about</span>       <span class="comment">- Learn about Alex (extended version)</span>
<span class="function">ls</span>          <span class="comment">- List files and directories</span>
<span class="function">cat</span> <span class="variable"><file></span>  <span class="comment">- Display file contents</span>
<span class="function">projects</span>    <span class="comment">- Interactive project browser</span>
<span class="function">contact</span>     <span class="comment">- Contact information & social links</span>
<span class="function">skills</span>      <span class="comment">- Technical skills breakdown</span>
<span class="function">resume</span>      <span class="comment">- View formatted resume</span>
<span class="function">clear</span>       <span class="comment">- Clear the terminal</span>

<span class="keyword">Fun commands:</span>
<span class="function">coffee</span>      <span class="comment">- Essential developer fuel ☕</span>
<span class="function">joke</span>        <span class="comment">- Programming humor</span>
<span class="function">matrix</span>      <span class="comment">- Enter the matrix…</span>
<span class="function">sudo</span> <span class="variable"><cmd></span>  <span class="comment">- Try to gain root access (spoiler: nope)</span>
<span class="function">hack</span>        <span class="comment">- Attempt to hack the mainframe</span>
<span class="function">vim</span>         <span class="comment">- Try to exit vim (good luck)</span>
<span class="function">exit</span>        <span class="comment">- Escape attempt</span>

<span class="string">Pro tip:</span> Use <span class="keyword">tab</span> for autocomplete and <span class="keyword">↑↓</span> for command history!`;

```
            const outputEl = this.addOutput('');
            outputEl.innerHTML = helpText;
        }
        
        showAbout() {
            const aboutText = `<span class="keyword">About Alex - The Extended Cut</span>
```

Beyond the “code and stuff” intro, here’s the real deal:

I’m a full-stack developer who gets genuinely excited about solving
problems with code. Whether it’s building web apps that don’t suck,
APIs that actually work, or robots that (mostly) don’t fall over -
I’m all about creating things that matter.

<span class="function">When I’m not staring at screens:</span>
<span class="comment">• Probably still staring at screens (let’s be honest)</span>
<span class="comment">• Contributing to open source projects</span>
<span class="comment">• Drinking concerning amounts of coffee</span>
<span class="comment">• Explaining why tabs are superior to spaces (fight me)</span>

This terminal interface? It’s not just a gimmick - I actually live
in the terminal most of the time. Vim is life, bash is love.

<span class="warning">Current mood:</span> <span class="string">Debugging something that worked 5 minutes ago</span> 🐛`;

```
            const outputEl = this.addOutput('');
            outputEl.innerHTML = aboutText;
        }
        
        listFiles(args) {
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
            
            let output = '<span class="comment">total 8</span>\n';
            files.forEach(file => {
                const permissions = file.type === 'directory' ? 'drwxr-xr-x' : '-rw-r--r--';
                const className = file.type === 'directory' ? 'directory' : 
                                file.name.startsWith('.') ? 'hidden-file' :
                                file.name.endsWith('.pdf') ? 'link' : 'variable';
                const icon = file.type === 'directory' ? '📁' : '📄';
                
                output += `<span class="comment">${permissions}</span>  <span class="number">1</span> <span class="variable">alex alex</span> <span class="number">${file.size.padStart(5)}</span> ${icon} <span class="${className}">${file.name}</span>\n`;
            });
            
            const outputEl = this.addOutput('');
            outputEl.innerHTML = output;
        }
        
        showFile(args) {
            if (!args.length) {
                this.addOutput('cat: missing file operand', 'error');
                this.addOutput('Usage: cat <filename>', 'comment');
                return;
            }
            
            const filename = args[0];
            const fileContents = {
                'about.txt': () => this.showAbout(),
                'contact.txt': () => this.showContact(),
                'skills.json': () => this.showSkills(),
                'resume.pdf': () => this.addOutput('Error: Cannot display binary file. Try "resume" command instead.', 'error'),
                '.hidden': () => {
                    const hiddenText = `<span class="success">You found the hidden file! 🎉</span>
```

<span class="warning">Easter egg #1:</span> I once spent 3 hours debugging a script
only to realize I had a typo in the shebang line.

<span class="comment">#justdevthings</span>`; const outputEl = this.addOutput(''); outputEl.innerHTML = hiddenText; }, 'coffee_log.txt': () => { const coffeeText = `<span class="function">Coffee consumption log:</span>

<span class="comment">09:00</span> - <span class="string">Espresso (double shot)</span>
<span class="comment">11:30</span> - <span class="string">Cold brew (large)</span>
<span class="comment">14:15</span> - <span class="string">Americano</span>
<span class="comment">16:45</span> - <span class="string">Espresso (triple shot - debugging session)</span>
<span class="comment">19:20</span> - <span class="string">Decaf (just kidding, more espresso)</span>

<span class="success">Status: Sufficiently caffeinated ☕</span>`;
const outputEl = this.addOutput(’’);
outputEl.innerHTML = coffeeText;
}
};

```
            if (fileContents[filename]) {
                fileContents[filename]();
            } else {
                this.addOutput(`cat: ${filename}: No such file or directory`, 'error');
                this.addOutput('Try "ls" to see available files', 'comment');
            }
        }
        
        showProjects() {
            const projectsText = `<span class="keyword">🚀 Interactive Project Browser</span>
```

Use <span class="function">‘cat project-name’</span> for detailed info:

<span class="directory">📱 drumpad.js</span>      <span class="comment">- React drum machine (FreeCodeCamp project)</span>
<span class="directory">🧠 memory-sim</span>      <span class="comment">- Memory allocation algorithms simulator</span>  
<span class="directory">🎨 portfolio-v2</span>    <span class="comment">- This very website (Gatsby + GraphQL)</span>
<span class="directory">🔬 skin-classifier</span> <span class="comment">- ML skin lesion classification (thesis)</span>
<span class="directory">🤖 autobot</span>         <span class="comment">- Raspberry Pi autonomous car</span>
<span class="directory">😸 catfact-api</span>     <span class="comment">- URL “shortener” with cat facts</span>
<span class="directory">📷 previewbot</span>      <span class="comment">- Reddit screenshot bot</span>
<span class="directory">🎮 simon-game</span>      <span class="comment">- Classic memory game recreation</span>
<span class="directory">🌤️  weather-app</span>     <span class="comment">- Geolocation weather reporter</span>
<span class="directory">💭 quote-gen</span>       <span class="comment">- Random quote generator</span>

Projects shown on the main page are just the highlights.
Use this terminal to explore the full archive!

<span class="string">Type:</span> <span class="function">cat <project-name></span> for detailed specs and demos`;

```
            const outputEl = this.addOutput('');
            outputEl.innerHTML = projectsText;
        }
        
        showContact() {
            const contactText = `<span class="keyword">📧 Contact & Social Links</span>
```

<span class="function">Primary:</span>
<span class="comment">•</span> <span class="variable">Email:</span> <span class="string">alex@alexjreyes.com</span>
<span class="comment">•</span> <span class="variable">Response time:</span> Usually <24hrs (unless debugging something evil)

<span class="function">Social/Professional:</span>
<span class="comment">•</span> <span class="variable">GitHub:</span> <span class="link">github.com/alexjreyes</span>
<span class="comment">•</span> <span class="variable">LinkedIn:</span> <span class="link">linkedin.com/in/alexjreyes</span>  
<span class="comment">•</span> <span class="variable">Twitter:</span> <span class="link">@alexjreyes</span>

<span class="function">Collaboration interests:</span>
<span class="comment">•</span> Open source contributions
<span class="comment">•</span> Technical mentoring
<span class="comment">•</span> Coffee meetups (if you’re local)
<span class="comment">•</span> Opportunities to build something awesome

<span class="warning">Note:</span> If you email me about extending my car warranty,
I will redirect you to <span class="function">/dev/null</span> 🗑️`;

```
            const outputEl = this.addOutput('');
            outputEl.innerHTML = contactText;
        }
        
        showSkills() {
            const skillsText = `<span class="string">{</span>
```

<span class="variable">“languages”</span><span class="string">:</span> <span class="string">{</span>
<span class="variable">“fluent”</span><span class="string">:</span> <span class="string">[“JavaScript”, “TypeScript”, “Python”, “Java”]</span><span class="string">,</span>
<span class="variable">“conversational”</span><span class="string">:</span> <span class="string">[“Go”, “Rust”, “C++”]</span><span class="string">,</span>
<span class="variable">“learning”</span><span class="string">:</span> <span class="string">[“Swift”, “Kotlin”]</span>
<span class="string">},</span>
<span class="variable">“frontend”</span><span class="string">:</span> <span class="string">{</span>
<span class="variable">“frameworks”</span><span class="string">:</span> <span class="string">[“React”, “Angular”, “Vue”]</span><span class="string">,</span>
<span class="variable">“styling”</span><span class="string">:</span> <span class="string">[“CSS3”, “Sass”, “Tailwind”, “Styled Components”]</span><span class="string">,</span>
<span class="variable">“tools”</span><span class="string">:</span> <span class="string">[“Webpack”, “Vite”, “Storybook”]</span>
<span class="string">},</span>
<span class="variable">“backend”</span><span class="string">:</span> <span class="string">{</span>
<span class="variable">“runtime”</span><span class="string">:</span> <span class="string">[“Node.js”, “Express”, “Fastify”]</span><span class="string">,</span>
<span class="variable">“databases”</span><span class="string">:</span> <span class="string">[“PostgreSQL”, “MongoDB”, “Redis”]</span><span class="string">,</span>
<span class="variable">“apis”</span><span class="string">:</span> <span class="string">[“REST”, “GraphQL”, “gRPC”]</span>
<span class="string">},</span>
<span class="variable">“devops”</span><span class="string">:</span> <span class="string">{</span>
<span class="variable">“containers”</span><span class="string">:</span> <span class="string">[“Docker”, “Kubernetes”]</span><span class="string">,</span>
<span class="variable">“cloud”</span><span class="string">:</span> <span class="string">[“AWS”, “Firebase”, “Netlify”]</span><span class="string">,</span>
<span class="variable">“cicd”</span><span class="string">:</span> <span class="string">[“GitHub Actions”, “Jenkins”, “GitLab CI”]</span>
<span class="string">},</span>
<span class="variable">“tools”</span><span class="string">:</span> <span class="string">{</span>
<span class="variable">“editor”</span><span class="string">:</span> <span class="string">“Vim (obviously)”</span><span class="string">,</span>
<span class="variable">“terminal”</span><span class="string">:</span> <span class="string">“iTerm2 + Zsh + Oh My Zsh”</span><span class="string">,</span>
<span class="variable">“version_control”</span><span class="string">:</span> <span class="string">“Git (with proper commit messages)”</span><span class="string">,</span>
<span class="variable">“design”</span><span class="string">:</span> <span class="string">“Figma, Sketch”</span>
<span class="string">},</span>
<span class="variable">“soft_skills”</span><span class="string">:</span> <span class="string">[</span>
<span class="string">“Problem solving”</span><span class="string">,</span>
<span class="string">“Code review”</span><span class="string">,</span>
<span class="string">“Technical mentoring”</span><span class="string">,</span>
<span class="string">“Coffee brewing”</span>
<span class="string">],</span>
<span class="variable">“certifications”</span><span class="string">:</span> <span class="string">“AWS Certified Developer”</span><span class="string">,</span>
<span class="variable">“side_quest”</span><span class="string">:</span> <span class="string">“Currently learning Rust because why not?”</span>
<span class="string">}</span>`;

```
            const outputEl = this.addOutput('');
            outputEl.innerHTML = skillsText;
        }
        
        showResume() {
            const resumeText = `<span class="keyword">📄 Alex J. Reyes - Full Stack Developer</span>
```

<span class="function">════════════════════════════════════════════════</span>
<span class="warning">🎯 EXPERIENCE</span>
<span class="function">════════════════════════════════════════════════</span>

<span class="type">Senior Full Stack Developer</span> | <span class="variable">TechCorp</span>
<span class="comment">2022 - Present</span>
<span class="comment">•</span> Led microservices architecture serving 1M+ daily users
<span class="comment">•</span> Reduced page load times by 60% through React optimization
<span class="comment">•</span> Mentored 5 junior developers (they’re all better than me now
