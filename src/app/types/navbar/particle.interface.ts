export type EqType = "fourier" | "laplace" | "gauss" | "math";
export interface Slot {
  eq: { t: EqType; label: string };
  index: number; // slot position index (monotonically increasing)
}

export interface Lane {
  y: number;
  fontSize: number;
  speed: number;
  slotWidth: number; // maxLabelWidth + PADDING — guaranteed no overlap
  offset: number; // total px scrolled (increases every frame)
  slots: Slot[];
  nextIndex: number;
  alpha: number;
}
