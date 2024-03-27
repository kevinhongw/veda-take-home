import React, { FC } from 'react';
import { useHealthCheck } from 'hooks/useHealthCheck';

interface Props {}

const Home: FC<Props> = () => {
  const { data, isLoading } = useHealthCheck();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div>Home</div>
      <div>{data.status}</div>
    </>
  );
};

export default Home;
