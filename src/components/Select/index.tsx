import Select, { Props } from 'react-select'

export function CustomSelect({ ...rest }: Props) {
  const customStyles = {
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0 1rem',
    })
  }

  return (
    <Select
      {...rest}
      name='select'
      styles={customStyles}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary: '#267FFF',
          neutral20: '#dbe6fd',
          neutral30: '#dbe6fd',
          neutral50: '#8093AE',
          neutral80: '#31507d',
        },
      })}
    />
  )
}
