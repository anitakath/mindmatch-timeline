"use client" 

import React, { useMemo } from 'react';
import Head from 'next/head';

// --- Epic and Timeline Configuration (Agile Rework) ---
// Beibehalten der agilen Konfiguration und Farben für die Balken
const EPIC_CONFIG = {
    'epic-1': { color: '#3b82f6', label: 'E1: Planning & Mgt.', title: 'Project planning & Mgt.', sprints: [1, 13], description: 'Define vision, goals, setup tools. Continuous project steering.' },
    'epic-2': { color: '#22c55e', label: 'E2: Research & Req.', title: 'Research & Requirements', sprints: [1, 5], description: 'Collect requirements, MoSCoW prioritization, continuous feedback loops.' },
    'epic-3': { color: '#f97316', label: 'E3: System Design & Arch.', title: 'System Design & Arch.', sprints: [1, 4], description: 'Database Schema, API Endpoints, UI Mockups. Iterative adjustments.' },
    'epic-5': { color: '#059669', label: 'E5: Backend Development', title: 'Backend Development', sprints: [2, 9], description: 'Core APIs & Matching Logic, Auth foundation, Matching Algorithm v1/v2.' },
    'epic-4': { color: '#6d28d9', label: 'E4: Frontend Development', title: 'Frontend Development', sprints: [2, 10], description: 'UI/UX, Dashboards & Accessibility. Runs until Go-Live.' },
    'epic-6': { color: '#1d4ed8', label: 'E6: Security Hardening', title: 'Data Protection & Security', sprints: [7, 6], description: 'GDPR, RBAC, Data Encryption, Secure API Configuration, Penetration Testing.' },
    'epic-7': { color: '#a855f7', label: 'E7: Testing & QA', title: 'Testing & Quality Assurance', sprints: [2, 12], description: 'Continuous integration and testing (Unit, E2E). Stabilization in final sprints.' },
    'epic-8': { color: '#ef4444', label: 'E8: Deployment & Docs.', title: 'Deployment & Docs.', sprints: [11, 3], description: 'Production Environment Prep, CI/CD, Documentation, Handover.' },
};

const MILESTONES = [
    { sprintEnd: 3, label: '🎉 M1: MVP ARCHITECTURE (16. Jan.)', offset: 100 },
    { sprintEnd: 6, label: '🎉 M2: CORE LOGIC DONE (13. März)', offset: 100 },
    { sprintEnd: 9, label: '🎉 M3: FEATURES COMPLETE (24. April)', offset: 100 },
    { sprintEnd: 12, label: '🎉 M4: BETA READY (05. Jun.)', offset: 100 },
    { sprintEnd: 13, label: '🎉 M5: GO-LIVE! (05. Jul.) 🚀', offset: 10 },
];

const TOTAL_SPRINTS = 13;
const SPRINT_DURATION_DAYS = 14;
const START_DATE = '2026-01-05'; 

// Generiert die Sprint-Daten und -Labels (Unverändert)
const useSprintData = () => {
    return useMemo(() => {
        const startDate = new Date(START_DATE);
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        
        const sprintDates = Array.from({ length: TOTAL_SPRINTS }, (_, i) => {
            const start = new Date(startDate.getTime() + i * SPRINT_DURATION_DAYS * 24 * 60 * 60 * 1000);
            const end = new Date(startDate.getTime() + (i + 1) * SPRINT_DURATION_DAYS * 24 * 60 * 60 * 1000 - 24 * 60 * 60 * 1000);
            
            return {
                number: i + 1,
                dateRange: `${start.toLocaleDateString('de-DE', options)} → ${end.toLocaleDateString('de-DE', options)}`,
            };
        });
        
        return { sprintDates };
    }, []);
};

// --- Komponente für die Epic-Balken (Unverändert) ---
interface EpicBarProps {
    epicKey: keyof typeof EPIC_CONFIG;
}

const EpicBar: React.FC<EpicBarProps> = ({ epicKey }) => {
    const epic = EPIC_CONFIG[epicKey];
    const [startSprint, durationSprints] = epic.sprints;

    const gridColumnStart = startSprint + 1;
    const gridColumnEnd = gridColumnStart + durationSprints;

    return (
        <div 
            className="grid-cell epic-bar-container" 
            style={{ gridColumn: `${gridColumnStart} / span ${durationSprints}` }}
        >
            <div
                className={`epic-bar epic-${epicKey.split('-')[1]}`}
                style={{
                    backgroundColor: epic.color,
                    left: 0, 
                    width: '100%',
                }}
                title={`${epic.label}: ${epic.description}`}
            >
                {epic.label.split(': ')[1]} 
            </div>
        </div>
    );
};

// --- Komponente für die Meilenstein-Linie (KORRIGIERT und BEREINIGT) ---
interface MilestoneLineProps {
    milestone: typeof MILESTONES[0];
    totalSprints: number;
}

const MilestoneLine: React.FC<MilestoneLineProps> = ({ milestone, totalSprints }) => {
    
    // Die relative Position in Prozent innerhalb des Sprint-Bereichs (13 Spalten)
    const positionPercentInSprintArea = (milestone.sprintEnd / totalSprints) * 100;
    
    return (
        // Positionierung relativ zum 13-Spalten-Container. border-8 und HALLO??? entfernt.
        <div 
            className="absolute top-0 bottom-0 z-20"
            style={{ 
                left: `${positionPercentInSprintArea}%`,
                transform: 'translateX(-50%)' // Zentriert die Linie an der berechneten Position
            }}
        >
            <div className="milestone-line w-[3px] h-full bg-orange-500">
                <div 
                    className="milestone-marker absolute w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-black shadow-lg"
                    style={{ top: '-20px', left: '-10px', boxShadow: '0 0 0 5px #f4f7fa' }}
                >
                    {milestone.sprintEnd}
                </div>
                <div 
                    className="milestone-label absolute top-[-55px] whitespace-nowrap font-bold text-orange-500 bg-white p-1 rounded border border-orange-500 text-xs cursor-pointer"
                    style={{ left: `-${milestone.offset}px`, transform: 'translateX(-50%)' }}
                >
                    {milestone.label}
                </div>
            </div>
        </div>
    );
};

// --- Hauptkomponente (KORRIGIERT) ---

export default function Home() {
    const { sprintDates } = useSprintData();

    const orderedEpicKeys: (keyof typeof EPIC_CONFIG)[] = [
        'epic-1', 'epic-2', 'epic-3', 'epic-5', 'epic-4', 'epic-6', 'epic-7', 'epic-8'
    ];


    // Navigations-Logik: Simuliert die Weiterleitung zu einer dynamischen Route.
    const handleSprintClick = (sprintNumber: number) => {
      const targetUrl = `/sprint/${sprintNumber}`;
      
      // In einer realen Next.js-Anwendung würden Sie 'useRouter().push(targetUrl)' verwenden.
      // Hier verwenden wir window.location.href zur Demonstration der Navigationsabsicht.
      console.log(`Navigating to: ${targetUrl}`);
      window.location.href = targetUrl;
  };

    return (
        <>
            <Head>
                <title>MindMatch Agile Epic Timeline</title>
                <link 
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap" 
                    rel="stylesheet"
                />
                <link 
                    rel="stylesheet" 
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
                />
            </Head>
            
            <div className="bg-gray-50 dark:bg-zinc-900 min-h-screen">
                <div className=" w-full over-flow-x-hidden flex flex-col justify-center items-center">
                    <div className="py-6">
                        <h1 className="text-4xl font-black text-center mb-2 text-violet-700 dark:text-violet-400">
                            MindMatch Agile Timeline
                        </h1>
                        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                          Visualization of the parallel sprint process (Jan. 5, 2026 – June 19, 2026)
                        </p>
                        
                    </div>
                    <p className="text-center text-violet-300 mb-8">
                      <em>
                        Future feature: Click on the respective sprint number to view the exact processes during that sprint. </em>
                    </p>
                    <div className=" overflow-x-auto w-full max-w-[1400px] pb-4 bg-white dark:bg-zinc-800 rounded-xl shadow-2xl">
                        
                        {/* --- Custom CSS Grid Styles (Inline/Utility Classes) --- */}
                        <style jsx global>{`
                            .timeline-grid {
                                min-width: 1800px;
                                display: grid;
                                grid-template-columns: 280px repeat(${TOTAL_SPRINTS}, 1fr);
                            }
                            .grid-header, .grid-cell {
                                padding: 12px 10px;
                                border-right: 1px solid #e5e7eb;
                                font-size: 14px;
                                text-align: center;
                            }
                            .grid-header {
                                font-weight: 700;
                                background-color: #eef2ff;
                                color: #6d28d9;
                            }
                            .grid-row-label {
                                text-align: left;
                                font-weight: 600;
                                /* Hintergrundfarbe wird wieder über die CSS-Klasse für Abwechslung gesteuert */
                                background-color: #f9fafb;
                                border-right: 2px solid #e5e7eb;
                                padding-left: 20px;
                                color: #374151; /* Standard dunkle Textfarbe */
                                position: sticky;
                                left: 0;
                                z-index: 10;
                            }
                            /* Sticky background alternation für bessere Lesbarkeit wieder aktiv */
                            .epic-row:nth-child(even) .grid-row-label { background-color: #ffffff; }
                            .epic-row:nth-child(odd) .grid-row-label { background-color: #f9fafb; }
                            
                            .epic-bar-container {
                                position: relative;
                                height: 100%;
                            }
                            .epic-bar {
                                height: 70%;
                                border-radius: 4px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                color: white;
                                font-weight: 600;
                                font-size: 13px;
                                padding: 0 5px;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
                                transition: all 0.3s ease;
                                position: absolute;
                                top: 50%;
                                transform: translateY(-50%);
                                white-space: nowrap;
                                overflow: hidden;
                                cursor: pointer;
                                text-shadow: 0 0 3px rgba(0,0,0,0.3);
                            }
                            .epic-bar:hover {
                                transform: translateY(-50%) scale(1.01);
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                            }
                            /* Zusätzliche Styling für die Milestone-Grid-Zellen */
                            .milestone-grid-cell {
                                border-right: 1px solid #e5e7eb;
                                padding: 0;
                            }
                        `}</style>


                        {/* Timeline Headers (Months and Sprints) */}
                        <div className="timeline-grid font-mono text-xs border-b border-gray-300">
                            {/* Labels Column */}
                            <div 
                                className="grid-header grid-row-label rounded-tl-xl" 
                                style={{ borderRight: 'none', backgroundColor: '#eef2ff', color: '#6d28d9' }} // Hält den Header-Stil bei
                            >
                                Epic / Focus
                            </div>
                            
                            {/* Sprint Columns (Monthly Grouping) */}
                            <div className="grid-header bg-blue-100/70" style={{ gridColumn: '2 / span 3' }}>Jan-Feb</div>
                            <div className="grid-header bg-green-100/70" style={{ gridColumn: '5 / span 4' }}>Feb-Apr</div>
                            <div className="grid-header bg-yellow-100/70" style={{ gridColumn: '9 / span 3' }}>Apr-Jun</div>
                            <div className="grid-header bg-red-100/70 rounded-tr-xl" style={{ gridColumn: '12 / span 3' }}>Jun-Jul</div>
                            
                            {/* Sprint Details (Numbers) */}
                            <div className="grid-row-label">SPRINT NR.</div>
                            {sprintDates.map(s => (
                                <div key={s.number} className="grid-cell font-bold text-sm bg-gray-50 dark:bg-zinc-700 dark:text-white">
                                    <button 
                                        className='cursor-pointer text-gray-700 dark:text-white hover:text-purple-300 transition duration-200 p-1 rounded'
                                        title={`Details zu Sprint ${s.number}`}
                                        onClick={() => handleSprintClick(s.number)}
                                    > 
                                        {s.number} 
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        {/* Sprint Dates Row */}
                        <div className="timeline-grid border-b border-gray-300 dark:border-zinc-700">
                            <div className="grid-row-label font-normal text-xs text-gray-600 dark:text-gray-400">
                            Duration of a sprint = 2 weeks
                            </div>
                            {sprintDates.map(s => (
                                <div key={`date-${s.number}`} className="grid-cell font-normal text-xs bg-gray-50 dark:bg-zinc-700 dark:text-gray-300">
                                    {s.dateRange}
                                </div>
                            ))}
                        </div>

                        {/* --- EPIC ROWS (KORRIGIERT AUF EINHEITLICHEN HINTERGRUND) --- */}
                        {orderedEpicKeys.map((epicKey, index) => (
                            <div 
                                key={epicKey} 
                                className={`timeline-grid h-16 epic-row ${index < orderedEpicKeys.length - 1 ? 'border-b border-gray-200 dark:border-zinc-700' : ''}`}
                            >
                                {/* Row Label - Stellt die abwechselnden Hintergründe wieder her. */}
                                <div className="grid-row-label dark:bg-zinc-800 dark:text-white">
                                    {EPIC_CONFIG[epicKey].title} 
                                </div>
                                
                                {/* Epic Bar Component */}
                                <EpicBar epicKey={epicKey} />
                            </div>
                        ))}
                        
                        {/* Milestones Row (KORRIGIERT) */}
                        <div className="timeline-grid pt-12 pb-8relative">
                            {/* Milestone Label */}
                            <div className="grid-row-label text-lg font-bold pt-16" style={{ borderRight: 'none', background: 'transparent' }}>
                                Milestones
                            </div>
                            {/* Milestone lines are absolutely positioned within this container */}
                            <div style={{ 
                                gridColumn: '2 / span 13', 
                                position: 'relative', 
                                height: '100px', // Höhe setzen, damit die absolute Linie Platz hat
                                display: 'grid', // Wichtig: Machen Sie diesen Container auch zu einem Grid-Container
                                gridTemplateColumns: `repeat(${TOTAL_SPRINTS}, 1fr)`, // Um die 13 Spalten zu füllen
                            }}>
                                {/* EINFÜGEN DER LEEREN ZELLEN, DAMIT DER CONTAINER IN DEN SPALTEN PLATZ HAT UND DIE TRENNLINIEN ZIEHT */}
                                {Array.from({ length: TOTAL_SPRINTS }, (_, i) => (
                                    <div 
                                        key={`m-cell-${i}`} 
                                        className="milestone-grid-cell" 
                                        style={{ borderRight: i === TOTAL_SPRINTS - 1 ? 'none' : '1px solid #e5e7eb' }}
                                    ></div>
                                ))}
                                
                                {MILESTONES.map((m, index) => (
                                    <MilestoneLine key={index} milestone={m} totalSprints={TOTAL_SPRINTS} />
                                ))}
                            </div>
                        </div>
                        
                    </div>
                    
                    {/* Legend */}
                    <div className="mt-8 text-sm font-semibold text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
                        <h3 className="text-lg font-bold mb-4 text-center text-gray-700 dark:text-gray-200">
                          Legend of the Epics and Focus Phases
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600 dark:text-gray-400">
                            {orderedEpicKeys.map(epicKey => {
                                const epic = EPIC_CONFIG[epicKey];
                                return (
                                    <div key={`legend-${epicKey}`} className="flex items-center">
                                        <span 
                                            className="w-4 h-4 rounded-md mr-2 shadow-sm" 
                                            style={{ backgroundColor: epic.color }}
                                        ></span>
                                        {epic.label} 
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}