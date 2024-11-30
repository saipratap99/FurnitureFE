export interface FormElement {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;

  dropDownData?: { [key: string]: string }[];
}
