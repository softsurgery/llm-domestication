import React from 'react'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { BsEyeFill } from 'react-icons/bs'
import { BsEyeSlash } from 'react-icons/bs'

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordField = ({ className, placeholder, ...props }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  return (
    <div className="grid gap-2 text-left">
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder || 'Enter password'}
          className="pr-10"
          autoComplete="new-password"
          {...props}
        />
        <Button
          type="button"
          onClick={togglePasswordVisibility}
          variant={'link'}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {showPassword ? <BsEyeFill size={18} /> : <BsEyeSlash size={18} />}
        </Button>
      </div>
    </div>
  )
}
