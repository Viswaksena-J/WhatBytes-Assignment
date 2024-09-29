"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

type UpdateScoresDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newStats: { rank: string; percentile: string; score: string }) => void;
  initialValues: { rank: string; percentile: string; score: string };
};

const UpdateScoresDialog = ({ isOpen, onClose, onSave, initialValues }: UpdateScoresDialogProps) => {
  const [rank, setRank] = useState(initialValues.rank);
  const [percentile, setPercentile] = useState(initialValues.percentile);
  const [score, setScore] = useState(initialValues.score);
  const [errors, setErrors] = useState({ rank: '', percentile: '', score: '' });

  // useEffect(() => {
  //   if(parseFloat(score) > 15){
  //     setScore('15');
  //   }

  //   if(parseFloat(percentile) > 15){
  //     setPercentile('100');
  //   }
  // },[score]);


  const handleSave = () => {
    const newErrors = {
      rank: rank ? '' : 'Rank field is required.',
      percentile: percentile ? '' : 'Percentile field is required.',
      score: score ? '' : 'Score field is required.',
    };

    if (percentile && (parseFloat(percentile) < 0 || parseFloat(percentile) > 100)) {
      newErrors.percentile = 'Percentile must be between 0 and 100.';
    }

    if (score && (parseFloat(score) < 0 || parseFloat(score) > 15)) {
      newErrors.score = 'Score must be between 0 and 15.';
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      onSave({ rank, percentile, score });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Update Scores</DialogTitle>
        </DialogHeader>
        {/* <Image 
          src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-sticker%2Fhi_6028690&psig=AOvVaw2Prw1XjDAYG2ql3EGI_DLN&ust=1725794624801000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIDf3I7csIgDFQAAAAAdAAAAABAE"}
          height={50}
          width={50}
          alt='img'
        /> */}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="rank" className="text-right">
              Update your Rank
            </label>
            <div className="col-span-3">
              <Input
                id="rank"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full"
              />
              {errors.rank && <p className="text-red-500 text-sm">{errors.rank}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="percentile" className="text-right">
              Update your Percentile
            </label>
            <div className="col-span-3">
              <Input
                id="percentile"
                value={percentile}
                onChange={(e) => setPercentile(e.target.value)}
                // onChange={(e) => {
                //   const newValue = e.target.value;
                //   const numeric = parseFloat(newValue)

                //   if(!isNaN(numeric)){
                //     setPercentile(Math.min(numeric,100).toString());
                //   }else{
                //     setPercentile(newValue);
                //   }
                // }}
                className="w-full"
              />
              {errors.percentile && <p className="text-red-500 text-sm">{errors.percentile}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="score" className="text-right">
              Update your Score
            </label>
            <div className="col-span-3">
              <Input
                id="score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                // onChange={(e) => {
                //   const newValue = e.target.value;
                //   const numeric = parseFloat(newValue)

                //   if(!isNaN(numeric)){
                //     setScore(Math.min(numeric,15).toString());
                //   }else{
                //     setScore(newValue);
                //   }
                // }}
                className="w-full"
              />
              {errors.score && <p className="text-red-500 text-sm">{errors.score}</p>}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateScoresDialog;