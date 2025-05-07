import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';

export default function HomeConnectionLoader() {
	const [bubbles, setBubbles] = useState([]);

	useEffect(() => {
		const interval = setInterval(() => {
			setBubbles((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					x: Math.random() * 200 - 100,
					y: Math.random() * 200 - 100,
					size: Math.random() * 20 + 20,
				},
			]);
		}, 400);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (bubbles.length > 15) {
			setBubbles((prev) => prev.slice(-15));
		}
	}, [bubbles]);

	return (
		<div className='flex items-center justify-center h-screen w-screen relative'>
			{/* Central house icon */}
			<div className='relative z-10'>
				<Home size={80} className='text-blue-600 animate-pulse' />
			</div>

			{/* Floating bubbles */}
			<AnimatePresence>
				{bubbles.map((bubble) => (
					<motion.div
						key={bubble.id}
						initial={{
							opacity: 0,
							scale: 0,
							x: bubble.x,
							y: bubble.y,
						}}
						animate={{
							opacity: 1,
							scale: 1,
							x: 0,
							y: 0,
							transition: { duration: 1.2, ease: 'easeOut' },
						}}
						exit={{ opacity: 0 }}
						className='absolute z-0 bg-blue-300/60 rounded-full'
						style={{
							width: bubble.size,
							height: bubble.size,
							left: `calc(50% - ${bubble.size / 2}px)`,
							top: `calc(50% - ${bubble.size / 2}px)`,
						}}
					/>
				))}
			</AnimatePresence>
		</div>
	);
}
