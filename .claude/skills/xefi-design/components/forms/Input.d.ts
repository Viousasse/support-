import * as React from "react";
/**
 * Champ de saisie avec libellé au-dessus, icône optionnelle à droite et message d'erreur rouge.
 */
export interface InputProps {
  label?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  size?: 30 | 36 | 40 | 48;
  /** Message d'erreur ; sa présence passe la bordure en rouge */
  error?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: string;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}
export declare function Input(props: InputProps): JSX.Element;
