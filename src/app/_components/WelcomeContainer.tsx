const WelcomeContainer = () => {
  return (
    <div className="animate-fade-in-down flex flex-col justify-center">
      <p className="text-fluid-2xl mb-4">
        Hey there{''}
        <span className="animate-wave mr-1 ml-2 inline-block">👋🏾</span> , my
        name is
      </p>
      <h1 className="text-fluid-8xl">Eric Junqueira.</h1>
      <h1 className="text-fluid-6xl">
        I work with{' '}
        <span className="bg-linear-to-r from-yellow-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          ideas
        </span>{' '}
        in the{' '}
        <span className="bg-linear-to-r from-blue-500 via-purple-500 to-red-500 bg-clip-text text-transparent">
          Web
        </span>
        .
      </h1>
    </div>
  );
};

export default WelcomeContainer;
