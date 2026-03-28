---
title: A.L.A.N.
description: Distributed AI voice assistant system with wake word detection, voice synthesis, and multi-provider LLM support
date: '2025-08-25'
linkCode: 'https://github.com/alexako/Jarvis'
category: Machine Learning
tags: python,machine-learning,iot,pytorch
---

A distributed voice assistant built across multiple Raspberry Pi nodes. The Sentinel handles wake word detection ("Alan"/"Nexus") via Picovoice and notifies the orchestrator by room. Argus provides eyes and ears — audio capture and camera input on edge devices. The Jarvis brain processes queries using OpenAI Whisper for STT, Piper neural TTS for output, and supports swappable LLM backends: Anthropic Claude, DeepSeek, or local Llama 3.2 via Ollama.
