export interface CardType {
  title: string
  description: string
  instruction: string
  actionLabel: string
}
export const cardData: CardType[] = [{
  title: 'Display name',
  description: 'Please enter your full name, or a display name you are comfortable with.',
  instruction: 'Please use 32 characters at maximum.',
  actionLabel: 'Save',
}
]