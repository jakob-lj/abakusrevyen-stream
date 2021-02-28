import React from "react";

type Props = {
  id: string;
};

const ExperimentalPlayer = ({ id }: Props) => {
  console.log(id);
  return (
    <div>
      <iframe allowFullScreen={true} src={id}></iframe>
    </div>
  );
};

export default ExperimentalPlayer;
