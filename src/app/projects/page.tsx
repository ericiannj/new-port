import AnimatedProjectCard from './components/ProjectCard';

import StocksManagerImage from '../../assets/images/stocks-manager.png';
import IndyImage from '../../assets/images/indy.png';
import Web3VoteImage from '../../assets/images/web3vote.png';

export default function Projects() {
  return (
    <div className="flex min-h-screen flex-grow flex-col items-center justify-center">
      <div className="flex min-h-[500px] w-[80%] flex-col items-center">
        <h1 className="text-fluid-2xl">
          Some of my{' '}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
            Projects
          </span>
          :
        </h1>
        <div>
          {projects.map((project) => (
            <AnimatedProjectCard
              key={project.title}
              title={project.title}
              image={project.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    title: 'Stocks Manager',
    image: StocksManagerImage,
  },
  { title: 'Indy', image: IndyImage },
  { title: 'Web3Vote', image: Web3VoteImage },
];
