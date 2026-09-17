export interface MedicationAppearance {
  manufacturer: string;
  shape: string;
  color: string;
  imprint: string;
  description: string;
}

export type InteractionSeverity = "monitor" | "caution" | "avoid";

export interface MedicationInteraction {
  with: string;
  severity: InteractionSeverity;
  note: string;
}

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  aliases: string[];
  category: string;
  dosage: string;
  scheduleTimes: string[];
  activeRegimen: boolean;
  appearances: MedicationAppearance[];
  sideEffects: string[];
  interactions: MedicationInteraction[];
}

export type Feeling = "fine" | "mild_side_effect" | "not_working" | "something_off";

export interface LogEntry {
  id: string;
  medicationId: string;
  takenAt: string;
  feeling: Feeling;
  note?: string;
}

export const FEELING_LABELS: Record<Feeling, string> = {
  fine: "Feeling fine",
  mild_side_effect: "Mild side effect",
  not_working: "Not working",
  something_off: "Something's off",
};
