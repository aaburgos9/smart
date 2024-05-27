export interface ResultsResAccount {
    label: string,
    additionalLabel?: string,
    value: string|number,
    additionalValue?:additionalValue,
    helper?: string,
    badge?: string
  }


interface additionalValue {
    label?: string,
    robotoText?: string,
    condensedText?: string
}