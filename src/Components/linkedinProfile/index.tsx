import React from 'react';
import { useParams } from 'react-router';
import BrowserWindowView from './BrowserWindow';

export default function LinkedinProfile() {
  const { id } = useParams<{ id: string }>();
  return <BrowserWindowView id={id} />;
}
