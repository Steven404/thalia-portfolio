export interface Level {
  code: string;
  name: string;
  description: string;
  fill: number;
}

export interface ContactItem {
  href: string;
  value: string;
  label: string;
  subtitle: string;
  external?: boolean;
}

/** Static data (non-translatable). Names/descriptions come from messages. */
export const LEVEL_FILLS: Record<string, number> = {
  A1: 10,
  A2: 22,
  B1: 42,
  B2: 60,
  C1: 80,
  C2: 100,
};

export const LEVEL_CODES = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
