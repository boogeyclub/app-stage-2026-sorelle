import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent {
  protected readonly journeySteps = [
    {
      number: '01',
      title: 'Publish your cocoa lot',
      description: 'Describe your available volume, quality, location, and preferred delivery window in one clear market brief.'
    },
    {
      number: '02',
      title: 'Meet serious demand',
      description: 'Reach buyers looking for commercial quantities, not one-off samples or unclear conversations.'
    },
    {
      number: '03',
      title: 'Move forward with clarity',
      description: 'Compare interest, discuss terms, and turn a qualified connection into a confident next step.'
    }
  ];

  protected readonly marketAdvantages = [
    {
      title: 'Made for volume',
      description: 'Present harvests as lots so every conversation starts with the scale that matters.',
      icon: 'layers'
    },
    {
      title: 'Clear market signals',
      description: 'Share the facts buyers need early: origin, readiness, quantity, and availability.',
      icon: 'signal'
    },
    {
      title: 'More purposeful matches',
      description: 'Give farmers and buyers a focused place to start commercially meaningful conversations.',
      icon: 'handshake'
    }
  ];
}
