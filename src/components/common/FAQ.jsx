'use client';
import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
const content = [
	{
		id: 1,
		question: 'What is Agentee ?',
		answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
	},
	{
		id: 2,
		question: 'How does Agentee work ?',
		answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
	},
	{
		id: 3,
		question: 'Do I have to pay any fees to use Agentee as a ?',
		answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
	},
	{
		id: 4,
		question: 'How can I contact an Agent?',
		answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
	},
];
const Item = ({ title, handleOpen, opened, content }) => {
	return (
		<div
			className='p-5 bg-[#F5F8FF] rounded-[1.125rem] mt-[10px]'
			onClick={handleOpen}
		>
			<div className='flex justify-between items-center w-full '>
				<p className='font-[500] text-[20px] leading-[30px] text-[#202020] w-4/5'>
					{title}
				</p>
				<div className='w-[2rem] h-[2rem] bg-primary rounded-full flex justify-center items-center '>
					{opened ? (
						<MdOutlineCancel size={32} color='#fff' />
					) : (
						<IoMdAdd size={32} color='#fff' />
					)}
				</div>
			</div>
			{opened && (
				<div className='mt-[1.5rem]'>
					<p>{content}</p>
				</div>
			)}
		</div>
	);
};
const FAQ = () => {
	const [openItems, setOpenItems] = useState(
		Array(content.length).fill(false)
	);

	const handleOpen = (index) => {
		const newOpenItems = [...openItems];
		newOpenItems[index] = !newOpenItems[index];
		setOpenItems(newOpenItems);
	};

	return (
		<div
			id='faq'
			className='flex flex-col items-center justify-center py-[30px]'
		>
			<div className='px-3 w-full md:px-[14rem]'>
				<h3 className='font-[700] leading-[42px] text-[30px] text-primary text-center'>
					Frequently Asked Questions
				</h3>
				<p className='text-center text-[16px] font-[500] leading-[140%] text-[#89898A]'>
					Here are some common questions you might have as either a
					property owner or a tenant, and the good news is, we have
					already provided the answers for you.
				</p>
				<div className='mt-[1.54rem]'>
					{content.map((item, index) => {
						return (
							<div className='' key={item.id}>
								<Item
									title={item.question}
									handleOpen={() => handleOpen(index)}
									opened={openItems[index]}
									content={item.answer}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default FAQ;
