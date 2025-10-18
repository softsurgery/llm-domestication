import { PayloadClientComponentProps, PayloadComponent } from 'payload'

export const PayloadHiddenComponent = (() => <></>) as unknown as PayloadComponent<
  PayloadClientComponentProps<{
    className?: string
  }>
>
