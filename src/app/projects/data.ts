import type { StaticImageData } from 'next/image';
import StocksManagerImage from '../../assets/images/stocks-manager.png';
import Web3VoteImage from '../../assets/images/web3vote.png';
import IndyImage from '../../assets/images/indy.png';

export type Project = {
  title: string;
  description: string;
  stack: string[];
  image: StaticImageData;
  repo: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: 'Stocks Manager',
    description: 'A front-end app that consumes a public financial API.',
    stack: ['React', 'TypeScript'],
    image: StocksManagerImage,
    repo: 'https://github.com/ericiannj/stocks-manager',
  },
  {
    title: 'Indy',
    description: 'An idea vault built years ago as a full-stack experiment.',
    stack: ['JavaScript', 'React', 'Node.js'],
    image: IndyImage,
    repo: 'https://github.com/ericiannj/Indy',
  },
  {
    title: 'Web3Vote',
    description:
      'On-chain voting prototype demonstrating smart-contract interaction and wallet integration.',
    stack: ['Solidity', 'TypeScript', 'Ethers.js'],
    image: Web3VoteImage,
    repo: 'https://github.com/ericiannj/web3vote',
  },
];
