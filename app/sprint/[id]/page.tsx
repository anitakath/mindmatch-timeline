"use client";

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faChartLine, faProjectDiagram, faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Mock-Daten für alle Sprints
// HINWEIS: Die redundante Eigenschaft 'epics: string[]' wurde entfernt, um den TypeScript-Fehler zu beheben.
const SPRINTS_DATA: { [key: number]: { title: string; dateRange: string; description: string; focusAreas: string[]; involvedEpics: { key: string; label: string; status: string }[]; metrics: { velocity: string; bugs: string } } } = {
    1: { 
        title: "Sprint 1: Kickoff & Basis-Architektur", dateRange: "05. Jan → 18. Jan", 
        description: "Vision, Ziele, Team-Setup, Anforderungsanalyse (E2) starten, System Design Grundpfeiler (E3).",
        focusAreas: ["Vision, Ziele, Team-Setup", "Anforderungsanalyse (E2) starten", "System Design Grundpfeiler (E3)"], 
        involvedEpics: [
            { key: 'epic-1', label: 'E1: Planung & Mgt.', status: 'Completed' },
            { key: 'epic-2', label: 'E2: Research & Req.', status: 'Starting' },
            { key: 'epic-3', label: 'E3: System Design & Arch.', status: 'Starting' },
        ],
        metrics: { velocity: "15 Story Points", bugs: "0 Bugs (Initial Phase)" }
    },
    2: { 
        title: "Sprint 2: Start Backend & QA Setup", dateRange: "19. Jan → 01. Feb", 
        description: "Erste Backend-APIs (E5), Testing Frameworks (E7) etablieren, Erste UI-Komponenten (E4).",
        focusAreas: ["Erste Backend-APIs (E5)", "Testing Frameworks (E7) etablieren", "Erste UI-Komponenten (E4)"], 
        involvedEpics: [
            { key: 'epic-5', label: 'E5: Backend Development', status: 'In Progress' },
            { key: 'epic-4', label: 'E4: Frontend Development', status: 'In Progress' },
            { key: 'epic-3', label: 'E3: System Design & Arch.', status: 'In Progress' },
            { key: 'epic-7', label: 'E7: Testing & QA', status: 'Starting' },
        ],
        metrics: { velocity: "25 Story Points", bugs: "1 Minor Bug" }
    },
    3: { 
        title: `Sprint 3: Matching V1 & API Endpoints`,
        dateRange: "02. Feb → 15. Feb",
        description: "In diesem Sprint liegt der Fokus auf der Fertigstellung der Kern-Matching-Logik, der Finalisierung wichtiger API-Endpunkte und dem Abschluss der Research-Phase, um eine stabile Basis für die Hauptentwicklung zu gewährleisten.",
        focusAreas: [
            "Implementierung der ersten Version der MindMatch-Matching-Logik (Kern des Produkts).",
            "Fertigstellung und Dokumentation aller User- und Profile-APIs (E5).",
            "Frontend: Dashboard-Layout und Navigation implementieren (E4).",
            "System Design Review abschliessen und Architektur frieren (E3).",
            "Erste Performance-Tests und Last-Checks auf den neuen APIs (E7).",
        ],
        involvedEpics: [
            { key: 'epic-5', label: 'E5: Backend Development', status: 'In Progress' },
            { key: 'epic-4', label: 'E4: Frontend Development', status: 'In Progress' },
            { key: 'epic-3', label: 'E3: System Design & Arch.', status: 'Closing' },
            { key: 'epic-2', label: 'E2: Research & Req.', status: 'Completed' },
            { key: 'epic-7', label: 'E7: Testing & QA', status: 'Starting' },
        ],
        metrics: {
            velocity: "30 Story Points",
            bugs: "2 High Severity Bugs (To be fixed in Sprint 4)",
        }
    },
    // ... Fügen Sie hier weitere Sprint-Daten hinzu (4 bis 13)
};

const getEpicColor = (key: string) => {
    switch (key) {
        case 'epic-5': return 'bg-emerald-500'; // Backend
        case 'epic-4': return 'bg-violet-600'; // Frontend
        case 'epic-3': return 'bg-orange-500'; // System Design
        case 'epic-2': return 'bg-green-500'; // Research
        case 'epic-7': return 'bg-purple-500'; // QA
        case 'epic-1': return 'bg-blue-500'; // Planning
        default: return 'bg-gray-500';
    }
}

// Typ-Definition für die URL-Parameter
interface SprintPageProps {
    params: {
        id: string; // Die dynamische Route ist [id]
    };
}

export default function SprintPage({ params }: SprintPageProps) {
    const sprintId = parseInt(params.id, 10);
    
    // Daten abrufen. Wenn die ID nicht existiert, wird ein Fallback verwendet.
    const SPRINT_DATA = SPRINTS_DATA[sprintId];

    if (!SPRINT_DATA) {
        return (
            <div className="bg-gray-50 dark:bg-zinc-900 min-h-screen p-8 text-center flex flex-col justify-center items-center">
                <h1 className="text-4xl font-black text-purple-600 mb-4">🏗️ This page is currently under construction.</h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                    In the future, you will be able to view more details about each sprint here. Stay tuned!
                </p>
                <Link href="/" className="inline-flex items-center text-violet-500 w-2xl justify-center hover:text-violet-700 font-medium transition duration-150 p-2 rounded-lg border border-violet-500 hover:border-violet-700">
                    {/*<FontAwesomeIcon icon={faArrowLeft} className="mr-2" />*/}
                    Back to the Epic Timeline
                </Link>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-50 dark:bg-zinc-900 min-h-screen p-4 sm:p-8">
            <div className="max-w-5xl mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow-2xl p-6 sm:p-10">
                
                {/* Header */}
                <div className="border-b pb-4 mb-6 border-gray-200 dark:border-zinc-700">
                    <h1 className="text-4xl font-black text-violet-700 dark:text-violet-400 mb-2">
                        {SPRINT_DATA.title}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Zeitraum: <span className="font-semibold">{SPRINT_DATA.dateRange}</span>
                    </p>
                </div>

                {/* Beschreibung */}
                <p className="text-gray-700 dark:text-gray-300 mb-8 p-4 bg-yellow-50 dark:bg-zinc-700 rounded-lg border-l-4 border-yellow-500">
                    <span className="font-bold">Zusammenfassung:</span> {SPRINT_DATA.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    
                    {/* Fokusbereiche */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                            <FontAwesomeIcon icon={faBullseye} className="text-red-500 mr-3" />
                            Wichtige Fokusbereiche
                        </h2>
                        <ul className="space-y-3">
                            {SPRINT_DATA.focusAreas.map((item, index) => (
                                <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Metriken und Status */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                            <FontAwesomeIcon icon={faChartLine} className="text-blue-500 mr-3" />
                            Sprint Metriken & KPIs
                        </h2>
                        <div className="space-y-4 text-gray-700 dark:text-gray-300">
                            <div className="flex justify-between p-3 bg-gray-100 dark:bg-zinc-700 rounded-md">
                                <span className="font-medium">Geschwindigkeit (Velocity):</span>
                                <span className="font-bold text-blue-600 dark:text-blue-400">{SPRINT_DATA.metrics.velocity}</span>
                            </div>
                            <div className="p-3 bg-gray-100 dark:bg-zinc-700 rounded-md">
                                <span className="font-medium">Blocker/Risiken:</span>
                                <span className="block mt-1 font-bold text-red-600 dark:text-red-400">{SPRINT_DATA.metrics.bugs}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Beteiligte Epics */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                        <FontAwesomeIcon icon={faProjectDiagram} className="text-purple-500 mr-3" />
                        Beteiligte Epics & Status
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {SPRINT_DATA.involvedEpics.map((epic, index) => (
                            <div 
                                key={index} 
                                className={`p-4 rounded-lg shadow-md transition duration-300 ${getEpicColor(epic.key)} text-white`}
                            >
                                <p className="font-bold text-lg mb-1">{epic.label}</p>
                                <p className="text-sm opacity-90">Status: {epic.status}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Zurück zur Übersicht */}
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-zinc-700 text-center">
                    {/* WICHTIG: Verwenden Sie hier den Next.js Link-Tag */}
                    <Link href="/" className="inline-flex items-center text-violet-500 hover:text-violet-700 font-medium transition duration-150 p-2 rounded-lg hover:bg-violet-50 dark:hover:bg-zinc-700">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Zurück zur Epic Timeline Übersicht
                    </Link>
                </div>

            </div>
        </div>
    );
}