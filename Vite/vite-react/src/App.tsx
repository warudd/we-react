import React from 'react'
import './App.css'
import WSCounter from './components/WSCounter/WSCounter';
import WSEffectDemo from './components/WSEffectDemo/WSEffectDemo';

type Props = {}

export default function App({}: Props) {

  return (
    <div>App WS
      <hr></hr>
      <WSCounter />
      <hr></hr>
      <WSEffectDemo />
    </div>
  )
}