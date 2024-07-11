import React from 'react'
import className from 'classnames';
import { twMerge } from 'tailwind-merge'
import { GoSync } from 'react-icons/go'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  outline?: boolean;
  rounded?: boolean;
  loading?: boolean;
}

function Button({
  children,
  // Default values are provided to the props to ensure they are always boolean (false by default
  primary = false,
  secondary = false,
  success = false,
  warning = false,
  danger = false,
  outline = false,
  rounded = false,
  loading = false,
  ...rest
}: ButtonProps) {
  const classes = twMerge(className(
    rest.className,
    'flex items-center px-3 py-1.5 border h-8',
    {
      'opacity-80': loading,
      'border-blue-500 bg-blue-500 text-white': primary,
      'border-gray-900 bg-gray-900 text-white': secondary,
      'border-green-500 bg-green-500 text-white': success,
      'border-yellow-400 bg-yellow-400 text-white': warning,
      'border-red-500 bg-red-500 text-white': danger,
      'rounded-full': rounded,
      'bg-white': outline,
      'text-blue-500': outline && primary,
      'text-gray-900': outline && secondary,
      'text-green-500': outline && success,
      'text-yellow-400': outline && warning,
      'text-red-500': outline && danger,
    }
  ));

  const checkVariationValue = (primary: boolean, secondary: boolean, success: boolean, warning: boolean, danger: boolean) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success) +
      Number(!!danger);
    return count
  }

  if (checkVariationValue(primary,
    secondary,
    success,
    warning,
    danger) > 1) {
    throw new Error(
      'Only one of primary, secondary, success, warning, danger can be true'
    )
  }


  return (
    <button {...rest} disabled={loading} className={classes}>
      {loading ? <GoSync className='animate-spin' /> : children}
    </button>
  );
}

export default Button;
