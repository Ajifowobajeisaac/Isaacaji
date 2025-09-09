import React from 'react';
export function Button ({ asChild = false, variant = 'default', size = 'md', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium leading-none whitespace-nowrap transition-colors select-none rounded-full';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-900 bg-white hover:border-blue-600 hover:text-blue-600'
  };
  const sizes = { sm: 'h-9 px-4 text-sm', md: 'h-10 px-5', lg: 'h-11 px-6 text-base' };

  const mergedClassName = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${mergedClassName} ${children.props.className || ''}`.trim(),
      ...props
    });
  }

  return (
    <button className={mergedClassName} {...props}>
      {children}
    </button>
  );
}
