"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Save, ExternalLink } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface TechSummaryProps {
  summary: {
    technology: string;
    overview: string;
    purpose: string;
    functionality: string;
    installation: string;
    usage: string;
    examples: string;
    compatibility: string;
    requirements: string;
    bestPractices: string;
    usefulLinks: string;
  };
}

export default function TechSummary({ summary }: TechSummaryProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const { user } = useAuth();

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const sections = [
    { key: "overview", title: "Visão Geral", content: summary.overview },
    { key: "purpose", title: "Para que serve", content: summary.purpose },
    {
      key: "functionality",
      title: "O que faz",
      content: summary.functionality,
    },
    { key: "installation", title: "Instalação", content: summary.installation },
    { key: "usage", title: "Como usar", content: summary.usage },
    { key: "examples", title: "Exemplos de uso", content: summary.examples },
    {
      key: "compatibility",
      title: "Compatibilidades",
      content: summary.compatibility,
    },
    {
      key: "requirements",
      title: "Requisitos e dependências",
      content: summary.requirements,
    },
    {
      key: "bestPractices",
      title: "Melhores práticas",
      content: summary.bestPractices,
    },
    { key: "usefulLinks", title: "Links úteis", content: summary.usefulLinks },
  ];

  const handleSave = async (category: string) => {
    if (!user) return;

    try {
      const response = await fetch("/api/save-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary,
          category,
          userId: user.uid,
        }),
      });

      if (response.ok) {
        // Mostrar toast de sucesso
      }
    } catch (error) {
      console.error("Erro ao salvar resumo:", error);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          {summary.technology}
        </h3>
        {user && (
          <div className="flex space-x-2">
            <button
              onClick={() => handleSave("estudos")}
              className="btn-secondary text-sm"
            >
              <Save className="w-4 h-4 mr-1" />
              Estudos
            </button>
            <button
              onClick={() => handleSave("trabalho")}
              className="btn-secondary text-sm"
            >
              <Save className="w-4 h-4 mr-1" />
              Trabalho
            </button>
            <button
              onClick={() => handleSave("projetos")}
              className="btn-secondary text-sm"
            >
              <Save className="w-4 h-4 mr-1" />
              Projetos
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const isExpanded = expandedSections.has(section.key);

          return (
            <div
              key={section.key}
              className="border border-gray-200 rounded-lg"
            >
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                aria-expanded={isExpanded}
                aria-controls={`section-${section.key}`}
              >
                <span className="font-medium text-gray-900">
                  {section.title}
                </span>
                {isExpanded ? (
                  <ChevronUp
                    className="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDown
                    className="w-5 h-5 text-gray-500"
                    aria-hidden="true"
                  />
                )}
              </button>

              {isExpanded && (
                <div
                  id={`section-${section.key}`}
                  className="px-4 pb-4"
                  role="region"
                  aria-labelledby={`section-${section.key}-title`}
                >
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <div
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
