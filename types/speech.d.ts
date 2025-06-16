// types/speech.d.ts
export {};

declare global {
  interface SpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onspeechend: () => void;
    start(): void;
    stop(): void;
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
  }

  interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
    length: number;
  }

  interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
  }

  interface Window {
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}
