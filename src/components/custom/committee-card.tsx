
import React from 'react'
import { DirectionAwareHover } from '../ui/direction-aware-hover';

function CommitteeCard({ committee }: { committee: any }) {
  const imageUrl =
    committee.imageUrl;
  return (
    <div className=" flex items-center justify-center">
      <DirectionAwareHover imageUrl={imageUrl}>
        <div className="font-bold text-xl">{committee.name}</div>
        <div className="font-normal text-sm text-gray-300">
          {committee.details}
        </div>
      </DirectionAwareHover>
    </div>
  );
}
export default CommitteeCard
