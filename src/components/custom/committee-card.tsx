
import React from 'react'
import { DirectionAwareHover } from '../ui/direction-aware-hover';

function CommitteeCard({ committee }: { committee: any }) {
  const imageUrl =
    committee.imageUrl ||
    "https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className=" relative  flex items-center justify-center">
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
