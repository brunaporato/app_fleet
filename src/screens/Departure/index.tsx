import React from 'react';
import { Container } from './styles';
import { DepartureHeader } from '../../components/DepartureHeader';

export function Departure() {
  return (
    <Container>
      <DepartureHeader title='Departure' />
    </Container>
  );
}