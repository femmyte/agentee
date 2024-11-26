import { AiFillDashboard } from 'react-icons/ai';
import { MdSpaceDashboard } from 'react-icons/md';
import { MdCategory } from 'react-icons/md';
import { HiOutlineUserGroup, HiOutlineDocumentText } from 'react-icons/hi';
import { BsBarChartFill } from 'react-icons/bs';
import { BiPieChartAlt } from 'react-icons/bi';
import { PiChartDonut } from 'react-icons/pi';
export const AgentLinks = [
	{
		title: 'Analysis',
		links: [
			{
				address: 'dashboard',
				name: 'Dashboard',
				icon: <AiFillDashboard size={20} />,
			},
			{
				address: 'message',
				name: 'Message',
				icon: <PiChartDonut size={20} />,
			},
			{
				address: 'review',
				name: 'Review',
				icon: <BiPieChartAlt size={20} />,
			},
		],
	},
];
export const LandlordLinks = [
	{
		title: 'Analysis',
		links: [
			{
				address: 'dashboard',
				name: 'Dashboard',
				icon: <AiFillDashboard size={20} />,
			},
			{
				address: 'divisions',
				name: 'Division distribution',
				icon: <MdSpaceDashboard size={20} />,
			},
			{
				address: 'statistics',
				name: 'crime statistics',
				icon: <BsBarChartFill size={20} />,
			},
			{
				address: 'command',
				name: 'Location Distribution',
				icon: <BiPieChartAlt size={20} />,
			},
			{
				address: 'petitions',
				name: 'Petitions',
				icon: <HiOutlineDocumentText size={20} />,
			},
		],
	},
];

export const TenantLink = [
	{
		title: 'Analysis',
		links: [
			{
				address: 'dashboard',
				name: 'Dashboard',
				icon: <AiFillDashboard size={20} />,
			},
			{
				address: 'crime-map',
				name: 'Crime Heat Map',
				icon: <PiChartDonut size={20} />,
			},
			{
				address: 'areacommands',
				name: 'Area Commands',
				icon: <MdSpaceDashboard size={20} />,
			},
			{
				address: 'statistics',
				name: 'Crime Statistics',
				icon: <BsBarChartFill size={20} />,
			},
			{
				address: 'lga-distributions',
				name: 'LGA Distribution',
				icon: <BiPieChartAlt size={20} />,
			},
			{
				address: 'petitions',
				name: 'Petitions',
				icon: <HiOutlineDocumentText size={20} />,
			},
		],
	},
];

export const adminLink = [
	{
		title: '',
		links: [
			{
				address: 'dashboard',
				name: 'Dashboard',
				icon: <AiFillDashboard size={20} />,
			},
			{
				address: 'command-hq',
				name: 'Command HQ',
				icon: <HiOutlineUserGroup size={20} />,
			},
			{
				address: 'officers',
				name: 'Officers',
				icon: <HiOutlineUserGroup size={20} />,
			},
			{
				address: 'report',
				name: 'Report',
				icon: <HiOutlineUserGroup size={20} />,
			},
			{
				address: 'monitoring',
				name: 'Monitoring',
				icon: <HiOutlineUserGroup size={20} />,
			},
			{
				address: 'users',
				name: 'Users',
				icon: <HiOutlineUserGroup size={20} />,
			},
			{
				address: 'petitions',
				name: 'Petitions',
				icon: <HiOutlineDocumentText size={20} />,
			},
		],
	},
];
export const commandLink = [
	{
		title: 'Analysis',
		links: [
			{
				address: 'dashboard',
				name: 'Dashboard',
				icon: <AiFillDashboard size={20} />,
			},
			{
				address: 'divisions',
				name: 'Division distribution',
				icon: <MdSpaceDashboard size={20} />,
			},
			{
				address: 'statistics',
				name: 'crime statistics',
				icon: <BsBarChartFill size={20} />,
			},
			{
				address: 'command',
				name: 'Location Distribution',
				icon: <BiPieChartAlt size={20} />,
			},
			{
				address: 'petitions',
				name: 'Petitions',
				icon: <HiOutlineDocumentText size={20} />,
			},
		],
	},
];
