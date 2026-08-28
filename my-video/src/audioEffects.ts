// Helper to generate short synth audio data URLs for Typing, Mouse Click, Swoosh, Footstep, and Alert sound effects
function createClickWav(frequency: number, durationMs: number, volume: number = 0.3): string {
  const sampleRate = 22050;
  const numSamples = Math.floor(sampleRate * (durationMs / 1000));
  const buffer = new Uint8Array(44 + numSamples);

  // WAV Header
  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) buffer[offset + i] = str.charCodeAt(i);
  };
  const writeUint32 = (offset: number, val: number) => {
    buffer[offset] = val & 0xff;
    buffer[offset + 1] = (val >> 8) & 0xff;
    buffer[offset + 2] = (val >> 16) & 0xff;
    buffer[offset + 3] = (val >> 24) & 0xff;
  };
  const writeUint16 = (offset: number, val: number) => {
    buffer[offset] = val & 0xff;
    buffer[offset + 1] = (val >> 8) & 0xff;
  };

  writeString(0, "RIFF");
  writeUint32(4, 36 + numSamples);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  writeUint32(16, 16);
  writeUint16(20, 1); // PCM
  writeUint16(22, 1); // Mono
  writeUint32(24, sampleRate);
  writeUint32(28, sampleRate);
  writeUint16(32, 1);
  writeUint16(34, 8); // 8-bit
  writeString(36, "data");
  writeUint32(40, numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const decay = Math.exp(-t * (1000 / durationMs) * 3);
    const sample = Math.sin(2 * Math.PI * frequency * t) * volume * decay;
    const byteVal = Math.floor((sample + 1) * 127.5);
    buffer[44 + i] = Math.max(0, Math.min(255, byteVal));
  }

  let binary = "";
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return "data:audio/wav;base64," + btoa(binary);
}

function createSwooshWav(durationMs: number = 250, volume: number = 0.5): string {
  const sampleRate = 22050;
  const numSamples = Math.floor(sampleRate * (durationMs / 1000));
  const buffer = new Uint8Array(44 + numSamples);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) buffer[offset + i] = str.charCodeAt(i);
  };
  const writeUint32 = (offset: number, val: number) => {
    buffer[offset] = val & 0xff;
    buffer[offset + 1] = (val >> 8) & 0xff;
    buffer[offset + 2] = (val >> 16) & 0xff;
    buffer[offset + 3] = (val >> 24) & 0xff;
  };
  const writeUint16 = (offset: number, val: number) => {
    buffer[offset] = val & 0xff;
    buffer[offset + 1] = (val >> 8) & 0xff;
  };

  writeString(0, "RIFF");
  writeUint32(4, 36 + numSamples);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  writeUint32(16, 16);
  writeUint16(20, 1);
  writeUint16(22, 1);
  writeUint32(24, sampleRate);
  writeUint32(28, sampleRate);
  writeUint16(32, 1);
  writeUint16(34, 8);
  writeString(36, "data");
  writeUint32(40, numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const progress = t / (durationMs / 1000);
    const freq = 150 + Math.sin(progress * Math.PI) * 400;
    const env = Math.sin(progress * Math.PI) * volume;
    const noise = (Math.random() * 2 - 1) * 0.2;
    const sample = (Math.sin(2 * Math.PI * freq * t) + noise) * env;
    const byteVal = Math.floor((sample + 1) * 127.5);
    buffer[44 + i] = Math.max(0, Math.min(255, byteVal));
  }

  let binary = "";
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return "data:audio/wav;base64," + btoa(binary);
}

export const TYPING_SOUND = createClickWav(1200, 25, 0.4);
export const MOUSE_CLICK_SOUND = createClickWav(800, 60, 0.7);
export const SWOOSH_SOUND = createSwooshWav(250, 0.5);
export const STEP_SOUND_LEFT = createClickWav(450, 45, 0.6);
export const STEP_SOUND_RIGHT = createClickWav(550, 45, 0.6);
export const ALERT_PING_SOUND = createClickWav(1400, 180, 0.75);
