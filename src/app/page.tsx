"use client"

import React, { useState } from 'react';
import { QuestionAnalysis } from '@/app/components/PieComponent';
import UpdateScoresDialog from '@/app/components/UpdateScoresDialog';
import { Trophy, Percent, CheckCircle2, BarChart, Brain, Briefcase, Menu, X } from 'lucide-react';
import PercentileChart from '@/app/components/LineChart';
import logo from '@/assets/images/image.png';
import applogo from '@/assets/images/logo.png';
import me from '@/assets/images/DSC_0037.jpg';
import Image from 'next/image'
import { Drawer, DrawerContent } from '@/components/ui/drawer';


const SidebarItem = ({ icon, text, isActive = false }: { icon: JSX.Element; text: string; isActive?: boolean }) => (
  <div 
    className={`
      flex items-center p-3 mb-2 rounded-lg transition-all duration-200 ease-in-out
      ${isActive 
        ? 'bg-blue-100 text-blue-600 shadow-md' 
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }
    `}
  >
    {icon}
    <span className={`ml-3 font-semibold ${isActive ? 'font-bold' : ''}`}>{text}</span>
  </div>
);

const Sidebar = ({ className = '', onClose }: { className?: string; onClose?: () => void }) => (
  <div className={`bg-white shadow-md h-screen ${className}`}>
    <div className="flex justify-between items-center p-4 md:hidden">
      <h1 className="text-xl font-bold">Menu</h1>
      {onClose && (
        <button onClick={onClose} className="focus:outline-none">
          <X size={24} />
        </button>
      )}
    </div>
    <nav className="px-4">
      <SidebarItem 
        icon={<BarChart size={20} className="transition-colors duration-200" />} 
        text="Dashboard" 
      />
      <SidebarItem 
        icon={<Brain size={20} className="transition-colors duration-200" />} 
        text="Skill Test" 
        isActive={true} 
      />
      <SidebarItem 
        icon={<Briefcase size={20} className="transition-colors duration-200" />} 
        text="Internship" 
      />
    </nav>
  </div>
);

const Navbar = ({ onMenuClick }: { onMenuClick: () => void }) => (
  <div className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-gray-200">
    <div className="flex items-center lg:hidden">
      <button onClick={onMenuClick} className="mr-4 focus:outline-none">
        <Menu size={24} />
      </button>
    </div>
    <div className="flex items-center">
      <Image
        src={applogo}
        width={32}
        height={32}
        alt="WhatBytes logo"
        className="mr-2"
      />
      <span className="text-xl font-bold">WhatBytes</span>
    </div>
    <div className="flex items-center">
      <Image
        src={me}
        width={32}
        height={32}
        alt="User avatar"
        className="rounded-full mr-2"
      />
      <span className="font-semibold">J Viswaksena</span>
    </div>
  </div>
);

export default function Home() {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    rank: '1',
    percentile: '30',
    score: '10',
  });

  const pieChartData = [
    { name: 'HTML Tools, Forms, History', value: 80, color: '#4F46E5' },
    { name: 'Tags & References', value: 60, color: '#F59E0B' },
    { name: 'Tables & References in HTML', value: 24, color: '#EF4444' },
    { name: 'Tables & CSS Basics', value: 96, color: '#10B981' },
  ];

  const handleUpdateClick = () => {
    setIsUpdateDialogOpen(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const handleUpdateSave = (newStats: { rank: string; percentile: string; score: string }) => {
    setStats(newStats);
  };
return (
  <div className='flex flex-col min-h-screen bg-gray-100'>
      <Navbar onMenuClick={toggleSidebar} />
      <div className='flex flex-1'>

        <div className="hidden lg:block w-64">
          <Sidebar />
        </div>

        <Drawer open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <DrawerContent>
            <Sidebar className="w-full" onClose={() => setIsSidebarOpen(false)} />
          </DrawerContent>
        </Drawer>
      
        <div className="flex-1 p-4 md:p-6">
          <h2 className="text-2xl font-bold mb-5">Skill Test</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center mb-4">
                <div className="flex items-center mb-4 sm:mb-0">
                  <Image
                    src={logo}
                    width={48}
                    height={48}
                    alt="Test logo"
                    className='mr-4'
                  />
                  <div>
                    <h3 className="text-xl font-bold">Hyper Text Markup Language</h3>
                    <p className="text-gray-600 text-sm">Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021</p>
                  </div>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full sm:w-auto" onClick={handleUpdateClick}>Update</button>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-md shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Quick Statistics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <StatItem icon={<Trophy size={32} className="text-yellow-500" />} value={stats.rank} label="YOUR RANK" />
                  <StatItem icon={<Percent size={32} className="text-blue-500" />} value={`${stats.percentile}%`} label="PERCENTILE" />
                  <StatItem icon={<CheckCircle2 size={32} className="text-green-500" />} value={`${stats.score}/15`} label="CORRECT ANSWERS" />
                </div>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-md shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Comparison Graph</h2>
                <p className="mb-4">
                  You scored {stats.percentile}% percentile which is {parseInt(stats.percentile) > 72 ? 'higher' : 'lower'} than the average percentile 72% of all the engineers who took this assessment
                </p>
                <PercentileChart userPercentile={parseInt(stats.percentile)} />
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white p-4 md:p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Syllabus Wise Analysis</h2>
                {pieChartData.map((item, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-semibold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                      <div style={{ width: `${item.value}%`, backgroundColor: item.color }} className="h-full rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 md:p-6 rounded-md shadow-md">
                <div className='flex justify-between'>
                  <h2 className="text-xl font-semibold mb-4">Question Analysis</h2>
                  <h2 className="text-xl text-[#4F46E5] font-semibold mb-4">{stats.score}/15</h2>
                </div>
                <p className="mb-4">You scored {stats.score} out of 15. Some improvement needed.</p>
                <QuestionAnalysis correct={parseInt(stats.score)} total={15} />
              </div>
            </div>
          </div>

          <UpdateScoresDialog
            isOpen={isUpdateDialogOpen}
            onClose={() => setIsUpdateDialogOpen(false)}
            onSave={handleUpdateSave}
            initialValues={stats}
          />
        </div>
      </div>
    </div>
  );
}

const StatItem = ({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) => (
  <div className="flex items-center space-x-4">
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
      {icon}
    </div>
    <div>
      <div className="text-2xl md:text-3xl font-bold">{value}</div>
      <div className="text-xs md:text-sm text-gray-600">{label}</div>
    </div>
  </div>
);