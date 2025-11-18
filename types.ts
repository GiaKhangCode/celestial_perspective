export enum Topic {
  LOVE = 'Tình yêu',
  CAREER = 'Sự nghiệp',
  WEALTH = 'Tài lộc',
  HEALTH = 'Sức khỏe',
  FAMILY = 'Gia đình',
  GENERAL = 'Vận may chung'
}

export interface FortuneRequest {
  birthdate: string;
  topic: Topic;
}

export interface FortuneResponse {
  personality: string;
  prediction: string;
  advice: string;
}

export interface TarotResponse {
  cardName: string;
  cardId: string; // PKT format code (e.g., ar00, sw01)
  orientation: string;
  meaning: string;
  todayInterpretation: string;
  advice: string;
}

export interface UIState {
  isLoading: boolean;
  error: string | null;
  result: FortuneResponse | null;
  tarotResult: TarotResponse | null;
}

export type AppMode = 'FORTUNE' | 'TAROT';