'use client';
import React, { useState } from 'react';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
const Counter = ({ number, text }) => {
	const [counterOn, setCounterOn] = useState(false);
	const [nominees, setNominees] = useState(0);
	const [candidates, setCandidates] = useState(0);

	return (
		<ScrollTrigger
			onEnter={() => setCounterOn(true)}
			onExit={() => setCounterOn(false)}
		>
			{/* <div className='text-center mb-[35px] w-[178px] flex flex-col items-center '> */}
			<p className='font-[500] text-[20px]'>
				{counterOn && (
					<CountUp start={0} end={number} duration={2} delay={0} />
				)}
				+
			</p>
			{/* <p className='mt-[0px] md:mt-[0px] font-[400] text-[16px] md:text-[24px]'>
					{text}
				</p> */}
			{/* </div> */}
		</ScrollTrigger>
	);
};

export default Counter;
