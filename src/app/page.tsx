import LocationContainer from '@/components/home/LocationContainer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-row items-center">
      <LocationContainer />
      {/* <div className="flex min-h-screen flex-grow flex-col items-center justify-center">
        <h1 className="text-2xl">Home</h1>
      </div> */}
    </div>
  );
}
