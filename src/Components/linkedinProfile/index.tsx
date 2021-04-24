import React from 'react';
import { useParams } from 'react-router';

export default function LinkedinProfile() {
  const { id } = useParams<{ id: string }>();
  return <span>Window {id}</span>;
}
