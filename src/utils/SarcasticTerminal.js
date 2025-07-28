/**
 * SarcasticTerminal - A personality-driven terminal response system
 * 
 * This class manages the terminal's mood, tracks user behavior, and generates
 * appropriately sarcastic responses based on annoyance levels and command patterns.
 */

import { 
  MOOD_LEVELS, 
  COMMAND_TYPES, 
  RESPONSES, 
  GENERAL_ANNOYANCE_RESPONSES,
  MOOD_CHANGE_MESSAGES,
  EASTER_EGGS
} from '../config/terminal-responses.js';

export class SarcasticTerminal {
  constructor() {
    this.annoyanceLevel = 0;
    this.maxAnnoyance = 100;
    this.commandHistory = [];
    this.recentCommands = new Map(); // Track recent command frequency
    this.usedResponses = new Map(); // Track used responses to avoid repetition
    this.sessionStartTime = Date.now();
    this.lastMoodLevel = MOOD_LEVELS.CHEERFUL;
    
    // Decay settings - annoyance reduces over time
    this.decayRate = 0.5; // Points per minute
    this.lastDecayTime = Date.now();
    
    // Command tracking windows
    this.recentCommandWindow = 30000; // 30 seconds
    this.responseMemoryLimit = 10; // Remember last 10 responses per category
  }

  /**
   * Process a command and return an appropriate response
   * @param {string} command - The user's input command
   * @param {string} originalError - Original error message if any
   * @returns {Object} Response object with text, className, and mood info
   */
  processCommand(command, originalError = null) {
    this.updateAnnoyanceDecay();
    this.trackCommand(command);
    
    const commandType = this.categorizeCommand(command);
    const currentMood = this.getCurrentMood();
    
    // Check for mood changes and announce them
    const moodChangeMessage = this.checkMoodChange();
    
    // Get appropriate response
    const response = this.generateResponse(commandType, command, originalError);
    
    // Update annoyance based on command
    this.updateAnnoyance(commandType, command);
    
    return {
      text: response.text,
      className: response.className,
      mood: currentMood,
      annoyanceLevel: this.annoyanceLevel,
      moodChangeMessage,
      debugInfo: process.env.NODE_ENV === 'development' ? {
        commandType,
        mood: currentMood,
        annoyance: this.annoyanceLevel,
        recentCommands: Array.from(this.recentCommands.entries())
      } : null
    };
  }

  /**
   * Categorize the command to determine response type
   */
  categorizeCommand(command) {
    const cmd = command.toLowerCase().trim();
    
    // Check for specific patterns
    if (cmd.includes('sudo')) return COMMAND_TYPES.SUDO;
    if (cmd.includes('rm -rf') || cmd.includes('rm-rf')) return COMMAND_TYPES.RM_RF;
    if (cmd.includes(':(){ :|:& };:')) return COMMAND_TYPES.FORK_BOMB;
    if (cmd.includes('kludge')) return COMMAND_TYPES.KLUDGE;
    if (cmd.startsWith('ping ') || cmd === 'ping') return COMMAND_TYPES.PING;
    if (cmd.startsWith('wget ') || cmd === 'wget') return COMMAND_TYPES.WGET;
    if (cmd.startsWith('curl ') || cmd === 'curl') return COMMAND_TYPES.CURL;
    if (cmd === 'htop') return COMMAND_TYPES.HTOP;
    
    // Check for spam patterns
    if (this.isCommandSpam(cmd)) {
      if (cmd === 'help') return COMMAND_TYPES.HELP_SPAM;
      if (cmd === 'clear') return COMMAND_TYPES.CLEAR_SPAM;
      if (cmd === 'ls') return COMMAND_TYPES.LS_SPAM;
      return COMMAND_TYPES.REPEATED_COMMAND;
    }
    
    // Check for typos (if we have a suggestion)
    if (this.isLikelyTypo(cmd)) {
      return COMMAND_TYPES.TYPO;
    }
    
    return COMMAND_TYPES.INVALID_COMMAND;
  }

  /**
   * Generate response based on command type and current mood
   */
  generateResponse(commandType, command, originalError) {
    const currentMood = this.getCurrentMood();
    
    // Check for easter eggs first
    const easterEggResponse = this.checkEasterEggs(command);
    if (easterEggResponse) {
      return { text: easterEggResponse, className: 'info' };
    }
    
    // Get responses for this command type and mood
    const responses = RESPONSES[commandType]?.[currentMood] || 
                     RESPONSES[COMMAND_TYPES.INVALID_COMMAND][currentMood];
    
    if (!responses || responses.length === 0) {
      return { text: originalError || 'Command not found', className: 'error' };
    }
    
    // Get a response we haven't used recently
    const response = this.selectUnusedResponse(responses, `${commandType}_${currentMood}`);
    
    // Handle special formatting
    let formattedResponse = response;
    if (commandType === COMMAND_TYPES.TYPO) {
      const suggestion = this.getSuggestion(command);
      formattedResponse = response.replace('{input}', command).replace('{suggestion}', suggestion);
    }
    
    return {
      text: formattedResponse,
      className: this.getResponseClassName(currentMood)
    };
  }

  /**
   * Select a response that hasn't been used recently
   */
  selectUnusedResponse(responses, category) {
    const usedResponses = this.usedResponses.get(category) || [];
    const availableResponses = responses.filter(r => !usedResponses.includes(r));
    
    // If all responses have been used, reset and use any
    if (availableResponses.length === 0) {
      this.usedResponses.set(category, []);
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Select random unused response
    const selectedResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)];
    
    // Track this response as used
    const updatedUsed = [...usedResponses, selectedResponse];
    if (updatedUsed.length > this.responseMemoryLimit) {
      updatedUsed.shift(); // Remove oldest
    }
    this.usedResponses.set(category, updatedUsed);
    
    return selectedResponse;
  }

  /**
   * Update annoyance level based on command
   */
  updateAnnoyance(commandType, command) {
    let annoyanceIncrease = 0;
    
    switch (commandType) {
      case COMMAND_TYPES.SUDO:
        annoyanceIncrease = 8;
        break;
      case COMMAND_TYPES.RM_RF:
        annoyanceIncrease = 12;
        break;
      case COMMAND_TYPES.FORK_BOMB:
        annoyanceIncrease = 15;
        break;
      case COMMAND_TYPES.PING:
        annoyanceIncrease = 6;
        break;
      case COMMAND_TYPES.WGET:
        annoyanceIncrease = 7;
        break;
      case COMMAND_TYPES.CURL:
        annoyanceIncrease = 7;
        break;
      case COMMAND_TYPES.HTOP:
        annoyanceIncrease = 5;
        break;
      case COMMAND_TYPES.REPEATED_COMMAND:
        annoyanceIncrease = 5;
        break;
      case COMMAND_TYPES.HELP_SPAM:
      case COMMAND_TYPES.CLEAR_SPAM:
      case COMMAND_TYPES.LS_SPAM:
        annoyanceIncrease = 7;
        break;
      case COMMAND_TYPES.INVALID_COMMAND:
        annoyanceIncrease = 3;
        break;
      case COMMAND_TYPES.TYPO:
        annoyanceIncrease = 2;
        break;
      case COMMAND_TYPES.KLUDGE:
        annoyanceIncrease = 4;
        break;
      default:
        annoyanceIncrease = 1;
    }
    
    // Multiply by recent command frequency
    const commandFreq = this.recentCommands.get(command.toLowerCase()) || 0;
    if (commandFreq > 3) {
      annoyanceIncrease *= 1.5;
    }
    
    this.annoyanceLevel = Math.min(this.maxAnnoyance, this.annoyanceLevel + annoyanceIncrease);
  }

  /**
   * Check if command is spam (repeated too frequently)
   */
  isCommandSpam(command) {
    const frequency = this.recentCommands.get(command) || 0;
    return frequency >= 3; // 3+ times in recent window = spam
  }

  /**
   * Track command in recent history
   */
  trackCommand(command) {
    const normalizedCommand = command.toLowerCase().trim();
    this.commandHistory.push({
      command: normalizedCommand,
      timestamp: Date.now()
    });
    
    // Update recent commands count
    const current = this.recentCommands.get(normalizedCommand) || 0;
    this.recentCommands.set(normalizedCommand, current + 1);
    
    // Clean up old commands
    this.cleanupRecentCommands();
  }

  /**
   * Clean up commands outside the recent window
   */
  cleanupRecentCommands() {
    const cutoff = Date.now() - this.recentCommandWindow;
    
    // Remove old commands from history
    this.commandHistory = this.commandHistory.filter(entry => entry.timestamp > cutoff);
    
    // Recalculate recent command counts
    this.recentCommands.clear();
    this.commandHistory.forEach(entry => {
      const current = this.recentCommands.get(entry.command) || 0;
      this.recentCommands.set(entry.command, current + 1);
    });
  }

  /**
   * Update annoyance decay over time
   */
  updateAnnoyanceDecay() {
    const now = Date.now();
    const timeSinceLastDecay = now - this.lastDecayTime;
    const minutesPassed = timeSinceLastDecay / (1000 * 60);
    
    if (minutesPassed > 1) {
      const decayAmount = minutesPassed * this.decayRate;
      this.annoyanceLevel = Math.max(0, this.annoyanceLevel - decayAmount);
      this.lastDecayTime = now;
    }
  }

  /**
   * Get current mood based on annoyance level
   */
  getCurrentMood() {
    if (this.annoyanceLevel <= 25) return MOOD_LEVELS.CHEERFUL;
    if (this.annoyanceLevel <= 50) return MOOD_LEVELS.SARCASTIC;
    if (this.annoyanceLevel <= 75) return MOOD_LEVELS.IRRITATED;
    return MOOD_LEVELS.HOSTILE;
  }

  /**
   * Check if mood has changed and return appropriate message
   */
  checkMoodChange() {
    const currentMood = this.getCurrentMood();
    
    if (currentMood !== this.lastMoodLevel && this.lastMoodLevel === MOOD_LEVELS.CHEERFUL) {
      this.lastMoodLevel = currentMood;
      const messages = MOOD_CHANGE_MESSAGES[currentMood];
      if (messages) {
        return messages[Math.floor(Math.random() * messages.length)];
      }
    }
    
    this.lastMoodLevel = currentMood;
    return null;
  }

  /**
   * Get CSS class for response based on mood
   */
  getResponseClassName(mood) {
    switch (mood) {
      case MOOD_LEVELS.CHEERFUL: return 'info';
      case MOOD_LEVELS.SARCASTIC: return 'warning';
      case MOOD_LEVELS.IRRITATED: return 'error';
      case MOOD_LEVELS.HOSTILE: return 'error';
      default: return 'comment';
    }
  }

  /**
   * Check for easter eggs
   */
  checkEasterEggs(command) {
    const cmd = command.toLowerCase().trim();
    
    for (const [pattern, response] of Object.entries(EASTER_EGGS)) {
      if (cmd.includes(pattern) || cmd === pattern) {
        return response;
      }
    }
    
    return null;
  }

  /**
   * Check if command is likely a typo
   */
  isLikelyTypo(command) {
    const validCommands = ['help', 'about', 'ls', 'cat', 'projects', 'contact', 'skills', 'resume', 'clear', 'joke'];
    
    for (const valid of validCommands) {
      if (this.levenshteinDistance(command, valid) <= 2 && command !== valid) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Get command suggestion for typos
   */
  getSuggestion(command) {
    const validCommands = ['help', 'about', 'ls', 'cat', 'projects', 'contact', 'skills', 'resume', 'clear', 'joke'];
    let bestMatch = 'help';
    let bestDistance = Infinity;
    
    for (const valid of validCommands) {
      const distance = this.levenshteinDistance(command.toLowerCase(), valid);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestMatch = valid;
      }
    }
    
    return bestMatch;
  }

  /**
   * Calculate Levenshtein distance for typo detection
   */
  levenshteinDistance(a, b) {
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

  /**
   * Get general annoyance response when no specific response exists
   */
  getGeneralAnnoyanceResponse() {
    const currentMood = this.getCurrentMood();
    const responses = GENERAL_ANNOYANCE_RESPONSES[currentMood];
    
    if (!responses) return null;
    
    return this.selectUnusedResponse(responses, `general_${currentMood}`);
  }

  /**
   * Reset terminal state (useful for clear command)
   */
  reset() {
    this.annoyanceLevel = Math.max(0, this.annoyanceLevel - 10); // Slight mood improvement
    this.recentCommands.clear();
    this.commandHistory = [];
  }

  /**
   * Get current status for debugging
   */
  getStatus() {
    return {
      mood: this.getCurrentMood(),
      annoyanceLevel: this.annoyanceLevel,
      commandCount: this.commandHistory.length,
      recentCommands: Array.from(this.recentCommands.entries()),
      sessionDuration: Date.now() - this.sessionStartTime
    };
  }
}