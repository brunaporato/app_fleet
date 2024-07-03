import React, { forwardRef } from 'react';
import { Container, Input, Label } from './styles';
import { useTheme } from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';

type Props = TextInputProps & {
  label: string
}

const LicensePlateInput = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
  const { COLORS } = useTheme();
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        maxLength={7}
        autoCapitalize='characters'
        placeholderTextColor={COLORS.GRAY_400}
        ref={ref}
        {...rest}
      />
    </Container>
  );
})

export { LicensePlateInput }