export interface FormElement {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
  isMultiSelect?: boolean;
  dropDownData?: { [key: string]: string }[];
}
