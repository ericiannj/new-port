// import LocationContainer from '@/components/home/LocationContainer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-row items-center justify-center">
      {/* <LocationContainer /> */}
      <div className="flex flex-col justify-center">
        <p className="mb-4">Hey there, my name is</p>
        <h1 className="text-4xl">Eric Junqueira.</h1>
        <h1 className="text-3xl">I work with ideas in the Web.</h1>
      </div>
    </div>
  );
}
