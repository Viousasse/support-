import * as React from "react";
export interface FileUploadProps {
  onFiles?: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  /** Helper line under the prompt (formats / size limit) */
  hint?: string;
  disabled?: boolean;
}
/**
 * Drag-and-drop file dropzone with a drag-over state and click-to-browse.
 * @startingPoint section="Forms" subtitle="File upload dropzone" viewport="700x220"
 */
export declare function FileUpload(props: FileUploadProps): JSX.Element;
