import * as React from "react";
export interface StepperStep {
  label: string;
  /** État de l'étape. Facultatif si `current` est fourni. */
  status?: "done" | "current" | "pending";
  /** Ligne secondaire (date, précision). `sub` est accepté comme alias. */
  meta?: string;
  sub?: string;
  /** Icône personnalisée (par défaut : une coche si faite, sinon le numéro) */
  icon?: React.ReactNode;
}
export interface StepperProps {
  /** Étapes, en objets ou en simples libellés */
  steps: (string | StepperStep)[];
  /**
   * Index de l'étape active, à partir de zéro. Alternative à `status` par étape :
   * les précédentes deviennent faites, les suivantes en attente.
   */
  current?: number;
  /** Rend cliquables les étapes déjà franchies. Requiert `current`. */
  onStepClick?: (index: number) => void;
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
}
/**
 * Frise d'avancement — seul composant de frise du système. Couvre l'avancement d'un
 * objet dans un flux métier (pipeline DailyUp : Création → Validation → Production →
 * Facturation) comme la progression d'un formulaire multi-écrans.
 * Étape faite en vert, étape courante en bleu, étape en attente en gris.
 * @startingPoint section="Data display" subtitle="Frise d'avancement et de progression" viewport="700x200"
 */
export declare function Stepper(props: StepperProps): JSX.Element;
