import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { LoginScreen } from './components/LoginScreen';
import { EmployeeHome } from './components/EmployeeHome';
import { SimilarityCheckView } from './components/SimilarityCheckView';
import { ProjectsView } from './components/ProjectsView';
import { KnowledgeView } from './components/KnowledgeView';
import { AssistantView } from './components/AssistantView';
import { AdminView } from './components/AdminView';

import { ReusableComponentsModal } from './components/ReusableComponentsModal';
import { ProjectDetailsModal } from './components/ProjectDetailsModal';
import { FullAnalysisModal } from './components/FullAnalysisModal';
import { ArticleModal } from './components/ArticleModal';

import {
  CURRENT_EMPLOYEE_USER,
  CURRENT_ADMIN_USER,
  INITIAL_PROJECTS,
  INITIAL_KNOWLEDGE_ARTICLES,
  INITIAL_WORKSPACE_SOURCES,
  INITIAL_SIMILARITY_RESULT,
} from './data/mockData';
import { User, UserRole, Project, KnowledgeArticle, SimilarityCheckResult } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_EMPLOYEE_USER);
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Core Data State
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [articles, setArticles] = useState<KnowledgeArticle[]>(INITIAL_KNOWLEDGE_ARTICLES);
  const [sources, setSources] = useState(INITIAL_WORKSPACE_SOURCES);
  const [similarityResult, setSimilarityResult] = useState<SimilarityCheckResult>(INITIAL_SIMILARITY_RESULT);

  // Modals state
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<Project | null>(null);
  const [selectedArticleForModal, setSelectedArticleForModal] = useState<KnowledgeArticle | null>(null);
  const [showReusableComponentsModal, setShowReusableComponentsModal] = useState(false);
  const [showFullAnalysisModal, setShowFullAnalysisModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);

  // Sync dark mode class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle Login
  const handleLogin = (role: UserRole) => {
    setCurrentUser(role === 'admin' ? CURRENT_ADMIN_USER : CURRENT_EMPLOYEE_USER);
    setIsAuthenticated(true);
    setActiveTab(role === 'admin' ? 'admin' : 'similarity');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSwitchRole = (newRole: UserRole) => {
    setCurrentUser(newRole === 'admin' ? CURRENT_ADMIN_USER : CURRENT_EMPLOYEE_USER);
    if (newRole === 'admin' && activeTab === 'home') {
      setActiveTab('admin');
    }
  };

  // Run Similarity Check via Backend API (or resilient fallback)
  const handleTriggerSimilarityCheck = async (queryText: string) => {
    setActiveTab('similarity');

    // Create immediate loading state
    const loadingResult: SimilarityCheckResult = {
      ...similarityResult,
      query: queryText,
      processingStage: 2,
    };
    setSimilarityResult(loadingResult);

    try {
      const response = await fetch('/api/similarity-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText }),
      });

      if (!response.ok) throw new Error('Failed to run similarity check');
      const data = await response.json();

      setSimilarityResult({
        query: data.query,
        tags: data.tags || ['Platform', 'Internal'],
        similarProjects: data.similarProjects || projects,
        aiRecommendation: data.aiRecommendation,
        processingStage: 5,
      });
    } catch (err) {
      // Local fallback with real scoring
      const keywords = queryText.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
      const scored = projects.map((p) => {
        let score = 30;
        keywords.forEach((kw) => {
          if (`${p.title} ${p.description} ${p.domain}`.toLowerCase().includes(kw)) {
            score += 20;
          }
        });
        return { ...p, similarityScore: Math.min(Math.max(score, 45), 92) };
      }).sort((a, b) => b.similarityScore - a.similarityScore);

      setSimilarityResult({
        query: queryText,
        tags: queryText.split(/\s+/).slice(0, 4),
        similarProjects: scored,
        aiRecommendation: {
          decision: 'Reuse with Enhancement',
          explanation: `You can reuse existing components and architectural patterns from ${scored[0].title}.`,
          reusableComponents: scored[0].reusableModules.map((m) => `${m.name} (from ${scored[0].title})`),
          suggestedArchitecture: `Adopt ${scored[0].title} backend service structure while adapting the frontend UI.`,
          risksToAvoid: ['Avoid creating redundant inventory database tables; reuse the partitioned schema.'],
        },
        processingStage: 5,
      });
    }
  };

  // If not authenticated, render split-screen login page (Image 1)
  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        isDarkMode={isDarkMode}
      />
    );
  }

  // Collect all reusable modules across all similar projects for the drawer
  const allCurrentReusableModules = similarityResult.similarProjects.flatMap((p) => p.reusableModules);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070D16] text-slate-800 dark:text-slate-100 flex transition-colors">
      {/* Left Sidebar (Image 2 & 3) */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        userRole={currentUser.role}
        isDarkMode={isDarkMode}
        onOpenAgentModal={() => setShowAgentModal(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          currentUser={currentUser}
          onSwitchRole={handleSwitchRole}
          onLogout={handleLogout}
          onSearchSubmit={handleTriggerSimilarityCheck}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        <main className="flex-1 overflow-y-auto">
          {activeTab === 'home' && (
            <EmployeeHome
              currentUser={currentUser}
              projects={projects}
              articles={articles}
              onTriggerSimilarityCheck={handleTriggerSimilarityCheck}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectProject={(proj) => setSelectedProjectForModal(proj)}
              onSelectArticle={(art) => setSelectedArticleForModal(art)}
            />
          )}

          {activeTab === 'similarity' && (
            <SimilarityCheckView
              result={similarityResult}
              sources={sources}
              isDarkMode={isDarkMode}
              onBack={() => setActiveTab('home')}
              onSelectProject={(proj) => setSelectedProjectForModal(proj)}
              onViewReusableComponents={() => setShowReusableComponentsModal(true)}
              onViewFullAnalysis={() => setShowFullAnalysisModal(true)}
              onRecheckQuery={handleTriggerSimilarityCheck}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              projects={projects}
              onSelectProject={(proj) => setSelectedProjectForModal(proj)}
              onCheckSimilarityWithProject={(proj) => handleTriggerSimilarityCheck(proj.description)}
            />
          )}

          {activeTab === 'knowledge' && (
            <KnowledgeView
              articles={articles}
              onSelectArticle={(art) => setSelectedArticleForModal(art)}
            />
          )}

          {activeTab === 'assistant' && (
            <AssistantView
              onCheckSimilarityFromAssistant={handleTriggerSimilarityCheck}
            />
          )}

          {activeTab === 'admin' && (
            <AdminView
              sources={sources}
              onTriggerSync={() => {
                // Refresh last sync timestamps
                setSources((prev) =>
                  prev.map((s) => ({ ...s, lastSync: 'Just now', status: 'completed' }))
                );
              }}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      {showReusableComponentsModal && (
        <ReusableComponentsModal
          modules={allCurrentReusableModules.length ? allCurrentReusableModules : INITIAL_PROJECTS[0].reusableModules}
          onClose={() => setShowReusableComponentsModal(false)}
        />
      )}

      {selectedProjectForModal && (
        <ProjectDetailsModal
          project={selectedProjectForModal}
          onClose={() => setSelectedProjectForModal(null)}
          onInspectModules={() => {
            setSelectedProjectForModal(null);
            setShowReusableComponentsModal(true);
          }}
          onRunSimilarityWithThis={(proj) => {
            setSelectedProjectForModal(null);
            handleTriggerSimilarityCheck(proj.description);
          }}
        />
      )}

      {showFullAnalysisModal && (
        <FullAnalysisModal
          result={similarityResult}
          onClose={() => setShowFullAnalysisModal(false)}
          onViewComponents={() => {
            setShowFullAnalysisModal(false);
            setShowReusableComponentsModal(true);
          }}
        />
      )}

      {selectedArticleForModal && (
        <ArticleModal
          article={selectedArticleForModal}
          onClose={() => setSelectedArticleForModal(null)}
        />
      )}

      {/* Autonomous Agent Details Modal */}
      {showAgentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Autonomous Knowledge Agent
                </h3>
              </div>
              <button
                onClick={() => setShowAgentModal(false)}
                className="text-slate-400 hover:text-slate-600 font-semibold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              TacitAI&apos;s Autonomous Agent periodically scans your connected git repositories, PR comments, and Notion/Confluence pages. It runs semantic AST parsing to identify reusable modules and extracts architecture decisions (ADRs) automatically.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400">Current Status:</span>
                <span className="font-semibold text-emerald-600">Running (Watcher active)</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400">Total Scanned Sources:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">12 projects, 8 repos, 124 docs</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400">Knowledge Graph Nodes:</span>
                <span className="font-semibold text-teal-600">1,480 vector nodes</span>
              </div>
            </div>
            <button
              onClick={() => setShowAgentModal(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
