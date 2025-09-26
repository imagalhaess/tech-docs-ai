"use client";

import { useState, useEffect } from "react";
import { BookOpen, Briefcase, FolderOpen, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SavedSummary {
  id: string;
  technology: string;
  category: string;
  summary: any;
  createdAt: Date;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  summaries: string[];
}

export default function Categories() {
  const { user } = useAuth();
  const [savedSummaries, setSavedSummaries] = useState<SavedSummary[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<
    "estudos" | "trabalho" | "projetos"
  >("estudos");
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  useEffect(() => {
    if (user) {
      fetchSavedSummaries();
      fetchProjects();
    }
  }, [user]);

  const fetchSavedSummaries = async () => {
    try {
      const response = await fetch(`/api/saved-summaries?userId=${user?.uid}`);
      if (response.ok) {
        const data = await response.json();
        setSavedSummaries(data);
      }
    } catch (error) {
      console.error("Erro ao buscar resumos salvos:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`/api/projects?userId=${user?.uid}`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  };

  const createProject = async () => {
    if (!newProject.name.trim()) return;

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newProject,
          userId: user?.uid,
        }),
      });

      if (response.ok) {
        setNewProject({ name: "", description: "" });
        setShowNewProject(false);
        fetchProjects();
      }
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  };

  const filteredSummaries = savedSummaries.filter(
    (s) => s.category === activeTab
  );

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6">Meus Conteúdos</h2>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab("estudos")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "estudos"
              ? "bg-primary-100 text-primary-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Estudos</span>
        </button>

        <button
          onClick={() => setActiveTab("trabalho")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "trabalho"
              ? "bg-primary-100 text-primary-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span>Trabalho</span>
        </button>

        <button
          onClick={() => setActiveTab("projetos")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === "projetos"
              ? "bg-primary-100 text-primary-700"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FolderOpen className="w-5 h-5" />
          <span>Projetos</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === "projetos" ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Meus Projetos</h3>
            <button
              onClick={() => setShowNewProject(true)}
              className="btn-primary text-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Novo Projeto
            </button>
          </div>

          {showNewProject && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium mb-3">Criar Novo Projeto</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nome do projeto"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                  className="input-field"
                />
                <textarea
                  placeholder="Descrição do projeto"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  className="input-field h-20 resize-none"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={createProject}
                    className="btn-primary text-sm"
                  >
                    Criar
                  </button>
                  <button
                    onClick={() => setShowNewProject(false)}
                    className="btn-secondary text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-lg">{project.name}</h4>
                <p className="text-gray-600 text-sm mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {activeTab === "estudos"
              ? "Resumos de Estudo"
              : "Resumos de Trabalho"}
          </h3>

          <div className="space-y-3">
            {filteredSummaries.map((summary) => (
              <div
                key={summary.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h4 className="font-semibold text-lg">{summary.technology}</h4>
                <p className="text-gray-600 text-sm">
                  Salvo em{" "}
                  {new Date(summary.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

