import React from 'react';
import { Container, Content } from './styles';
import { DepartureHeader } from '../../components/DepartureHeader';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Button } from '../../components/Button';

export function Departure() {
  return (
    <Container>
      <DepartureHeader title='Departure' />
      <Content>
        <LicensePlateInput
          label='License Plate'
          placeholder='BRA-1234'
        />
        <TextAreaInput label='Purpose' placeholder="I'll use this vehicle for..." />

        <Button title='Register Departure' />
      </Content>
    </Container>
  );
}