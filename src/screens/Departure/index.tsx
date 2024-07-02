import React from 'react';
import { Container, Content } from './styles';
import { DepartureHeader } from '../../components/DepartureHeader';
import { LicensePlateInput } from '../../components/LicensePlateInput';

export function Departure() {
  return (
    <Container>
      <DepartureHeader title='Departure' />
      <Content>
        <LicensePlateInput
          label='License Plate'
          placeholder='BRA-1234'
        />
      </Content>
    </Container>
  );
}