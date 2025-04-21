'use client';
import { useState } from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

const pubKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;
const FileUpload = ({ files, handleChangeEvent }) => {
	return (
		// <div>
		<div className='flex flex-col justify-center rounded-[0.25rem] py-[20px] bg-white border-[3px] border-[#E9E9EB] border-dashed h-[5rem] w-full items-center gap-x-[0.75rem] px-[20px]'>
			{/* <input
        type="hidden"
        role="uploadcare-uploader"
        data-public-key="3f38fe2d4402e02dcef4"
        data-tabs="file camera url facebook gdrive gphotos dropbox"
        data-effects="crop"
        className="upload"
        style={{ backgroundColor: "red !important" }}
      /> */}

			<FileUploaderRegular pubkey={pubKey} onChange={handleChangeEvent} />
		</div>
	);
};

export default FileUpload;
